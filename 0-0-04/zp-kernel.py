from flask import Flask, request, jsonify
from flask_cors import CORS
import importlib
import os
import sys
import subprocess
import re
import json
from typing import Dict, List, Any, Optional, Tuple

# ============================================
# Context Manager - مدیریت متغیرها و Scope
# ============================================
class ContextManager:
    def __init__(self):
        self.global_vars = {}
        self.scopes = []  # پشته‌ی scopeها برای بلاک‌های تو در تو
        self.current_scope = None

    def get_var(self, name: str) -> Any:
        """دریافت مقدار متغیر - اول از scope فعلی، بعد از global"""
        if self.scopes:
            for scope in reversed(self.scopes):
                if name in scope:
                    return scope[name]
        return self.global_vars.get(name)

    def set_var(self, name: str, value: Any, local: bool = False):
        """تنظیم متغیر - اگر local=True فقط توی scope فعلی"""
        if local and self.scopes:
            self.scopes[-1][name] = value
        else:
            self.global_vars[name] = value

    def push_scope(self):
        """ورود به بلاک جدید - scope جدید ایجاد کن"""
        self.scopes.append({})

    def pop_scope(self):
        """خروج از بلاک - scope فعلی رو حذف کن"""
        if self.scopes:
            return self.scopes.pop()
        return {}

    def get_all_vars(self) -> Dict:
        """تمام متغیرها (global + آخرین scope)"""
        result = self.global_vars.copy()
        if self.scopes:
            result.update(self.scopes[-1])
        return result


# ============================================
# Block Manager - مدیریت بلاک‌های کد
# ============================================
class BlockManager:
    @staticmethod
    def extract_block(lines: List[str], start_idx: int, end_marker: str) -> Tuple[List[str], int]:
        """
        استخراج بلاک از خط start_idx تا خطی که شامل end_marker باشه
        برگردونه: (بلاک, ایندکس خط پایان)
        پشتیبانی از بلاک‌های تو در تو
        """
        block_lines = []
        nested_level = 0
        end_idx = start_idx

        for i in range(start_idx, len(lines)):
            line = lines[i].strip()
            # تشخیص شروع بلاک‌های تو در تو (مثلاً شرط داخل شرط)
            if line.startswith('if ') or line.startswith('for ') or line.startswith('while '):
                nested_level += 1
            # اگه پایان بلاک دیدیم
            if line == end_marker:
                if nested_level == 0:
                    end_idx = i
                    break
                else:
                    nested_level -= 1
            block_lines.append(lines[i])
        else:
            # اگه پایان پیدا نشد، کل تا آخر رو بلاک در نظر بگیر
            end_idx = len(lines) - 1
            block_lines = lines[start_idx:]

        return block_lines, end_idx

    @staticmethod
    def is_block_start(line: str, lang_metadata: Dict) -> bool:
        """چک کنه که آیا این خط شروع یک بلاک‌ست (با توجه به متادیتای زبان)"""
        # از متادیتا می‌تونیم کلمات کلیدی رو بگیریم
        keywords = lang_metadata.get('block_keywords', ['if', 'for', 'while'])
        for kw in keywords:
            if line.strip().startswith(kw):
                return True
        return False


# ============================================
# Error Handler - مدیریت خطاها با پیام‌های زبان
# ============================================
class ErrorHandler:
    @staticmethod
    def get_message(lang_metadata: Dict, error_key: str, **kwargs) -> str:
        """دریافت پیام خطا از زبان‌پک با جایگذاری پارامترها"""
        messages = lang_metadata.get('error_messages', {})
        template = messages.get(error_key)
        if not template:
            return f"Unknown error: {error_key}"
        try:
            return template.format(**kwargs)
        except KeyError:
            return template

    @staticmethod
    def raise_error(lang_metadata: Dict, error_key: str, **kwargs):
        """پرتاب خطا با پیام زبان‌پک"""
        msg = ErrorHandler.get_message(lang_metadata, error_key, **kwargs)
        raise Exception(msg)


# ============================================
# ZPLang Core - هسته‌ی اصلی نسخه 0.0.04
# ============================================
class ZPLang:
    def __init__(self):
        self.lang_packs = {}  # {name: module}
        self.context = ContextManager()
        self.current_lang = None
        self.lang_module = None
        self.lang_metadata = None
        self.block_marker = 'پایان'  # کلمه‌ی کلیدی پایان بلاک (قابل تنظیم)
        self.load_languages()

    # ========== بارگذاری زبان‌پک‌ها ==========
    def load_languages(self):
        """بارگذاری تمام فایل‌های lang-zp-*.py و بررسی متادیتا"""
        lang_dir = os.path.dirname(os.path.abspath(__file__))
        for file in os.listdir(lang_dir):
            if file.startswith('lang-zp-') and file.endswith('.py'):
                module_name = file[:-3]
                try:
                    module = importlib.import_module(module_name)
                    # بررسی متادیتا
                    if hasattr(module, 'get_metadata'):
                        metadata = module.get_metadata()
                        if 'name' not in metadata:
                            print(f"❌ {module_name}: Missing 'name' in metadata")
                            continue
                        # ذخیره‌سازی
                        lang_key = metadata['name']
                        self.lang_packs[lang_key] = {
                            'module': module,
                            'metadata': metadata,
                            'loaded': False
                        }
                        print(f"✅ Language '{metadata['name']}' loaded (v{metadata.get('version', 'unknown')})")
                    else:
                        print(f"❌ {module_name}: Missing get_metadata() function")
                except Exception as e:
                    print(f"❌ Error loading {module_name}: {e}")

    # ========== بررسی پیش‌نیازها ==========
    def validate_dependencies(self, metadata: Dict) -> Tuple[bool, List[str]]:
        """بررسی پیش‌نیازهای زبان‌پک - برگردونه (success, list_of_errors)"""
        errors = []
        deps = metadata.get('dependencies', {})

        # 1. نسخه‌ی پایتون
        if 'python' in deps:
            required_version = deps['python']
            current_version = f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
            # بررسی ساده: حداقل نسخه
            if required_version.startswith('>='):
                min_ver = required_version[2:].strip()
                # مقایسه ساده
                if sys.version_info < tuple(map(int, min_ver.split('.'))):
                    errors.append(f"Python version {current_version} < {min_ver}")

        # 2. کتابخونه‌های پایتون (pip)
        if 'pip_packages' in deps:
            for pkg in deps['pip_packages']:
                try:
                    importlib.import_module(pkg)
                except ImportError:
                    errors.append(f"Package '{pkg}' not installed")

        # 3. بسته‌های سیستمی
        if 'system_packages' in deps:
            for pkg in deps['system_packages']:
                # بررسی با which (برای لینوکس)
                result = subprocess.run(['which', pkg], capture_output=True, text=True)
                if result.returncode != 0:
                    errors.append(f"System package '{pkg}' not found")

        return len(errors) == 0, errors

    # ========== انتخاب و بارگذاری زبان ==========
    def select_language(self, lang_name: Optional[str] = None) -> bool:
        """انتخاب زبان با نام - اگه نام داده نشه، اولین زبان انتخاب میشه"""
        if not self.lang_packs:
            print("❌ No language packs loaded.")
            return False

        if lang_name and lang_name in self.lang_packs:
            lang_data = self.lang_packs[lang_name]
        else:
            # انتخاب اولین زبان
            first_key = next(iter(self.lang_packs))
            lang_data = self.lang_packs[first_key]

        # بررسی پیش‌نیازها
        metadata = lang_data['metadata']
        success, errors = self.validate_dependencies(metadata)
        if not success:
            # پیام‌های خطا رو از زبان‌پک بگیر
            lang_name = metadata['name']
            error_msgs = []
            for err in errors:
                msg = ErrorHandler.get_message(metadata, 'dependency_error', error=err)
                error_msgs.append(msg)
            print(f"❌ Language '{lang_name}' dependencies not met:")
            for msg in error_msgs:
                print(f"   - {msg}")
            return False

        # بارگذاری نهایی
        self.current_lang = lang_data['metadata']['name']
        self.lang_module = lang_data['module']
        self.lang_metadata = metadata
        self.block_marker = metadata.get('block_marker', 'پایان')
        print(f"✅ Language '{self.current_lang}' selected and ready.")
        return True

    # ========== اجرای کد ==========
    def run(self, command: str, lang_name: Optional[str] = None) -> Tuple[str, str, Dict]:
        """
        اجرای یک دستور (یا بلاک) در زبان انتخاب‌شده
        برگردونه: (status, message, variables)
        """
        # اگه زبان انتخاب نشده، انتخابش کن
        if not self.lang_module:
            if not self.select_language(lang_name):
                return "ERROR", "No language selected", self.context.get_all_vars()
        elif lang_name and lang_name != self.current_lang:
            if not self.select_language(lang_name):
                return "ERROR", f"Language '{lang_name}' not available", self.context.get_all_vars()

        # پردازش توسط زبان‌پک
        try:
            # بررسی اینکه آیا این خط شروع بلاک‌ست
            if BlockManager.is_block_start(command, self.lang_metadata):
                # اینجا باید بلاک رو استخراج کنیم، ولی چون ما خط‌به‌خط اجرا می‌کنیم،
                # این بخش رو به خود زبان‌پک می‌سپاریم (برای انعطاف بیشتر)
                pass

            result, msg, new_vars = self.lang_module.process(command, self.context.get_all_vars())
            # به‌روزرسانی context با متغیرهای جدید
            for k, v in new_vars.items():
                self.context.set_var(k, v)

            return result, msg, self.context.get_all_vars()

        except Exception as e:
            # خطا رو با پیام‌های زبان‌پک مدیریت کن
            error_msg = ErrorHandler.get_message(
                self.lang_metadata,
                'runtime_error',
                error=str(e),
                command=command
            )
            return "ERROR", error_msg, self.context.get_all_vars()

    def run_block(self, lines: List[str], lang_name: Optional[str] = None) -> Tuple[str, str, Dict]:
        """اجرای یک بلاک کد (چند خطی) به صورت یکجا"""
        # ورود به scope جدید
        self.context.push_scope()

        outputs = []
        for line in lines:
            result, msg, _ = self.run(line, lang_name)
            outputs.append(f"{result}: {msg}")
            if result == "ERROR":
                # خروج از scope در صورت خطا
                self.context.pop_scope()
                return "ERROR", "\n".join(outputs), self.context.get_all_vars()

        # خروج از scope و بازگردوندن متغیرهای محلی به global
        scope_vars = self.context.pop_scope()
        for k, v in scope_vars.items():
            self.context.set_var(k, v)

        return "OK", "\n".join(outputs), self.context.get_all_vars()


# ============================================
# ZP API Server
# ============================================
app = Flask(__name__)
CORS(app)


class ZPLangServer:
    def __init__(self):
        self.zp = ZPLang()
        self._auto_select()

    def _auto_select(self):
        """انتخاب اولین زبان موجود"""
        if self.zp.lang_packs:
            first_key = next(iter(self.zp.lang_packs))
            self.zp.select_language(first_key)

    def execute_commands(self, commands: List[Dict]) -> List[Dict]:
        """اجرای لیستی از دستورات (پشتیبانی از بلاک‌ها)"""
        outputs = []
        # برای پشتیبانی از بلاک‌ها، خطوط رو جمع‌آوری می‌کنیم
        pending_block = []
        in_block = False
        block_marker = self.zp.block_marker

        for cmd_obj in commands:
            if isinstance(cmd_obj, dict):
                cmd = cmd_obj.get('command') or list(cmd_obj.values())[0] if cmd_obj else None
            else:
                cmd = str(cmd_obj)

            if not cmd:
                continue

            # تشخیص شروع بلاک (با کلمه‌ی کلیدی شرط یا حلقه)
            stripped = cmd.strip()
            if any(stripped.startswith(kw) for kw in self.zp.lang_metadata.get('block_keywords', [])):
                in_block = True

            if in_block:
                pending_block.append(cmd)
                # اگه به پایان بلاک رسیدیم
                if stripped.endswith(block_marker) or stripped == block_marker:
                    in_block = False
                    # اجرای کل بلاک
                    status, msg, vars = self.zp.run_block(pending_block)
                    outputs.append({
                        "command": "BLOCK:\n" + "\n".join(pending_block),
                        "status": status,
                        "output": msg,
                        "variables": vars
                    })
                    pending_block = []
            else:
                # اجرای خطی ساده
                result, msg, new_vars = self.zp.run(cmd)
                outputs.append({
                    "command": cmd,
                    "status": result,
                    "output": msg,
                    "variables": new_vars
                })

        # اگه بلاک باز مونده (ناقص)
        if pending_block:
            status, msg, vars = self.zp.run_block(pending_block)
            outputs.append({
                "command": "BLOCK:\n" + "\n".join(pending_block),
                "status": status,
                "output": msg,
                "variables": vars
            })

        return outputs


# ============================================
# Flask Routes
# ============================================
zp_server = ZPLangServer()


@app.route('/run', methods=['POST'])
def run_commands():
    data = request.get_json()
    if not data or 'commands' not in data:
        return jsonify({"error": "Missing 'commands' field"}), 400

    try:
        results = zp_server.execute_commands(data['commands'])
        return jsonify({
            "status": "success",
            "results": results,
            "final_variables": zp_server.zp.context.get_all_vars()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/reset', methods=['POST'])
def reset():
    try:
        zp_server.zp.context = ContextManager()
        return jsonify({"status": "success", "message": "Environment reset"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/languages', methods=['GET'])
def list_languages():
    languages = []
    for key, data in zp_server.zp.lang_packs.items():
        metadata = data['metadata']
        languages.append({
            "key": key,
            "name": metadata.get('name', key),
            "version": metadata.get('version', 'unknown'),
            "dependencies": metadata.get('dependencies', {})
        })
    return jsonify({"languages": languages})


@app.route('/reload', methods=['POST'])
def reload_languages():
    try:
        # پاک کردن کش
        for key in list(zp_server.zp.lang_packs.keys()):
            del zp_server.zp.lang_packs[key]
        importlib.invalidate_caches()
        zp_server.zp.load_languages()
        zp_server._auto_select()
        return jsonify({"status": "success", "languages": list(zp_server.zp.lang_packs.keys())})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/select', methods=['POST'])
def select_language():
    data = request.get_json()
    if not data or 'language' not in data:
        return jsonify({"error": "Missing 'language' field"}), 400

    try:
        success = zp_server.zp.select_language(data['language'])
        if success:
            return jsonify({
                "status": "success",
                "current_language": zp_server.zp.current_lang
            })
        else:
            return jsonify({
                "status": "error",
                "message": f"Language '{data['language']}' not available"
            }), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/dependencies', methods=['POST'])
def check_dependencies():
    data = request.get_json()
    if not data or 'language' not in data:
        return jsonify({"error": "Missing 'language' field"}), 400

    try:
        lang_name = data['language']
        if lang_name not in zp_server.zp.lang_packs:
            return jsonify({"error": f"Language '{lang_name}' not found"}), 404

        metadata = zp_server.zp.lang_packs[lang_name]['metadata']
        success, errors = zp_server.zp.validate_dependencies(metadata)
        return jsonify({
            "status": "success" if success else "error",
            "language": lang_name,
            "dependencies_met": success,
            "errors": errors
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================================
# Main
# ============================================
if __name__ == '__main__':
    if not zp_server.zp.lang_packs:
        print("❌ No language packs found. Create lang-zp-*.py files.")
        sys.exit(1)

    print("🚀 ZP-lang Core v0.0.04 Server starting...")
    print(f"📚 Available languages: {', '.join(zp_server.zp.lang_packs.keys())}")
    print(f"📍 Current language: {zp_server.zp.current_lang or 'None'}")
    print("📍 API Endpoints:")
    print("   POST /run           - Execute commands (supports blocks)")
    print("   POST /reset         - Reset variables")
    print("   GET  /languages     - List available languages")
    print("   POST /reload        - Reload language files")
    print("   POST /select        - Select a language")
    print("   POST /dependencies  - Check dependencies of a language")
    print("🌐 Server running on http://localhost:5000")

    app.run(host='0.0.0.0', port=5000, debug=False)

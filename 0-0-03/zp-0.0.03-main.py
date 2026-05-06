from flask import Flask, request, jsonify
from flask_cors import CORS
import importlib
import os
import sys

# ============================================
# ZPLang Class (Core)
# ============================================
class ZPLang:
    def __init__(self):
        self.langs = {}
        self.current_lang = None
        self.lang_module = None
        self.variables = {}
        self.load_languages()

    def load_languages(self):
        """Load all lang-zp-*.py files in the current directory"""
        for file in os.listdir('.'):
            if file.startswith('lang-zp-') and file.endswith('.py'):
                lang_key = file[8:-3]
                module_name = file[:-3]
                try:
                    module = importlib.import_module(module_name)
                    if hasattr(module, 'name'):
                        self.langs[lang_key] = module
                        print(f"✅ Language {module.name} loaded.")
                    else:
                        print(f"❌ Error loading {lang_key}: Module missing 'name' attribute")
                except Exception as e:
                    print(f"❌ Error loading {lang_key}: {e}")

    def select_language(self):
        """Show available languages and let user choose"""
        if not self.langs:
            print("❌ No languages found.")
            return False
        
        print("\n📚 Available languages:")
        lang_items = list(self.langs.items())
        for idx, (key, module) in enumerate(lang_items, 1):
            print(f"{idx}. {module.name}")
        
        # Auto-select first language (for API mode)
        first_key, first_module = lang_items[0]
        self.current_lang = first_key
        self.lang_module = first_module
        print(f"✅ Auto-selected: {first_module.name}")
        return True

    def run(self, command):
        """Execute a command in the selected language"""
        if not self.lang_module:
            print("❌ No language selected.")
            return "ERROR", "No language selected", self.variables
        
        result, msg, new_vars = self.lang_module.process(command, self.variables)
        self.variables = new_vars
        return result, msg, self.variables


# ============================================
# ZP API Server
# ============================================
app = Flask(__name__)
CORS(app)


class ZPLangServer:
    def __init__(self):
        self.zp = None
        self.setup_zp()

    def setup_zp(self):
        """Initialize the ZP core"""
        self.zp = ZPLang()
        if not self.zp.select_language():
            print("⚠️ No language selected.")
            if self.zp.langs:
                first_lang = list(self.zp.langs.keys())[0]
                self.zp.current_lang = first_lang
                self.zp.lang_module = self.zp.langs[first_lang]

    def execute_commands(self, commands):
        """Execute multiple commands in sequence"""
        outputs = []
        for cmd_obj in commands:
            if isinstance(cmd_obj, dict):
                cmd = cmd_obj.get('command') or list(cmd_obj.values())[0] if cmd_obj else None
            else:
                cmd = str(cmd_obj)
            
            if not cmd:
                continue
                
            result, msg, new_vars = self.zp.lang_module.process(cmd, self.zp.variables)
            self.zp.variables = new_vars
            
            outputs.append({
                "command": cmd,
                "status": result,
                "output": msg,
                "variables": self.zp.variables
            })
        
        return outputs


# Initialize the server
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
            "final_variables": zp_server.zp.variables
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/reset', methods=['POST'])
def reset():
    try:
        zp_server.zp.variables = {}
        return jsonify({"status": "success", "message": "Environment reset"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/languages', methods=['GET'])
def list_languages():
    languages = []
    for key, module in zp_server.zp.langs.items():
        languages.append({
            "key": key,
            "name": module.name,
            "version": getattr(module, 'version', 'unknown')
        })
    return jsonify({"languages": languages})


@app.route('/reload', methods=['POST'])
def reload_languages():
    try:
        zp_server.setup_zp()
        return jsonify({"status": "success", "languages": list(zp_server.zp.langs.keys())})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============================================
# Main
# ============================================
if __name__ == '__main__':
    if not zp_server.zp.langs:
        print("❌ No language files found. Create a lang-zp-*.py file first.")
        sys.exit(1)
    
    print("🚀 ZP API Server starting...")
    print(f"📚 Available languages: {', '.join([m.name for m in zp_server.zp.langs.values()])}")
    print("📍 API Endpoints:")
    print("   POST /run       - Execute commands")
    print("   POST /reset     - Reset variables")
    print("   GET  /languages - List available languages")
    print("   POST /reload    - Reload language files")
    print("🌐 Server running on http://localhost:5000")
    
    app.run(host='0.0.0.0', port=5000, debug=False)

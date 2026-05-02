import os
import importlib

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
                lang_key = file[8:-3]  # Remove 'lang-zp-' and '.py'
                module_name = file[:-3]
                try:
                    module = importlib.import_module(module_name)
                    # Check if module has name attribute
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
        
        choice = input(f"\n👉 Choose a language (1-{len(self.langs)}): ").strip()
        try:
            idx = int(choice) - 1
            lang_key, module = lang_items[idx]
            self.current_lang = lang_key
            self.lang_module = module
            
            # Initial test
            test_result, test_msg, _ = module.process("test", {})
            if test_result == "OK":
                print(f"✅ Language {module.name} is ready.")
                return True
            else:
                print(f"❌ Language {module.name} failed initial test: {test_msg}")
                return False
        except (ValueError, IndexError):
            print("❌ Invalid choice.")
            return False

    def run(self, command):
        """Execute a command in the selected language"""
        if not self.lang_module:
            print("❌ Please select a language first.")
            return
        
        result, msg, new_vars = self.lang_module.process(command, self.variables)
        self.variables = new_vars  # Update variables
        
        if result == "OK":
            print(msg)
        else:
            print(f"❌ {msg}")

# ============================================
if __name__ == "__main__":
    zp = ZPLang()
    if zp.select_language():
        print(f"\n🚀 Working with {zp.lang_module.name} (type 'exit' to quit):")
        while True:
            cmd = input("> ")
            if cmd.lower() == "exit":
                break
            zp.run(cmd)
    else:
        print("❌ No suitable language found.")

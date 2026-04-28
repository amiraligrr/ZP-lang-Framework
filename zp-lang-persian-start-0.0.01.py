class ZPLang:
    def __init__(self):
        self.variables = {}

    def run(self, command):
        command = command.strip()
        
        
        if command.startswith("بنویس"):
            rest = command[5:].strip()
            if rest.startswith("متغیر"):
                var_name = rest[5:].strip()
                if var_name in self.variables:
                    print(self.variables[var_name])
                else:
                    print(f"❌ متغیر '{var_name}' تعریف نشده")
            else:
                print(rest)
        
        
        elif command.startswith("متغیر"):
          
            rest = command[5:].strip()
            
        
            if "=" not in rest:
                print("❌ فرمت نامعتبر. باید شامل '=' باشه.")
                return
            
    
            parts = rest.split("=", 1)  
            var_name = parts[0].strip()
            var_value = parts[1].strip()
            
            if var_name and var_value:
                self.variables[var_name] = var_value
                print(f"✅ متغیر {var_name} = {var_value}")
            else:
                print("❌ اسم متغیر یا مقدار خالیه")
        
        else:
            print(f"❌ دستور ناشناخته: {command}")

# ============================================
zp = ZPLang()

print("🚀 ZP-lang (دستورات رو وارد کن، 'exit' برای خروج)")
while True:
    cmd = input("> ")
    if cmd.lower() == "exit":
        break
    zp.run(cmd)

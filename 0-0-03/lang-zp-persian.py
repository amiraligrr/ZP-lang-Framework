# lang-zp-persian.py

name = "فارسی"
version = "0.1"
author = "Amirali"

commands = {
    "بنویس": "print",
    "متغیر": "var",
    "اگر": "if",
}

def process(command, variables):
    """ورودی: دستور فارسی، خروجی: (نتیجه, پیغام, متغیرهای به‌روز شده)"""
    command = command.strip()
    
    # دستور تست (برای تست اولیه)
    if command == "test":
        return "OK", "✅ زبان با موفقیت ایمپورت شده", variables
    
    # دستور بنویس
    elif command.startswith("بنویس"):
        rest = command[5:].strip()
        if rest.startswith("متغیر"):
            var_name = rest[5:].strip()
            if var_name in variables:
                return "OK", str(variables[var_name]), variables
            else:
                return "ERROR", f"❌ متغیر '{var_name}' تعریف نشده", variables
        else:
            return "OK", rest, variables
    
    # دستور متغیر
    elif command.startswith("متغیر"):
        rest = command[5:].strip()
        if "=" not in rest:
            return "ERROR", "❌ فرمت نامعتبر. باید شامل '=' باشه.", variables
        
        parts = rest.split("=", 1)
        var_name = parts[0].strip()
        var_value = parts[1].strip()
        
        if var_name and var_value:
            variables[var_name] = var_value
            return "OK", f"✅ متغیر {var_name} = {var_value}", variables
        else:
            return "ERROR", "❌ اسم متغیر یا مقدار خالیه", variables
    
    else:
        return "ERROR", f"❌ دستور ناشناخته: {command}", variables

# lang-zp-persian.py

name = "فارسی"
version = "0.1.1"
author = "Amiraligrr"

# ============================================
# وضعیت داخلی زبان (برای هر نمونه جداگانه)
# ============================================
class PersianLang:
    def __init__(self):
        self.variables = {}
        self.repeat_mode = False
        self.repeat_count = 0
        self.repeat_body = []
        self.waiting_for_end = False
    
    def process(self, command):
        """پردازش دستور با حفظ وضعیت"""
        command = command.strip()
        
        # حالت انتظار برای پایان تکرار
        if self.waiting_for_end:
            if command == "پایان تکرار":
                # اجرای حلقه
                outputs = []
                for i in range(self.repeat_count):
                    for line in self.repeat_body:
                        result, msg = self.process(line)
                        if result == "ERROR":
                            self._reset_repeat()
                            return "ERROR", f"خطا در تکرار {i+1}: {msg}"
                        if msg:
                            outputs.append(msg)
                
                self._reset_repeat()
                combined = "\n".join(outputs) if outputs else "OK"
                return "OK", combined
            
            else:
                # جمع‌آوری بدنه
                self.repeat_body.append(command)
                return "EMPTY", ""
        
        # دستور تکرار
        if command.startswith("تکرار"):
            parts = command.split()
            if len(parts) < 2:
                return "ERROR", "❌ تعداد تکرار مشخص نشده"
            
            count_str = parts[1]
            
            # تعیین تعداد (عدد یا متغیر)
            if count_str in self.variables:
                try:
                    self.repeat_count = int(self.variables[count_str])
                except:
                    return "ERROR", f"❌ متغیر '{count_str}' عددی نیست"
            else:
                try:
                    self.repeat_count = int(count_str)
                except:
                    return "ERROR", f"❌ تعداد نامعتبر: {count_str}"
            
            # شروع حالت جمع‌آوری
            self.waiting_for_end = True
            self.repeat_body = []
            return "REPEAT_START", f"🔄 شروع تکرار {self.repeat_count} بار (دستورات را وارد کنید، سپس 'پایان تکرار')"
        
        # دستور بنویس
        elif command.startswith("بنویس"):
            rest = command[5:].strip()
            if rest.startswith("متغیر"):
                var_name = rest[5:].strip()
                if var_name in self.variables:
                    return "OK", str(self.variables[var_name])
                else:
                    return "ERROR", f"❌ متغیر '{var_name}' تعریف نشده"
            else:
                return "OK", rest
        
        # دستور متغیر
        elif command.startswith("متغیر"):
            rest = command[5:].strip()
            if "=" not in rest:
                return "ERROR", "❌ فرمت: متغیر نام = مقدار"
            
            parts = rest.split("=", 1)
            var_name = parts[0].strip()
            var_value = parts[1].strip()
            
            if var_name and var_value:
                self.variables[var_name] = var_value
                return "OK", f"✅ {var_name} = {var_value}"
            else:
                return "ERROR", "❌ اسم یا مقدار خالی"
        
        # دستور نمایش متغیرها
        elif command == "نمایش متغیرها":
            if not self.variables:
                return "OK", "📭 هیچ متغیری تعریف نشده"
            output = "\n".join([f"  {k} = {v}" for k, v in self.variables.items()])
            return "OK", f"📦 متغیرها:\n{output}"
        
        # دستور پاک کردن متغیرها
        elif command == "پاک کردن متغیرها":
            self.variables = {}
            return "OK", "✅ همه متغیرها پاک شدند"
        
        # دستور خروج از حلقه
        elif command == "خروج":
            return "EXIT", "خروج از برنامه"
        
        else:
            return "ERROR", f"❌ دستور ناشناخته: {command}"
    
    def _reset_repeat(self):
        """ریست وضعیت تکرار"""
        self.repeat_mode = False
        self.repeat_count = 0
        self.repeat_body = []
        self.waiting_for_end = False
    
    def get_state(self):
        """دریافت وضعیت فعلی (برای ذخیره/بازیابی)"""
        return {
            "variables": self.variables.copy(),
            "repeat_mode": self.repeat_mode,
            "repeat_count": self.repeat_count,
            "repeat_body": self.repeat_body.copy(),
            "waiting_for_end": self.waiting_for_end
        }
    
    def set_state(self, state):
        """تنظیم وضعیت (برای بازیابی)"""
        self.variables = state.get("variables", {}).copy()
        self.repeat_mode = state.get("repeat_mode", False)
        self.repeat_count = state.get("repeat_count", 0)
        self.repeat_body = state.get("repeat_body", []).copy()
        self.waiting_for_end = state.get("waiting_for_end", False)


# ============================================
# رابط ماژول (سازگار با سرور)
# ============================================
_lang_instance = None

def get_instance():
    """دریافت یا ایجاد نمونه زبان"""
    global _lang_instance
    if _lang_instance is None:
        _lang_instance = PersianLang()
    return _lang_instance

def process(command, variables=None):
    """
    پردازش دستور (سازگار با API سرور)
    
    Args:
        command: دستور ورودی
        variables: دیکشنری متغیرها (اختیاری)
    
    Returns:
        (status, message, variables)
    """
    instance = get_instance()
    
    # اگر متغیرها ارسال شده، آن‌ها را ست کن
    if variables is not None:
        instance.variables = variables.copy()
    
    # پردازش دستور
    status, message = instance.process(command)
    
    # برگرداندن متغیرها
    return status, message, instance.variables.copy()


# ============================================
# توابع اضافی برای مدیریت نمونه
# ============================================
def reset():
    """ریست کردن وضعیت زبان"""
    global _lang_instance
    _lang_instance = PersianLang()
    return "OK", "زبان ریست شد", {}

def get_full_state():
    """دریافت وضعیت کامل (برای چند کاربره)"""
    instance = get_instance()
    return {
        "status": "OK",
        "state": instance.get_state()
    }

def set_full_state(state):
    """تنظیم وضعیت کامل (برای چند کاربره)"""
    global _lang_instance
    instance = PersianLang()
    instance.set_state(state.get("state", {}))
    _lang_instance = instance
    return "OK", "وضعیت بازیابی شد", instance.variables

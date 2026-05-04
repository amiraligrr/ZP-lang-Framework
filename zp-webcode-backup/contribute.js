// app/contribute/page.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaHome, FaHandsHelping, FaInfoCircle, FaGithub, FaUsers, FaEnvelope, FaBug, FaCodeBranch, FaStar, FaGlobe, FaTelegram, FaLinkedin, FaCode } from 'react-icons/fa';

export default function ContributePage() {
  const pathname = usePathname();
  const [language, setLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);
  const [showLanguageTemplate, setShowLanguageTemplate] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { nameEn: 'Home', nameFa: 'خانه', href: '/', icon: FaHome },
    { nameEn: 'Contribute', nameFa: 'مشارکت', href: '/contribute', icon: FaHandsHelping },
    { nameEn: 'Developers', nameFa: 'توسعه‌دهندگان', href: '/developers', icon: FaUsers },
    { nameEn: 'About', nameFa: 'درباره', href: 'https://amiraligrr.ir', icon: FaInfoCircle },
    { nameEn: 'GitHub', nameFa: 'گیت‌هاب', href: 'https://github.com/amiraligrr/ZP-lang-Framework', icon: FaGithub, external: true },
  ];

  const content = {
    en: {
      title: 'Contribute to ZP',
      subtitle: 'Help us build the future of programming — in every language',
      waysTitle: 'How You Can Help',
      ways: [
        {
          icon: FaGithub,
          title: 'GitHub Issues',
          desc: 'Report bugs, suggest features, or discuss improvements',
          action: 'Open an Issue',
          link: 'https://github.com/amiraligrr/ZP-lang-Framework/issues',
          color: 'from-gray-600 to-gray-800',
        },
        {
          icon: FaCodeBranch,
          title: 'Pull Requests',
          desc: 'Fix bugs, add features, or improve documentation',
          action: 'Submit a PR',
          link: 'https://github.com/amiraligrr/ZP-lang-Framework/pulls',
          color: 'from-blue-600 to-blue-800',
        },
        {
          icon: FaEnvelope,
          title: 'Email',
          desc: 'Send your contribution or ideas directly via email',
          action: 'Send Email',
          link: 'mailto:amiralig13899@gmail.com?subject=ZP%20Contribution',
          color: 'from-green-600 to-green-800',
        },
      ],
      stepsTitle: 'How to Contribute via GitHub',
      steps: [
        { num: '01', title: 'Fork the Repository', desc: 'Create your own copy of ZP on GitHub' },
        { num: '02', title: 'Make Changes', desc: 'Fix bugs, add languages, or improve code' },
        { num: '03', title: 'Submit Pull Request', desc: 'Send your changes back to the main project' },
        { num: '04', title: 'Get Reviewed', desc: 'Maintainers will review and merge your contribution' },
      ],
      languageGuideTitle: '📖 How to Add a New Language',
      languageGuideDesc: 'Creating a new language for ZP is simple. Just follow this template and rules.',
      languageRules: [
        'File name must be: lang-zp-yourlanguagename.py',
        'Must contain name, version, author variables',
        'Must have a commands dictionary mapping your language keywords to Python equivalents',
        'Must have a process(command, variables) function that returns (status, message, updated_variables)',
        'Must respond to "test" command with "OK"',
      ],
      emailTitle: 'Send via Email',
      emailDesc: 'Not comfortable with GitHub? You can email your contribution directly.',
      emailBtn: 'Send Contribution via Email',
      contributeText: 'Your name will be added to the Developers page once your pull request is merged. Every contribution matters — from fixing a typo to building a full language pack.',
      footer: 'Built by Amirali, 16, from Iran 🇮🇷',
      quote: 'You learned to code in English. We learned to code in freedom.',
      viewTemplate: '📄 View Persian Language Template',
      hideTemplate: 'Hide Template',
    },
    fa: {
      title: 'مشارکت در ZP',
      subtitle: 'به ما کمک کن آینده برنامه‌نویسی را بسازیم — به هر زبانی',
      waysTitle: 'چطور می‌توانی کمک کنی؟',
      ways: [
        {
          icon: FaGithub,
          title: 'گزارش Issues در گیت‌هاب',
          desc: 'باگ گزارش کن، ویژگی پیشنهاد بده، یا بحث کن',
          action: 'ثبت Issue',
          link: 'https://github.com/amiraligrr/ZP-lang-Framework/issues',
          color: 'from-gray-600 to-gray-800',
        },
        {
          icon: FaCodeBranch,
          title: 'Pull Request',
          desc: 'باگ رو رفع کن، ویژگی اضافه کن، یا مستندات رو بهبود بده',
          action: 'ثبت PR',
          link: 'https://github.com/amiraligrr/ZP-lang-Framework/pulls',
          color: 'from-blue-600 to-blue-800',
        },
        {
          icon: FaEnvelope,
          title: 'ایمیل',
          desc: 'مشارکت یا ایده‌های خود را مستقیم ایمیل کن',
          action: 'ارسال ایمیل',
          link: 'mailto:amiralig13899@gmail.com?subject=ZP%20Contribution',
          color: 'from-green-600 to-green-800',
        },
      ],
      stepsTitle: 'راهنمای مشارکت از طریق گیت‌هاب',
      steps: [
        { num: '۰۱', title: 'انشاخ (Fork) مخزن', desc: 'یک کپی از ZP در گیت‌هاب خودت بساز' },
        { num: '۰۲', title: 'اعمال تغییرات', desc: 'باگ را رفع کن، زبان اضافه کن، یا کد رو بهبود بده' },
        { num: '۰۳', title: 'ثبت Pull Request', desc: 'تغییرات را به پروژه اصلی بفرست' },
        { num: '۰۴', title: 'بررسی و تأیید', desc: 'توسعه‌دهندگان اصلی تغییرات را بررسی و ادغام می‌کنند' },
      ],
      languageGuideTitle: '📖 آموزش ساخت زبان جدید',
      languageGuideDesc: 'ساخت زبان جدید برای ZP خیلی ساده است. فقط کافیه این قالب و قوانین رو دنبال کنی.',
      languageRules: [
        'اسم فایل باید به این صورت باشه: lang-zp-اسم‌زبان‌تو.py',
        'باید سه متغیر name, version, author رو داشته باشه',
        'باید دیکشنری commands داشته باشه که کلیدواژه‌های زبان تو رو به پایتون نگاشت کنه',
        'باید تابع process(command, variables) رو داشته باشه که (status, message, updated_variables) برگردونه',
        'باید به دستور "test" پاسخ "OK" بده',
      ],
      emailTitle: 'ارسال از طریق ایمیل',
      emailDesc: 'با گیت‌هاب راحت نیستی؟ می‌توانی مشارکت خود را مستقیم ایمیل کنی.',
      emailBtn: 'ارسال مشارکت از طریق ایمیل',
      contributeText: 'اسم تو بعد از تأیید Pull Request در صفحه توسعه‌دهندگان قرار می‌گیرد. هر مشارکتی مهم است — از رفع یک تایپو تا ساخت یک بسته زبانی کامل.',
      footer: 'ساخته شده توسط امیرعلی، ۱۶ ساله، از ایران 🇮🇷',
      quote: 'شما برای کدنویسی انگلیسی یاد گرفتید. ما برای آزادی کدنویسی یاد گرفتیم.',
      viewTemplate: '📄 مشاهده قالب زبان فارسی',
      hideTemplate: 'بستن قالب',
    },
  };

  const t = content[language];

  const persianTemplate = `# lang-zp-persian.py

name = "فارسی"
version = "0.1"
author = "Your Name"

commands = {
    "بنویس": "print",
    "متغیر": "var",
    "اگر": "if",
}

def process(command, variables):
    command = command.strip()
    
    # Test command (required)
    if command == "test":
        return "OK", "Language loaded successfully", variables
    
    # Your commands here
    elif command.startswith("بنویس"):
        rest = command[5:].strip()
        if rest.startswith("متغیر"):
            var_name = rest[5:].strip()
            if var_name in variables:
                return "OK", str(variables[var_name]), variables
            else:
                return "ERROR", f"Variable '{var_name}' not defined", variables
        else:
            return "OK", rest, variables
    
    elif command.startswith("متغیر"):
        rest = command[5:].strip()
        if "=" not in rest:
            return "ERROR", "Invalid format. Must include '='.", variables
        
        parts = rest.split("=", 1)
        var_name = parts[0].strip()
        var_value = parts[1].strip()
        
        if var_name and var_value:
            variables[var_name] = var_value
            return "OK", f"Variable {var_name} = {var_value}", variables
        else:
            return "ERROR", "Variable name or value is empty", variables
    
    else:
        return "ERROR", f"Unknown command: {command}", variables`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
            language === 'en' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('fa')}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
            language === 'fa' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          FA
        </button>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 py-4 px-2 flex flex-col gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !item.external && pathname === item.href;
              return item.external ? (
                <a key={item.nameEn} href={item.href} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center w-12 h-12 rounded-xl hover:bg-white/15">
                  <Icon className="text-2xl text-gray-300 group-hover:text-white" />
                  <span className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap bg-gray-900 text-white text-sm px-2 py-1 rounded">
                    {language === 'en' ? item.nameEn : item.nameFa}
                  </span>
                </a>
              ) : (
                <Link key={item.nameEn} href={item.href} className={`group relative flex items-center justify-center w-12 h-12 rounded-xl hover:bg-white/15 ${pathname === item.href ? 'bg-white/20' : ''}`}>
                  <Icon className={`text-2xl ${pathname === item.href ? 'text-purple-400' : 'text-gray-300 group-hover:text-white'}`} />
                  <span className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap bg-gray-900 text-white text-sm px-2 py-1 rounded">
                    {language === 'en' ? item.nameEn : item.nameFa}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${isMobile ? 'pb-28' : ''} pt-16 px-4`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Ways to Contribute */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {t.ways.map((way, idx) => {
              const Icon = way.icon;
              return (
                <motion.a
                  key={idx}
                  href={way.link}
                  target={way.link.startsWith('http') ? '_blank' : undefined}
                  rel={way.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`backdrop-blur-xl bg-gradient-to-br ${way.color} rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all cursor-pointer group`}
                >
                  <Icon className="text-4xl text-white mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-xl font-semibold mb-2">{way.title}</h3>
                  <p className="text-gray-200 text-sm mb-4">{way.desc}</p>
                  <span className="text-purple-300 text-sm group-hover:text-white transition-colors">
                    {way.action} →
                  </span>
                </motion.a>
              );
            })}
          </div>

          {/* Language Guide Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaCode className="text-3xl text-purple-400" />
              <h2 className="text-2xl font-bold">{t.languageGuideTitle}</h2>
            </div>
            <p className="text-gray-300 mb-6">{t.languageGuideDesc}</p>
            
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3 text-purple-300">
                {language === 'en' ? '📋 Rules (must follow):' : '📋 قوانین (الزامی):'}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                {t.languageRules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowLanguageTemplate(!showLanguageTemplate)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
            >
              <FaCode />
              <span>{showLanguageTemplate ? t.hideTemplate : t.viewTemplate}</span>
            </button>

            {showLanguageTemplate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-900 rounded-lg p-4 overflow-x-auto"
              >
                <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
                  {persianTemplate}
                </pre>
              </motion.div>
            )}
          </motion.div>

          {/* GitHub Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">{t.stepsTitle}</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {t.steps.map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-bold text-purple-500 mb-2">{step.num}</div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Email Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-white/10 text-center mb-8"
          >
            <FaEnvelope className="text-4xl text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">{t.emailTitle}</h2>
            <p className="text-gray-300 mb-4">{t.emailDesc}</p>
            <a href="mailto:amiralig13899@gmail.com?subject=ZP%20Contribution">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold"
              >
                {t.emailBtn} ✉️
              </motion.button>
            </a>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-gray-400 text-sm bg-black/30 rounded-lg p-4"
          >
            {t.contributeText}
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 pb-2">
          <div className="backdrop-blur-xl bg-white/10 border-t border-white/20 pt-2 pb-3">
            <div className="flex items-center justify-around max-w-md mx-auto px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = !item.external && pathname === item.href;
                return item.external ? (
                  <a key={item.nameEn} href={item.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center py-1 px-2">
                    <Icon className="text-xl text-gray-400" />
                    <span className="text-[9px] mt-0.5 text-gray-500">{language === 'en' ? item.nameEn : item.nameFa}</span>
                  </a>
                ) : (
                  <Link key={item.nameEn} href={item.href} className={`flex flex-col items-center py-1 px-2 ${isActive ? 'bg-white/15 rounded-lg' : ''}`}>
                    <Icon className={`text-xl ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />
                    <span className={`text-[9px] mt-0.5 ${isActive ? 'text-purple-400' : 'text-gray-500'}`}>
                      {language === 'en' ? item.nameEn : item.nameFa}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`py-12 text-center border-t border-white/10 ${isMobile ? 'mb-16' : ''}`}>
        <p className="text-gray-500 text-sm">{t.footer}</p>
        <p className="text-gray-600 text-xs mt-1">{t.quote}</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://github.com/amiraligrr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <FaGithub size={16} />
          </a>
          <a href="https://t.me/amiralig89" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <FaTelegram size={16} />
          </a>
          <a href="https://www.linkedin.com/in/amirali-granmayeh-775878398/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <FaLinkedin size={16} />
          </a>
          <a href="mailto:amiralig13899@gmail.com" className="text-gray-400 hover:text-white transition-colors">
            <FaEnvelope size={16} />
          </a>
        </div>
      </footer>
    </div>
  );
}

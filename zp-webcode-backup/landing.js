// app/page.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { FaHome, FaHandsHelping, FaInfoCircle, FaGithub, FaUsers, FaExternalLinkAlt } from 'react-icons/fa';

export default function Home() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [language, setLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const navItems = [
    { nameEn: 'Home', nameFa: 'خانه', href: '/', icon: FaHome },
    { nameEn: 'Contribute', nameFa: 'مشارکت', href: '/contribute', icon: FaHandsHelping },
    { nameEn: 'Developers', nameFa: 'توسعه‌دهندگان', href: '/developers', icon: FaUsers },
    { nameEn: 'About', nameFa: 'درباره', href: '/about', icon: FaInfoCircle },
    { nameEn: 'GitHub', nameFa: 'گیت‌هاب', href: 'https://github.com/amiraligrr/ZP-lang-Framework', icon: FaGithub, external: true },
  ];

  const content = {
    en: {
      badge: 'Under active development — v0.0.02',
      title: 'ZP',
      subtitle: 'Framework for building programming languages',
      description: 'in your mother tongue',
      cta: 'Try Demo',
      contribute: 'Contribute',
      developers: 'Developers',
      about: 'About',
      whatIsTitle: 'What is ZP?',
      whatIsDesc: 'ZP (Zereshk Polo) is a framework that lets anyone create a custom programming language using their own native language keywords. Write code in your language — ZP translates it to Python and runs it. No English required. No compiler experience needed. It is a language building framework, nothing else.',
      currentStatus: 'Current Status',
      currentStatusDesc: 'Two demo languages ready: Persian (فارسی) and English. Drop any lang-zp-*.py file in the folder and it becomes selectable. Test both languages right now in the terminal version.',
      howItWorksTitle: 'How It Works',
      steps: [
        { icon: '📝', title: 'Define Language', desc: 'Create lang-zp-yourlang.py with keywords' },
        { icon: '💻', title: 'Write Code', desc: 'Code in your native language' },
        { icon: '🚀', title: 'Translate & Run', desc: 'ZP translates to Python and executes' },
      ],
      whyNameTitle: 'Why "Zereshk Polo"?',
      whyNameDesc: 'Zereshk Polo is a traditional Persian dish. Like familiar food, a programming language should feel accessible. The name keeps things human and friendly.',
      visionTitle: 'What We Are Building',
      visionItems: [
        { icon: '💻', text: 'Terminal-based framework — works now' },
        { icon: '🌐', text: 'Web-based IDE — write and run in browser' },
        { icon: '📦', text: 'Language Store — share and install languages' },
        { icon: '📱', text: 'Native apps for desktop and mobile' },
        { icon: '📖', text: 'Documentation in every language' },
        { icon: '🔧', text: 'Full IDE with autocomplete and debugging' },
      ],
      futureTitle: 'Coming Soon',
      futureDesc: 'The framework is functional now. Within a year, we will have a complete development environment with IDE support for Windows, Linux, macOS, and mobile. Code in your mother tongue anywhere.',
      needHelp: 'We Need You',
      needHelpDesc: 'ZP grows with community contributions.',
      developerInfo: 'How to Join Developer Team',
      developerInfoDesc: 'Your name appears on the Developers page with your join date when you contribute code — fix a bug, improve performance, add a feature, or create a new language. Pull requests and code contributions only. Documentation help is valued and credited separately.',
      exampleTitle: 'Example',
      joinTitle: 'Become a Contributor',
      joinDesc: 'Fix a bug. Add a language. Improve the framework. Your name goes on the Developers page.',
      footer: 'Built by Amirali, 16, from Iran 🇮🇷',
      quote: 'You learned to code in English. We learned to code in freedom.',
      bottomCta: 'Build the future of programming — with your own language',
    },
    fa: {
      badge: 'در حال توسعه — نسخه ۰.۰.۰۲',
      title: 'ZP',
      subtitle: 'فریمورک ساخت زبان برنامه‌نویسی',
      description: 'به زبان مادری خودت',
      cta: 'نسخه آزمایشی',
      contribute: 'مشارکت',
      developers: 'توسعه‌دهندگان',
      about: 'درباره',
      whatIsTitle: 'ZP چیست؟',
      whatIsDesc: 'ZP (زرشک پلو) فریمورکی است که به هر کسی اجازه می‌دهد زبان برنامه‌نویسی خودش را با کلیدواژه‌های زبان مادری خودش بسازد. کد را به زبان خودت می‌نویسی — ZP به پایتون ترجمه و اجرا می‌کند. نیازی به انگلیسی نیست. نیازی به تجربه کامپایلر نیست. این یک فریمورک ساخت زبان است، نه چیز دیگر.',
      currentStatus: 'وضعیت فعلی',
      currentStatusDesc: 'دو زبان دمو آماده است: فارسی و انگلیسی. هر فایل lang-zp-*.py را در پوشه بگذاری، قابل انتخاب می‌شود. همین الان می‌توانی هر دو زبان را در نسخه ترمینال تست کنی.',
      howItWorksTitle: 'طرز کار',
      steps: [
        { icon: '📝', title: 'تعریف زبان', desc: 'فایل lang-zp-yourlang.py را با کلیدواژه‌ها بساز' },
        { icon: '💻', title: 'کد بنویس', desc: 'به زبان مادری خودت کد بزن' },
        { icon: '🚀', title: 'ترجمه و اجرا', desc: 'ZP به پایتون ترجمه و اجرا می‌کند' },
      ],
      whyNameTitle: 'چرا «زرشک پلو»؟',
      whyNameDesc: 'زرشک پلو غذای سنتی ایرانی است. مثل یک غذای آشنا، زبان برنامه‌نویسی باید در دسترس باشد. اسم پروژه را دوستانه و انسانی نگه می‌دارد.',
      visionTitle: 'چه می‌سازیم',
      visionItems: [
        { icon: '💻', text: 'نسخه ترمینال — در حال کار است' },
        { icon: '🌐', text: 'ویرایشگر تحت وب — کدنویسی در مرورگر' },
        { icon: '📦', text: 'فروشگاه زبان — اشتراک و نصب زبان‌ها' },
        { icon: '📱', text: 'اپلیکیشن بومی برای دسکتاپ و موبایل' },
        { icon: '📖', text: 'مستندات به هر زبانی' },
        { icon: '🔧', text: 'IDE کامل با اتوکامپلیت و دیباگ' },
      ],
      futureTitle: 'در راه است',
      futureDesc: 'فریمورک همین الان کار می‌کند. ظرف یک سال، یک محیط توسعه کامل با پشتیبانی IDE برای ویندوز، لینوکس، مک و موبایل خواهیم داشت. به زبان مادری خودت، هر جا که هستی کد بزن.',
      needHelp: 'به تو نیاز داریم',
      needHelpDesc: 'ZP با مشارکت جامعه رشد می‌کند.',
      developerInfo: 'چطور به تیم توسعه‌دهندگان بپیوندی',
      developerInfoDesc: 'اسم تو با تاریخ پیوستن در صفحه توسعه‌دهندگان قرار می‌گیرد وقتی کدی بنویسی — یک باگ را رفع کنی، عملکرد را بهبود بدهی، یک ویژگی اضافه کنی، یا یک زبان جدید بسازی. فقط مشارکت کد محور. کمک به مستندات جداگانه ارزش‌گذاری می‌شود.',
      exampleTitle: 'مثال',
      joinTitle: 'مشارکت کن',
      joinDesc: 'یک باگ را رفع کن. یک زبان اضافه کن. فریمورک را بهبود بده. اسم تو در صفحه توسعه‌دهندگان می‌آید.',
      footer: 'ساخته شده توسط امیرعلی، ۱۶ ساله، از ایران 🇮🇷',
      quote: 'شما برای کدنویسی انگلیسی یاد گرفتید. ما برای آزادی کدنویسی یاد گرفتیم.',
      bottomCta: 'آینده برنامه‌نویسی را با زبان خودت بساز',
    },
  };

  const t = content[language];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.08), transparent 50%)`,
        }} />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              animate={{
                y: [null, -50, -100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Language Switcher - Top Right */}
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

      {/* Vertical Navigation Bar - Desktop */}
      {!isMobile && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl py-4 px-2 flex flex-col gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return item.external ? (
                <a
                  key={item.nameEn}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/15"
                >
                  <Icon className="text-2xl text-gray-300 group-hover:text-white transition-colors" />
                  <span className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap bg-gray-900 text-white text-sm px-2 py-1 rounded">
                    {language === 'en' ? item.nameEn : item.nameFa}
                  </span>
                </a>
              ) : (
                <Link
                  key={item.nameEn}
                  href={item.href}
                  className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                    pathname === item.href ? 'bg-white/20' : 'hover:bg-white/15'
                  }`}
                >
                  <Icon className={`text-2xl transition-colors ${pathname === item.href ? 'text-purple-400' : 'text-gray-300 group-hover:text-white'}`} />
                  <span className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap bg-gray-900 text-white text-sm px-2 py-1 rounded">
                    {language === 'en' ? item.nameEn : item.nameFa}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content with padding for mobile nav */}
      <div className={`${isMobile ? 'pb-28' : ''}`}>
        {/* Hero Section */}
        <motion.section
          style={{ opacity, scale }}
          className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="px-4 py-2 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-sm font-mono">
              {t.badge}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-7xl md:text-8xl lg:text-9xl font-black text-center tracking-tighter"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
              {t.title}
            </span>
            <span className="text-white">-lang</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mt-6 text-center max-w-2xl"
          >
            {t.subtitle}
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.description}
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 flex items-center gap-2 text-gray-500 text-sm"
          >
            <span className="text-2xl">🍛</span>
            <span>Zereshk Polo Framework</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-12 justify-center w-full max-w-md mx-auto"
          >
            <Link href="/demo" className="flex-1 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/25"
              >
                🚀 {t.cta}
              </motion.button>
            </Link>
            
            <Link href="/contribute" className="flex-1 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
              >
                🤝 {t.contribute}
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-purple-500 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* What is ZP? Section */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🍛</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {t.whatIsTitle}
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {t.whatIsDesc}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Need Help Section */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 md:p-8 border border-purple-500/30"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🤝</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {t.needHelp}
                </h2>
                <p className="text-gray-200 leading-relaxed mb-6">
                  {t.needHelpDesc}
                </p>
                <div className="bg-black/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-300">{t.developerInfo}</h3>
                  <p className="text-gray-300 mb-4">
                    {t.developerInfoDesc}
                  </p>
                  <div className="flex flex-col items-center gap-2 text-gray-300 text-sm">
                    <div className="flex items-center gap-2">🐛 → Fix a bug</div>
                    <div className="flex items-center gap-2">⚡ → Improve performance</div>
                    <div className="flex items-center gap-2">✨ → Add a feature</div>
                    <div className="flex items-center gap-2">🌍 → Create a language pack</div>
                  </div>
                </div>
                <Link href="/contribute">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/25"
                  >
                    {language === 'en' ? 'Contribution Guide →' : 'راهنمای مشارکت ←'}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.howItWorksTitle}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {t.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all text-center"
                >
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Are Building */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t.visionTitle}</h2>
              <div className="space-y-3">
                {t.visionItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-300 text-sm md:text-base">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">{t.futureTitle}</h2>
              <p className="text-gray-300 leading-relaxed text-center">
                {t.futureDesc}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Name Section */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">{t.whyNameTitle}</h2>
              <p className="text-gray-300 leading-relaxed text-center">
                {t.whyNameDesc}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Code Example */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-500 ml-2">example.zp</span>
                <span className="text-xs text-gray-600 ml-auto">{t.exampleTitle}</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-blue-400 font-mono text-sm mb-4">// Your Code (Persian)</p>
                  <pre className="text-green-400 font-mono text-sm space-y-2">
                    <code>{`بنویس "سلام دنیا"`}</code>
                    <br />
                    <code className="text-yellow-400">{`متغیر name = "Amirali"`}</code>
                    <br />
                    <code className="text-green-400">{`بنویس متغیر name`}</code>
                  </pre>
                </div>
                <div>
                  <p className="text-blue-400 font-mono text-sm mb-4">// Generated Python Code</p>
                  <pre className="text-green-400 font-mono text-sm space-y-2">
                    <code>{`print("سلام دنیا")`}</code>
                    <br />
                    <code className="text-yellow-400">{`name = "Amirali"`}</code>
                    <br />
                    <code className="text-green-400">{`print(name)`}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-white/10"
            >
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-2">{t.joinTitle}</h3>
              <p className="text-gray-400 mb-6">{t.joinDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contribute">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold"
                  >
                    {language === 'en' ? 'Contribute Now →' : 'همین حالا مشارکت کن ←'}
                  </motion.button>
                </Link>
                <a href="https://github.com/amiraligrr/ZP-lang-Framework" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all"
                  >
                    ⭐ GitHub
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation Bar - Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 pb-2">
          <div className="backdrop-blur-xl bg-white/10 border-t border-white/20 pt-2 pb-3">
            <div className="flex items-center justify-around max-w-md mx-auto px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = !item.external && pathname === item.href;
                return item.external ? (
                  <a
                    key={item.nameEn}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center py-1 px-2 rounded-xl transition-all duration-300"
                  >
                    <Icon className="text-xl text-gray-400" />
                    <span className="text-[9px] mt-0.5 text-gray-500">{language === 'en' ? item.nameEn : item.nameFa}</span>
                  </a>
                ) : (
                  <Link
                    key={item.nameEn}
                    href={item.href}
                    className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all duration-300 ${
                      isActive ? 'bg-white/15' : ''
                    }`}
                  >
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
      <footer className={`relative z-10 py-16 px-4 text-center border-t border-white/10 ${isMobile ? 'mb-16' : ''}`}>
        <div className="max-w-2xl mx-auto">
          <p className="text-base md:text-lg text-purple-300 mb-4 font-medium">{t.bottomCta}</p>
          <p className="text-gray-400 text-sm mb-2">{t.footer}</p>
          <p className="text-gray-500 text-xs">{t.quote}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a href="https://github.com/amiraligrr/ZP-lang-Framework" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-1">
              GitHub <FaExternalLinkAlt className="text-[10px]" />
            </a>
            <a href="https://amiraligrr.ir" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-1">
              {language === 'en' ? 'Website' : 'وب‌سایت'} <FaExternalLinkAlt className="text-[10px]" />
            </a>
            <Link href="/contribute" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              {t.contribute}
            </Link>
            <Link href="/developers" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              {t.developers}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// app/developers/page.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaHome, FaHandsHelping, FaInfoCircle, FaGithub, FaUsers, FaCalendarAlt } from 'react-icons/fa';

export default function DevelopersPage() {
  const pathname = usePathname();
  const [language, setLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);

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

  const developers = [
    {
      username: 'amiraligrr',
      name: 'Amirali',
      avatar: 'https://github.com/amiraligrr.png',
      bioEn: 'Creator of ZP-lang-Framework. 16-year-old developer from Iran.',
      bioFa: 'سازنده ZP-lang-Framework. توسعه‌دهنده ۱۶ ساله از ایران.',
      joinDate: 'April 2026',
      roleEn: 'Creator & Lead Developer',
      roleFa: 'بنیان‌گذار و توسعه‌دهنده اصلی',
    },
  ];

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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {language === 'en' ? 'Developers' : 'توسعه‌دهندگان'}
            </h1>
            <p className="text-gray-400 mt-4">
              {language === 'en' ? 'Code contributors to ZP-lang-Framework' : 'مشارکت‌کنندگان کد در ZP-lang-Framework'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((dev, index) => (
              <Link href={`/developers/${dev.username}`} key={dev.username}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <img src={dev.avatar} alt={dev.name} className="w-16 h-16 rounded-full border-2 border-purple-500" />
                    <div>
                      <h2 className="text-xl font-semibold">{dev.name}</h2>
                      <p className="text-purple-400 text-sm">{language === 'en' ? dev.roleEn : dev.roleFa}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <FaGithub className="text-sm" />
                        <span>@{dev.username}</span>
                        <FaCalendarAlt className="text-sm ml-2" />
                        <span>{dev.joinDate}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">
                        {language === 'en' ? dev.bioEn : dev.bioFa}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
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
        <p className="text-gray-500 text-sm">Built by Amirali, 16, from Iran 🇮🇷</p>
        <p className="text-gray-600 text-xs mt-1">You learned to code in English. We learned to code in freedom.</p>
      </footer>
    </div>
  );
}

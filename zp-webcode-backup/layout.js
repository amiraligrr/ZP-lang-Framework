// app/layout.js
import './globals.css';

export const metadata = {
  title: 'ZP-lang Framework | فریم ورک زرشک پلو',
  description: 'فریمورکی برای ساخت زبان برنامه‌نویسی خودت به زبان مادری‌ات. هیچ نیازی به انگلیسی نیست. هیچ تجربه کامپایلری لازم نیست.',
  keywords: 'زبان برنامه‌نویسی, فریمورک, کامپایلر, پایتون, فارسی, برنامه‌نویسی, آموزش برنامه‌نویسی, ساخت زبان, مترجم, آزادی برنامه‌نویسی,زبان برنامه نویسی ایرانی',
  authors: [{ name: 'امیرعلی' }],
  creator: 'امیرعلی',
  openGraph: {
    title: 'ZP-lang Framework | ساخت زبان برنامه‌نویسی به زبان مادری',
    description: 'فریمورکی برای ساخت زبان برنامه‌نویسی خودت به زبان مادری‌ات',
    url: 'https://zp.amiraligrr.ir',
    siteName: 'ZP-lang Framework',
    images: [
      {
        url: 'https://zp.amiraligrr.ir/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://zp.amiraligrr.ir',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="ltr">
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}

// app/developers/[username]/page.js
import Link from 'next/link';
import { FaGithub, FaCalendarAlt, FaCode, FaGlobe, FaLinkedin, FaTelegram, FaTrophy } from 'react-icons/fa';
import { notFound } from 'next/navigation';

// اطلاعات دستی (برای مواردی که از گیت‌هاب نمیاد)
const localData = {
  'amiraligrr': {
    roleEn: 'Creator & Lead Developer',
    roleFa: 'بنیان‌گذار و توسعه‌دهنده اصلی',
    achievementsEn: '🏆 RoboCup Iran 2025 Champion | 🥇 Super Team Winner',
    achievementsFa: '🏆 قهرمان روبوکاپ ایران ۲۰۲۵ | 🥇 برنده سوپر تیم',
    joinDate: 'April 2026',
    contributionsEn: 'Core framework, Persian/English language packs, Website, Documentation',
    contributionsFa: 'فریمورک اصلی، بسته‌های زبان فارسی/انگلیسی، وب‌سایت، مستندات',
    github: 'https://github.com/amiraligrr',
    website: 'https://amiraligrr.ir',
    linkedin: 'https://www.linkedin.com/in/amirali-granmayeh-775878398/',
    telegram: 'https://t.me/amiralig89',
    location: 'Iran',
    skills: ['Python', 'JavaScript', 'React', 'Next.js', 'C++', 'Arduino', 'Linux'],
  },
};

// تعیین مسیرهایی که باید در build ساخته بشن
export async function generateStaticParams() {
  return [
    { username: 'amiraligrr' },
  ];
}

// گرفتن اطلاعات از گیت‌هاب
async function getDeveloperFromGitHub(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 } // هر 1 ساعت کش بشه
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    return {
      username: data.login,
      name: data.name || data.login,
      fullName: data.name || data.login,
      avatar: data.avatar_url,
      bio: data.bio || 'No bio available',
      githubUrl: data.html_url,
      followers: data.followers,
      following: data.following,
      publicRepos: data.public_repos,
      createdAt: data.created_at,
      location: data.location,
    };
  } catch (error) {
    console.error('GitHub API error:', error);
    return null;
  }
}

export default async function DeveloperPage({ params }) {
  const { username } = await params;
  
  // گرفتن اطلاعات از گیت‌هاب
  const githubData = await getDeveloperFromGitHub(username);
  const local = localData[username];
  
  if (!githubData && !local) {
    notFound();
  }
  
  // ترکیب اطلاعات گیت‌هاب با اطلاعات دستی
  const dev = {
    ...githubData,
    ...local,
    name: githubData?.name || local?.name || username,
    fullName: githubData?.name || local?.fullName || username,
    avatar: githubData?.avatar || 'https://github.com/github.png',
    bio: githubData?.bio || local?.bioEn || 'Contributor to ZP-lang-Framework',
  };
  
  const joinDate = dev.createdAt 
    ? new Date(dev.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : dev.joinDate || 'Unknown';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/developers" className="text-purple-400 hover:underline inline-block mb-8">
          ← Back to Developers
        </Link>
        
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-purple-600 to-pink-600">
            <img src={dev.avatar} alt={dev.name} className="absolute -bottom-12 left-8 w-32 h-32 rounded-full border-4 border-white shadow-xl" />
          </div>
          
          <div className="pt-16 pb-8 px-8">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold">{dev.fullName}</h1>
                <p className="text-purple-400">{dev.roleEn || 'Contributor'}</p>
              </div>
              <div className="flex gap-2">
                <a href={dev.githubUrl || dev.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                  <FaGithub size={20} />
                </a>
                {dev.linkedin && (
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                    <FaLinkedin size={20} />
                  </a>
                )}
                {dev.telegram && (
                  <a href={dev.telegram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                    <FaTelegram size={20} />
                  </a>
                )}
                {dev.website && (
                  <a href={dev.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                    <FaGlobe size={20} />
                  </a>
                )}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-black/30 rounded-lg">
              <p className="text-gray-300">{dev.bio}</p>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-yellow-500 text-sm">
              <FaTrophy /> <span>{dev.achievementsEn || 'Open Source Contributor'}</span>
            </div>
            
            <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-purple-400" /> Joined GitHub: {joinDate}
              </div>
              <div className="flex items-center gap-2">
                <FaCode className="text-purple-400" /> Contributions: {dev.contributionsEn || 'Code contributions to ZP'}
              </div>
              {dev.location && (
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-purple-400" /> Location: {dev.location}
                </div>
              )}
              {dev.publicRepos && (
                <div className="flex items-center gap-2">
                  📦 Public Repos: {dev.publicRepos}
                </div>
              )}
            </div>

            {/* Skills Section */}
            {dev.skills && dev.skills.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  🛠️ Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dev.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {typeof skill === 'string' ? skill : skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Bell, Crown, Image as ImageIcon, Star, BarChart2, Settings, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#e6e9f0] via-[#eef1f5] to-[#e6e9f0] text-gray-900 font-sans overflow-hidden pb-32">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/60 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-100/40 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-20%] w-[40%] h-[40%] bg-purple-100/30 blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex justify-between items-center px-6 pt-12 pb-4"
      >
        <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Profil</h1>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.06)] border border-white/50"
        >
          <Bell size={20} className="text-gray-700" />
        </motion.button>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-5 mt-8"
      >
        {/* User Card */}
        <motion.div variants={itemVariants} className="relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] pt-16 pb-5 px-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] mb-6">
          
          {/* Profile Image - Absolute positioned to overlap top edge */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 20, delay: 0.1 }}
              className="w-24 h-24 rounded-full p-1 bg-gradient-to-b from-blue-200/60 to-transparent backdrop-blur-md shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-4 border-white/80" 
              />
            </motion.div>
          </div>

          {/* Name & Premium Badge */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-[22px] leading-tight font-bold text-gray-900">Duygu Özarslan</h2>
              <p className="text-[13px] text-gray-500 font-medium mt-0.5">@elmasekeri</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-[#1c1c1e] text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Crown size={14} className="text-white" fill="white" />
              Premium
            </motion.div>
          </div>

          {/* Stats */}
          <div className="flex justify-between gap-3 mb-6">
            <StatBox number="4" label="Gönderi" />
            <StatBox number="22" label="Takipçi" />
            <StatBox number="15" label="Takip" />
          </div>

          {/* Action Banner */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-[#6b6b70] to-[#2c2c2e] rounded-[1.25rem] p-4 flex justify-between items-center text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] cursor-pointer"
          >
            <div>
              <p className="text-[14px] font-bold flex items-center gap-2 mb-0.5">
                <Star size={16} fill="white" className="text-white" /> Kredin Tükendi!
              </p>
              <p className="text-[12px] text-gray-300 font-medium">Kredi al, üretmeye devam et.</p>
            </div>
            <button className="bg-white text-black text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
              Satın Al
            </button>
          </motion.div>
        </motion.div>

        {/* Menu List */}
        <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
          <MenuItem icon={<ImageIcon size={22} className="text-gray-700" />} text="Fotoğraflarım" onClick={() => navigate('/bank-flow')} />
          <MenuItem icon={<Star size={22} className="text-gray-700" />} text="Abonelik & Kredi" />
          <MenuItem icon={<BarChart2 size={22} className="text-gray-700" />} text="Dashboard" onClick={() => navigate('/dashboard')} />
          <MenuItem icon={<Settings size={22} className="text-gray-700" />} text="Ayarlar" isLast />
        </motion.div>
      </motion.div>
    </div>
  );
}

function StatBox({ number, label }: { number: string, label: string }) {
  return (
    <div className="flex-1 bg-white/70 backdrop-blur-md rounded-[1.25rem] p-3 text-center border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
      <p className="text-[20px] font-bold text-gray-900">{number}</p>
      <p className="text-[12px] text-gray-500 font-medium mt-0.5">{label}</p>
    </div>
  );
}

function MenuItem({ icon, text, isLast = false, onClick }: { icon: React.ReactNode, text: string, isLast?: boolean, onClick?: () => void }) {
  return (
    <motion.div 
      onClick={onClick}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
      whileTap={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
      className={`flex items-center justify-between p-4 px-5 cursor-pointer transition-colors ${!isLast ? 'border-b border-white/50' : ''}`}
    >
      <div className="flex items-center gap-4 text-gray-800">
        <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
          {icon}
        </div>
        <span className="font-semibold text-[15px]">{text}</span>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </motion.div>
  );
}

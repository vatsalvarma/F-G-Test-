import { motion } from 'framer-motion';
import { ChevronLeft, MoreHorizontal, ArrowDownRight, ArrowUpRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { type: 'spring' as const, stiffness: 250, damping: 20 }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#b4ebd8] via-[#cbf5e6] to-[#e0fcf1] text-[#134e4a] font-sans overflow-hidden pb-32">
      {/* Dynamic Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-5%] left-[-15%] w-[60%] h-[60%] bg-teal-300/40 blur-[80px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[-10%] w-[70%] h-[70%] bg-emerald-200/50 blur-[90px] rounded-full pointer-events-none" 
      />
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-[#4db6ac]/20 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 px-6 pt-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-between items-center mb-8"
        >
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md shadow-sm border border-white/50 text-teal-800"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-300 p-[2px] mb-1">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" className="w-full h-full rounded-full border-2 border-white object-cover" alt="User" />
            </div>
            <span className="text-[12px] font-bold text-teal-900">Lorem Name</span>
            <span className="text-[9px] text-teal-700">Lorem Name</span>
          </div>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md shadow-sm border border-white/50 text-teal-800"
          >
            <MoreHorizontal size={24} />
          </motion.button>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
          
          {/* Main Balance */}
          <motion.div variants={cardVariants} className="flex flex-col items-center mb-2">
             <h1 className="text-4xl font-extrabold text-teal-950 tracking-tight">$3,075</h1>
             <p className="text-[13px] font-semibold text-teal-800/70 mt-1">Lorem ipsum dolor</p>
          </motion.div>

          {/* Two Small Action Cards */}
          <motion.div variants={itemVariants} className="flex gap-4">
             <SmallActionCard amount="$2,650" isDown={true} />
             <SmallActionCard amount="$1,375" isDown={false} />
          </motion.div>

          {/* Smooth Line Chart */}
          <motion.div variants={itemVariants} className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-5 shadow-lg border border-white/50 relative">
             <div className="h-32 w-full relative">
                {/* SVG Line Chart */}
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area */}
                  <motion.path 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    d="M0,45 C15,45 25,25 40,25 C55,25 65,35 80,15 C90,5 100,10 100,10 L100,50 L0,50 Z" 
                    fill="url(#areaGrad)" 
                  />
                  
                  {/* Line */}
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M0,45 C15,45 25,25 40,25 C55,25 65,35 80,15 C90,5 100,10 100,10" 
                    fill="none" 
                    stroke="url(#lineGrad)" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                  
                  {/* Tooltip Point */}
                  <motion.g 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, type: 'spring' as const }}
                  >
                    <circle cx="40" cy="25" r="4" fill="white" stroke="#2dd4bf" strokeWidth="2" />
                    <rect x="32" y="5" width="16" height="10" rx="2" fill="white" className="shadow-sm" />
                    <text x="40" y="12" fontSize="5" fill="#115e59" textAnchor="middle" fontWeight="bold">2.4k</text>
                  </motion.g>
                </svg>
             </div>
             <div className="flex justify-between text-[10px] font-bold text-teal-800/60 mt-2 px-2">
               <span>Feb 1</span><span>Feb 10</span><span>Feb 20</span><span>Feb 30</span>
             </div>
          </motion.div>

          {/* Item Card */}
          <motion.div variants={itemVariants} className="bg-white/50 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/60 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                <Home size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-teal-950">Lorem ipsum dolor</p>
                <p className="text-[10px] font-semibold text-teal-700/70 mt-0.5">Sit amet</p>
              </div>
            </div>
            <div className="font-bold text-teal-900">$460</div>
          </motion.div>

          {/* Credit Card */}
          <motion.div variants={cardVariants} className="relative w-full h-[200px] rounded-[2rem] overflow-hidden p-6 text-white shadow-[0_20px_40px_-15px_rgba(20,150,130,0.3)] mt-4">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4fd1c5] to-[#28a745] opacity-90 z-0" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl z-0" />
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-60 h-60 border-[40px] border-white/5 rounded-full z-0" 
            />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="font-mono text-[22px] tracking-[0.15em] drop-shadow-md">0000 0000 0000 0000</span>
                <p className="text-[11px] opacity-80 mt-1 uppercase tracking-wider">Card number</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                   <p className="font-bold text-lg leading-none">Name</p>
                   <p className="text-[10px] opacity-80 mt-1">lorem ipsum</p>
                </div>
                <div className="text-right">
                   <p className="font-bold text-sm leading-none">05 / 20</p>
                   <p className="text-[10px] opacity-80 mt-1">dolor</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center mt-2 mb-4">
            <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 text-teal-800 text-xs font-bold shadow-sm">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-teal-100 text-teal-600">+</div>
              Lorem ipsum dolor sit
            </div>
          </motion.div>

          {/* Toggles List */}
          <motion.div variants={containerVariants} className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-2 border border-white/60 shadow-lg">
             <ToggleItem title="Lorem ipsum" subtitle="Lorem ipsum dolor sit amet lorem" active={true} />
             <div className="h-[1px] w-full bg-teal-900/5 my-1" />
             <ToggleItem title="Lorem ipsum" subtitle="Lorem ipsum dolor sit amet lorem" active={false} />
             <div className="h-[1px] w-full bg-teal-900/5 my-1" />
             <ToggleItem title="Lorem ipsum" subtitle="Lorem ipsum dolor sit amet lorem" active={true} />
          </motion.div>
          
          {/* Donut Chart & Sliders Section */}
          <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 border border-white/60 shadow-lg mt-4 mb-8">
            <div className="flex justify-center mb-8 relative h-40">
              <svg viewBox="0 0 100 100" className="w-40 h-40 transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#dcfce7" strokeWidth="12" />
                <motion.circle 
                  cx="50" cy="50" r="40" fill="none" stroke="#2dd4bf" strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  whileInView={{ strokeDashoffset: 251.2 * 0.25 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-teal-950">$1,450</span>
                <span className="text-[9px] font-bold text-teal-700/60">Lorem ipsum</span>
              </div>
            </div>

            <div className="space-y-6">
              <SliderItem label="Lorem" value="$250" percent={70} />
              <SliderItem label="Ipsum" value="$70" percent={30} />
              <SliderItem label="Dolor sit" value="$310" percent={90} />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

function SmallActionCard({ amount, isDown }: { amount: string, isDown: boolean }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex-1 bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-white/50 shadow-sm flex items-start gap-3 cursor-pointer"
    >
       <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm ${isDown ? 'bg-[#5eead4]' : 'bg-white text-teal-500 border border-teal-100'}`}>
         {isDown ? <ArrowDownRight size={18} className="text-teal-900" /> : <ArrowUpRight size={18} />}
       </div>
       <div>
         <p className="text-[10px] text-teal-800/60 font-semibold mb-0.5">Lorem ipsum</p>
         <p className="text-sm font-extrabold text-teal-950">{amount}</p>
       </div>
    </motion.div>
  );
}

function ToggleItem({ title, subtitle, active: initialActive }: { title: string, subtitle: string, active: boolean }) {
  const [active, setActive] = useState(initialActive);

  return (
    <div className="flex items-center justify-between p-3 px-4">
      <div>
        <p className="font-bold text-sm text-teal-950">{title}</p>
        <p className="text-[10px] font-semibold text-teal-700/60 mt-0.5">{subtitle}</p>
      </div>
      <motion.div 
        onClick={() => setActive(!active)}
        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${active ? 'bg-[#2dd4bf]' : 'bg-teal-200'}`}
      >
        <motion.div 
          layout
          animate={{ x: active ? 24 : 0 }}
          transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
          className="w-4 h-4 rounded-full bg-white shadow-sm"
        />
      </motion.div>
    </div>
  );
}

function SliderItem({ label, value, percent }: { label: string, value: string, percent: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-bold text-teal-950 mb-2">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 w-full bg-teal-100 rounded-full relative flex items-center">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-[#2dd4bf] rounded-full"
        />
        <motion.div 
          initial={{ left: 0 }}
          whileInView={{ left: `calc(${percent}% - 8px)` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-4 h-4 bg-white border-2 border-[#2dd4bf] rounded-full shadow-sm"
        />
      </div>
    </div>
  );
}

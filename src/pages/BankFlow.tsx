import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid, Calendar, Settings, ArrowUpRight, Apple } from 'lucide-react';
import { useRef } from 'react';

export default function BankFlow() {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} className="bg-[#f7f5fb] min-h-screen text-[#2a2238] font-sans overflow-x-hidden">
      
      {/* ================= SECTION 1: HERO / ONBOARDING ================= */}
      <section className="min-h-screen flex flex-col justify-between px-6 pt-10 pb-8 relative">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-1 font-bold text-xl"
        >
          onebank <span className="text-[#a57cf1]">⌝</span>
        </motion.div>

        {/* Abstract 3D Graphic Area */}
        <div className="relative flex-1 flex items-center justify-center my-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-[300px]"
          >
            {/* 3D Shapes Simulation */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-[20%] left-[20%] w-32 h-32 rounded-full bg-gradient-to-tr from-[#e7d8ff] to-[#a57cf1] blur-[2px] shadow-2xl" 
            />
            
            <motion.div 
              animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] right-[10%] w-16 h-40 bg-gradient-to-b from-[#bde2ff] to-[#7fbfff] rounded-full blur-[1px] shadow-xl transform rotate-45"
            />

            {/* Glass Torus/Arch */}
            <motion.div 
              initial={{ rotateX: 45 }}
              animate={{ rotateZ: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-[30%] left-[10%] w-48 h-48 border-[40px] border-[#d8c3ff] rounded-full blur-[1px] shadow-lg z-10"
              style={{ borderRightColor: 'transparent', borderBottomColor: 'transparent', rotate: 45 }}
            />
            
            {/* Floating Pill */}
            <motion.div 
              animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[20%] left-[40%] w-32 h-10 bg-white/60 backdrop-blur-md rounded-full shadow-lg border border-white/80 z-20"
            />
          </motion.div>
        </div>

        {/* Hero Text & Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-30"
        >
          <p className="text-[#a57cf1] font-semibold text-sm mb-2">Control your budget</p>
          <h1 className="text-[42px] leading-[1.1] font-extrabold tracking-tight mb-4">
            Bank made <br />
            by users <br />
            <span className="text-[#a57cf1]">for people.</span>
          </h1>
          <p className="text-gray-500 text-sm mb-8 pr-12 leading-relaxed">
            Track the money you spend with friends & brands
          </p>

          <div className="flex items-center gap-4 mb-8">
            <button className="w-14 h-14 bg-white rounded-[1.25rem] flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <Apple size={24} fill="currentColor" />
            </button>
            <button className="w-14 h-14 bg-white rounded-[1.25rem] flex items-center justify-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              {/* Fake Google Logo */}
              <div className="flex">
                <div className="w-3 h-3 bg-red-500 rounded-tl-full" />
                <div className="w-3 h-3 bg-blue-500 rounded-tr-full" />
              </div>
              <div className="flex -mt-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-bl-full" />
                <div className="w-3 h-3 bg-green-500 rounded-br-full" />
              </div>
            </button>
            <button onClick={() => {
              const el = document.getElementById('dashboard');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} className="flex-1 bg-[#231a30] text-white h-14 rounded-[1.25rem] flex items-center justify-center gap-2 font-bold shadow-lg shadow-purple-900/20 active:scale-95 transition-transform">
              Get started <ArrowUpRight size={18} />
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 font-medium">
            Already have an account? <span className="text-[#a57cf1] font-bold cursor-pointer">Sign in</span>
          </p>
        </motion.div>
      </section>


      {/* ================= SECTION 2: DASHBOARD ================= */}
      <section id="dashboard" className="min-h-screen pt-16 px-6 pb-12 flex flex-col relative z-20 bg-white rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-indigo-500 p-0.5">
               <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" alt="Avatar" className="w-full h-full rounded-full object-cover border-2 border-white" />
            </div>
            <p className="font-semibold text-gray-800">Hello, Lay!</p>
          </div>
          <div className="flex gap-3">
             <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center relative">
               <div className="w-4 h-4 bg-[#231a30] rounded-[4px] relative">
                  <div className="absolute top-[-2px] right-[-2px] w-2 h-2 bg-purple-500 rounded-full border border-gray-100" />
               </div>
             </button>
             <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
               <Grid size={18} className="text-gray-800" />
             </button>
          </div>
        </motion.div>

        {/* Balance */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-8"
        >
          <p className="text-[#a57cf1] font-semibold text-sm mb-1">Your balance</p>
          <div className="flex items-center justify-center gap-4 w-full">
            <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shadow-sm text-gray-500"><ChevronLeft size={18} /></button>
            <h2 className="text-[40px] font-extrabold tracking-tight">$3567.37</h2>
            <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shadow-sm text-gray-500"><ChevronRight size={18} /></button>
          </div>
        </motion.div>

        {/* Stacked Cards Animation */}
        <div className="relative h-56 w-full mb-10 flex justify-center items-end perspective-1000">
           {/* Bottom Card */}
           <motion.div 
             initial={{ y: 50, opacity: 0, scale: 0.8 }}
             whileInView={{ y: -30, opacity: 1, scale: 0.9 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, type: 'spring' as const }}
             className="absolute w-[85%] h-48 bg-gray-100 rounded-[1.5rem] shadow-sm z-0"
           />
           {/* Middle Card (Black) */}
           <motion.div 
             initial={{ y: 50, opacity: 0, scale: 0.8 }}
             whileInView={{ y: -15, opacity: 1, scale: 0.95 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1, type: 'spring' as const }}
             className="absolute w-[92%] h-48 bg-[#231a30] rounded-[1.5rem] shadow-xl z-10 p-5 text-white flex flex-col justify-between"
           >
              <div className="flex justify-between">
                 <div className="w-8 h-8 rounded-full bg-red-500/80 mix-blend-screen relative"><div className="w-8 h-8 rounded-full bg-yellow-500/80 mix-blend-screen absolute left-4" /></div>
                 <span className="font-semibold text-gray-400">onebank</span>
              </div>
           </motion.div>
           {/* Top Card (Purple Glass) */}
           <motion.div 
             initial={{ y: 80, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2, type: 'spring' as const, stiffness: 200 }}
             className="absolute w-full h-48 bg-gradient-to-br from-[#cbb1ff] to-[#92a8ff] rounded-[1.5rem] shadow-[0_20px_40px_rgba(150,120,250,0.3)] z-20 p-5 text-white border border-white/40 overflow-hidden backdrop-blur-xl"
           >
              <div className="absolute top-[-50%] right-[-10%] w-60 h-60 bg-white/20 blur-2xl rounded-full" />
              <div className="flex justify-between items-start mb-6">
                 <span className="text-xl font-bold italic tracking-wider">VISA</span>
                 <span className="font-semibold text-white/80">onebank</span>
              </div>
              <div className="mt-8 bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/30 shadow-inner">
                <p className="font-mono text-[17px] tracking-widest mb-1 shadow-sm text-white drop-shadow-md">4153 2415 3467 8764</p>
                <p className="text-[10px] text-white/80">06/25</p>
              </div>
           </motion.div>
        </div>

        {/* Last Actions (Slide In) */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-[17px]">Last actions</h3>
             <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">1</span>
          </div>
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' as const, damping: 20 }}
            className="flex items-center justify-between bg-[#f8f7fb] p-4 rounded-[1.25rem]"
          >
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1cd760] rounded-full flex items-center justify-center shadow-sm">
                   <div className="w-6 h-6 rounded-full border-2 border-white/50 border-t-white border-l-white transform -rotate-45" /> {/* Fake Spotify logo */}
                </div>
                <div>
                   <p className="font-bold text-[15px]">Spotify</p>
                   <p className="text-[11px] text-gray-500 font-medium">Yesterday</p>
                </div>
             </div>
             <p className="font-bold text-[15px]">-$12.90</p>
          </motion.div>
        </div>

        {/* Quick Send (Slide Up) */}
        <div>
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-[17px]">Quick send</h3>
             <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">6</span>
          </div>
          <div className="flex justify-between overflow-x-visible pb-4">
             {['Nina', 'Kim', 'John', 'Nomar'].map((name, i) => (
                <motion.div 
                  key={name}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring' as const }}
                  className="flex flex-col items-center gap-2"
                >
                   <div className={`w-14 h-14 rounded-full p-[2px] ${i === 1 ? 'bg-gradient-to-b from-purple-400 to-pink-500' : 'bg-transparent'}`}>
                     <img src={`https://i.pravatar.cc/150?img=${30+i}`} className="w-full h-full rounded-full object-cover bg-gray-200 border-2 border-white shadow-sm" alt={name} />
                   </div>
                   <span className="text-[11px] font-bold text-gray-700">{name}</span>
                   {i === 1 && <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />}
                </motion.div>
             ))}
          </div>
        </div>
      </section>


      {/* ================= SECTION 3: STATS OVERVIEW ================= */}
      <section className="min-h-screen pt-12 px-6 pb-24 bg-[#f8f7fb] relative z-10 flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-10"
        >
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-bold text-lg">Overview</h2>
          <button className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center shadow-sm">
            <Calendar size={18} className="text-gray-800" />
          </button>
        </motion.div>

        {/* Balance Again */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex justify-between items-end"
        >
          <div>
            <p className="text-[#a57cf1] font-semibold text-[13px] mb-1">Your balance</p>
            <h2 className="text-[36px] font-extrabold tracking-tight leading-none">$3567.37</h2>
          </div>
          <div className="flex gap-2">
            <button className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400"><ChevronLeft size={16} /></button>
            <button className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-800"><ChevronRight size={16} /></button>
          </div>
        </motion.div>

        {/* Animated Bar Chart */}
        <div className="h-56 relative mb-12 flex items-end justify-between px-2 pt-16">
           {/* Floating Tooltip */}
           <motion.div 
             initial={{ opacity: 0, y: 20, scale: 0.8 }}
             whileInView={{ opacity: 1, y: 0, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.8, type: 'spring' as const }}
             className="absolute top-0 right-10 bg-white/80 backdrop-blur-md rounded-2xl p-3 shadow-[0_10px_20px_rgba(150,120,250,0.15)] flex items-center gap-3 z-10"
           >
             <div className="w-6 h-6 rounded-full bg-[#e7d8ff] flex items-center justify-center text-[#a57cf1]"><ArrowUpRight size={12} /></div>
             <div>
                <p className="font-extrabold text-[15px] leading-tight">$2238.59</p>
                <p className="text-[#a57cf1] text-[10px] font-bold">8.45%</p>
             </div>
           </motion.div>

           {/* Bars */}
           {[
             { label: 'Apr', pct: 22, val: 30 },
             { label: 'May', pct: 56, val: 65 },
             { label: 'Jun', pct: 31, val: 45 },
             { label: 'Aug', pct: 67, val: 100 }
           ].map((bar, i) => (
             <div key={bar.label} className="flex flex-col items-center w-12 gap-3 relative">
               <motion.div 
                 initial={{ height: 0 }}
                 whileInView={{ height: `${bar.val}%` }}
                 viewport={{ once: true }}
                 transition={{ duration: 1, delay: i * 0.15, type: 'spring' as const, damping: 20 }}
                 className={`w-full rounded-t-[1rem] rounded-b-md relative overflow-hidden ${bar.val === 100 ? 'bg-gradient-to-t from-[#cbb1ff] to-[#92a8ff]' : 'bg-[#e9e4f5]'}`}
               >
                 {bar.val === 100 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 }}
                      className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-[3px] border-white"
                    />
                 )}
               </motion.div>
               <div className="flex flex-col items-center gap-1">
                 <span className="font-bold text-[13px]">{bar.pct}%</span>
                 <span className="text-[11px] font-bold text-gray-500">{bar.label}</span>
               </div>
             </div>
           ))}
        </div>

        {/* Subscriptions */}
        <div className="bg-white rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex-1 relative z-20">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[17px]">Subscriptions</h3>
              <span className="text-[12px] text-gray-500 font-semibold cursor-pointer">Manage &gt;</span>
           </div>
           
           {/* Horizontal Icons list */}
           <motion.div 
             initial={{ x: -20, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="flex gap-[-10px] mb-8"
           >
              {['bg-[#5865F2]', 'bg-gray-100', 'bg-[#0088cc]', 'bg-[#ea4c89]'].map((bg, i) => (
                 <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center ${bg} shadow-sm z-[${10-i}]`} style={{ marginLeft: i > 0 ? '-10px' : '0' }}>
                   {i === 1 && <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500">G</span>}
                 </div>
              ))}
           </motion.div>

           {/* List */}
           <div className="flex flex-col gap-5">
              <SubscriptionItem name="Telegram" date="Next 15 Jul" amount="$5.99" iconBg="bg-white border border-gray-100" />
              <SubscriptionItem name="Netflix" date="Next 26 Aug" amount="$14.99" iconBg="bg-black text-red-600 font-bold" />
           </div>
        </div>
      </section>

      {/* Optional Fixed Overlay Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-50 flex items-end justify-center pb-6">
         <div className="flex gap-8 pointer-events-auto bg-white/60 backdrop-blur-xl px-8 py-3 rounded-full shadow-lg border border-white/50">
            <button className="text-gray-400"><div className="w-5 h-5 rounded-md bg-gray-300" /></button>
            <button className="text-[#a57cf1]"><div className="w-6 h-6 rounded-full bg-[#a57cf1] shadow-md shadow-purple-500/40" /></button>
            <button className="text-gray-400"><div className="w-5 h-5 rounded-full bg-gray-300" /></button>
            <button className="text-gray-400"><Settings size={20} /></button>
         </div>
      </div>
    </div>
  );
}

function SubscriptionItem({ name, date, amount, iconBg }: { name: string, date: string, amount: string, iconBg: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-between items-center"
    >
       <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm ${iconBg}`}>
             {name === 'Telegram' && <span className="transform -rotate-12 text-[#0088cc]">➤</span>}
             {name === 'Netflix' && <span>N</span>}
          </div>
          <div>
             <p className="font-bold text-[15px]">{name}</p>
             <p className="text-[11px] text-gray-500 font-medium">{date}</p>
          </div>
       </div>
       <p className="font-bold text-[15px]">{amount}</p>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw, Star, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: '100%' },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 200, damping: 20 }
    }
  };

  const images = [
    "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1d?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1416879598555-22008fb92795?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=300&auto=format&fit=crop",
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden font-sans pb-20">
      
      {/* Full Screen Background Image with Grayscale */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://pixaii.com/files/preview/800x1427/11739555898noh78wgge9th1gw3l4luvomjwhml4fk5dvx5y08njrjies4vlal9zozyenynwds58vbfsfy57qelwevpqmzvxmiy0x36kryla0xj.jpg" 
          alt="Farm Background" 
          className="w-full h-full object-cover grayscale-[0.8] opacity-80"
        />
      </div>

      {/* Top Navigation Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex justify-between items-center px-6 pt-12 pb-4"
      >
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-black/80 rounded-full flex items-center justify-center backdrop-blur-md"
        >
          <ChevronLeft size={24} className="text-white pr-1" />
        </button>
        
        <span className="font-bold text-black text-[15px] drop-shadow-md">@farm_gear</span>
        
        <button className="bg-black text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-lg">
          Contact Us
        </button>
      </motion.div>

      {/* Glassmorphic Overlay Card */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 mt-[15vh] mx-3 bg-black/60 backdrop-blur-[25px] border border-white/10 rounded-[2.5rem] pt-3 pb-8 px-6 shadow-2xl overflow-hidden"
        style={{ height: 'calc(85vh - 5rem)', overflowY: 'auto' }}
      >
        {/* Top Drag Indicator */}
        <div className="w-12 h-1 bg-white/40 rounded-full mx-auto mb-6" />

        {/* Rotate Icon Top Right */}
        <motion.div 
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="absolute top-6 right-6 text-gray-400 cursor-pointer"
        >
          <RotateCcw size={20} />
        </motion.div>

        {/* Header Section */}
        <div className="relative mb-6">
          <motion.h1 variants={itemVariants} className="text-white text-[42px] font-bold leading-[1.1] tracking-tight w-3/4">
            FarmGear<br/>Connect
          </motion.h1>
          
          {/* Floating Action Icons */}
          <motion.div variants={itemVariants} className="absolute right-0 top-2 flex gap-3">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-11 h-11 bg-[#ff4d8d]/20 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,77,141,0.4)] backdrop-blur-md"
            >
              <Star size={20} className="text-[#ff4d8d]" fill="#ff4d8d" />
            </motion.div>
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <Mail size={20} className="text-black" />
            </motion.div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-gray-400 text-[14px] mt-2 font-medium">@farm_gear</motion.p>
        </div>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-gray-300 text-[15px] leading-[1.4] mb-8 font-medium pr-4">
          A platform focused on creating impactful, user-centered digital experiences for farmers, equipment owners, and agricultural specialists.
        </motion.p>

        {/* Stats */}
        <motion.div variants={itemVariants} className="flex gap-8 mb-8">
          <div>
            <p className="text-white text-[24px] font-bold">10k+</p>
            <p className="text-gray-400 text-[13px] font-medium mt-0.5">Farmers</p>
          </div>
          <div>
            <p className="text-white text-[24px] font-bold">500+</p>
            <p className="text-gray-400 text-[13px] font-medium mt-0.5">Equipment</p>
          </div>
          <div>
            <p className="text-white text-[24px] font-bold">50+</p>
            <p className="text-gray-400 text-[13px] font-medium mt-0.5">Regions</p>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
          {['@tractors', '@harvesting', '@rentals', '@farming', '@agriculture'].map((tag) => (
            <span key={tag} className="bg-white/10 border border-white/5 text-gray-300 text-[12px] px-3 py-1.5 rounded-full font-medium tracking-wide">
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Image Carousel */}
        <motion.div variants={itemVariants} className="mb-6 relative">
          <div className="flex gap-3 overflow-x-auto snap-x scrollbar-hide pb-2">
            {images.map((img, idx) => (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                key={idx} 
                className="min-w-[100px] h-[100px] rounded-2xl overflow-hidden snap-center flex-shrink-0 border border-white/10"
              >
                <img src={img} alt="Farm Gear" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
          {/* Carousel Arrows */}
          <div className="flex justify-center gap-4 mt-4">
            <button className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-md">
              <ArrowLeft size={18} className="text-white" />
            </button>
            <button className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-md">
              <ArrowRight size={18} className="text-white" />
            </button>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div variants={itemVariants} className="flex gap-4 items-start bg-white/5 p-4 rounded-[1.5rem] border border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" 
            alt="User" 
            className="w-12 h-12 rounded-full object-cover shrink-0 border border-white/20"
          />
          <div>
            <p className="text-gray-300 text-[13px] leading-[1.5] mb-2 font-medium">
              Thanks for the great equipment recommendations for this harvest season. Had so much fun operating the new machinery. Greetings from Punjab!
            </p>
            <p className="text-white text-[13px] font-bold">Rajesh Kumar</p>
            <p className="text-gray-500 text-[11px] font-medium">@rajesh.farmer</p>
          </div>
        </motion.div>
        
        {/* Extra padding at the bottom to ensure content isn't hidden by the fixed bottom nav */}
        <div className="h-20"></div>

      </motion.div>
    </div>
  );
}

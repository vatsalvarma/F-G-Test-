import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Check, MessageCircle, Phone, ArrowLeft, Sun, Wind, Droplets } from 'lucide-react';

const equipments = [
  {
    id: 'EQ-001',
    name: 'Mahindra 575 DI XP Plus',
    brand: 'Mahindra • 45 HP',
    images: [
      'https://images.unsplash.com/photo-1635174815612-fd9636f70146?q=80&w=800',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHJvbmVzfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1493238792000-8113da705763?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=800',
      'https://images.unsplash.com/photo-1629837016599-52e079717651?q=80&w=800'
    ],
    reviews: '1.3k',
    rating: 4.8,
    amenities: ['Heavy Duty', 'Driver Included', 'Attachments'],
    description: 'Experience the power of Mahindra 575 DI XP Plus, a 45 HP tractor perfect for heavy-duty plowing, tilling, and transport. Comes with an experienced driver and full attachments.',
    agent: 'Mr. Rajesh Kumar',
    agentImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    priceHr: 500,
    priceDay: 4000,
    type: 'Tractor'
  },
  {
    id: 'EQ-002',
    name: 'Garuda Kisan Drone',
    brand: 'Garuda • 10L Capacity',
    images: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHJvbmVzfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800',
      'https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=800',
      'https://images.unsplash.com/photo-1493238792000-8113da705763?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww'
    ],
    reviews: '3.3k',
    rating: 4.9,
    amenities: ['10L Tank', 'Auto-Spray', 'GPS Guided'],
    description: 'Optimize your crop health with the Garuda Kisan Drone. Features a 10L pesticide tank, automatic flight mapping, and precision spraying technology to cover acres in minutes.',
    agent: 'Mr. Anil Sharma',
    agentImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    priceHr: 1000,
    priceDay: 8000,
    type: 'Drone'
  },
  {
    id: 'EQ-003',
    name: 'Shaktiman Rotavator',
    brand: 'Shaktiman • 6 Feet',
    images: [
      'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=800',
      'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=800',
      'https://images.unsplash.com/photo-1493238792000-8113da705763?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1635174815612-fd9636f70146?q=80&w=800',
      'https://images.unsplash.com/photo-1493238792000-8113da705763?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww'
    ],
    reviews: '4.3k',
    rating: 4.5,
    amenities: ['PTO Driven', 'Multi-speed', 'Robust'],
    description: 'The Shaktiman 6-foot rotavator ensures deep tillage and perfect soil preparation. Compatible with 40+ HP tractors, it offers robust performance in all soil types.',
    agent: 'Mr. Vikram Singh',
    agentImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    priceHr: 300,
    priceDay: 2500,
    type: 'Implement'
  }
];

export default function EquipmentList() {
  const [view, setView] = useState<'list' | 'detail' | 'confirmed'>('list');
  const [selected, setSelected] = useState<any>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const openDetail = (eq: any) => {
    setSelected(eq);
    setImgIndex(0);
    setView('detail');
  };

  const handleBook = () => {
    setView('confirmed');
  };

  const goBack = () => {
    if (view === 'confirmed') setView('detail');
    else setView('list');
  };

  return (
    <div className="px-5 pb-24 mt-2">
      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {equipments.map((eq, idx) => (
              <motion.div
                key={eq.id}
                layoutId={`card-${eq.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                onClick={() => openDetail(eq)}
                className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[1.5rem] p-3 flex gap-4 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-white/80 transition-colors"
              >
                <div className="relative w-[110px] h-[110px] shrink-0">
                  <motion.img
                    layoutId={`img-${eq.id}`}
                    src={eq.images[0]}
                    alt={eq.name}
                    className="w-full h-full object-cover rounded-[1.2rem]"
                  />
                  <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <Heart size={14} className="text-red-500 fill-red-500" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-0.5">
                      <motion.h3 layoutId={`title-${eq.id}`} className="text-gray-900 font-extrabold text-[15px] leading-tight line-clamp-1">{eq.name}</motion.h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-[13px] font-bold text-gray-800">{eq.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-[11px] mb-1">{eq.brand} • {eq.reviews} reviews</p>

                    <div className="mb-2">
                      <p className="text-[#3b82f6] text-[11px] font-semibold mb-0.5">Amenities</p>
                      <ul className="text-gray-500 text-[10px] list-disc list-inside space-y-0.5">
                        {eq.amenities.slice(0, 2).map((am: string, i: number) => (
                          <li key={i}>{am}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[13px]">
                    <span className="text-[#3b82f6] font-extrabold">₹{eq.priceHr}/hour</span>
                    <span className="text-gray-400">or</span>
                    <span className="text-[#3b82f6] font-extrabold">₹{eq.priceDay}/day</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {view === 'detail' && selected && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#f4f7fc] overflow-y-auto"
          >
            {/* Header Image Slider */}
            <div className="relative w-full h-[45vh] bg-black rounded-b-[2.5rem] overflow-hidden shadow-xl">
              <motion.img
                key={imgIndex}
                layoutId={imgIndex === 0 ? `img-${selected.id}` : undefined}
                src={selected.images[imgIndex]}
                alt={selected.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, type: "spring" as const, stiffness: 200, damping: 20 }}
                className="w-full h-full object-cover opacity-80 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset }) => {
                  const swipeThreshold = 50;
                  if (offset.x < -swipeThreshold) {
                    // Swipe left
                    setImgIndex((prev) => Math.min(prev + 1, selected.images.length - 1));
                  } else if (offset.x > swipeThreshold) {
                    // Swipe right
                    setImgIndex((prev) => Math.max(prev - 1, 0));
                  }
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

              {/* Top Icons */}
              <div className="absolute top-10 left-6 right-6 flex justify-between items-center z-10">
                <button onClick={goBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <ArrowLeft size={20} className="text-gray-800" />
                </button>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Heart size={20} className="text-red-500 fill-red-500" />
                </button>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-10 left-6 right-6 z-10 text-center">
                <motion.h1 layoutId={`title-${selected.id}`} className="text-white text-3xl font-extrabold shadow-sm">{selected.name}</motion.h1>
                <p className="text-white/90 text-sm font-medium mt-1">{selected.brand}</p>
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {selected.images.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setImgIndex(idx)}
                    className={`h-2 rounded-full transition-all ${imgIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="px-6 py-6 pb-32">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-[#3b82f6] text-white px-4 py-1.5 rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(59,130,246,0.4)]">
                  {selected.type}
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-800 text-sm">{selected.rating}</span>
                  <span className="text-gray-400 text-sm">({selected.reviews} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl font-extrabold text-gray-900 mb-1">{selected.name} • <span className="font-medium text-gray-500">{selected.brand.split('•')[0]}</span></h2>
              <p className="text-gray-500 text-sm mb-6">Capacity: 1 Unit</p>

              <h3 className="text-[#3b82f6] font-bold text-lg mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {selected.amenities.map((am: string, i: number) => (
                  <div key={i} className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm text-gray-700 text-sm font-semibold border border-gray-100">
                    {i === 0 && <Sun size={14} className="text-gray-500" />}
                    {i === 1 && <Droplets size={14} className="text-gray-500" />}
                    {i === 2 && <Wind size={14} className="text-gray-500" />}
                    {am}
                  </div>
                ))}
              </div>

              <h3 className="text-gray-900 font-bold text-lg mb-2">Description</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {selected.description}
              </p>

              <h3 className="text-gray-900 font-bold text-lg mb-3">Contact Agent</h3>
              <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <img src={selected.agentImage} alt="agent" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm">{selected.agent}</h4>
                    <p className="text-gray-400 text-xs">{selected.agent}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                    <MessageCircle size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                    <Phone size={18} />
                  </button>
                </div>
              </div>

              {/* Inline Price & Booking Section */}
              <h3 className="text-gray-900 font-bold text-lg mt-6 mb-3">Booking Details</h3>
              <div className="bg-white p-4 rounded-[1.2rem] shadow-sm border border-gray-100 flex justify-between items-center mb-8">
                <div>
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wide mb-1">Total Price</p>
                  <div className="flex flex-col">
                    <span className="text-[#3b82f6] font-extrabold text-[15px]">₹ {selected.priceHr} <span className="text-gray-500 text-[12px] font-semibold">/ hour</span></span>
                    <span className="text-[#3b82f6] font-extrabold text-[15px]">₹ {selected.priceDay} <span className="text-gray-500 text-[12px] font-semibold">/ day</span></span>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBook}
                  className="bg-[#3b82f6] text-white px-7 py-3 rounded-[1rem] font-bold text-[14px] shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:bg-blue-600 transition-colors"
                >
                  Book Now
                </motion.button>
              </div>
            </div>


          </motion.div>
        )}

        {view === 'confirmed' && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#f4f7fc] flex flex-col max-w-md mx-auto"
          >
            <div className="px-6 pt-12 pb-6 flex items-center justify-center relative">
              <button onClick={goBack} className="absolute left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <ArrowLeft size={20} className="text-gray-800" />
              </button>
              <h1 className="text-gray-900 font-bold text-lg">Booking Confirmation</h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 mt-[-10vh]">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring' as const, damping: 15, stiffness: 200, delay: 0.2 }}
                className="w-32 h-32 bg-[#3b82f6] rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(59,130,246,0.4)] mb-8 relative"
              >
                <Check size={64} className="text-white" strokeWidth={3} />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-2 -right-2 text-blue-400"
                >✨</motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="absolute bottom-2 -left-4 text-blue-400 text-2xl"
                >✨</motion.div>
              </motion.div>

              <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Booking Confirmed!</h2>
              <p className="text-gray-500 text-center text-sm leading-relaxed mb-10 px-4">
                Thank you for choosing Farm-Gear! Your booking for the <span className="font-bold text-gray-700">{selected?.name}</span> is secured, and your agricultural equipment is just a splash away.
              </p>

              <p className="text-gray-900 font-bold mb-4">Scan for booking details</p>
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-2">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FarmGearBooking123" alt="QR Code" className="w-32 h-32" />
              </div>
              <p className="text-gray-500 text-sm font-medium">Scan me ;-)</p>
            </div>

            <div className="p-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('list')}
                className="w-full bg-[#3b82f6] text-white py-4 rounded-2xl font-bold shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:bg-blue-600 transition-colors"
              >
                View Booking
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

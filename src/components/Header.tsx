import { Bell, MapPin, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import PWAInstallButton from './PWAInstallButton';

/* 
================================================================================
README: HOW TO UNDERSTAND AND MODIFY THIS FILE (Header.tsx)
================================================================================

This is the top header of your app on the Home screen.

Key parts:
1. Logo/Branding: "Farm Gear Connect".
2. Location: A fake location for now with a MapPin icon.
3. Search Bar: For searching equipment.
4. Notification Bell: Top right icon.

HOW TO CHANGE COLORS:
- Look for `bg-brand-black` and change it to `bg-blue-500` if you want a blue header.
- The search bar has `bg-[#2a2a2a]`, you can adjust this hex code.

HOW TO CHANGE THE NAME:
- Find "William Current" and change it to your actual dynamic user name variable later.
================================================================================
*/

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  // Fake notifications data
  const notifications = [
    { id: 1, title: 'Booking Confirmed', desc: 'Your Tractor is ready for pickup.', time: '2m ago', icon: <CheckCircle size={16} className="text-green-400" /> },
    { id: 2, title: 'Payment Successful', desc: '₹4,500 has been debited.', time: '1h ago', icon: <CheckCircle size={16} className="text-blue-400" /> },
    { id: 3, title: 'Reminder', desc: 'Return the Rotavator by 5 PM.', time: '3h ago', icon: <Clock size={16} className="text-yellow-400" /> },
    { id: 4, title: 'New Equipment', desc: 'Agri Drones are now available!', time: '1d ago', icon: <AlertCircle size={16} className="text-purple-400" /> },
  ];

  return (
    <div className="relative z-50 rounded-b-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 rounded-b-[2rem] overflow-hidden">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/007/945/223/small/right-angle-frame-abstract-background-arrowhead-black-vector.jpg"
          alt="Farm Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1c1c1e]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pt-12 pb-6 border-b border-white/10 rounded-b-[2rem]">
        <div className="flex justify-between items-center mb-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoAVqJ5wxZcZEX9U21QOqxe9op2K9fMh-UYA&s"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-gray-300 text-sm font-medium">Welcome Back 👋</p>
              <h1 className="text-white font-bold text-lg tracking-wide">Ramesh Kumar</h1>
            </div>
          </div>
          
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className={`w-10 h-10 rounded-full flex items-center justify-center relative shadow-sm border transition-colors ${showNotifications ? 'bg-white text-black border-white' : 'bg-white/10 text-white border-white/20'}`}
            >
              <Bell size={20} className={showNotifications ? 'text-black' : 'text-white'} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <>
                  {/* Invisible Overlay to close when clicking outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="absolute top-14 right-0 w-[280px] sm:w-[320px] bg-[#2a2a2a]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                      <h3 className="text-white font-bold text-[15px]">Notifications</h3>
                      <span className="text-[11px] text-[#3b82f6] font-bold cursor-pointer hover:text-blue-400">Mark all read</span>
                    </div>
                    
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.map((notif, i) => (
                        <div key={notif.id} className={`p-4 flex gap-3 hover:bg-white/5 cursor-pointer transition-colors ${i !== notifications.length - 1 ? 'border-b border-white/5' : ''}`}>
                          <div className="w-8 h-8 rounded-full bg-white/10 flex flex-shrink-0 items-center justify-center mt-1">
                            {notif.icon}
                          </div>
                          <div>
                            <p className="text-white text-[13px] font-bold leading-tight mb-1">{notif.title}</p>
                            <p className="text-gray-400 text-[11px] leading-tight mb-1.5">{notif.desc}</p>
                            <p className="text-gray-500 text-[9px] font-bold uppercase">{notif.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-3 border-t border-white/10 text-center bg-black/20 cursor-pointer hover:bg-white/5 transition-colors">
                      <span className="text-gray-300 text-[12px] font-bold">View all notifications</span>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-300 font-medium justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-white" />
            <span>Hyderabad, Telangana</span>
          </div>
          <PWAInstallButton />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for 'Tractor'"
            className="w-full bg-[#1a1a1a]/40 text-white placeholder:text-gray-300 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-white transition-all border border-white/10 shadow-inner font-medium"
          />
        </div>
      </div>
    </div>
  );
}

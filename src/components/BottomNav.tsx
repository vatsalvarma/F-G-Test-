import { NavLink, useLocation } from 'react-router-dom';
import { Home, Info, Plus, FileText, User } from 'lucide-react';
import { motion } from 'framer-motion';

/* 
================================================================================
README: HOW TO UNDERSTAND AND MODIFY THIS FILE (BottomNav.tsx)
================================================================================

This file creates the bottom navigation bar with the 5 buttons.

Key parts:
1. 'lucide-react' provides the icons (Home, Info, Plus, etc.).
2. 'framer-motion' gives us smooth animations (like the bounce effect when you tap).
3. The `<NavLink>` component changes the URL when tapped. It also knows if it's "active".

HOW TO CHANGE THE MENU ITEMS:
- Scroll down to the `navItems` array. You can see objects with `name`, `path`, and `icon`.
- To change the name of the "Blogs" button to "News", just change `name: 'Blogs'` to `name: 'News'`.
- To change icons, import a new one from lucide-react at the top, and replace the `<Icon />` part.

THE CENTER PLUS BUTTON:
- The Add Equipment button is treated specially. We check if `item.isCenter` is true.
- If it is, we give it a big green circle (`bg-brand-green`) and float it upwards using `-mt-6`.
================================================================================
*/

const navItems = [
  { name: 'Home', path: '/', icon: <Home size={24} /> },
  { name: 'About', path: '/about', icon: <Info size={24} /> },
  { name: 'Add', path: '/add-equipment', icon: <Plus size={32} className="text-black" />, isCenter: true },
  { name: 'Blogs', path: '/blogs', icon: <FileText size={24} /> },
  { name: 'Profile', path: '/profile', icon: <User size={24} /> },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="bg-[#1c1c1e]/70 backdrop-blur-2xl rounded-t-3xl border-t border-white/10 px-6 py-2 pb-6 flex justify-between items-end relative shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        if (item.isCenter) {
          return (
            <NavLink key={item.name} to={item.path} className="relative z-10 flex flex-col items-center justify-center">
              <motion.div 
                whileTap={{ scale: 0.9 }}
                className="bg-white h-16 w-16 rounded-full flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)] -mt-8 border-4 border-[#1c1c1e]"
              >
                {item.icon}
              </motion.div>
              <span className="text-[10px] mt-1 text-gray-400 font-medium">{item.name}</span>
            </NavLink>
          );
        }

        return (
          <NavLink 
            key={item.name} 
            to={item.path}
            className="flex flex-col items-center justify-center w-12 pt-2"
          >
            <motion.div
              whileTap={{ scale: 0.8 }}
              animate={{ 
                y: isActive ? -4 : 0,
                color: isActive ? '#ffffff' : '#888888'
              }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
            >
              {item.icon}
            </motion.div>
            <motion.span 
              animate={{ color: isActive ? '#ffffff' : '#888888' }}
              className="text-[10px] mt-1 font-medium"
            >
              {item.name}
            </motion.span>
          </NavLink>
        );
      })}
    </div>
  );
}

import { motion } from 'framer-motion';

/* 
================================================================================
README: HOW TO UNDERSTAND AND MODIFY THIS FILE (CategoryScroll.tsx)
================================================================================

This file shows the horizontal scrollable list of categories (like Tractor, Rotavator).
It matches the 2nd image layout you requested (squarish cards with text below).

Key parts:
1. `categories` array: This holds all your categories. It has an id, name, image, and background color.
2. The outer `div` has `overflow-x-auto` to allow horizontal scrolling.
3. We use `scrollbar-hide` (defined in index.css) to make it look clean without the ugly scrollbar.

HOW TO ADD OR CHANGE A CATEGORY:
- Go to the `categories` array below.
- Add a new block like this:
  { id: 10, name: 'New Tool', image: 'link-to-image.png', color: 'bg-red-200' }
- The color can be any tailwind color class, or use a hex color in style.

ANIMATIONS:
- Each card has `whileTap={{ scale: 0.95 }}` so when you touch it, it shrinks a bit, feeling very responsive.
================================================================================
*/

const categories = [
  { id: 1, name: 'Tractor', image: 'https://pngimg.com/uploads/need_for_speed/need_for_speed_PNG6.png', color: '#B5E550' }, // brand green
  { id: 2, name: 'Rotavator', image: 'https://cdn-icons-png.flaticon.com/512/2821/2821815.png', color: '#ffb3ba' }, // pinkish
  { id: 3, name: 'Harvester', image: 'https://cdn-icons-png.flaticon.com/512/6254/6254336.png', color: '#bae1ff' }, // bluish
  { id: 4, name: 'JCB', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png', color: '#dcd3ff' }, // purpleish
  { id: 5, name: 'Sprayer', image: 'https://cdn-icons-png.flaticon.com/512/4608/4608104.png', color: '#ffffba' }, // yellowish
  { id: 6, name: 'Seed Machine', image: 'https://cdn-icons-png.flaticon.com/512/3225/3225094.png', color: '#ffdfba' }, // orangeish
  { id: 7, name: 'Truck', image: 'https://cdn-icons-png.flaticon.com/512/870/870188.png', color: '#baffc9' }, // mint
  { id: 8, name: 'Agri Drone', image: 'https://cdn-icons-png.flaticon.com/512/6009/6009623.png', color: '#f0e6ef' }, // light
  { id: 9, name: 'Geologist', image: 'https://cdn-icons-png.flaticon.com/512/10061/10061805.png', color: '#e0fbfc' }, // cyan
];

export default function CategoryScroll() {
  return (
    <div className="mt-6 mb-2">
      <div className="flex justify-between items-center px-6 mb-4">
        <h2 className="text-gray-900 font-bold text-lg">Categories</h2>
        <button className="text-gray-600 text-sm font-bold bg-white/50 px-3 py-1 rounded-full border border-white/60">See All</button>
      </div>
      
      <div className="flex overflow-x-auto scrollbar-hide px-6 pb-4 gap-4 snap-x">
        {categories.map((cat, index) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' as const }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 snap-start cursor-pointer shrink-0"
          >
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden relative"
              style={{ backgroundColor: cat.color }}
            >
              {/* Added a subtle gradient overlay to make it look premium */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-12 h-12 object-contain relative z-10 drop-shadow-md"
              />
            </div>
            <span className="text-gray-700 text-xs font-bold text-center w-20 leading-tight">
              {cat.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

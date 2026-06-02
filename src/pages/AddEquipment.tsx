import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';

/* 
================================================================================
README: HOW TO UNDERSTAND AND MODIFY THIS FILE (AddEquipment.tsx)
================================================================================

This page is where equipment owners will list their tractors/drones etc.

HOW TO MODIFY:
- It currently shows a basic form with a dropdown and some text inputs.
- To add a new field (like "Price per hour"), copy one of the `<div>` blocks
  containing a `<label>` and `<input>`, and paste it below. Change the labels
  and placeholders.
- The styling uses Tailwind CSS. For example, `focus:ring-brand-green` makes
  the input border green when you click on it.
================================================================================
*/

export default function AddEquipment() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 pt-12 min-h-full pb-32"
    >
      <h1 className="text-2xl font-bold text-white mb-2">Add Equipment</h1>
      <p className="text-brand-green text-sm mb-6">List your machinery for rent. Admin approval required.</p>

      <form className="space-y-4">
        <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-gray-800">
          <label className="block text-gray-400 text-xs mb-2">Equipment Category</label>
          <select className="w-full bg-[#1a1a1a] text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-green">
            <option>Select Category</option>
            <option>Tractor</option>
            <option>Rotavator</option>
            <option>Agri Drone</option>
            <option>JCB</option>
          </select>
        </div>

        <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-gray-800">
          <label className="block text-gray-400 text-xs mb-2">Brand</label>
          <input type="text" placeholder="e.g. Mahindra, Shaktiman..." className="w-full bg-[#1a1a1a] text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-green" />
        </div>

        <div className="flex gap-4">
          <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-gray-800 flex-1">
            <label className="block text-gray-400 text-xs mb-2">Hourly Charge (₹)</label>
            <input type="number" placeholder="0.00" className="w-full bg-[#1a1a1a] text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-green" />
          </div>
          <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-gray-800 flex-1">
            <label className="block text-gray-400 text-xs mb-2">Daily Charge (₹)</label>
            <input type="number" placeholder="0.00" className="w-full bg-[#1a1a1a] text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-green" />
          </div>
        </div>

        <div className="bg-[#2a2a2a] p-6 rounded-2xl border border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-brand-green transition-colors">
          <UploadCloud size={32} className="text-brand-green mb-2" />
          <p className="text-sm text-white font-medium">Upload Photos</p>
          <p className="text-xs text-gray-400 mt-1">Minimum 5 images required</p>
        </div>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="w-full bg-brand-green text-black font-bold text-lg py-4 rounded-2xl shadow-lg mt-6"
        >
          Submit for Approval
        </motion.button>
      </form>
    </motion.div>
  );
}

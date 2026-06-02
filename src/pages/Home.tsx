import Header from '../components/Header';
import CategoryScroll from '../components/CategoryScroll';
import EquipmentList from '../components/EquipmentList';
import { motion } from 'framer-motion';

/* 
================================================================================
README: HOW TO UNDERSTAND AND MODIFY THIS FILE (Home.tsx)
================================================================================

This is the main Home screen of your application.
It acts as a container that brings together three main pieces:
1. Header: The top bar with your name, search, and notification bell.
2. CategoryScroll: The horizontal scrolling list of tractor/rotavator icons.
3. EquipmentList: The vertical list of items available to rent.

HOW TO ADD NEW SECTIONS:
- If you want to add a "Special Offers" banner, you would create a new component
  (e.g., SpecialOffers.tsx in the components folder).
- Then, import it at the top of this file.
- Finally, place `<SpecialOffers />` wherever you want it to appear between
  the other components down below.

ANIMATIONS:
- The whole page wraps in a `<motion.div>` that fades in (`opacity: 0` to `opacity: 1`)
  when you open the app.
================================================================================
*/

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-[#e6e9f0] via-[#eef1f5] to-[#e6e9f0] relative pb-20"
    >
      <Header />
      <CategoryScroll />
      <EquipmentList />
    </motion.div>
  );
}

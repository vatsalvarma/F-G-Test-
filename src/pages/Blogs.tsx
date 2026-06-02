import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Eye, Loader, RefreshCw, ChevronLeft, 
  Sun, Share2, Bookmark, Headphones, MoreHorizontal
} from 'lucide-react';

const categories = ["All", "UX & UI", "Graphic Design", "Design Trends"];

const articles = [
  {
    id: 1,
    time: "Today, 08:15 PM",
    readTime: "54 min read",
    title: "Key principles of user experience navigation",
    excerpt: "Dive into the fundamental principles of UX design that guide your creations...",
    tags: [
      { name: "Interaction", bg: "bg-rose-100", text: "text-rose-500" },
      { name: "Research", bg: "bg-orange-100", text: "text-orange-500" }
    ],
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400",
    badgeIcon: <Eye size={14} className="text-white" />,
    badgeColor: "bg-[#ff7aa2]", // Pink
    author: "David Johnson"
  },
  {
    id: 2,
    time: "Today, 08:15 PM",
    readTime: "65 min read",
    title: "Metrics and Strategies for Effective Design",
    excerpt: "In the world of UX design, success is often measured by the impact you make...",
    tags: [
      { name: "Usability Testing", bg: "bg-pink-100", text: "text-pink-500" },
      { name: "Interaction", bg: "bg-orange-100", text: "text-orange-500" }
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1deRO3SUuUi1cwiQYyQk7GgXw8jy3Nx6KMg&s",
    badgeIcon: <Loader size={14} className="text-white" />,
    badgeColor: "bg-[#8b9ef5]", // Blue
    author: "David Johnson"
  },
  {
    id: 3,
    time: "Today, 08:15 PM",
    readTime: "26 min read",
    title: "Creating Memorable UX to Increase Engagement",
    excerpt: "Explore the art of crafting digital interfaces that leave a lasting impression...",
    tags: [
      { name: "Usability Testing", bg: "bg-pink-100", text: "text-pink-500" },
      { name: "Interaction", bg: "bg-rose-100", text: "text-rose-500" }
    ],
    image: "https://images.unsplash.com/photo-1508182314998-3bd49473002f?auto=format&fit=crop&q=80&w=400",
    badgeIcon: <RefreshCw size={14} className="text-white" />,
    badgeColor: "bg-[#ffa384]", // Orange
    author: "Jane Smith"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("UX & UI");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  return (
    <div className="bg-[#fcf5f3] min-h-full text-gray-900 font-sans relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="p-6 pt-12 pb-24"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Inbox</h1>
              <div className="flex items-center gap-3">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 border border-gray-200 rounded-full bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <Filter size={18} className="text-gray-700" />
                </motion.button>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="user" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-white text-gray-800 rounded-full py-3.5 pl-5 pr-12 shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ffa384] transition-all font-medium placeholder-gray-400"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
            </div>

            {/* Categories */}
            <div 
              className="flex overflow-x-auto gap-2 mb-8 pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors z-10 shadow-sm border border-gray-100 ${
                    activeCategory === cat ? 'text-white' : 'text-gray-500 bg-white hover:bg-gray-50'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-[#ffa384] rounded-full -z-10 shadow-md"
                      transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Article List */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-5"
            >
              {articles.map((article) => (
                <motion.div
                  key={article.id}
                  layoutId={`article-container-${article.id}`}
                  variants={itemVariants}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-[2rem] p-3.5 flex gap-4 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-1 flex flex-col justify-between py-1 px-1">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-500 text-[11px] font-bold">{article.time}</span>
                        <span className="text-gray-400 text-[11px] font-medium">{article.readTime}</span>
                      </div>
                      <motion.h2 
                        layoutId={`title-${article.id}`}
                        className="text-gray-900 font-extrabold text-[1.05rem] leading-snug mb-1.5 line-clamp-2"
                      >
                        {article.title}
                      </motion.h2>
                      <p className="text-gray-500 text-[12px] leading-relaxed line-clamp-2 mb-3">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, idx) => (
                        <span key={idx} className={`${tag.bg} ${tag.text} text-[10px] font-bold px-2.5 py-1 rounded-full`}>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-[110px] h-[130px] relative rounded-2xl overflow-hidden shrink-0 shadow-inner">
                    <motion.img 
                      layoutId={`image-${article.id}`}
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className={`absolute top-2 right-2 w-7 h-7 rounded-[0.6rem] ${article.badgeColor} flex items-center justify-center shadow-md backdrop-blur-sm bg-opacity-90`}>
                      {article.badgeIcon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring" as const, damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-white z-50 overflow-y-auto min-h-screen pb-32"
          >
            <div className="p-6 pt-12">
              {/* Detail Header */}
              <div className="flex justify-between items-center mb-8">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center gap-2 text-gray-900 font-bold hover:text-gray-600 transition-colors"
                >
                  <ChevronLeft size={22} />
                  Article
                </motion.button>
                <div className="flex items-center gap-3">
                  <motion.button whileTap={{ scale: 0.9 }} className="p-2 border border-gray-100 rounded-full shadow-sm bg-[#fcfcfc] text-gray-500">
                    <Sun size={18} />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} className="p-2 border border-gray-100 rounded-full shadow-sm text-gray-700">
                    <Share2 size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Tags and Time */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-5 text-[11px] font-bold"
              >
                {selectedArticle.tags.map((tag: any, idx: number) => (
                  <span key={idx} className={`${tag.bg} ${tag.text} px-3 py-1.5 rounded-full`}>
                    {tag.name}
                  </span>
                ))}
                <span className="text-gray-400 font-medium ml-auto">{selectedArticle.readTime}</span>
              </motion.div>

              <motion.h1 
                layoutId={`title-${selectedArticle.id}`}
                className="text-[2rem] font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight"
              >
                {selectedArticle.title}
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between mb-8 p-3.5 rounded-[1.5rem] bg-[#fafafa] border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="author" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-gray-800">{selectedArticle.author}</span>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#ffa384] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-[#ff906e] transition-colors"
                >
                  Follow
                </motion.button>
              </motion.div>

              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pr-14"
                >
                  <p className="text-gray-600 leading-[1.7] mb-6 text-[15px]">
                    In the dynamic field of UX design, success relies on measuring user experiences and implementing design strategies. This article explores key metrics and strategies for creating exceptional digital interfaces.
                  </p>
                  <p className="text-gray-600 leading-[1.7] mb-8 text-[15px]">
                    User experience (UX) design is all about ensuring that digital interfaces are not only visually appealing but also functionally efficient.
                  </p>

                  <h2 className="text-[1.35rem] font-bold text-gray-900 mb-4 tracking-tight">Key Metrics to Gauge User Experience</h2>
                  <p className="text-gray-600 leading-[1.7] mb-6 text-[15px]">
                    Metrics in UX design are more than just numbers; they are invaluable tools for assessing the effectiveness of a design and guiding improvements. In this article, we will cover the essential metrics you need to know.
                  </p>
                </motion.div>
                
                {/* Right side floating action bar */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute right-0 top-0 flex flex-col gap-4"
                >
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.03)] bg-white">
                    <Bookmark size={18} />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.03)] bg-white">
                    <Headphones size={18} />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.03)] bg-white">
                    <MoreHorizontal size={18} />
                  </motion.button>
                </motion.div>
              </div>
              
              <motion.div 
                layoutId={`image-container-${selectedArticle.id}`}
                className="w-full h-64 rounded-[2rem] overflow-hidden mt-4 mb-8 shadow-[0_15px_40px_rgb(0,0,0,0.08)] relative"
              >
                <motion.img 
                  layoutId={`image-${selectedArticle.id}`}
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

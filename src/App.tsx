import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddEquipment from './pages/AddEquipment';
import Blogs from './pages/Blogs';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import BankFlow from './pages/BankFlow';
import BottomNav from './components/BottomNav';
import InstallPrompt from './components/InstallPrompt';
import SplashScreen from './components/SplashScreen';

/* 
================================================================================
README: HOW TO UNDERSTAND AND MODIFY THIS FILE (App.tsx)
================================================================================

Hello! Welcome to the main file of your React application. Think of this file
as the "Traffic Cop" of your app. Its job is to decide which screen to show
based on the URL (like when you go to /about or /profile).

Key parts of this file:
1. Imports (top lines): We bring in tools from 'react-router-dom' to handle navigation,
   and we import all our page components (Home, About, etc.) from their folders.
2. App Component: This is the main box holding your app.
3. BrowserRouter: This tells the app to pay attention to the web address.
4. Routes: Inside here, we define all the possible pages.
   - <Route path="/" element={<Home />} /> means "When the URL is just '/', show the Home page".
5. BottomNav: This is your bottom menu bar. It's placed outside the Routes so it
   always stays visible at the bottom of the screen, no matter what page you are on.

HOW TO ADD A NEW PAGE:
1. Create a new file in the 'pages' folder (e.g., 'Contact.tsx').
2. Import it at the top here: `import Contact from './pages/Contact';`
3. Add a new route inside <Routes>: `<Route path="/contact" element={<Contact />} />`
================================================================================
*/

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* The main container taking full height with the dark theme */}
      <div className="flex flex-col h-screen w-full bg-brand-black text-white pb-20">
        
        {/* The area that changes based on the URL */}
        <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto relative shadow-2xl bg-brand-gray">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-equipment" element={<AddEquipment />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bank-flow" element={<BankFlow />} />
          </Routes>
        </main>
        
        {/* The bottom navigation bar that stays fixed */}
        <div className="fixed bottom-0 w-full left-0 right-0 flex justify-center z-50">
          <div className="w-full max-w-md">
            <BottomNav />
          </div>
        </div>

        {/* Global Full-Screen Install Prompt */}
        <InstallPrompt />

        {/* Global Splash Screen on Load */}
        <SplashScreen />

      </div>
    </BrowserRouter>
  );
}

export default App;

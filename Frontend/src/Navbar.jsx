import React from 'react';

const Navbar = () => {
  return (
    <nav className=" w-full z-50 flex items-center justify-between px-6 py-4 bg-black text-white border-b border-white shadow-md">
      <div className="text-lg font-semibold flex items-center gap-2">
        <span>🧠 pullreview</span>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <ul className="hidden md:flex gap-8 text-sm font-semibold">
          <li>
            <a href="#features" className="hover:text-purple-400 transition duration-300">
            home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-400 transition duration-300">
              login 
            </a>
          </li>
         
         
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

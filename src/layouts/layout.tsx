/** @format */

import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen min-h-fit md:pb-0 pb-[15vh]">
      {/* Navbar (optional, replace with your actual navbar component) */}
      {/* <header className="w-full p-4 bg-gray-800 text-white">Navbar</header> */}

      {/* Main Content */}
      <main className=" h-full w-full min-h-fit p-6   ">
        {children}
      </main>

      {/* Footer (optional) */}
      {/* <footer className="w-full p-4 bg-gray-700 text-white">Footer</footer> */}
    </div>
  );
};

export { MainLayout };


import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="w-full flex-1">
      {/* max-w-md ve px-[10px] kaldırıldı, içerik tam genişlikte */}
      <div className="w-full">
        {children}
      </div>
    </main>
  );
};

export default Layout;

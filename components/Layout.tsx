
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="w-full flex-1">
      <div className="max-w-md mx-auto px-[10px]">
        {children}
      </div>
    </main>
  );
};

export default Layout;

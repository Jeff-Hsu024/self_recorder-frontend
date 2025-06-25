import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

function MainContent({ children }: MainContentProps) {
  return (
    <main className="container mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Main Content</h2>
      {children}
    </main>
  );
}

export default MainContent;

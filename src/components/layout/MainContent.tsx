import React from 'react';
import Dashboard from '../dashboard/Dashboard';

interface MainContentProps {}

function MainContent() {
  return (
    <main className="container mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Main Content</h2>
      <Dashboard />
    </main>
  );
}

export default MainContent;

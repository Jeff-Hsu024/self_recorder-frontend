import React from 'react';
import Dashboard from '../dashboard/Dashboard';

interface MainContentProps {}

function MainContent() {
  return (
    <main className="container mx-auto py-8">
      <Dashboard />
    </main>
  );
}

export default MainContent;

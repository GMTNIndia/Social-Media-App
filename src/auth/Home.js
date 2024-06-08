
import React from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import RightSidebar from '../components/RightSidebar';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
    
      <div className="flex flex-1 flex-col md:flex-row">
      <RightSidebar className="order-1 md:order-3 w-full md:w-1/4 p-4 hidden sm:flex" />
      <MainContent className="order-2 md:order-2 w-full md:w-1/2 p-4" />
      <Sidebar className="hidden sm:flex order-3  m d:order-1 w-full md:w-1/4 p-4 hidden" />
        
       
      </div>
    </div>
  );
}

export default App;


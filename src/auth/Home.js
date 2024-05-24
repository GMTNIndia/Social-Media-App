import React from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import RightSidebar from '../components/RightSidebar';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* <div className="order-3 md:order-1 w-full md:w-1/4 p-4"> */}
        <RightSidebar />
          
        {/* </div> */}
        {/* <div className="order-2 md:order-2 w-full md:w-1/2 p-4"> */}
          <MainContent />
        {/* </div>
        <div className="order-1 md:order-3 w-full md:w-1/4 p-4"> */}
          {/* <RightSidebar /> */}
          <Sidebar />
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;

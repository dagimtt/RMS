import DirectorHeader from "../components/directoretcomponent/DirectorHeader";
import DirectorSidebar from "../components/directoretcomponent/DirectorSidebar";
import DirectorFooter from "../components/directoretcomponent/DirectorFooter";

const DirectorLayout = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen flex flex-col">
      {/* Header with highest z-index */}
      <DirectorHeader />
      
      <div className="flex flex-1 pt-16"> {/* pt-16 to account for header height */}
        {/* Sidebar with lower z-index */}
        <div className="z-30">
          <DirectorSidebar />
        </div>
        
        {/* Main content area */}
        <main className="flex-1 p-6 md:ml-64 z-10">
          {children}
        </main>
      </div>
      
      {/* Footer */}
      <DirectorFooter />
    </div>
  );
};

export default DirectorLayout;
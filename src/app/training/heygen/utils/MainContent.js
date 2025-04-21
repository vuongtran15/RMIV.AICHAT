import React from 'react';

const MainContent = ({ selectedItem }) => {
  return (
    <div className="flex-1 bg-purple-500 relative">
      {!selectedItem ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-xl font-medium mb-2">No Item Selected</p>
            <p className="text-sm opacity-80">Please select an item from the list below to start editing</p>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-4 right-4">
          {/* Add any additional controls here */}
        </div>
      )}
    </div>
  );
};

export default MainContent; 
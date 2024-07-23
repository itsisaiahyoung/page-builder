import React from 'react';

const SmartLayout = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default SmartLayout;
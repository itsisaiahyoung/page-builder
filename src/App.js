import React, { useState } from 'react';
import { ChevronLeft, User, Music, Pen, Crown } from 'lucide-react';
import './App.css'
import PageBuilder from './components/PageBuilder';
import PremiumPlansModal from './components/PremiumPlansModal';
import TextAnimation from './components/TextAnimation';

const templates = [
  { id: 'producer', name: 'Producer Template', icon: Music },
  { id: 'artist', name: 'Artist Template', icon: User },
  { id: 'custom', name: 'Custom Template', icon: Pen },
];

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
  };

  const handleSubscribe = () => {
    setIsPremium(true);
    setShowPremiumModal(false);
  };

  return (
    <div className="App flex flex-col min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-md"> {/* Updated header background */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              {selectedTemplate && (
                <button
                  onClick={handleBackToTemplates}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-slate-200 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back to Templates
                </button>
              )}
            </div>
            <div className="flex items-center justify-center flex-1">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200/60 to-slate-200 tracking-tight">VibeVault Builder PRO</h1>
            </div>
            <div className="flex items-center justify-end lg:w-0 lg:flex-1">
              <button
                onClick={() => setShowPremiumModal(true)}
                className={`mr-4 px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                  isPremium
                    ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                {isPremium ? 'Premium Active' : 'Upgrade to Premium'}
              </button>
              <div className="flex items-center space-x-2 text-slate-200">
                <User size={24} />
                <span className="text-sm font-medium">Guest</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-hidden">
        {!selectedTemplate ? (
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="template-button relative w-full h-80 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden p-1"
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="relative flex flex-col items-center justify-center h-full bg-white rounded-lg">
                    {React.createElement(template.icon, { size: 64, className: "mb-6 text-indigo-600" })}
                    <p className="text-2xl font-semibold text-gray-800">{template.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <TextAnimation />
          </div>
        ) : (
          <div className="h-full">
            <PageBuilder templateId={selectedTemplate} isPremium={isPremium} />
          </div>
        )}
      </main>
      {showPremiumModal && (
        <PremiumPlansModal 
          onClose={() => setShowPremiumModal(false)}
          onSubscribe={handleSubscribe}
        />
      )}
    </div>
  );
}

export default App;
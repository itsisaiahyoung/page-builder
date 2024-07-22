import React from 'react';
import { X } from 'lucide-react';

const PremiumPlansModal = ({ onClose, onSubscribe }) => {
  const plans = [
    { name: 'Basic', price: '$9.99/month', features: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Pro', price: '$19.99/month', features: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    { name: 'Enterprise', price: '$49.99/month', features: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-slate-800 rounded-lg p-6 w-3/4 max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-200">Upgrade to Premium</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div key={index} className="border border-slate-600 rounded-lg p-4 flex flex-col bg-slate-700">
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">{plan.name}</h3>
              <p className="text-2xl font-bold mb-4 text-slate-200">{plan.price}</p>
              <p className="mb-4 flex-grow text-slate-300 text-sm">{plan.features}</p>
              <button
                onClick={onSubscribe}
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumPlansModal;
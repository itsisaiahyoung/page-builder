import React from 'react';
import { X } from 'lucide-react';

const PremiumPlansModal = ({ onClose, onSubscribe }) => {
  const plans = [
    { name: 'Basic', price: '$9.99/month', features: ['5 pages', 'Basic templates', 'Email support'] },
    { name: 'Pro', price: '$19.99/month', features: ['Unlimited pages', 'Premium templates', 'Priority support', 'Custom domain'] },
    { name: 'Enterprise', price: '$49.99/month', features: ['Everything in Pro', 'White-label option', 'API access', 'Dedicated account manager'] },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div key={index} className="border rounded-lg p-4 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <ul className="mb-4 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2">{feature}</li>
                ))}
              </ul>
              <button
                onClick={onSubscribe}
                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors duration-200"
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
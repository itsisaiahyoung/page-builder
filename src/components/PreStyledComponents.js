import React from 'react';

export const ModernTitle = ({ content, align }) => (
  <h2 className={`text-4xl font-bold mb-6 text-slate-800 ${align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}`}>
    {content}
  </h2>
);

export const ModernParagraph = ({ content, align }) => (
  <p className={`text-lg leading-relaxed mb-6 text-slate-600 ${align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}`}>
    {content}
  </p>
);

export const ModernButton = ({ content, color, align }) => (
  <div className={`mb-6 ${align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}`}>
    <button className={`px-6 py-3 ${color} text-white rounded-full hover:opacity-90 transition-opacity duration-300 shadow-md`}>
      {content}
    </button>
  </div>
);

export const ModernImage = ({ content, alt, align }) => (
  <div className={`mb-6 ${align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}`}>
    <img src={content} alt={alt} className="rounded-lg shadow-md max-w-full h-auto" />
  </div>
);
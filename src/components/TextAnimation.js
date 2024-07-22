import React from 'react';

const TextAnimation = () => {
  return (
    <div className="relative font-inter antialiased mt-12">
      <div className="relative flex flex-col justify-center bg-slate-900 overflow-hidden rounded-lg p-8">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12">
          <div className="text-center">
            <div className="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200">
              Create stunning portfolios for{' '}
              <span className="text-indigo-500 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                <ul className="block animate-text-slide text-left leading-tight [&_li]:block">
                  <li>Musicians</li>
                  <li>Producers</li>
                  <li>Artists</li>
                  <li>Bands</li>
                  <li>DJs</li>
                  <li aria-hidden="true">Musicians</li>
                </ul>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAnimation;
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function PaymentSuccessModal({ onClose }) {
  const t = useTranslations('donation');
  const [countdown, setCountdown] = useState(8);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setIsVisible(true);

    // Auto-close countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#08743E] via-[#37A16C] to-[#36BD79] opacity-10" />
        
        {/* Content */}
        <div className="relative p-8 sm:p-10">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Success Icon with animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer circle animation */}
              <div className="absolute inset-0 rounded-full bg-[#36BD79]/20 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-[#37A16C]/30 animate-pulse" />
              
              {/* Success checkmark circle */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-[#08743E] to-[#36BD79] rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
                <svg 
                  className="w-14 h-14 text-white animate-scale-in" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7" 
                    className="animate-draw-check"
                    style={{
                      strokeDasharray: '20',
                      strokeDashoffset: '20'
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#08743E] mb-4">
            {t('paymentSuccess') || 'Payment Successful!'}
          </h2>

          {/* Message */}
          <p className="text-center text-gray-600 text-lg mb-6 leading-relaxed">
            {t('paymentSuccessMessage') || 'Thank you for your generous donation! Your contribution helps us plant trees and protect our environment.'}
          </p>

          {/* Countdown indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {t('autoCloseIn') || 'Auto-closing in'} <span className="font-semibold text-[#08743E]">{countdown}</span> {t('seconds') || 'seconds'}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#08743E] to-[#36BD79] rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${((8 - countdown) / 8) * 100}%` }}
            />
          </div>

          {/* Action button */}
          <button
            onClick={handleClose}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#08743E] to-[#36BD79] text-white font-semibold rounded-xl hover:from-[#065a2e] hover:to-[#2a8a5a] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t('close') || 'Close'}
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#36BD79]/5 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#08743E]/5 rounded-full translate-x-20 translate-y-20" />
      </div>
    </div>
  );
}


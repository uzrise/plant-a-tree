'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { donationsAPI } from '../../../lib/api';

export default function Contributors() {
  const t = useTranslations('contributors');
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContributors();
  }, []);

  const loadContributors = async () => {
    try {
      const response = await donationsAPI.getTopContributors();
      setContributors(response.data);
    } catch (err) {
      console.error('Failed to load contributors:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  const getMaxAmount = () => {
    if (contributors.length === 0) return 1000000;
    return Math.max(...contributors.map((c) => c.totalAmount));
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] w-full px-4 sm:px-6 md:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#08743E] mx-auto"></div>
        </div>
      </section>
    );
  }

  if (contributors.length === 0) {
    return null;
  }

  const maxAmount = getMaxAmount();

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] w-full px-4 sm:px-6 md:px-8">
      <h1 className="text-[#202225] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
        {t('title')}
      </h1>
      <p className="text-center text-[#787F84] font-medium text-sm sm:text-base md:text-lg mt-2 mb-8 sm:mb-12">
        {t('subtitle')}
      </p>
      
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
        <div className="space-y-4">
          {contributors.map((contributor, index) => {
            const percentage = (contributor.totalAmount / maxAmount) * 100;
            const isTop = index === 0;
            
            return (
              <div key={contributor.userId || index} className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2ZM12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8ZM12 14C13.1046 14 14 14.8954 14 16C14 17.1046 13.1046 18 12 18C10.8954 18 10 17.1046 10 16C10 14.8954 10.8954 14 12 14Z"
                      fill="#787F84"
                    />
                  </svg>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#202225] font-semibold text-base sm:text-lg md:text-xl truncate">
                      {contributor.name}
                    </span>
                    <span className="text-[#202225] font-semibold text-sm sm:text-base md:text-lg ml-4 whitespace-nowrap">
                      {formatAmount(contributor.totalAmount)} UZS
                    </span>
                  </div>
                  <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isTop ? 'bg-[#37A16C]' : 'bg-gray-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


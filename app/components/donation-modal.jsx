'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { donationsAPI } from '../../lib/api';
import { translateBackendError } from '../../lib/errorTranslations';

export default function DonationModal({ treeCount, onClose, onSuccess }) {
  const t = useTranslations('donation');
  const errorT = useTranslations('errors');
  const [amount, setAmount] = useState(treeCount * 12000);
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Ensure treeCount is a number
      const treeCountNum = Number(treeCount);
      const amountNum = Number(amount);
      
      if (isNaN(treeCountNum) || treeCountNum < 1) {
        setError(errorT('invalidTreeCount'));
        setLoading(false);
        return;
      }
      
      if (isNaN(amountNum) || amountNum < 12000 || amountNum > 100000000) {
        setError(t('amountError'));
        setLoading(false);
        return;
      }

      await donationsAPI.create({
        amount: amountNum,
        treeCount: treeCountNum,
        anonymous: anonymous,
      });
      // Reload page to refresh contributors section
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
      onSuccess();
    } catch (err) {
      const errorMsg = err.response?.data?.message || errorT('generic');
      setError(translateBackendError(errorMsg, errorT));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#08743E]">{t('title')}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('amount')}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={12000}
              max={100000000}
              step={1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08743E] focus:border-transparent"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              {t('amountHint', { treeCount, baseAmount: treeCount * 12000 })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="w-4 h-4 text-[#08743E] border-gray-300 rounded focus:ring-[#08743E]"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              {t('anonymous')}
            </label>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#08743E] text-white rounded-lg hover:bg-[#065a2e] transition-colors disabled:opacity-50"
            >
              {loading ? t('processing') : t('donate')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


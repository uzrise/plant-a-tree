'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { donationsAPI } from '../../lib/api';
import { translateBackendError } from '../../lib/errorTranslations';

export default function DonationModal({ treeCount, onClose, onSuccess }) {
  const t = useTranslations('donation');
  const errorT = useTranslations('errors');
  const [amount, setAmount] = useState(treeCount * 120000);
  const [anonymous, setAnonymous] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentUrl, setPaymentUrl] = useState(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !loading && !paymentUrl) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [loading, paymentUrl, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const treeCountNum = Number(treeCount);
      const amountNum = Number(amount);
      
      if (isNaN(treeCountNum) || treeCountNum < 1) {
        setError(errorT('invalidTreeCount'));
        setLoading(false);
        return;
      }
      
      if (isNaN(amountNum) || amountNum < 100000 || amountNum > 100000000) {
        setError(t('amountError'));
        setLoading(false);
        return;
      }

      if (!privacyAccepted) {
        setError(t('privacyRequired'));
        setLoading(false);
        return;
      }

      const response = await donationsAPI.create({
        amount: amountNum,
        treeCount: treeCountNum,
        anonymous: anonymous,
      });

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        throw new Error('Payment URL not received');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || errorT('generic');
      setError(translateBackendError(errorMsg, errorT));
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

        {paymentUrl ? (
          <div className="space-y-4">
            <p className="text-gray-700">
              {t('redirectingToPayment') || 'Redirecting to payment page...'}
            </p>
            <a
              href={paymentUrl}
              className="block w-full px-4 py-2 bg-[#08743E] text-white rounded-lg hover:bg-[#065a2e] transition-colors text-center"
            >
              {t('proceedToPayment') || 'Proceed to Payment'}
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('amount')}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={100000}
              max={100000000}
              step={1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08743E] focus:border-transparent"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              {t('amountHint', { treeCount, baseAmount: treeCount * 120000 })}
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

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="privacy"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="w-4 h-4 text-[#08743E] border-gray-300 rounded focus:ring-[#08743E] mt-0.5"
              required
            />
            <label htmlFor="privacy" className="text-sm text-gray-700">
              {t('privacyAgreement')}{' '}
              <a
                href={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                  typeof window !== 'undefined' 
                    ? `${window.location.origin}/Политика_конфиденциальности.docx`
                    : '/Политика_конфиденциальности.docx'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#08743E] hover:text-[#065a2e] underline"
                onClick={(e) => e.stopPropagation()}
              >
                {t('privacyPolicy')}
              </a>
              {t('privacyAgreementSuffix')}
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
        )}
      </div>
    </div>
  );
}


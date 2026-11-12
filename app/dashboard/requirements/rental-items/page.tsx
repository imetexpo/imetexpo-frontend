'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ComputerDesktopIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';
import { rentalItemsAPI, extraRequirementsAPI, RentalItem } from '@/lib/api/exhibitorClient';
import LoadingDots from '@/components/ui/LoadingDots';

function SuccessPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rental Items Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Your AV &amp; IT rental request has been submitted successfully.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002855] transition"
        >
          Back to Requirements
        </button>
      </div>
    </div>
  );
}

interface CartItem extends RentalItem {
  cost3Days: number;
  quantity: number;
}

export default function RentalItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentalItems = async () => {
      try {
        setLoading(true);
        const response = await rentalItemsAPI.getAll();
        if (response.success) {
          const activeItems: CartItem[] = (response.data || [])
            .filter((item: any) => item.isActive !== false)
            .map((item: any) => ({
              ...item,
              cost3Days: Number(item.costFor3Days ?? item.pricePerDay ?? 0),
              quantity: 0,
            }));
          setItems(activeItems);
        } else {
          setError('Failed to load rental items');
        }
      } catch (err: any) {
        console.error('Error fetching rental items:', err);
        setError(err.message || 'Failed to load items');
      } finally {
        setLoading(false);
      }
    };

    fetchRentalItems();
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const selectedItems = items.filter((i) => i.quantity > 0);
  const total = items.reduce((sum, item) => sum + item.cost3Days * item.quantity, 0);

  const groupedItems = items.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      alert('Please select at least one rental item');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const generalInfo = JSON.parse(localStorage.getItem('exhibitorGeneralInfo') || '{}');
      const boothDetails = JSON.parse(localStorage.getItem('exhibitorBoothDetails') || '{}');

      const rentalItems = selectedItems.map((item) => ({
        id: item.id,
        type: item.category || 'AV/IT Rental',
        description: item.description || item.name || item.itemKey || 'Rental Item',
        quantity: item.quantity,
        costFor3Days: item.cost3Days,
        totalCost: item.cost3Days * item.quantity,
      }));

      const response = await extraRequirementsAPI.submit({
        type: 'exhibitor',
        description: 'AV & IT rental requirement submission',
        generalInfo,
        boothDetails,
        eventName: 'IndiaMET 2027',
        rentalItems,
        totals: {
          servicesTotal: total,
          gst: Math.round(total * 0.18),
          total: Math.round(total * 1.18),
        },
        notes: 'AV & IT rental (3-day exhibition period)',
      } as any);

      if (response.success) {
        setSubmitted(true);
      } else {
        setError(response.error || 'Failed to submit requirement');
      }
    } catch (err: any) {
      console.error('Error submitting:', err);
      setError(err.response?.data?.error || err.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/dashboard/requirements');
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <LoadingDots className="mx-auto flex" />
        <p className="mt-4 text-gray-600">Loading rental catalog...</p>
      </div>
    );
  }

  if (submitted) return <SuccessPage onBack={handleBack} />;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-sky-100 rounded-xl flex items-center justify-center">
          <ComputerDesktopIcon className="h-6 w-6 text-[#003A77]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AV &amp; IT Equipment Rental</h1>
          <p className="text-gray-500 text-sm">
            Rent audio, video, and IT equipment for your booth (3-day exhibition period)
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rental Catalog */}
        <div className="lg:col-span-2 space-y-6">
          {Object.keys(groupedItems).length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-500">
              No active AV &amp; IT rental items available at the moment.
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div
                key={category}
                className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden"
              >
                <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">
                    {category === 'AV'
                      ? 'AV Equipment'
                      : category === 'IT'
                      ? 'IT Equipment'
                      : category}
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {categoryItems.map((item) => (
                    <div key={item.id} className="p-4 flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.description}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <ComputerDesktopIcon className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{item.description}</h3>
                        {item.itemKey && (
                          <p className="text-xs text-gray-400 font-mono">{item.itemKey}</p>
                        )}
                        <p className="text-sm font-bold text-[#003A77] mt-1">
                          ₹{item.cost3Days.toLocaleString()}{' '}
                          <span className="text-xs font-normal text-gray-400">/ 3 days</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity === 0}
                          className="p-1.5 text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#003A77] to-[#005999] rounded-2xl p-6 text-white sticky top-24 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <ComputerDesktopIcon className="h-5 w-5" />
              <h3 className="font-semibold">Your Rental Cart</h3>
              {selectedItems.length > 0 && (
                <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
                  {selectedItems.length} items
                </span>
              )}
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {selectedItems.length === 0 ? (
                <p className="text-sm text-white/70 text-center py-6">No items selected</p>
              ) : (
                selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm gap-2">
                    <span className="truncate">
                      {item.description} x{item.quantity}
                    </span>
                    <span className="font-medium shrink-0">
                      ₹{(item.cost3Days * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-white/20 pt-3 mb-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total (3 Days):</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-white/75 mt-1">
                * Prices are for 3-day exhibition period. GST 18% extra as applicable.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedItems.length === 0 || submitting}
              className="w-full py-2.5 bg-white text-[#003A77] font-semibold rounded-lg hover:bg-sky-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <LoadingDots size="sm" label="" />
                  Submitting...
                </span>
              ) : (
                'Submit Rental Request'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

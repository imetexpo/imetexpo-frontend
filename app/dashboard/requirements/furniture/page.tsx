'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ComputerDesktopIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  MinusIcon,
  PlusIcon,
  PhotoIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { furnitureAPI, extraRequirementsAPI } from '@/lib/api/exhibitorClient';
import LoadingDots from '@/components/ui/LoadingDots';

interface FurnitureItem {
  id: string;
  code: string;
  name?: string;
  description: string;
  size?: string | null;
  cost3Days: number;
  pricePerDay?: number;
  quantity: number;
  imageUrl: string | null;
  category: string;
  stockStatus?: string;
  inStock: boolean;
}

function SuccessPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Furniture Request Submitted!</h2>
        <p className="text-gray-600 mb-6">Your furniture rental request has been submitted successfully.</p>
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

export default function FurnitureRequirementsPage() {
  const router = useRouter();
  const [items, setItems] = useState<FurnitureItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        setLoading(true);
        const response = await furnitureAPI.getAll();
        if (response.success) {
          const mapped: FurnitureItem[] = (response.data || [])
            .filter((item: any) => item.isActive !== false)
            .map((item: any) => ({
            id: item.id,
            code: item.code || item.id,
            name: item.name,
            description: item.description || item.name || 'Furniture Item',
            size: item.size || null,
            cost3Days: Number(item.cost3Days ?? item.pricePerDay ?? 0),
            category: item.category || 'Furniture',
            imageUrl: item.imageUrl || null,
            inStock: item.inStock !== undefined ? Boolean(item.inStock) : item.stockStatus !== 'out_of_stock',
            quantity: 0,
          }));
          setItems(mapped);
        } else {
          setError('Failed to load furniture items');
        }
      } catch (err: any) {
        console.error('Error fetching furniture:', err);
        setError(err.message || 'Failed to load furniture');
      } finally {
        setLoading(false);
      }
    };

    fetchFurniture();
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

  const categories = ['all', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))];

  const filteredItems =
    selectedCategory === 'all' ? items : items.filter((i) => i.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert('Please select at least one furniture item');
      return;
    }

    setSubmitting(true);
    try {
      const furnitureItems = selectedItems.map((item) => ({
        id: item.id,
        code: item.code,
        description: item.description,
        size: item.size || undefined,
        quantity: item.quantity,
        cost: item.cost3Days,
        totalCost: item.cost3Days * item.quantity,
      }));

      const generalInfo = JSON.parse(localStorage.getItem('exhibitorGeneralInfo') || '{}');
      const boothDetails = JSON.parse(localStorage.getItem('exhibitorBoothDetails') || '{}');

      const response = await extraRequirementsAPI.submit({
        type: 'exhibitor',
        description: 'Furniture requirement submission',
        generalInfo,
        boothDetails,
        eventName: 'IndiaMET 2027',
        furnitureItems,
        totals: {
          servicesTotal: total,
          gst: Math.round(total * 0.18),
          total: Math.round(total * 1.18),
        },
        notes: 'Furniture rental (3-day exhibition period)',
      } as any);

      if (response.success) {
        setSubmitted(true);
        localStorage.removeItem('furnitureCart');
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

  if (submitted) return <SuccessPage onBack={handleBack} />;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto text-center py-12">
        <LoadingDots className="mx-auto flex" />
        <p className="mt-4 text-gray-600">Loading furniture catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Furniture</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
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
          <h1 className="text-2xl font-bold text-gray-900">Furniture & Equipment Rental</h1>
          <p className="text-gray-500 text-sm">
            Rent furniture, fixtures, and equipment for your booth (3-day exhibition period)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Furniture Catalog */}
        <div className="lg:col-span-2">
          {/* Category Filter */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#003A77] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden hover:shadow-md transition"
              >
                {/* Image */}
                <div className="h-44 bg-gray-100 flex items-center justify-center relative">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.description}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <PhotoIcon className="h-12 w-12 text-gray-300" />
                  )}
                  <div className="absolute top-2 left-2 bg-white/95 rounded-full px-2.5 py-0.5 text-xs font-semibold text-[#003A77] shadow-2xs">
                    {item.category}
                  </div>
                  <div className="absolute top-2 right-2 bg-slate-900/75 text-white rounded-md px-2 py-0.5 text-xs font-mono">
                    {item.code}
                  </div>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-[#003A77]/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{item.description}</h3>
                  {item.size && (
                    <p className="text-xs text-gray-500 mt-0.5">Size: {item.size}</p>
                  )}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-base font-bold text-[#003A77]">
                        ₹{item.cost3Days.toLocaleString()}
                      </p>
                      <span className="text-[11px] text-gray-400">3-day exhibition rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={!item.inStock || item.quantity === 0}
                        className="p-1.5 text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        disabled={!item.inStock}
                        className="p-1.5 text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#003A77] to-[#005999] rounded-2xl p-6 text-white sticky top-24 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCartIcon className="h-5 w-5" />
              <h3 className="font-semibold">Your Cart</h3>
              {selectedItems.length > 0 && (
                <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
                  {selectedItems.length} items
                </span>
              )}
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {selectedItems.length === 0 ? (
                <p className="text-sm text-white/70 text-center py-6">No items selected</p>
              ) : (
                selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm gap-2">
                    <span className="truncate">
                      {item.description} ({item.code}) x{item.quantity}
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
                * All furniture items are for 3-day exhibition period. GST 18% extra as applicable.
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

          {/* Delivery Info */}
          <div className="mt-4 bg-white border border-gray-200/80 rounded-2xl p-4 text-sm">
            <p className="font-semibold text-gray-800 mb-2">Delivery Information</p>
            <p className="text-gray-600 text-xs leading-relaxed">
              • Free delivery and pickup within exhibition premises
              <br />
              • Setup assistance available on request
              <br />
              • 24/7 support for any issues
              <br />• Damages policy applies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

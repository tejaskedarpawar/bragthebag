import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ImageIcon, LogOut,
  TrendingUp, ShoppingBag, Users, DollarSign, CheckCircle2, Clock, Truck
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useBannerStore } from '../store/useBannerStore';
import { MOCK_ORDERS } from '../data/mockData';

const STATUS_STYLES = {
  Processing: 'bg-blue-50 text-blue-700 border border-blue-100',
  Shipped: 'bg-amber-50 text-amber-700 border border-amber-100',
  Delivered: 'bg-green-50 text-green-700 border border-green-100',
};

const STATUS_ICONS = {
  Processing: <Clock size={12} />,
  Shipped: <Truck size={12} />,
  Delivered: <CheckCircle2 size={12} />,
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const bannerText = useBannerStore((s) => s.bannerText);
  const setBannerText = useBannerStore((s) => s.setBannerText);
  const [draftBanner, setDraftBanner] = useState(bannerText);
  const [bannerSaved, setBannerSaved] = useState(false);

  function handleLogout() {
    logout();
    navigate('/admin');
  }

  function saveBanner() {
    setBannerText(draftBanner);
    setBannerSaved(true);
    setTimeout(() => setBannerSaved(false), 2500);
  }

  const totalRevenue = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);

  return (
    <div className="min-h-screen flex bg-[#F7F5F0]">
      {/* Sidebar */}
      <aside className="w-60 bg-charcoal text-cream flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <p className="font-serif text-2xl lowercase tracking-tighter">
            bragthebag<span className="text-blush">.</span>
          </p>
          <p className="text-cream/40 text-[10px] tracking-[0.2em] uppercase mt-1">Admin Portal</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
            { id: 'orders', label: 'Orders', icon: <Package size={16} /> },
            { id: 'banner', label: 'Banner Settings', icon: <ImageIcon size={16} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                activeTab === item.id ? 'bg-forest text-cream' : 'text-cream/60 hover:bg-white/5 hover:text-cream'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-cream/50 hover:text-cream hover:bg-white/5 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-black/5 px-8 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-charcoal capitalize">
            {activeTab === 'overview' ? 'Sales Overview' : activeTab === 'orders' ? 'Order Management' : 'Banner Settings'}
          </h1>
          <div className="text-sm text-charcoal/40">Logged in as <strong className="text-charcoal">example@gmail.com</strong></div>
        </div>

        <div className="p-8">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <DollarSign size={20} />, color: 'text-forest bg-forest/10' },
                  { label: 'Total Orders', value: MOCK_ORDERS.length, icon: <ShoppingBag size={20} />, color: 'text-blue-600 bg-blue-50' },
                  { label: 'Orders Shipped', value: MOCK_ORDERS.filter((o) => o.status === 'Shipped').length, icon: <Truck size={20} />, color: 'text-amber-600 bg-amber-50' },
                  { label: 'Avg. Order Value', value: `₹${Math.round(totalRevenue / MOCK_ORDERS.length).toLocaleString('en-IN')}`, icon: <TrendingUp size={20} />, color: 'text-blush bg-blush/10' },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${s.color}`}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 font-semibold tracking-wider uppercase mb-0.5">{s.label}</p>
                      <p className="font-serif text-2xl text-charcoal">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Revenue Bar Chart (mock) */}
              <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                <h2 className="font-serif text-xl text-charcoal mb-6">Monthly Revenue</h2>
                <div className="flex items-end gap-3 h-40">
                  {[
                    { month: 'Jan', val: 72 },
                    { month: 'Feb', val: 55 },
                    { month: 'Mar', val: 88 },
                    { month: 'Apr', val: 63 },
                    { month: 'May', val: 100 },
                    { month: 'Jun', val: 78 },
                    { month: 'Jul', val: 45 },
                  ].map((d) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-forest/80 rounded-t-lg transition-all hover:bg-forest"
                        style={{ height: `${d.val}%` }}
                      />
                      <p className="text-xs text-charcoal/40 font-medium">{d.month}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-black/5">
                <p className="text-sm text-charcoal/50">{MOCK_ORDERS.length} total orders</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#F7F5F0] text-charcoal/50 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Order ID</th>
                      <th className="px-6 py-4 font-semibold">Customer</th>
                      <th className="px-6 py-4 font-semibold">City</th>
                      <th className="px-6 py-4 font-semibold">Product</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 text-sm">
                    {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAFAF5] transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-charcoal/60">{order.id}</td>
                        <td className="px-6 py-4 font-medium text-charcoal">{order.customer}</td>
                        <td className="px-6 py-4 text-charcoal/60">{order.city}</td>
                        <td className="px-6 py-4 text-charcoal/60">{order.product}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[order.status]}`}>
                            {STATUS_ICONS[order.status]} {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-serif text-forest font-semibold">
                          ₹{order.total.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* BANNER SETTINGS */}
          {activeTab === 'banner' && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8">
                <h2 className="font-serif text-2xl text-charcoal mb-2">Hero Marquee Text</h2>
                <p className="text-sm text-charcoal/50 mb-6">
                  This text scrolls across the Home page hero section. Changes take effect immediately site-wide.
                </p>
                <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal/60 mb-2">
                  Banner Message
                </label>
                <textarea
                  rows={4}
                  value={draftBanner}
                  onChange={(e) => { setDraftBanner(e.target.value); setBannerSaved(false); }}
                  className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest transition-colors bg-[#FAFAF5] resize-none mb-4"
                  placeholder="Enter scrolling banner text…"
                />
                <div className="mb-6">
                  <p className="text-xs text-charcoal/40 mb-2">Preview:</p>
                  <div className="bg-forest rounded-xl px-4 py-3 overflow-hidden">
                    <p className="text-cream text-sm font-medium tracking-widest uppercase truncate">
                      {draftBanner || '—'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={saveBanner}
                  className={`px-8 py-3 rounded-full font-semibold text-sm tracking-widest uppercase transition-all ${
                    bannerSaved ? 'bg-green-600 text-white' : 'bg-forest text-cream hover:bg-charcoal'
                  }`}
                >
                  {bannerSaved ? '✓ Saved & Live!' : 'Save Banner'}
                </button>
                {bannerSaved && (
                  <p className="text-green-600 text-xs mt-2">
                    The Home page marquee has been updated instantly.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

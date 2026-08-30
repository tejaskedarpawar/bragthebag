import { BarChart3, Package, Settings, Users, ArrowUpRight } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-forest text-cream flex flex-col">
        <div className="p-6 border-b border-forest-400">
          <h2 className="font-serif text-2xl lowercase tracking-tighter">
            bragthebag<span className="text-[#E8A365]">.</span>
          </h2>
          <p className="text-xs text-cream-200 mt-1 uppercase tracking-widest">Admin Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-forest-400/30 rounded-md text-sm font-medium">
            <BarChart3 size={18} /> Overview
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-forest-400/20 rounded-md text-sm font-medium transition-colors">
            <Package size={18} /> Orders
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-forest-400/20 rounded-md text-sm font-medium transition-colors">
            <Users size={18} /> Customers
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-forest-400/20 rounded-md text-sm font-medium transition-colors">
            <Settings size={18} /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-charcoal">Dashboard</h1>
          <button className="bg-forest text-cream px-4 py-2 text-sm font-medium hover:bg-forest-600 transition-colors">
            Download Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-cream-200 shadow-sm">
            <h3 className="text-sm font-medium text-charcoal-400 uppercase tracking-widest mb-2">Total Revenue</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-serif text-forest">₹1,24,500</span>
              <span className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                <ArrowUpRight size={14} className="mr-1" /> 12%
              </span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-cream-200 shadow-sm">
            <h3 className="text-sm font-medium text-charcoal-400 uppercase tracking-widest mb-2">Orders</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-serif text-forest">48</span>
              <span className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                <ArrowUpRight size={14} className="mr-1" /> 8%
              </span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-cream-200 shadow-sm">
            <h3 className="text-sm font-medium text-charcoal-400 uppercase tracking-widest mb-2">Avg. Order Value</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-serif text-forest">₹2,593</span>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl border border-cream-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-cream-200 flex justify-between items-center">
            <h2 className="text-lg font-serif text-charcoal">Recent Orders</h2>
            <a href="#" className="text-sm text-forest hover:underline">View All</a>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream-50 text-charcoal-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-cream-100">
              <tr className="hover:bg-cream-50/50 transition-colors">
                <td className="px-6 py-4 font-medium">#ORD-092</td>
                <td className="px-6 py-4">Riya Sharma</td>
                <td className="px-6 py-4">Custom Handbag (Forest)</td>
                <td className="px-6 py-4"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium border border-blue-100">In Production</span></td>
                <td className="px-6 py-4 font-medium">₹3,998</td>
              </tr>
              <tr className="hover:bg-cream-50/50 transition-colors">
                <td className="px-6 py-4 font-medium">#ORD-091</td>
                <td className="px-6 py-4">Aman Gupta</td>
                <td className="px-6 py-4">Office Bag (Charcoal)</td>
                <td className="px-6 py-4"><span className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs font-medium border border-green-100">Shipped</span></td>
                <td className="px-6 py-4 font-medium">₹2,499</td>
              </tr>
              <tr className="hover:bg-cream-50/50 transition-colors">
                <td className="px-6 py-4 font-medium">#ORD-090</td>
                <td className="px-6 py-4">Sneha Patel</td>
                <td className="px-6 py-4">Tote (Cream)</td>
                <td className="px-6 py-4"><span className="bg-yellow-50 text-yellow-600 px-2 py-1 rounded text-xs font-medium border border-yellow-100">New</span></td>
                <td className="px-6 py-4 font-medium">₹2,499</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

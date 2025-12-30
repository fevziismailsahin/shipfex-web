import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. IMPORT EKLENDİ
import { Search, Plus, Trash2, Filter, X } from 'lucide-react';

// Types
interface Product { id: number; name: string; sku: string; stock: number; }
interface Order { id: number; customer: string; product_id: number; quantity: number; status: string; }

export default function Orders() {
  const navigate = useNavigate(); // <--- 2. NAVIGATE KANCASI EKLENDİ
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  // Form Data
  const [newOrder, setNewOrder] = useState({ customer: "", product_id: 0, quantity: 1 });

  // --- API CALLS ---
  const fetchData = () => {
    fetch('http://localhost:3000/products').then(r => r.json()).then(setProducts);
    fetch('http://localhost:3000/orders').then(r => r.json()).then(setOrders);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/orders', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(newOrder) 
    });
    
    if (res.ok) { 
      setNewOrder({ customer: "", product_id: 0, quantity: 1 }); 
      setIsOrderModalOpen(false); 
      fetchData(); 
    } else { 
      alert("Error: " + await res.text()); 
    }
  };

  const handleDeleteOrder = async (id: number) => {
    if(confirm("Cancel this order?")) { 
      await fetch(`http://localhost:3000/orders/${id}`, { method: 'DELETE' }); 
      fetchData(); 
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ACTION BAR */}
      <div className="flex justify-end">
        <button onClick={() => setIsOrderModalOpen(true)} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition shadow-sm flex items-center gap-2">
          <Plus size={16} /> New Order
        </button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        {/* Filters */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input placeholder="Search orders..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 shadow-sm" />
          </div>
          <button className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 transition shadow-sm">
            <Filter size={14} /> Filter Status
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                {/* 3. YENİ SÜTUN BAŞLIĞI */}
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Tracking</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Cancel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map(o => {
                const prod = products.find(p => p.id === o.product_id);
                return (
                  <tr key={o.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">#{o.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{o.customer}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{prod?.name || "-"}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{o.quantity}</td>
                    <td className="px-6 py-4"><span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">{o.status}</span></td>
                    
                    {/* 4. YENİ TAKİP BUTONU */}
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => navigate(`/orders/${o.id}/tracking`)}
                        className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-100 transition border border-indigo-100"
                      >
                        Track
                      </button>
                    </td>

                    <td className="px-6 py-4 text-center"><button onClick={() => handleDeleteOrder(o.id)} className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded"><Trash2 size={16}/></button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in">
            <button onClick={() => setIsOrderModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><X size={20}/></button>
            <h2 className="text-xl font-bold mb-6 text-slate-800">New Order</h2>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase">Customer</label><input className="w-full border border-slate-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" value={newOrder.customer} onChange={e => setNewOrder({...newOrder, customer: e.target.value})} required placeholder="Full Name" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase">Product</label><select className="w-full border border-slate-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none bg-white" value={newOrder.product_id} onChange={e => setNewOrder({...newOrder, product_id: Number(e.target.value)})} required><option value={0}>Select...</option>{products.map(p => <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>)}</select></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase">Quantity</label><input type="number" min="1" className="w-full border border-slate-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" value={newOrder.quantity} onChange={e => setNewOrder({...newOrder, quantity: Number(e.target.value)})} required /></div>
              <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition mt-2">Confirm</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
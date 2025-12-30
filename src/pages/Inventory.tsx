import { useEffect, useState } from 'react';
import { 
  Package, Search, Plus, Trash2, Filter, 
  ArrowUpRight, Edit3, Check, X, AlertCircle 
} from 'lucide-react';

// Types
interface Product { id: number; name: string; sku: string; stock: number; }

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  
  // Inline Editing State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  // Form Data
  const [newProduct, setNewProduct] = useState({ name: "", sku: "", stock: 0 });

  // --- API CALLS ---
  const fetchProducts = () => {
    fetch('http://localhost:3000/products')
      .then(r => r.json())
      .then(setProducts)
      .catch(err => console.error("API Error:", err));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:3000/products', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(newProduct) 
    });
    setNewProduct({ name: "", sku: "", stock: 0 }); 
    setIsProductModalOpen(false); 
    fetchProducts();
  };

  const handleDeleteProduct = async (id: number) => {
    if(confirm("Are you sure you want to delete this product?")) { 
      await fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE' }); 
      fetchProducts(); 
    }
  };

  // Inline Editing Logic
  const startEditing = (p: Product) => { setEditingId(p.id); setEditValue(p.stock.toString()); };
  
  const saveStock = async (id: number, currentStock: number) => {
    const newVal = parseInt(editValue);
    if(isNaN(newVal) || newVal < 0) { setEditingId(null); return; }
    
    const diff = newVal - currentStock;
    if(diff !== 0) { 
      await fetch(`http://localhost:3000/products/${id}/stock`, { 
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ amount: diff }) 
      }); 
      fetchProducts(); 
    }
    setEditingId(null);
  };

  // KPI Calculations
  const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0);
  const lowStock = products.filter(p => p.stock < 10).length;

  return (
    <div className="space-y-6">
      
      {/* ACTION BAR */}
      <div className="flex justify-end">
        <button onClick={() => setIsProductModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-md shadow-indigo-100 flex items-center gap-2">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Products</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-800">{products.length}</h3>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded flex items-center gap-1">Active <Check size={12}/></span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Stock</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-800">{totalStock}</h3>
            <span className="text-indigo-600 text-xs font-bold bg-indigo-50 px-2 py-1 rounded flex items-center gap-1">Units <Package size={12}/></span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Critical Stock</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-800">{lowStock}</h3>
            <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${lowStock > 0 ? 'text-red-600 bg-red-50' : 'text-slate-400 bg-slate-100'}`}>
              {lowStock > 0 ? 'Warning!' : 'Stable'} <AlertCircle size={12}/>
            </span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hidden sm:block">
          <p className="text-xs font-bold text-slate-400 uppercase">Revenue (Est.)</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-800">$12,450</h3>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded flex items-center gap-1">+2.4% <ArrowUpRight size={12}/></span>
          </div>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        {/* Filters */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input placeholder="Search products..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 shadow-sm" />
          </div>
          <button className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 transition shadow-sm">
            <Filter size={14} /> Sort
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Info</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Stock (Edit)</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-indigo-50/30 transition group">
                  <td className="px-6 py-4 font-medium text-slate-900">{p.name}</td>
                  <td className="px-6 py-4"><span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">{p.sku}</span></td>
                  <td className="px-6 py-4">
                    {p.stock > 10 ? <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">In Stock</span> : 
                     p.stock > 0 ? <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Low Stock</span> : 
                     <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Out of Stock</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {editingId === p.id ? (
                      <div className="flex justify-end gap-2"><input autoFocus type="number" className="w-20 border-2 border-indigo-500 rounded px-1 py-1 text-right text-sm font-bold outline-none" value={editValue} onChange={(e) => setEditValue(e.target.value)} onBlur={() => saveStock(p.id, p.stock)} onKeyDown={(e) => e.key === 'Enter' && saveStock(p.id, p.stock)} /></div>
                    ) : (
                      <div onClick={() => startEditing(p)} className="cursor-pointer group/edit flex justify-end items-center gap-2">
                        <span className={`font-bold text-sm ${p.stock < 10 ? 'text-red-600' : 'text-slate-700'}`}>{p.stock}</span><Edit3 size={14} className="text-slate-300 group-hover/edit:text-indigo-500" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center"><button onClick={() => handleDeleteProduct(p.id)} className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded"><Trash2 size={16}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in">
            <button onClick={() => setIsProductModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><X size={20}/></button>
            <h2 className="text-xl font-bold mb-6 text-slate-800">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase">Product Name</label><input className="w-full border border-slate-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required placeholder="Ex: MacBook" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-slate-500 uppercase">SKU</label><input className="w-full border border-slate-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none uppercase font-mono" value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} required placeholder="MAC-01" /></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase">Stock</label><input type="number" className="w-full border border-slate-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} required placeholder="0" /></div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition mt-2">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
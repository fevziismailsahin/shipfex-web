import { useEffect, useState } from 'react';
import { 
  Package, Search, Plus, Trash2, Filter, 
  ArrowUpRight, Edit3, Check, X, AlertCircle 
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

// Types
interface Product { id: number; name: string; sku: string; stock: number; }
interface MerchantProduct { id: number; name: string; sku: string; price_cents: number; currency: string; }
interface MerchantInventorySummary {
  warehouses: Array<{ warehouse_id: string; sku_count: number; on_hand: number; reserved: number; available: number }>;
}

export default function Inventory() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [merchantProducts, setMerchantProducts] = useState<MerchantProduct[]>([]);
  const [merchantInventory, setMerchantInventory] = useState<MerchantInventorySummary | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Table controls
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'sku' | 'stock' | 'price'>('name');
  
  // Inline Editing State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  // Form Data
  const [newProduct, setNewProduct] = useState({ name: "", sku: "", stock: 0 });
  const [newMerchantProduct, setNewMerchantProduct] = useState({ name: "", sku: "", price_cents: 0, currency: "USD" });

  // --- API CALLS ---
  const fetchProducts = async () => {
    try {
      if (user?.role === 'MERCHANT') {
        const [prods, inv] = await Promise.all([
          api.merchantListProducts(),
          api.merchantInventorySummary(),
        ]);
        setMerchantProducts(prods);
        setMerchantInventory(inv);
        return;
      }

      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const cycleSort = () => {
    // Keep it simple: one button cycles keys; direction is always ascending.
    const keys: Array<typeof sortKey> = user?.role === 'MERCHANT'
      ? ['name', 'sku', 'price']
      : ['name', 'sku', 'stock'];
    const idx = keys.indexOf(sortKey);
    const next = keys[(idx + 1) % keys.length];
    setSortKey(next);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.role === 'MERCHANT') {
      await api.merchantCreateProduct({
        name: newMerchantProduct.name,
        sku: newMerchantProduct.sku,
        price_cents: newMerchantProduct.price_cents,
        currency: newMerchantProduct.currency,
      });
      setNewMerchantProduct({ name: "", sku: "", price_cents: 0, currency: "USD" });
    } else {
      await api.createProduct(newProduct);
      setNewProduct({ name: "", sku: "", stock: 0 });
    }
    setIsProductModalOpen(false); 
    fetchProducts();
  };

  const handleDeleteProduct = async (id: number) => {
    if(confirm("Are you sure you want to delete this product?")) { 
      if (user?.role === 'MERCHANT') {
        await api.merchantDeleteProduct(id);
      } else {
        await api.deleteProduct(id);
      }
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
      await api.updateStock(id, diff);
      fetchProducts(); 
    }
    setEditingId(null);
  };

  // KPI Calculations
  const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0);
  const lowStock = products.filter(p => p.stock < 10).length;

  const totalAvailable = (merchantInventory?.warehouses || []).reduce((acc, w) => acc + (w.available ?? 0), 0);
  const warehousesCount = merchantInventory?.warehouses?.length || 0;

  const visibleRows = (() => {
    const raw = (user?.role === 'MERCHANT' ? merchantProducts : products) as any[];
    const q = searchQuery.trim().toLowerCase();
    const filtered = q
      ? raw.filter((p) => {
          const name = String(p.name ?? '').toLowerCase();
          const sku = String(p.sku ?? '').toLowerCase();
          return name.includes(q) || sku.includes(q);
        })
      : raw;

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === 'name') return String(a.name ?? '').localeCompare(String(b.name ?? ''));
      if (sortKey === 'sku') return String(a.sku ?? '').localeCompare(String(b.sku ?? ''));
      if (sortKey === 'stock') return Number(a.stock ?? 0) - Number(b.stock ?? 0);
      // price
      return Number(a.price_cents ?? 0) - Number(b.price_cents ?? 0);
    });
    return sorted;
  })();

  const sortLabel = (() => {
    if (sortKey === 'name') return 'Name';
    if (sortKey === 'sku') return 'SKU';
    if (sortKey === 'stock') return 'Stock';
    return 'Price';
  })();

  return (
    <div className="space-y-6">
      
      {/* ACTION BAR */}
      <div className="flex justify-end">
        <button onClick={() => setIsProductModalOpen(true)} className="sf-btn sf-btn-primary">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Products</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-800">{user?.role === 'MERCHANT' ? merchantProducts.length : products.length}</h3>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded flex items-center gap-1">Active <Check size={12}/></span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Available</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-800">{user?.role === 'MERCHANT' ? totalAvailable : totalStock}</h3>
            <span className="text-indigo-600 text-xs font-bold bg-indigo-50 px-2 py-1 rounded flex items-center gap-1">Units <Package size={12}/></span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Warehouses</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-slate-800">{user?.role === 'MERCHANT' ? warehousesCount : lowStock}</h3>
            <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${(user?.role === 'MERCHANT' ? warehousesCount : lowStock) > 0 ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 bg-slate-100'}`}>
              {user?.role === 'MERCHANT' ? 'Active' : (lowStock > 0 ? 'Warning!' : 'Stable')} <AlertCircle size={12}/>
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
      <div className="card flex flex-col overflow-hidden">
        {/* Filters */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sf-input pl-9 pr-4 w-64"
            />
          </div>
          <button className="sf-btn sf-btn-secondary px-3" onClick={cycleSort}>
            <Filter size={14} /> Sort: {sortLabel}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="sf-table min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="sf-th">Product Info</th>
                <th className="sf-th">SKU</th>
                <th className="sf-th">Status</th>
                <th className="sf-th text-right">{user?.role === 'MERCHANT' ? 'Price' : 'Stock (Edit)'}</th>
                <th className="sf-th text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleRows.map((p: any) => (
                <tr key={p.id} className="hover:bg-indigo-50/30 transition group">
                  <td className="sf-td font-medium text-slate-900">{p.name}</td>
                  <td className="sf-td"><span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">{p.sku}</span></td>
                  <td className="sf-td">
                    {user?.role === 'MERCHANT'
                      ? <span className="sf-badge bg-emerald-100 text-emerald-800">Active</span>
                      : (p.stock > 10 ? <span className="sf-badge bg-emerald-100 text-emerald-800">In Stock</span> : 
                        p.stock > 0 ? <span className="sf-badge bg-amber-100 text-amber-800">Low Stock</span> : 
                        <span className="sf-badge bg-rose-100 text-rose-800">Out of Stock</span>)}
                  </td>
                  <td className="sf-td text-right">
                    {user?.role === 'MERCHANT' ? (
                      <div className="flex justify-end items-center gap-2">
                        <span className="font-bold text-sm text-slate-700">{(p.price_cents / 100).toFixed(2)} {p.currency}</span>
                      </div>
                    ) : (editingId === p.id ? (
                      <div className="flex justify-end gap-2"><input autoFocus type="number" className="w-20 sf-input px-2 py-1 text-right font-bold border-indigo-500" value={editValue} onChange={(e) => setEditValue(e.target.value)} onBlur={() => saveStock(p.id, p.stock)} onKeyDown={(e) => e.key === 'Enter' && saveStock(p.id, p.stock)} /></div>
                    ) : (
                      <div onClick={() => startEditing(p)} className="cursor-pointer group/edit flex justify-end items-center gap-2">
                        <span className={`font-bold text-sm ${p.stock < 10 ? 'text-red-600' : 'text-slate-700'}`}>{p.stock}</span><Edit3 size={14} className="text-slate-300 group-hover/edit:text-indigo-500" />
                      </div>
                    ))}
                  </td>
                  <td className="sf-td text-center"><button onClick={() => handleDeleteProduct(p.id)} className="sf-icon-btn-danger"><Trash2 size={16}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isProductModalOpen && (
        <div className="sf-modal-backdrop">
          <div className="sf-modal animate-in fade-in zoom-in">
            <button onClick={() => setIsProductModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><X size={20}/></button>
            <h2 className="text-xl font-bold mb-6 text-slate-800">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase">Product Name</label><input className="sf-input sf-input-lg mt-1" value={user?.role === 'MERCHANT' ? newMerchantProduct.name : newProduct.name} onChange={e => user?.role === 'MERCHANT' ? setNewMerchantProduct({...newMerchantProduct, name: e.target.value}) : setNewProduct({...newProduct, name: e.target.value})} required placeholder="Ex: MacBook" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-slate-500 uppercase">SKU</label><input className="sf-input sf-input-lg mt-1 uppercase font-mono" value={user?.role === 'MERCHANT' ? newMerchantProduct.sku : newProduct.sku} onChange={e => user?.role === 'MERCHANT' ? setNewMerchantProduct({...newMerchantProduct, sku: e.target.value}) : setNewProduct({...newProduct, sku: e.target.value})} required placeholder="MAC-01" /></div>
                {user?.role === 'MERCHANT' ? (
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Price (cents)</label>
                    <input type="number" min="0" className="sf-input sf-input-lg mt-1" value={newMerchantProduct.price_cents} onChange={e => setNewMerchantProduct({...newMerchantProduct, price_cents: Number(e.target.value)})} required placeholder="1299" />
                  </div>
                ) : (
                  <div><label className="text-xs font-bold text-slate-500 uppercase">Stock</label><input type="number" className="sf-input sf-input-lg mt-1" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} required placeholder="0" /></div>
                )}
              </div>
              <button type="submit" className="sf-btn sf-btn-primary w-full py-3 mt-2">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
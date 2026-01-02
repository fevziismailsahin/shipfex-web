import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. IMPORT EKLENDİ
import { Search, Plus, Trash2, Filter, X } from 'lucide-react';
import { api } from '../services/api';
import type { MerchantOrder, MerchantProduct } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

// Types
interface Product { id: number; name: string; sku: string; stock: number; }
interface Order { id: number; customer: string; product_id: number; quantity: number; status: string; }

export default function Orders() {
  const navigate = useNavigate(); // <--- 2. NAVIGATE KANCASI EKLENDİ
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [merchantOrders, setMerchantOrders] = useState<MerchantOrder[]>([]);
  const [merchantProducts, setMerchantProducts] = useState<MerchantProduct[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Table controls
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Form Data
  const [newOrder, setNewOrder] = useState({ customer: "", product_id: 0, quantity: 1 });
  const [newMerchantOrder, setNewMerchantOrder] = useState({
    customer: '',
    channel: 'SHOPIFY',
    external_order_ref: '',
    product_id: 0,
    quantity: 1,
  });

  // --- API CALLS ---
  const fetchData = async () => {
    if (user?.role === 'MERCHANT') {
      const [productsRes, ordersRes] = await Promise.all([
        api.merchantListProducts(),
        api.merchantListOrders(),
      ]);
      setMerchantProducts(productsRes);
      setMerchantOrders(ordersRes);
      return;
    }

    const [productsRes, ordersRes] = await Promise.all([
      api.getProducts(),
      api.getOrders(),
    ]);
    setProducts(productsRes);
    setOrders(ordersRes);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user?.role === 'MERCHANT') {
        await api.merchantCreateOrder({
          customer: newMerchantOrder.customer,
          channel: newMerchantOrder.channel,
          external_order_ref: newMerchantOrder.external_order_ref || undefined,
          items: [{ product_id: newMerchantOrder.product_id, quantity: newMerchantOrder.quantity }],
        });
        setNewMerchantOrder({
          customer: '',
          channel: 'SHOPIFY',
          external_order_ref: '',
          product_id: 0,
          quantity: 1,
        });
      } else {
        await api.createOrder(newOrder);
        setNewOrder({ customer: "", product_id: 0, quantity: 1 });
      }
      setIsOrderModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Error creating order");
    }
  };

  const handleDeleteOrder = async (id: number) => {
    if(confirm("Cancel this order?")) { 
      await api.deleteOrder(id);
      fetchData(); 
    }
  };

  const productNameById = new Map(products.map((p) => [p.id, p.name] as const));

  const statusOptions = (() => {
    const src = user?.role === 'MERCHANT' ? merchantOrders : orders;
    const uniq = Array.from(new Set(src.map((o: any) => String(o.status ?? '')))).filter(Boolean).sort();
    return ['All', ...uniq];
  })();

  const cycleStatus = () => {
    const idx = statusOptions.indexOf(statusFilter);
    const next = statusOptions[(idx + 1) % statusOptions.length];
    setStatusFilter(next);
  };

  const visibleMerchantOrders = (() => {
    const q = searchQuery.trim().toLowerCase();
    return merchantOrders
      .filter((o) => (statusFilter === 'All' ? true : o.status === statusFilter))
      .filter((o) => {
        if (!q) return true;
        return (
          String(o.id).includes(q) ||
          String(o.customer ?? '').toLowerCase().includes(q) ||
          String(o.channel ?? '').toLowerCase().includes(q) ||
          String(o.status ?? '').toLowerCase().includes(q) ||
          String(o.external_order_ref ?? '').toLowerCase().includes(q)
        );
      });
  })();

  const visibleOrders = (() => {
    const q = searchQuery.trim().toLowerCase();
    return orders
      .filter((o) => (statusFilter === 'All' ? true : o.status === statusFilter))
      .filter((o) => {
        if (!q) return true;
        const prodName = productNameById.get(o.product_id) || '';
        return (
          String(o.id).includes(q) ||
          String(o.customer ?? '').toLowerCase().includes(q) ||
          String(o.status ?? '').toLowerCase().includes(q) ||
          String(prodName).toLowerCase().includes(q)
        );
      });
  })();

  return (
    <div className="space-y-6">
      
      {/* ACTION BAR */}
      <div className="flex justify-end">
        <button onClick={() => setIsOrderModalOpen(true)} className="sf-btn sf-btn-secondary">
          <Plus size={16} /> New Order
        </button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="card flex flex-col overflow-hidden">
        {/* Filters */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              placeholder="Search orders…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sf-input pl-9 pr-4 w-64"
            />
          </div>
          <button className="sf-btn sf-btn-secondary px-3" onClick={cycleStatus}>
            <Filter size={14} /> Status: {statusFilter}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="sf-table min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {user?.role === 'MERCHANT' ? (
                  <>
                    <th className="sf-th">Order ID</th>
                    <th className="sf-th">Customer</th>
                    <th className="sf-th">Channel</th>
                    <th className="sf-th">Status</th>
                    <th className="sf-th text-center">Details</th>
                  </>
                ) : (
                  <>
                    <th className="sf-th">Order ID</th>
                    <th className="sf-th">Customer</th>
                    <th className="sf-th">Product</th>
                    <th className="sf-th">Qty</th>
                    <th className="sf-th">Status</th>
                    {/* 3. YENİ SÜTUN BAŞLIĞI */}
                    <th className="sf-th text-center">Tracking</th>
                    <th className="sf-th text-center">Cancel</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {user?.role === 'MERCHANT'
                ? visibleMerchantOrders.map(o => (
                    <tr key={o.id} className="hover:bg-slate-50 transition">
                      <td className="sf-td font-mono text-xs text-slate-500">#{o.id}</td>
                      <td className="sf-td font-medium text-slate-900">{o.customer}</td>
                      <td className="sf-td text-slate-600 text-sm">{o.channel}</td>
                      <td className="sf-td"><span className="sf-badge sf-badge-indigo">{o.status}</span></td>
                      <td className="sf-td text-center">
                        <button
                          onClick={() => navigate(`/dashboard/merchant/orders/${o.id}`)}
                          className="sf-btn sf-btn-soft px-3 py-1.5 text-xs"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                : visibleOrders.map(o => {
                  const prod = productNameById.get(o.product_id);
                    return (
                      <tr key={o.id} className="hover:bg-slate-50 transition">
                        <td className="sf-td font-mono text-xs text-slate-500">#{o.id}</td>
                        <td className="sf-td font-medium text-slate-900">{o.customer}</td>
                        <td className="sf-td text-slate-600 text-sm">{prod || "-"}</td>
                        <td className="sf-td font-bold text-slate-700">{o.quantity}</td>
                        <td className="sf-td"><span className="sf-badge sf-badge-indigo">{o.status}</span></td>

                        {/* 4. YENİ TAKİP BUTONU */}
                        <td className="sf-td text-center">
                          <button
                            onClick={() => navigate(`/dashboard/orders/${o.id}/tracking`)}
                            className="sf-btn sf-btn-soft px-3 py-1.5 text-xs"
                          >
                            Track
                          </button>
                        </td>

                        <td className="sf-td text-center"><button onClick={() => handleDeleteOrder(o.id)} className="sf-icon-btn-danger"><Trash2 size={16}/></button></td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isOrderModalOpen && (
        <div className="sf-modal-backdrop">
          <div className="sf-modal animate-in fade-in zoom-in">
            <button onClick={() => setIsOrderModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><X size={20}/></button>
            <h2 className="text-xl font-bold mb-6 text-slate-800">New Order</h2>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              {user?.role === 'MERCHANT' ? (
                <>
                  <div><label className="text-xs font-bold text-slate-500 uppercase">Customer</label><input className="sf-input sf-input-lg mt-1" value={newMerchantOrder.customer} onChange={e => setNewMerchantOrder({...newMerchantOrder, customer: e.target.value})} required placeholder="Full Name" /></div>
                  <div><label className="text-xs font-bold text-slate-500 uppercase">Channel</label><select className="sf-select sf-input-lg mt-1" value={newMerchantOrder.channel} onChange={e => setNewMerchantOrder({...newMerchantOrder, channel: e.target.value})} required><option value="SHOPIFY">SHOPIFY</option><option value="AMAZON">AMAZON</option><option value="MANUAL">MANUAL</option></select></div>
                  <div><label className="text-xs font-bold text-slate-500 uppercase">External Ref (optional)</label><input className="sf-input sf-input-lg mt-1" value={newMerchantOrder.external_order_ref} onChange={e => setNewMerchantOrder({...newMerchantOrder, external_order_ref: e.target.value})} placeholder="Shopify/Amazon reference" /></div>
                  <div><label className="text-xs font-bold text-slate-500 uppercase">Product</label><select className="sf-select sf-input-lg mt-1" value={newMerchantOrder.product_id} onChange={e => setNewMerchantOrder({...newMerchantOrder, product_id: Number(e.target.value)})} required><option value={0}>Select...</option>{merchantProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
                  <div><label className="text-xs font-bold text-slate-500 uppercase">Quantity</label><input type="number" min="1" className="sf-input sf-input-lg mt-1" value={newMerchantOrder.quantity} onChange={e => setNewMerchantOrder({...newMerchantOrder, quantity: Number(e.target.value)})} required /></div>
                </>
              ) : (
                <>
                  <div><label className="text-xs font-bold text-slate-500 uppercase">Customer</label><input className="sf-input sf-input-lg mt-1" value={newOrder.customer} onChange={e => setNewOrder({...newOrder, customer: e.target.value})} required placeholder="Full Name" /></div>
                  <div><label className="text-xs font-bold text-slate-500 uppercase">Product</label><select className="sf-select sf-input-lg mt-1" value={newOrder.product_id} onChange={e => setNewOrder({...newOrder, product_id: Number(e.target.value)})} required><option value={0}>Select...</option>{products.map(p => <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>)}</select></div>
                  <div><label className="text-xs font-bold text-slate-500 uppercase">Quantity</label><input type="number" min="1" className="sf-input sf-input-lg mt-1" value={newOrder.quantity} onChange={e => setNewOrder({...newOrder, quantity: Number(e.target.value)})} required /></div>
                </>
              )}
              <button type="submit" className="sf-btn sf-btn-primary w-full py-3 mt-2">Confirm</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
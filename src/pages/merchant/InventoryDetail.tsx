import { Link } from 'react-router-dom'
import { Package, Warehouse, TrendingDown, AlertTriangle, BarChart3, MapPin, Edit } from 'lucide-react'

export default function InventoryDetail() {
  // Mock data - will be replaced with API call
  const product = {
    id: 'prod_abc123',
    name: 'Wireless Bluetooth Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    sku: 'WBH-2024-BLK',
    asin: 'B08XYZ1234',
    upc: '012345678901',
    barcode: '012345678901',
    category: 'Electronics',
    totalAvailable: 1247,
    totalReserved: 83,
    totalInTransit: 500,
    dimensions: { length: 8, width: 6, height: 3, unit: 'inches' },
    weight: { value: 0.8, unit: 'lbs' },
    storageType: 'Standard',
    prepRequirements: ['FNSKU label', 'Poly bag', 'Suffocation warning'],
    lowStockThreshold: 200,
    autoReorder: true,
    stockByWarehouse: [
      { warehouse: 'Los Angeles', warehouseId: 'los-angeles', available: 487, reserved: 32, location: 'A-12-05' },
      { warehouse: 'New York', warehouseId: 'new-york', available: 356, reserved: 28, location: 'B-08-12' },
      { warehouse: 'Chicago', warehouseId: 'chicago', available: 289, reserved: 15, location: 'C-05-08' },
      { warehouse: 'Dallas', warehouseId: 'dallas', available: 115, reserved: 8, location: 'D-03-02' }
    ],
    history: [
      { date: '2025-12-28', type: 'inbound', qty: 500, warehouse: 'Los Angeles', reference: 'INB-2025-1234' },
      { date: '2025-12-20', type: 'outbound', qty: -156, warehouse: 'New York', reference: 'Multiple orders' },
      { date: '2025-12-15', type: 'adjustment', qty: -3, warehouse: 'Chicago', reference: 'Damaged units' },
      { date: '2025-12-10', type: 'outbound', qty: -89, warehouse: 'Los Angeles', reference: 'Multiple orders' },
      { date: '2025-12-05', type: 'inbound', qty: 300, warehouse: 'Chicago', reference: 'INB-2025-1189' }
    ]
  }

  const totalStock = product.totalAvailable + product.totalReserved + product.totalInTransit

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg border border-slate-200" />
          <div>
            <Link to="/merchant/inventory" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
              ← Back to Inventory
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
            <div className="flex gap-4 text-sm text-slate-600 mt-2">
              <span><strong>SKU:</strong> {product.sku}</span>
              <span><strong>ASIN:</strong> {product.asin}</span>
              <span><strong>UPC:</strong> {product.upc}</span>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Edit size={16} />
          Edit Product
        </button>
      </div>

      {/* Stock Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="text-blue-600" size={24} />
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">AVAILABLE</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{product.totalAvailable}</div>
          <div className="text-sm text-slate-600 mt-1">Ready to ship</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="text-amber-600" size={24} />
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">RESERVED</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{product.totalReserved}</div>
          <div className="text-sm text-slate-600 mt-1">In active orders</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="text-purple-600" size={24} />
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">IN TRANSIT</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{product.totalInTransit}</div>
          <div className="text-sm text-slate-600 mt-1">Inbound shipments</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="text-slate-600" size={24} />
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">TOTAL</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalStock}</div>
          <div className="text-sm text-slate-600 mt-1">All locations</div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {product.totalAvailable < product.lowStockThreshold && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="font-semibold text-amber-900">Low Stock Alert</p>
            <p className="text-sm text-amber-800">
              Current stock ({product.totalAvailable} units) is below your threshold ({product.lowStockThreshold} units).
              {product.autoReorder ? ' Auto-reorder is enabled.' : ' Consider creating an inbound shipment.'}
            </p>
          </div>
          <Link to="/merchant/inbound" className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700">
            Create Inbound
          </Link>
        </div>
      )}

      {/* Stock by Warehouse */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Warehouse size={24} className="text-blue-600" />
            Stock by Warehouse
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Warehouse</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900">Available</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-900">Reserved</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Location</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {product.stockByWarehouse.map((wh) => (
                <tr key={wh.warehouse}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      <Link to={`/warehouses/${wh.warehouseId}`} className="text-blue-600 hover:text-blue-700 font-medium">
                        {wh.warehouse}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900">{wh.available}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{wh.reserved}</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-sm">{wh.location}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                      Transfer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-semibold">
              <tr>
                <td className="px-4 py-3 text-slate-900">Total</td>
                <td className="px-4 py-3 text-right text-slate-900">
                  {product.stockByWarehouse.reduce((sum, wh) => sum + wh.available, 0)}
                </td>
                <td className="px-4 py-3 text-right text-slate-900">
                  {product.stockByWarehouse.reduce((sum, wh) => sum + wh.reserved, 0)}
                </td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Product Details */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Product Details</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Category</span>
              <span className="font-semibold text-slate-900">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Barcode</span>
              <span className="font-mono text-slate-900">{product.barcode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Dimensions</span>
              <span className="font-semibold text-slate-900">
                {product.dimensions.length}" × {product.dimensions.width}" × {product.dimensions.height}"
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Weight</span>
              <span className="font-semibold text-slate-900">
                {product.weight.value} {product.weight.unit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Storage Type</span>
              <span className="font-semibold text-slate-900">{product.storageType}</span>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <p className="text-slate-600 mb-2">Prep Requirements</p>
              <div className="flex flex-wrap gap-2">
                {product.prepRequirements.map((req) => (
                  <span key={req} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                    {req}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Settings */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingDown size={20} className="text-blue-600" />
            Low Stock Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Low Stock Threshold
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={product.lowStockThreshold}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg"
                  readOnly
                />
                <span className="text-sm text-slate-600">units</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Alert when stock falls below this amount</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div>
                <p className="font-semibold text-slate-900">Auto-Reorder</p>
                <p className="text-xs text-slate-500">Automatically create purchase order</p>
              </div>
              <div className={`w-12 h-6 rounded-full ${product.autoReorder ? 'bg-blue-600' : 'bg-slate-300'} relative cursor-pointer`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${product.autoReorder ? 'right-0.5' : 'left-0.5'}`}></div>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4">
              Update Settings
            </button>
          </div>
        </div>
      </div>

      {/* Inventory History */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Inventory History</h2>
        <div className="space-y-4">
          {product.history.map((event, idx) => (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                event.type === 'inbound' ? 'bg-green-100 text-green-600' :
                event.type === 'outbound' ? 'bg-blue-100 text-blue-600' :
                'bg-amber-100 text-amber-600'
              }`}>
                {event.type === 'inbound' ? '+' : event.type === 'outbound' ? '-' : '⚠'}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {event.type === 'inbound' ? 'Inbound Shipment' : 
                       event.type === 'outbound' ? 'Orders Fulfilled' : 
                       'Inventory Adjustment'}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      {event.warehouse} • {event.reference}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${event.qty > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {event.qty > 0 ? '+' : ''}{event.qty}
                    </p>
                    <p className="text-xs text-slate-500">{event.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold">
          View Full History
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          to="/merchant/inbound"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          Create Inbound Shipment
        </Link>
        <Link
          to={`/merchant/orders?sku=${product.sku}`}
          className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold"
        >
          View Order History
        </Link>
        <button className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold">
          Request Transfer
        </button>
      </div>
    </div>
  )
}

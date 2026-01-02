import { Link, useNavigate } from 'react-router-dom'
import { Package, Truck, MapPin, Clock, CheckCircle, Download, AlertCircle, User, DollarSign } from 'lucide-react'

export default function OrderDetail() {
  const navigate = useNavigate()

  // Mock data - will be replaced with API call
  const order = {
    id: 'ord_xyz789',
    orderNumber: '#ORD-2025-00789',
    status: 'shipped',
    createdAt: '2025-12-28 14:32:15',
    marketplace: 'Amazon',
    customer: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      address: {
        street: '456 Oak Street',
        city: 'San Francisco',
        state: 'CA',
        zip: '94102',
        country: 'USA'
      }
    },
    items: [
      {
        id: 'item1',
        productId: 'prod_abc123',
        name: 'Wireless Bluetooth Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
        sku: 'WBH-2024-BLK',
        quantity: 2,
        price: 49.99,
        warehouse: 'Los Angeles'
      },
      {
        id: 'item2',
        productId: 'prod_def456',
        name: 'USB-C Charging Cable',
        image: 'https://images.unsplash.com/photo-1591290619762-63ca38b36753?w=200',
        sku: 'USBC-6FT-WHT',
        quantity: 1,
        price: 12.99,
        warehouse: 'Los Angeles'
      }
    ],
    timeline: [
      { status: 'created', timestamp: '2025-12-28 14:32:15', note: 'Order received from Amazon', operator: null },
      { status: 'picked', timestamp: '2025-12-28 15:45:22', note: 'Items picked from inventory', operator: 'Mike Johnson' },
      { status: 'packed', timestamp: '2025-12-28 16:12:08', note: 'Order packed and labeled', operator: 'Sarah Williams' },
      { status: 'shipped', timestamp: '2025-12-28 17:05:43', note: 'Shipped via USPS Priority Mail', operator: 'System' },
      { status: 'in_transit', timestamp: '2025-12-29 08:15:00', note: 'Package in transit', operator: null },
      { status: 'out_for_delivery', timestamp: '2025-12-30 07:30:00', note: 'Out for delivery', operator: null }
    ],
    shipping: {
      carrier: 'USPS',
      service: 'Priority Mail',
      trackingNumber: '9400111899562478543210',
      trackingUrl: 'https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899562478543210',
      weight: { value: 1.8, unit: 'lbs' },
      dimensions: { length: 12, width: 9, height: 6, unit: 'inches' },
      labelUrl: '/api/labels/ord_xyz789.pdf'
    },
    billing: {
      pickingFee: 0.50,
      packingFee: 0.75,
      shippingCost: 8.45,
      boxCost: 1.00,
      subtotal: 10.70,
      tax: 0.00,
      total: 10.70
    }
  }

  const statusConfig = {
    created: { label: 'Order Received', color: 'bg-slate-100 text-slate-700', icon: Package },
    picked: { label: 'Picked', color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
    packed: { label: 'Packed', color: 'bg-purple-100 text-purple-700', icon: Package },
    shipped: { label: 'Shipped', color: 'bg-green-100 text-green-700', icon: Truck },
    in_transit: { label: 'In Transit', color: 'bg-blue-100 text-blue-700', icon: Truck },
    out_for_delivery: { label: 'Out for Delivery', color: 'bg-amber-100 text-amber-700', icon: MapPin },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', icon: CheckCircle }
  }

  const currentStatus = statusConfig[order.status as keyof typeof statusConfig]
  const StatusIcon = currentStatus.icon

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link to="/merchant/orders" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
            ← Back to Orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-900">{order.orderNumber}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${currentStatus.color} flex items-center gap-1`}>
              <StatusIcon size={14} />
              {currentStatus.label}
            </span>
          </div>
          <div className="flex gap-4 text-sm text-slate-600 mt-2">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {order.createdAt}
            </span>
            <span>Via {order.marketplace}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href={order.shipping.labelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
          >
            <Download size={16} />
            Label
          </a>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
            onClick={() => navigate('/contact')}
          >
            <AlertCircle size={16} />
            Report Issue
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Package size={20} className="text-blue-600" />
              Order Items
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-slate-200" />
                  <div className="flex-1">
                    <Link
                      to={`/merchant/inventory/${item.productId}`}
                      className="font-semibold text-slate-900 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-slate-600 mt-1">
                      SKU: <span className="font-mono">{item.sku}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <MapPin size={14} className="text-slate-400" />
                      <span className="text-slate-600">{item.warehouse}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">Qty: {item.quantity}</p>
                    {item.price && (
                      <p className="text-sm text-slate-600 mt-1">${item.price.toFixed(2)} ea</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Truck size={20} className="text-blue-600" />
              Shipping Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600">Carrier</p>
                  <p className="font-semibold text-slate-900">{order.shipping.carrier}</p>
                </div>
                <div>
                  <p className="text-slate-600">Service Level</p>
                  <p className="font-semibold text-slate-900">{order.shipping.service}</p>
                </div>
                <div>
                  <p className="text-slate-600">Tracking Number</p>
                  <p className="font-mono text-slate-900">{order.shipping.trackingNumber}</p>
                  <a
                    href={order.shipping.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-xs"
                  >
                    Track on {order.shipping.carrier} →
                  </a>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600">Package Weight</p>
                  <p className="font-semibold text-slate-900">
                    {order.shipping.weight.value} {order.shipping.weight.unit}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">Package Dimensions</p>
                  <p className="font-semibold text-slate-900">
                    {order.shipping.dimensions.length}" × {order.shipping.dimensions.width}" × {order.shipping.dimensions.height}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fulfillment Timeline */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              Fulfillment Timeline
            </h2>
            <div className="space-y-4">
              {order.timeline.map((event, idx) => {
                const eventStatus = statusConfig[event.status as keyof typeof statusConfig]
                const EventIcon = eventStatus?.icon || Package
                const isLast = idx === order.timeline.length - 1

                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${eventStatus?.color || 'bg-slate-100 text-slate-600'}`}>
                        <EventIcon size={18} />
                      </div>
                      {!isLast && <div className="w-0.5 h-12 bg-slate-200 my-1"></div>}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold text-slate-900">{event.note}</p>
                      <p className="text-sm text-slate-600 mt-1">{event.timestamp}</p>
                      {event.operator && (
                        <p className="text-xs text-slate-500 mt-1">by {event.operator}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User size={18} className="text-blue-600" />
              Customer
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">{order.customer.name}</p>
              </div>
              {order.customer.email && (
                <div>
                  <p className="text-slate-600">Email</p>
                  <a href={`mailto:${order.customer.email}`} className="text-blue-600 hover:text-blue-700">
                    {order.customer.email}
                  </a>
                </div>
              )}
              {order.customer.phone && (
                <div>
                  <p className="text-slate-600">Phone</p>
                  <a href={`tel:${order.customer.phone}`} className="text-blue-600 hover:text-blue-700">
                    {order.customer.phone}
                  </a>
                </div>
              )}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-slate-600 mb-2">Shipping Address</p>
                <p className="text-slate-900">
                  {order.customer.address.street}<br />
                  {order.customer.address.city}, {order.customer.address.state} {order.customer.address.zip}<br />
                  {order.customer.address.country}
                </p>
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <DollarSign size={18} className="text-blue-600" />
              Fulfillment Costs
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Picking</span>
                <span className="font-semibold text-slate-900">${order.billing.pickingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Packing</span>
                <span className="font-semibold text-slate-900">${order.billing.packingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="font-semibold text-slate-900">${order.billing.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Box/Materials</span>
                <span className="font-semibold text-slate-900">${order.billing.boxCost.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between">
                <span className="font-bold text-slate-900">Total Charged</span>
                <span className="font-bold text-slate-900">${order.billing.total.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="w-full mt-4 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm"
              onClick={() => navigate('/contact')}
            >
              Download Invoice
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="font-semibold text-blue-900 mb-2">Need Help?</p>
            <p className="text-sm text-blue-800 mb-3">
              Report issues with this order or contact support
            </p>
            <Link
              to="/contact"
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

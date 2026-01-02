import ServiceTemplate from '../../../components/ServiceTemplate'
import { ShoppingBag, Zap, Globe, Package, TrendingUp, Users } from 'lucide-react'

export default function Dropshipping() {
  return (
    <ServiceTemplate
      hero={{
        title: 'Dropshipping Fulfillment',
        subtitle: 'White-label fulfillment for dropshippers. We store, pick, pack, and ship—so you can focus on marketing and sales.',
        emoji: '🛒',
      }}
      stats={[
        { label: 'Orders fulfilled', value: '1M+' },
        { label: 'E-commerce platforms', value: '50+' },
        { label: 'Avg fulfillment time', value: '24hrs' },
        { label: 'Customer satisfaction', value: '97%' },
      ]}
      benefits={[
        { icon: <ShoppingBag />, title: 'White-Label Packing', desc: 'No branding, invoices, or promo materials from us' },
        { icon: <Zap />, title: 'Automated Workflows', desc: 'Orders sync automatically from your store' },
        { icon: <Globe />, title: 'Multi-Channel', desc: 'Fulfill orders from Shopify, WooCommerce, eBay, and more' },
        { icon: <Package />, title: 'Custom Packaging', desc: 'Use your own branded boxes and inserts' },
        { icon: <TrendingUp />, title: 'Scale Easily', desc: 'Handle surges without hiring staff' },
        { icon: <Users />, title: 'Dedicated Support', desc: 'Direct line to your account manager' },
      ]}
      steps={[
        { title: 'Connect Your Store', desc: 'Integrate via API or upload order CSVs' },
        { title: 'Send Products', desc: 'Ship your inventory to our warehouse' },
        { title: 'Receive Orders', desc: 'Orders automatically import when customers buy' },
        { title: 'We Fulfill', desc: 'Picked, packed, and shipped within 24 hours' },
        { title: 'Customer Receives', desc: 'Tracking sent; order arrives in branded packaging' },
      ]}
      serviceTable={[
        { item: 'Inventory storage', included: true },
        { item: 'Order processing', included: true },
        { item: 'Pick & pack', included: true },
        { item: 'White-label packaging', included: true },
        { item: 'Shipping (postage separate)', included: true },
        { item: 'Tracking updates', included: true },
        { item: 'Returns management', included: true },
        { item: 'Real-time inventory sync', included: true },
        { item: 'Multi-channel support', included: true },
        { item: 'API integration', included: true },
        { item: 'Custom inserts', included: false },
        { item: 'Gift messages', included: false },
      ]}
      integrations={['Shopify', 'WooCommerce', 'BigCommerce', 'eBay', 'Etsy', 'Wix', 'Squarespace']}
      faqs={[
        { q: 'Do you put your branding on packages?', a: 'No. All packaging is plain or uses your custom branded materials.' },
        { q: 'Can I use my own packaging?', a: 'Yes, you can send us your branded boxes, bags, and inserts to use.' },
        { q: 'How do I integrate my store?', a: 'We support direct API integrations or you can email/upload order CSVs.' },
        { q: 'What if a customer wants a refund?', a: 'We handle returns. You decide whether to refund, replace, or restock.' },
        { q: 'Is there a setup fee?', a: 'No setup fees. You only pay for storage and per-order fulfillment.' },
      ]}
    />
  )
}

import ServiceTemplate from '../../../components/ServiceTemplate'
import { ShoppingCart, Clock, Users, Target, TrendingUp, Zap } from 'lucide-react'

export default function AmazonFBM() {
  return (
    <ServiceTemplate
      hero={{
        title: 'Amazon FBM Fulfillment',
        subtitle: 'Complete pick, pack, and ship services for Amazon sellers using Fulfillment by Merchant. Scale your FBM operations with confidence.',
        emoji: '🚚',
      }}
      stats={[
        { label: 'Orders per day', value: '10K+' },
        { label: 'Same-day ship rate', value: '98%' },
        { label: 'Accuracy rate', value: '99.8%' },
        { label: 'Avg order time', value: '<2hrs' },
      ]}
      benefits={[
        { icon: <Clock />, title: 'Same-Day Shipping', desc: 'Orders received by 2PM ship same day' },
        { icon: <Target />, title: 'High Accuracy', desc: '99.8% pick and pack accuracy' },
        { icon: <Users />, title: 'Dedicated Team', desc: 'Assigned account manager and support' },
        { icon: <ShoppingCart />, title: 'Real-Time Sync', desc: 'Automatic order import and tracking updates' },
        { icon: <TrendingUp />, title: 'Scalable', desc: 'Handle peak seasons effortlessly' },
        { icon: <Zap />, title: 'Fast Processing', desc: 'Average 1.5-hour order turnaround' },
      ]}
      steps={[
        { title: 'Integrate Your Store', desc: 'Connect your Amazon Seller account via API' },
        { title: 'Send Inventory', desc: 'Ship your products to our fulfillment center' },
        { title: 'Auto Order Import', desc: 'Orders automatically sync to our system' },
        { title: 'Pick & Pack', desc: 'Our team picks, packs, and labels your orders' },
        { title: 'Ship & Track', desc: 'Same-day shipping with tracking uploaded to Amazon' },
      ]}
      serviceTable={[
        { item: 'Inventory receiving', included: true },
        { item: 'Inventory storage', included: true },
        { item: 'Order picking', included: true },
        { item: 'Custom packing', included: true },
        { item: 'Shipping label printing', included: true },
        { item: 'Carrier pickup', included: true },
        { item: 'Tracking upload to Amazon', included: true },
        { item: 'Returns processing', included: true },
        { item: 'Inventory reporting', included: true },
        { item: 'Multi-channel fulfillment', included: true },
        { item: 'Gift wrapping', included: false },
        { item: 'Custom inserts', included: false },
      ]}
      integrations={['Amazon Seller', 'ShipStation', 'Shippo', 'EasyShip', 'Shipping Easy']}
      faqs={[
        { q: 'How quickly can orders ship?', a: 'Orders received before 2PM ship the same day. Orders after 2PM ship next business day.' },
        { q: 'Do you handle returns?', a: 'Yes, we process returns, inspect items, and return them to inventory or dispose per your instructions.' },
        { q: 'What carriers do you use?', a: 'We ship via USPS, UPS, FedEx, and DHL based on your preferences and shipping speed.' },
        { q: 'Can I use my own shipping account?', a: 'Yes, you can use your own carrier accounts for discounted rates.' },
        { q: 'Is there a minimum order volume?', a: 'No minimum. We serve businesses of all sizes from startups to enterprises.' },
      ]}
    />
  )
}

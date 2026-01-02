import ServiceTemplate from '../../../components/ServiceTemplate'
import { Truck, Globe, Clock, Shield, TrendingUp, MapPin } from 'lucide-react'

export default function Logistics() {
  return (
    <ServiceTemplate
      hero={{
        title: 'Logistics & Transportation',
        subtitle: 'End-to-end supply chain management. Freight forwarding, last-mile delivery, and route optimization for your business.',
        emoji: '🌍',
      }}
      stats={[
        { label: 'Shipments per month', value: '50K+' },
        { label: 'Carrier partners', value: '30+' },
        { label: 'Countries served', value: '40+' },
        { label: 'On-time delivery', value: '96%' },
      ]}
      benefits={[
        { icon: <Truck />, title: 'Freight Forwarding', desc: 'Ocean, air, and ground freight solutions' },
        { icon: <Globe />, title: 'Global Network', desc: 'Ship anywhere in North America and beyond' },
        { icon: <Clock />, title: 'Fast Transit', desc: 'Express and economy shipping options' },
        { icon: <Shield />, title: 'Cargo Insurance', desc: 'Comprehensive coverage for your shipments' },
        { icon: <TrendingUp />, title: 'Route Optimization', desc: 'Cost-effective routing algorithms' },
        { icon: <MapPin />, title: 'Real-Time Tracking', desc: 'Visibility at every step' },
      ]}
      steps={[
        { title: 'Quote & Book', desc: 'Get instant quotes and book shipments online' },
        { title: 'Pickup Scheduled', desc: 'We arrange pickup from your location or port' },
        { title: 'In Transit', desc: 'Track your shipment in real-time via our portal' },
        { title: 'Customs Clearance', desc: 'We handle documentation and clearance (if international)' },
        { title: 'Final Delivery', desc: 'Delivered to destination with proof of delivery' },
      ]}
      serviceTable={[
        { item: 'LTL (Less Than Truckload)', included: true },
        { item: 'FTL (Full Truckload)', included: true },
        { item: 'Parcel shipping', included: true },
        { item: 'Freight forwarding', included: true },
        { item: 'Last-mile delivery', included: true },
        { item: 'White-glove service', included: true },
        { item: 'Expedited shipping', included: true },
        { item: 'Cargo insurance', included: true },
        { item: 'Real-time tracking', included: true },
        { item: 'Proof of delivery', included: true },
        { item: 'Hazmat transport', included: false },
        { item: 'Refrigerated transport', included: false },
      ]}
      integrations={['ShipStation', 'Freightos', 'Flexport', 'CargoWise', 'SAP', 'Oracle SCM']}
      faqs={[
        { q: 'Do you handle international shipments?', a: 'Yes, we ship to 40+ countries with full customs support.' },
        { q: 'What is the difference between LTL and FTL?', a: 'LTL is for smaller shipments sharing truck space. FTL is a dedicated truck for large shipments.' },
        { q: 'Can you handle oversized or heavy items?', a: 'Yes, we specialize in oversized freight and have equipment for heavy cargo.' },
        { q: 'Do you offer cargo insurance?', a: 'Yes, comprehensive cargo insurance is available for all shipments.' },
        { q: 'How do I track my shipment?', a: 'Log into your dashboard for real-time GPS tracking and status updates.' },
      ]}
    />
  )
}

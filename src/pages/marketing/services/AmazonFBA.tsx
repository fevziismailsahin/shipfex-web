import ServiceTemplate from '../../../components/ServiceTemplate'
import { Package, Clock, Shield, CheckCircle, Target, Zap } from 'lucide-react'

export default function AmazonFBA() {
  return (
    <ServiceTemplate
      hero={{
        title: 'Amazon FBA Prep & Shipping',
        subtitle: 'Professional FBA preparation, labeling, and shipping services. Get your products Amazon-ready and delivered to fulfillment centers fast.',
        emoji: '📦',
      }}
      stats={[
        { label: 'Units prepped monthly', value: '500K+' },
        { label: 'Avg prep time', value: '24hrs' },
        { label: 'Amazon compliance', value: '100%' },
        { label: 'FBA centers served', value: '20+' },
      ]}
      benefits={[
        { icon: <CheckCircle />, title: 'Amazon Compliant', desc: 'All prep meets Amazon FBA requirements' },
        { icon: <Clock />, title: 'Fast Turnaround', desc: 'Same-day or next-day processing available' },
        { icon: <Shield />, title: 'Quality Assurance', desc: 'Thorough inspection and verification' },
        { icon: <Package />, title: 'Case Pack Breakdown', desc: 'Individual unit labeling and prep' },
        { icon: <Target />, title: 'Direct Shipping', desc: 'Ship directly to Amazon warehouses' },
        { icon: <Zap />, title: 'Flexible Options', desc: 'Choose prep level based on your needs' },
      ]}
      steps={[
        { title: 'Send Inventory', desc: 'Ship your products to our warehouse with advance notice' },
        { title: 'Inspection & Prep', desc: 'We inspect, label, poly bag, and bubble wrap as needed' },
        { title: 'Create Shipment', desc: 'We create shipment plans in Seller Central on your behalf (optional)' },
        { title: 'Ship to Amazon', desc: 'Products shipped directly to Amazon FBA centers' },
        { title: 'Track & Confirm', desc: 'Real-time tracking and delivery confirmation' },
      ]}
      serviceTable={[
        { item: 'Product inspection', included: true },
        { item: 'FNSKU labeling', included: true },
        { item: 'Poly bagging', included: true },
        { item: 'Bubble wrap', included: true },
        { item: 'Case pack breakdown', included: true },
        { item: 'Suffocation warnings', included: true },
        { item: 'Shipment plan creation', included: true },
        { item: 'Box labeling', included: true },
        { item: 'Direct shipping to FBA', included: true },
        { item: 'Disposal of packaging waste', included: true },
        { item: 'Photo documentation', included: false },
        { item: 'Custom kitting/bundling', included: false },
      ]}
      integrations={['Amazon Seller', 'SellerCentral', 'Inventory Lab', 'RestockPro', 'SellerLegend']}
      faqs={[
        {
          q: 'How long does FBA prep take?',
          a: 'Standard prep is completed within 24-48 hours of receiving your inventory. Rush processing (same-day) is available for an additional fee.',
        },
        {
          q: 'Do you handle hazmat or oversized items?',
          a: 'Yes, we can prep hazmat and oversized items. Additional compliance checks and specialized handling may apply.',
        },
        {
          q: 'Can you create shipment plans in Seller Central?',
          a: 'Yes, with your authorization we can create shipment plans directly in your Seller Central account.',
        },
        {
          q: 'What if Amazon rejects my shipment?',
          a: 'We guarantee Amazon compliance. If a shipment is rejected due to our prep error, we will re-prep and reship at no cost.',
        },
        {
          q: 'Do you offer storage before sending to Amazon?',
          a: 'Yes, short-term storage is available. We can hold inventory and ship to Amazon on your schedule.',
        },
      ]}
    />
  )
}

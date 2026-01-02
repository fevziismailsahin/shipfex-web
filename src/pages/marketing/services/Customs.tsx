import ServiceTemplate from '../../../components/ServiceTemplate'
import { FileText, Globe, Shield, CheckCircle, Clock, TrendingUp } from 'lucide-react'

export default function Customs() {
  return (
    <ServiceTemplate
      hero={{
        title: 'Customs & Compliance',
        subtitle: 'Expert customs clearance and international shipping compliance. Navigate regulations confidently with our brokerage services.',
        emoji: '📋',
      }}
      stats={[
        { label: 'Clearances per month', value: '5K+' },
        { label: 'Countries covered', value: '150+' },
        { label: 'Compliance rate', value: '99.9%' },
        { label: 'Licensed brokers', value: '24' },
      ]}
      benefits={[
        { icon: <FileText />, title: 'Documentation', desc: 'Complete paperwork preparation and filing' },
        { icon: <Globe />, title: 'Global Expertise', desc: 'Knowledge of 150+ country regulations' },
        { icon: <Shield />, title: 'Compliance Guarantee', desc: 'Avoid fines and delays with our expertise' },
        { icon: <CheckCircle />, title: 'Duty Calculation', desc: 'Accurate HS code classification and duty estimation' },
        { icon: <Clock />, title: 'Fast Processing', desc: 'Expedited clearance for urgent shipments' },
        { icon: <TrendingUp />, title: 'Cost Optimization', desc: 'Identify duty-saving opportunities' },
      ]}
      steps={[
        { title: 'Submit Documents', desc: 'Provide commercial invoice, packing list, and product details' },
        { title: 'Classification', desc: 'We classify products with correct HS codes' },
        { title: 'Duty Calculation', desc: 'Calculate duties, taxes, and fees upfront' },
        { title: 'File & Clear', desc: 'Submit to customs and handle clearance' },
        { title: 'Release & Deliver', desc: 'Goods cleared and ready for final delivery' },
      ]}
      serviceTable={[
        { item: 'Customs brokerage', included: true },
        { item: 'HS code classification', included: true },
        { item: 'Duty & tax calculation', included: true },
        { item: 'Commercial invoice prep', included: true },
        { item: 'Certificate of origin', included: true },
        { item: 'Import/export documentation', included: true },
        { item: 'Customs bonds', included: true },
        { item: 'Tariff consulting', included: true },
        { item: 'ISF filing (US imports)', included: true },
        { item: 'FDA/USDA coordination', included: true },
        { item: 'FTA (Free Trade Agreement) filing', included: false },
        { item: 'Product testing/certification', included: false },
      ]}
      integrations={['ACE (US Customs)', 'CBSA (Canada)', 'CargoWise', 'Flexport', 'DHL', 'FedEx']}
      faqs={[
        { q: 'What is an HS code?', a: 'Harmonized System code—a standardized classification for traded products used to determine duties.' },
        { q: 'Do I need a customs broker?', a: 'For most commercial imports/exports, yes. Brokers ensure compliance and handle complex paperwork.' },
        { q: 'How much are duties and taxes?', a: 'Varies by product, origin, and destination. We provide accurate estimates upfront.' },
        { q: 'Can you help with FDA or USDA requirements?', a: 'Yes, we coordinate with regulatory agencies for food, drugs, and agricultural products.' },
        { q: 'What if customs holds my shipment?', a: 'We work directly with customs to resolve issues quickly and minimize delays.' },
      ]}
    />
  )
}

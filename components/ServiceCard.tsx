import { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
}

const serviceIcons: Record<string, string> = {
  1: '🏠',
  2: '📊',
  3: '📢',
  4: '📸',
  5: '✍️',
  6: '👀',
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-light-gray hover:border-forest-green transform hover:scale-105 group cursor-pointer">
      <div className="text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 inline-block">
        {serviceIcons[service.id] || '✨'}
      </div>
      <h3 className="font-bold text-lg text-charcoal mb-2 group-hover:text-forest-green transition-colors duration-300">{service.title}</h3>
      <p className="text-text-muted text-sm group-hover:text-charcoal transition-colors duration-300">{service.description}</p>
      <div className="mt-4 text-forest-green font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Vezi detalii →
      </div>
    </div>
  );
}

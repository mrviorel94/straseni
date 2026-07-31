import { Service } from '@/lib/types';

interface EditorialServiceListProps {
  services: Service[];
}

const serviceDescriptions: Record<number, string> = {
  1: 'Te ajutăm să navighezi piața imobiliară locală cu sfaturi și informații verificate',
  2: 'Ofertă de evaluare pentru a cunoaște valoarea reală a proprietății tale',
  3: 'Promovarea proprietății tale pe platforme și canale locale de comunicare',
  4: 'Fotografie profesională care prezintă bine fiecare proprietate',
  5: 'Descrieri oportune și persuasive ale proprietăților pentru anunțuri',
  6: 'Organizare de vizite și intermediere directă între cumpărători și vânzători',
};

export default function EditorialServiceList({ services }: EditorialServiceListProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="mb-16">
        <div className="mb-2">
          <span className="text-xs uppercase tracking-widest text-soft-stone font-bold">
            Cum te ajutăm
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">
          Serviciile noastre
        </h2>
      </div>

      {/* Services List */}
      <div className="space-y-16">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          const serviceNum = String(index + 1).padStart(2, '0');

          return (
            <div
              key={service.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                !isEven ? 'md:direction-rtl' : ''
              }`}
            >
              {/* Number & Content */}
              <div className={isEven ? 'md:col-span-1' : 'md:col-span-1 md:order-2'}>
                <div className="mb-6">
                  <div className="text-6xl md:text-7xl font-bold text-light-gray mb-4">
                    {serviceNum}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-4">
                    {service.title}
                  </h3>
                </div>
                <p className="text-text-light text-lg leading-relaxed mb-6">
                  {serviceDescriptions[parseInt(service.id)] || service.description}
                </p>
                <ul className="space-y-2 text-text-light">
                  <li className="flex gap-2">
                    <span className="text-soft-stone">→</span>
                    <span>Consultanță personalizată</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-soft-stone">→</span>
                    <span>Răspuns rapid la întrebări</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-soft-stone">→</span>
                    <span>Rezolvare transparentă</span>
                  </li>
                </ul>
              </div>

              {/* Visual Placeholder */}
              <div className={`h-64 md:h-96 bg-light-gray rounded-lg flex items-center justify-center text-text-muted ${!isEven ? 'md:order-1' : ''}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">📋</div>
                  <p className="text-sm">Ilustrație serviciu</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

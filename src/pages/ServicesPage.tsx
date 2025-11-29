import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { adminService, type Service } from '../services/admin.service';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    loadServices();
  }, [searchTerm, categoryFilter, cityFilter]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllServices({ 
        category: categoryFilter, 
        city: cityFilter, 
        search: searchTerm 
      });
      setServices(data);
    } catch (error) {
      toast.error('Erreur chargement services');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <div>Chargement...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Services</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', flex: 1, minWidth: '200px' }}
        />
        <input
          type="text"
          placeholder="Ville..."
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', width: '150px' }}
        />
        <input
          type="text"
          placeholder="Catégorie..."
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', width: '150px' }}
        />
      </div>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f7fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Titre</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Prestataire</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Catégorie</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Ville</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Prix</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Réservations</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 && !loading && (
              <tr>
                <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#718096' }}>
                  Aucun service trouvé
                </td>
              </tr>
            )}
            {services.map((service) => (
              <tr key={service.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>{service.title}</td>
                <td style={{ padding: '1rem' }}>{service.provider?.name || '-'}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: '#e6fffa',
                    color: '#234e52'
                  }}>
                    {service.category}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{service.city}</td>
                <td style={{ padding: '1rem', fontWeight: 600, color: '#667eea' }}>{service.price} FC</td>
                <td style={{ padding: '1rem' }}>{service._count?.bookings || 0}</td>
                <td style={{ padding: '1rem' }}>{new Date(service.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesPage;

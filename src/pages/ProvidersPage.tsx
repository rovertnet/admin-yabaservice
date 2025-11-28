import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { adminService } from '../services/admin.service';

const ProvidersPage: React.FC = () => {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllProviders();
      setProviders(data);
    } catch (error) {
      toast.error('Erreur chargement prestataires');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Prestataires</h1>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f7fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Nom</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Services</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Réservations</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Abonnement</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem' }}>{provider.name}</td>
                <td style={{ padding: '1rem' }}>{provider.email}</td>
                <td style={{ padding: '1rem' }}>{provider.services?.length || 0}</td>
                <td style={{ padding: '1rem' }}>{provider._count?.providedBookings || 0}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: provider.subscription?.status === 'ACTIVE' ? '#c6f6d5' : '#fed7d7',
                    color: provider.subscription?.status === 'ACTIVE' ? '#22543d' : '#822727'
                  }}>
                    {provider.subscription?.status || 'AUCUN'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProvidersPage;

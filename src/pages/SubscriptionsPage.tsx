import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { adminService } from '../services/admin.service';

const SubscriptionsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadSubscriptions();
  }, [statusFilter]);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllSubscriptions({ status: statusFilter });
      setSubscriptions(data);
    } catch (error) {
      toast.error('Erreur chargement abonnements');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Abonnements</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}
        >
          <option value="">Tous les statuts</option>
          <option value="ACTIVE">Actif</option>
          <option value="EXPIRED">Expiré</option>
          <option value="CANCELLED">Annulé</option>
        </select>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f7fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Utilisateur</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Statut</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Début</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Fin</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Montant</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem' }}>{sub.user?.name}</td>
                <td style={{ padding: '1rem' }}>{sub.user?.email}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: sub.status === 'ACTIVE' ? '#c6f6d5' : '#fed7d7',
                    color: sub.status === 'ACTIVE' ? '#22543d' : '#822727'
                  }}>
                    {sub.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{new Date(sub.startDate).toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>{new Date(sub.endDate).toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>{sub.amount} FC</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionsPage;

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { adminService } from '../services/admin.service';

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadBookings();
  }, [statusFilter]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllBookings({ status: statusFilter });
      setBookings(data);
    } catch (error) {
      toast.error('Erreur chargement réservations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Réservations</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}
        >
          <option value="">Tous les statuts</option>
          <option value="PENDING">En attente</option>
          <option value="CONFIRMED">Confirmé</option>
          <option value="COMPLETED">Terminé</option>
          <option value="CANCELLED">Annulé</option>
        </select>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f7fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Service</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Client</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Prestataire</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Statut</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Montant</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem' }}>{booking.service?.title}</td>
                <td style={{ padding: '1rem' }}>{booking.client?.name}</td>
                <td style={{ padding: '1rem' }}>{booking.provider?.name}</td>
                <td style={{ padding: '1rem' }}>{new Date(booking.date).toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: booking.status === 'CONFIRMED' ? '#c6f6d5' : booking.status === 'PENDING' ? '#fbd38d' : '#bee3f8',
                    color: booking.status === 'CONFIRMED' ? '#22543d' : booking.status === 'PENDING' ? '#744210' : '#2c5282'
                  }}>
                    {booking.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{booking.service?.price} FC</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsPage;

import React, { useEffect, useState } from 'react';
import { FaBox, FaCalendarCheck, FaStar, FaTools, FaUsers, FaUserTie } from 'react-icons/fa';
import BookingsTimelineChart from '../components/charts/BookingsTimelineChart';
import CategoryDistributionChart from '../components/charts/CategoryDistributionChart';
import PopularServicesChart from '../components/charts/PopularServicesChart';
import UserRegistrationsChart from '../components/charts/UserRegistrationsChart';
import { adminService, type DashboardStats } from '../services/admin.service';

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [bookingsTimeline, setBookingsTimeline] = useState<any[]>([]);
  const [popularServices, setPopularServices] = useState<any[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<any[]>([]);
  const [userRegistrations, setUserRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, timeline, services, categories, registrations] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getBookingsTimeline(),
        adminService.getPopularServices(),
        adminService.getServicesByCategory(),
        adminService.getUserRegistrations(),
      ]);
      
      setStats(statsData);
      setBookingsTimeline(timeline);
      setPopularServices(services);
      setCategoryDistribution(categories);
      setUserRegistrations(registrations);
    } catch (error) {
      console.error('Erreur chargement données', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.25rem',
        color: '#718096'
      }}>
        Chargement du dashboard...
      </div>
    );
  }

  const cards = [
    { label: 'Total Utilisateurs', value: stats?.totalUsers, icon: <FaUsers />, color: '#667eea' },
    { label: 'Prestataires', value: stats?.totalProviders, icon: <FaTools />, color: '#ed8936' },
    { label: 'Clients', value: stats?.totalClients, icon: <FaUserTie />, color: '#4299e1' },
    { label: 'Services', value: stats?.totalServices, icon: <FaBox />, color: '#9f7aea' },
    { label: 'Réservations', value: stats?.totalBookings, icon: <FaCalendarCheck />, color: '#48bb78' },
    { label: 'Abonnements Actifs', value: stats?.activeSubscriptions, icon: <FaStar />, color: '#ecc94b' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a202c', marginBottom: '2rem' }}>
        Tableau de Bord
      </h1>
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {cards.map((card, index) => (
          <div key={index} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              background: `${card.color}20`,
              color: card.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '0.25rem' }}>{card.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d3748' }}>{card.value || 0}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '1.5rem' }}>
        <BookingsTimelineChart data={bookingsTimeline} />
        <UserRegistrationsChart data={userRegistrations} />
        <PopularServicesChart data={popularServices} />
        <CategoryDistributionChart data={categoryDistribution} />
      </div>
    </div>
  );
};

export default DashboardHome;

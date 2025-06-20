'use client';

import { Container, Group, Text, Badge } from '@mantine/core';
import { FaTerminal, FaChartLine, FaShieldAlt, FaKey, FaDatabase, FaCog, FaSignOutAlt, FaFileAlt, FaPlug, FaCreditCard, FaBook } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  
  const navItems = [
    { icon: FaChartLine, label: 'Analytics', href: '/dashboard' },
    { icon: FaShieldAlt, label: 'Threats', href: '/dashboard/threats' },
    { icon: FaDatabase, label: 'Logs', href: '/dashboard/logs' },
    { icon: FaKey, label: 'API Keys', href: '/dashboard/api-keys' },
    { icon: FaFileAlt, label: 'Reports', href: '/dashboard/reports' },
    { icon: FaPlug, label: 'Integrations', href: '/dashboard/integrations' },
    { icon: FaCreditCard, label: 'Billing', href: '/dashboard/billing' },
    { icon: FaBook, label: 'Docs', href: '/dashboard/docs' },
    { icon: FaCog, label: 'Settings', href: '/dashboard/settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <ProtectedRoute>
      <div style={{ 
        minHeight: '100vh', 
        background: '#0f0f0f',
        fontFamily: '"JetBrains Mono", monospace'
      }}>
        {/* Header */}
        <div style={{ 
          backgroundColor: '#0a0a0a',
          borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
          padding: '16px 24px'
        }}>
          <Group position="apart">
            <Group>
              <FaTerminal size={24} color="#22c55e" />
              <Text 
                size="xl" 
                weight={700} 
                style={{ 
                  color: '#22c55e',
                  fontFamily: '"JetBrains Mono", monospace'
                }}
              >
                LumaOneAI
              </Text>
            </Group>
            
            <Group spacing="md">
              <Badge 
                size="sm" 
                style={{ 
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}
              >
                LIVE
              </Badge>
              
              <div style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: '6px',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                <Text size="xs" color="#64748b">API Calls</Text>
                <Text size="sm" color="#22c55e" weight={600}>47,382</Text>
              </div>

              <div style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '6px',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                <Text size="xs" color="#64748b">User</Text>
                <Text size="sm" color="#3b82f6" weight={600}>{user?.email || 'user@domain.com'}</Text>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                style={{
                  background: 'none',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: '#ef4444',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontFamily: '"JetBrains Mono", monospace',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <FaSignOutAlt size={12} />
                logout()
              </button>
            </Group>
          </Group>
        </div>

        {/* Navigation */}
        <div style={{ 
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
          padding: '12px 24px'
        }}>
          <Group spacing="xs">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  style={{ 
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: isActive ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid transparent',
                    color: isActive ? '#22c55e' : '#94a3b8',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={14} />
                  {item.label.toLowerCase()}()
                </Link>
              );
            })}
          </Group>
        </div>

        {/* Content */}
        <Container size="xl" style={{ padding: '24px' }}>
          {children}
        </Container>
      </div>
    </ProtectedRoute>
  );
} 
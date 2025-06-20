'use client';

import { useState, useEffect } from 'react';
import { Grid, Card, Text, Group, Badge, Progress, SimpleGrid, Table, ActionIcon, Tooltip, Loader } from '@mantine/core';
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaEye, FaArrowUp, FaArrowDown, FaBolt } from 'react-icons/fa';
import { FiRefreshCcw } from "react-icons/fi";

import { getDashboardStats, getEmailLogs, subscribeToEmailLogs } from '../../lib/database';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentThreats, setRecentThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Load dashboard statistics
        const { data: dashboardStats, error: statsError } = await getDashboardStats();
        if (!statsError && dashboardStats) {
          setStats(dashboardStats);
        }

        // Load recent email logs (threats)
        const { data: emailLogs, error: logsError } = await getEmailLogs(10);
        if (!logsError && emailLogs) {
          setRecentThreats(emailLogs);
        }

        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user]);

  // Set up real-time subscription for new email logs
  useEffect(() => {
    if (!user) return;

    const subscription = subscribeToEmailLogs((payload) => {
      console.log('New email log:', payload);
      // Refresh data when new logs come in
      setRecentThreats(prev => [payload.new, ...prev.slice(0, 9)]);
      setLastUpdated(new Date());
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [user]);

  const getSeverityColor = (threatLevel) => {
    switch (threatLevel) {
      case 'CRITICAL': return '#ef4444';
      case 'HIGH': return '#f59e0b';
      case 'MEDIUM': return '#3b82f6';
      case 'LOW': return '#22c55e';
      default: return '#64748b';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'BLOCKED': return '#ef4444';
      case 'QUARANTINED': return '#f59e0b';
      case 'DETECTED': return '#3b82f6';
      case 'RELEASED': return '#22c55e';
      default: return '#64748b';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const MetricCard = ({ title, value, change, icon: Icon, color, subtitle, isLoading }) => (
    <Card 
      p="lg" 
      style={{ 
        backgroundColor: '#1a1a1a',
        border: `1px solid rgba(${color === '#22c55e' ? '34, 197, 94' : color === '#3b82f6' ? '59, 130, 246' : color === '#f59e0b' ? '245, 158, 11' : '239, 68, 68'}, 0.2)`,
        borderRadius: '12px'
      }}
    >
      <Group position="apart" mb="md">
        <div style={{
          padding: '8px',
          backgroundColor: `rgba(${color === '#22c55e' ? '34, 197, 94' : color === '#3b82f6' ? '59, 130, 246' : color === '#f59e0b' ? '245, 158, 11' : '239, 68, 68'}, 0.1)`,
          borderRadius: '8px'
        }}>
          {isLoading ? <Loader size={20} color={color} /> : <Icon size={20} color={color} />}
        </div>
        {change !== undefined && (
          <Badge 
            size="sm"
            style={{ 
              backgroundColor: change > 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: change > 0 ? '#22c55e' : '#ef4444',
              border: `1px solid ${change > 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
            }}
          >
            {change > 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />} {Math.abs(change)}%
          </Badge>
        )}
      </Group>
      
      <Text 
        size="xs" 
        color="#64748b"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
        mb={4}
      >
        {`// ${title.toUpperCase()}`}
      </Text>
      
      <Text 
        size="xl" 
        weight={700} 
        color={color}
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
        mb={4}
      >
        {isLoading ? '---' : value}
      </Text>
      
      <Text 
        size="xs" 
        color="#94a3b8"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        {subtitle}
      </Text>
    </Card>
  );

  const refreshData = async () => {
    setLoading(true);
    const { data: dashboardStats } = await getDashboardStats();
    const { data: emailLogs } = await getEmailLogs(10);
    
    if (dashboardStats) setStats(dashboardStats);
    if (emailLogs) setRecentThreats(emailLogs);
    
    setLastUpdated(new Date());
    setLoading(false);
  };

  return (
    <div>
      {/* Header */}
      <Group position="apart" mb="xl">
        <div>
          <Text 
            size="xl" 
            weight={700} 
            color="#e2e8f0"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
            mb={4}
          >
            analytics_dashboard()
          </Text>
          <Text 
            size="sm" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {`// Real-time threat analysis and system metrics`}
          </Text>
        </div>
        
        <Group spacing="xs">
          <ActionIcon
            onClick={refreshData}
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '4px'
            }}
          >
            <FiRefreshCcw size={12} color="#22c55e" />
          </ActionIcon>
          <div style={{
            padding: '4px 8px',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '4px'
          }}>
            <Text 
              size="xs" 
              color="#22c55e"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              LIVE
            </Text>
          </div>
          <Text 
            size="xs" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Text>
        </Group>
      </Group>

      {/* Metrics Grid */}
      <SimpleGrid cols={4} spacing="lg" mb="xl">
        <MetricCard
          title="threats_blocked"
          value={stats?.threatsBlocked?.toLocaleString() || '0'}
          change={12}
          icon={FaShieldAlt}
          color="#22c55e"
          subtitle="today | real-time blocking"
          isLoading={loading}
        />
        <MetricCard
          title="emails_processed"
          value={stats?.emailsProcessed?.toLocaleString() || '0'}
          change={8}
          icon={FaBolt}
          color="#3b82f6"
          subtitle="today | behavioral analysis"
          isLoading={loading}
        />
        <MetricCard
          title="avg_processing_time"
          value={stats?.avgProcessingTime ? `${stats.avgProcessingTime}ms` : '0ms'}
          change={0.1}
          icon={FaCheckCircle}
          color="#f59e0b"
          subtitle="current | lightning fast"
          isLoading={loading}
        />
        <MetricCard
          title="threats_detected"
          value={stats?.threatsDetected?.toLocaleString() || '0'}
          icon={FaExclamationTriangle}
          color="#ef4444"
          subtitle="today | AI powered detection"
          isLoading={loading}
        />
      </SimpleGrid>

      {/* Main Content Grid */}
      <Grid>
        {/* Recent Threats Table */}
        <Grid.Col span={8}>
          <Card 
            p="lg"
            style={{ 
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '12px'
            }}
          >
            <Group position="apart" mb="md">
              <Text 
                size="lg" 
                weight={600} 
                color="#e2e8f0"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                recent_threats()
              </Text>
              <Badge 
                size="sm"
                style={{ 
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}
              >
                REAL-TIME
              </Badge>
            </Group>
            
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <Loader color="#22c55e" />
              </div>
            ) : recentThreats.length > 0 ? (
              <Table
                style={{ 
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '12px'
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(34, 197, 94, 0.2)' }}>
                    <th style={{ color: '#64748b', fontWeight: '600' }}>Sender</th>
                    <th style={{ color: '#64748b', fontWeight: '600' }}>Subject</th>
                    <th style={{ color: '#64748b', fontWeight: '600' }}>Threat Level</th>
                    <th style={{ color: '#64748b', fontWeight: '600' }}>Status</th>
                    <th style={{ color: '#64748b', fontWeight: '600' }}>Time</th>
                    <th style={{ color: '#64748b', fontWeight: '600' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentThreats.map((threat) => (
                    <tr key={threat.id} style={{ borderBottom: '1px solid rgba(100, 116, 139, 0.1)' }}>
                      <td>
                        <Text size="xs" color="#e2e8f0" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                          {threat.sender_email}
                        </Text>
                      </td>
                      <td>
                        <Text size="xs" color="#94a3b8" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                          {threat.subject || 'No subject'}
                        </Text>
                      </td>
                      <td>
                        <Badge 
                          size="xs"
                          style={{ 
                            backgroundColor: `${getSeverityColor(threat.threat_level)}20`,
                            color: getSeverityColor(threat.threat_level),
                            border: `1px solid ${getSeverityColor(threat.threat_level)}40`
                          }}
                        >
                          {threat.threat_level || 'UNKNOWN'}
                        </Badge>
                      </td>
                      <td>
                        <Badge 
                          size="xs"
                          style={{ 
                            backgroundColor: `${getStatusColor(threat.status)}20`,
                            color: getStatusColor(threat.status),
                            border: `1px solid ${getStatusColor(threat.status)}40`
                          }}
                        >
                          {threat.status}
                        </Badge>
                      </td>
                      <td>
                        <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                          {formatTimeAgo(threat.processed_at)}
                        </Text>
                      </td>
                      <td>
                        <Group spacing={4}>
                          <Tooltip label="View Details">
                            <ActionIcon size="sm" style={{ color: '#3b82f6' }}>
                              <FaEye size={10} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem',
                color: '#64748b',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                <Text size="sm">
                  {`// No threats detected yet`}
                </Text>
                <Text size="xs" mt="xs">
                  Your AI security system is monitoring...
                </Text>
              </div>
            )}
          </Card>
        </Grid.Col>

        {/* System Health */}
        <Grid.Col span={4}>
          <Card 
            p="lg"
            style={{ 
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '12px',
              marginBottom: '16px'
            }}
          >
            <Text 
              size="lg" 
              weight={600} 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb="md"
            >
              system_health()
            </Text>
            
            <div style={{ marginBottom: '16px' }}>
              <Group position="apart" mb={4}>
                <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  AI Engine
                </Text>
                <Text size="xs" color="#22c55e" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  ACTIVE
                </Text>
              </Group>
              <Progress value={100} color="#22c55e" size="xs" />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <Group position="apart" mb={4}>
                <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  Threat Detection
                </Text>
                <Text size="xs" color="#22c55e" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  LEARNING
                </Text>
              </Group>
              <Progress value={97} color="#22c55e" size="xs" />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <Group position="apart" mb={4}>
                <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  API Endpoints
                </Text>
                <Text size="xs" color="#22c55e" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  ONLINE
                </Text>
              </Group>
              <Progress value={99} color="#22c55e" size="xs" />
            </div>

            <div>
              <Group position="apart" mb={4}>
                <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  Database Sync
                </Text>
                <Text size="xs" color="#f59e0b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  SYNCING
                </Text>
              </Group>
              <Progress value={85} color="#f59e0b" size="xs" />
            </div>
          </Card>

          {/* API Usage */}
          <Card 
            p="lg"
            style={{ 
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '12px'
            }}
          >
            <Text 
              size="lg" 
              weight={600} 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb="md"
            >
              api_usage()
            </Text>
            
            <Group position="apart" mb="xs">
              <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                Calls Today
              </Text>
              <Text size="sm" color="#f59e0b" weight={600} style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                {stats?.apiCallsUsed?.toLocaleString() || '0'} / 10,000
              </Text>
            </Group>
            <Progress 
              value={((stats?.apiCallsUsed || 0) / 10000) * 100} 
              color="#f59e0b" 
              size="sm" 
              mb="md"
            />

            <Group position="apart" mb="xs">
              <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                Active Keys
              </Text>
              <Text size="sm" color="#3b82f6" weight={600} style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                {stats?.activeApiKeys || 0}
              </Text>
            </Group>

            <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }} mt="md">
              {`// Upgrade for unlimited API calls`}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
} 
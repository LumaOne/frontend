'use client';

import { Grid, Card, Text, Group, Badge, Progress, SimpleGrid, Table, ActionIcon, Tooltip } from '@mantine/core';
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaEye, FaClock, FaArrowUp, FaArrowDown, FaBolt } from 'react-icons/fa';

export default function DashboardPage() {
  const threatData = [
    { id: 1, email: 'phishing@malicious.com', type: 'Phishing', severity: 'High', time: '2 min ago', status: 'blocked' },
    { id: 2, email: 'spam@newsletter.com', type: 'Spam', severity: 'Medium', time: '5 min ago', status: 'blocked' },
    { id: 3, email: 'suspicious@domain.net', type: 'Malware', severity: 'Critical', time: '8 min ago', status: 'blocked' },
    { id: 4, email: 'social@engineer.org', type: 'Social Engineering', severity: 'High', time: '12 min ago', status: 'blocked' },
    { id: 5, email: 'fake@bank.com', type: 'Phishing', severity: 'Critical', time: '15 min ago', status: 'blocked' },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f59e0b';
      case 'Medium': return '#3b82f6';
      default: return '#22c55e';
    }
  };

  const MetricCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
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
          <Icon size={20} color={color} />
        </div>
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
        {value}
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
            Last updated: now
          </Text>
        </Group>
      </Group>

      {/* Metrics Grid */}
      <SimpleGrid cols={4} spacing="lg" mb="xl">
        <MetricCard
          title="threats_blocked"
          value="1,249"
          change={12}
          icon={FaShieldAlt}
          color="#22c55e"
          subtitle="today | +156 from yesterday"
        />
        <MetricCard
          title="emails_processed"
          value="47,382"
          change={8}
          icon={FaBolt}
          color="#3b82f6"
          subtitle="today | 1.2M this month"
        />
        <MetricCard
          title="detection_accuracy"
          value="99.97%"
          change={0.1}
          icon={FaCheckCircle}
          color="#f59e0b"
          subtitle="current | 0.003s avg response"
        />
        <MetricCard
          title="critical_alerts"
          value="3"
          change={-25}
          icon={FaExclamationTriangle}
          color="#ef4444"
          subtitle="active | -2 from yesterday"
        />
      </SimpleGrid>

      {/* Main Content Grid */}
      <Grid>
        {/* Threat Detection Chart */}
        <Grid.Col span={8}>
          <Card 
            p="lg"
            style={{ 
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '12px',
              height: '400px'
            }}
          >
            <Group position="apart" mb="md">
              <Text 
                size="lg" 
                weight={600} 
                color="#e2e8f0"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                threat_detection_timeline()
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
            
            {/* Simulated Chart Area */}
            <div style={{
              height: '300px',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <Text 
                color="#64748b"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {`// Chart.js integration placeholder`}
              </Text>
              
              {/* Simulated data points */}
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                <Group position="apart">
                  <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>00:00</Text>
                  <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>06:00</Text>
                  <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>12:00</Text>
                  <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>18:00</Text>
                  <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>24:00</Text>
                </Group>
              </div>
            </div>
          </Card>
        </Grid.Col>

        {/* System Status */}
        <Grid.Col span={4}>
          <Card 
            p="lg"
            style={{ 
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '12px',
              height: '400px'
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
            
            <div style={{ marginBottom: '20px' }}>
              <Group position="apart" mb="xs">
                <Text size="sm" color="#94a3b8" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  AI Engine
                </Text>
                <Text size="sm" color="#22c55e" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  99.9%
                </Text>
              </Group>
              <Progress 
                value={99.9} 
                color="#22c55e"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <Group position="apart" mb="xs">
                <Text size="sm" color="#94a3b8" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  API Response
                </Text>
                <Text size="sm" color="#3b82f6" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  98.7%
                </Text>
              </Group>
              <Progress 
                value={98.7} 
                color="#3b82f6"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <Group position="apart" mb="xs">
                <Text size="sm" color="#94a3b8" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  Database
                </Text>
                <Text size="sm" color="#f59e0b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  97.2%
                </Text>
              </Group>
              <Progress 
                value={97.2} 
                color="#f59e0b"
                style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
              />
            </div>

            <div style={{
              marginTop: '30px',
              padding: '12px',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '8px'
            }}>
              <Text 
                size="xs" 
                color="#64748b"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
                mb={4}
              >
                {`// CURRENT_STATUS`}
              </Text>
              <Group spacing="xs">
                <div style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
                <Text size="sm" color="#22c55e" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  ALL_SYSTEMS_OPERATIONAL
                </Text>
              </Group>
            </div>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Recent Threats Table */}
      <Card 
        p="lg" 
        mt="xl"
        style={{ 
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(239, 68, 68, 0.2)',
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
            recent_threats.log()
          </Text>
          <Group spacing="xs">
            <Badge 
              size="sm"
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}
            >
              {threatData.length} BLOCKED
            </Badge>
          </Group>
        </Group>

        <Table 
          style={{ 
            backgroundColor: 'transparent',
            fontFamily: '"JetBrains Mono", monospace'
          }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(34, 197, 94, 0.2)' }}>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>EMAIL</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>TYPE</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>SEVERITY</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>TIME</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {threatData.map((threat) => (
              <tr key={threat.id} style={{ borderBottom: '1px solid rgba(34, 197, 94, 0.1)' }}>
                <td style={{ padding: '12px 8px' }}>
                  <Text size="sm" color="#e2e8f0" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    {threat.email}
                  </Text>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <Badge 
                    size="sm"
                    style={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      color: '#3b82f6',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}
                  >
                    {threat.type}
                  </Badge>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <Badge 
                    size="sm"
                    style={{ 
                      backgroundColor: `rgba(${getSeverityColor(threat.severity).slice(1, 3)}, ${parseInt(getSeverityColor(threat.severity).slice(3, 5), 16)}, ${parseInt(getSeverityColor(threat.severity).slice(5, 7), 16)}, 0.1)`,
                      color: getSeverityColor(threat.severity),
                      border: `1px solid rgba(${parseInt(getSeverityColor(threat.severity).slice(1, 3), 16)}, ${parseInt(getSeverityColor(threat.severity).slice(3, 5), 16)}, ${parseInt(getSeverityColor(threat.severity).slice(5, 7), 16)}, 0.2)`
                    }}
                  >
                    {threat.severity}
                  </Badge>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <Text size="sm" color="#94a3b8" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    {threat.time}
                  </Text>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <Group spacing="xs">
                    <Tooltip label="View Details">
                      <ActionIcon 
                        size="sm"
                        style={{ 
                          backgroundColor: 'rgba(34, 197, 94, 0.1)',
                          color: '#22c55e',
                          border: '1px solid rgba(34, 197, 94, 0.2)'
                        }}
                      >
                        <FaEye size={12} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
} 
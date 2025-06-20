'use client';

import { Card, Text, Group, Badge, Table, ActionIcon, Tooltip, SimpleGrid, Progress, Button } from '@mantine/core';
import { FaShieldAlt, FaExclamationTriangle, FaEye, FaDownload, FaBan, FaPlay, FaPause } from 'react-icons/fa';

export default function ThreatsPage() {
  const threatData = [
    { 
      id: 1, 
      email: 'phishing@malicious.com', 
      type: 'Phishing', 
      severity: 'Critical', 
      time: '2024-01-15 14:32:15', 
      status: 'blocked',
      confidence: 98.7,
      source: 'Email Gateway',
      details: 'Suspicious login attempt detected'
    },
    { 
      id: 2, 
      email: 'spam@newsletter.com', 
      type: 'Spam', 
      severity: 'Medium', 
      time: '2024-01-15 14:29:42', 
      status: 'quarantined',
      confidence: 85.2,
      source: 'Content Filter',
      details: 'Bulk email pattern detected'
    },
    { 
      id: 3, 
      email: 'suspicious@domain.net', 
      type: 'Malware', 
      severity: 'Critical', 
      time: '2024-01-15 14:25:18', 
      status: 'blocked',
      confidence: 99.1,
      source: 'AI Engine',
      details: 'Malicious attachment detected'
    },
    { 
      id: 4, 
      email: 'social@engineer.org', 
      type: 'Social Engineering', 
      severity: 'High', 
      time: '2024-01-15 14:20:33', 
      status: 'blocked',
      confidence: 92.4,
      source: 'Behavioral Analysis',
      details: 'Impersonation attempt detected'
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f59e0b';
      case 'Medium': return '#3b82f6';
      default: return '#22c55e';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'blocked': return '#ef4444';
      case 'quarantined': return '#f59e0b';
      case 'allowed': return '#22c55e';
      default: return '#64748b';
    }
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
            threat_monitor()
          </Text>
          <Text 
            size="sm" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {`// Real-time threat detection and analysis`}
          </Text>
        </div>
        
        <Group spacing="xs">
          <Button 
            size="sm"
            style={{ 
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              color: '#22c55e',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              fontFamily: '"JetBrains Mono", monospace'
            }}
          >
            <FaPlay size={12} style={{ marginRight: '8px' }} />
            {`> start_monitoring()`}
          </Button>
          <Button 
            size="sm"
            style={{ 
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              fontFamily: '"JetBrains Mono", monospace'
            }}
          >
            <FaDownload size={12} style={{ marginRight: '8px' }} />
            {`> export_logs()`}
          </Button>
        </Group>
      </Group>

      {/* Threat Summary Cards */}
      <SimpleGrid cols={4} spacing="lg" mb="xl">
        <Card 
          p="md"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group position="apart" mb="xs">
            <FaExclamationTriangle size={20} color="#ef4444" />
            <Badge 
              size="sm"
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}
            >
              CRITICAL
            </Badge>
          </Group>
          <Text 
            size="xs" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
            mb={4}
          >
            {`// CRITICAL_THREATS`}
          </Text>
          <Text 
            size="xl" 
            weight={700} 
            color="#ef4444"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            2
          </Text>
          <Text 
            size="xs" 
            color="#94a3b8"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            last 24h | +1 from yesterday
          </Text>
        </Card>

        <Card 
          p="md"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group position="apart" mb="xs">
            <FaShieldAlt size={20} color="#f59e0b" />
            <Badge 
              size="sm"
              style={{ 
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: '#f59e0b',
                border: '1px solid rgba(245, 158, 11, 0.2)'
              }}
            >
              HIGH
            </Badge>
          </Group>
          <Text 
            size="xs" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
            mb={4}
          >
            {`// HIGH_THREATS`}
          </Text>
          <Text 
            size="xl" 
            weight={700} 
            color="#f59e0b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            5
          </Text>
          <Text 
            size="xs" 
            color="#94a3b8"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            last 24h | -2 from yesterday
          </Text>
        </Card>

        <Card 
          p="md"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group position="apart" mb="xs">
            <FaBan size={20} color="#3b82f6" />
            <Badge 
              size="sm"
              style={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              BLOCKED
            </Badge>
          </Group>
          <Text 
            size="xs" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
            mb={4}
          >
            {`// TOTAL_BLOCKED`}
          </Text>
          <Text 
            size="xl" 
            weight={700} 
            color="#3b82f6"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            1,249
          </Text>
          <Text 
            size="xs" 
            color="#94a3b8"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            today | 99.97% success rate
          </Text>
        </Card>

        <Card 
          p="md"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group position="apart" mb="xs">
            <div style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
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
          </Group>
          <Text 
            size="xs" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
            mb={4}
          >
            {`// SYSTEM_STATUS`}
          </Text>
          <Text 
            size="sm" 
            weight={600} 
            color="#22c55e"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            OPERATIONAL
          </Text>
          <Text 
            size="xs" 
            color="#94a3b8"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            monitoring active | 0.003s latency
          </Text>
        </Card>
      </SimpleGrid>

      {/* Threat Feed Table */}
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
            live_threat_feed.stream()
          </Text>
          <Group spacing="xs">
            <Badge 
              size="sm"
              style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                color: '#22c55e',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}
            >
              STREAMING
            </Badge>
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {threatData.length} active threats
            </Text>
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
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>TIMESTAMP</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>SOURCE</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>TYPE</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>SEVERITY</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>CONFIDENCE</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>STATUS</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {threatData.map((threat) => (
              <tr key={threat.id} style={{ borderBottom: '1px solid rgba(34, 197, 94, 0.1)' }}>
                <td style={{ padding: '12px 8px' }}>
                  <Text size="sm" color="#e2e8f0" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    {threat.time}
                  </Text>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <Text size="sm" color="#94a3b8" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    {threat.email}
                  </Text>
                  <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    {threat.source}
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
                      backgroundColor: `${getSeverityColor(threat.severity)}20`,
                      color: getSeverityColor(threat.severity),
                      border: `1px solid ${getSeverityColor(threat.severity)}40`
                    }}
                  >
                    {threat.severity}
                  </Badge>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <div>
                    <Text size="sm" color="#22c55e" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                      {threat.confidence}%
                    </Text>
                    <Progress 
                      value={threat.confidence} 
                      size="xs"
                      color="#22c55e"
                      style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', width: '60px' }}
                    />
                  </div>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <Badge 
                    size="sm"
                    style={{ 
                      backgroundColor: `${getStatusColor(threat.status)}20`,
                      color: getStatusColor(threat.status),
                      border: `1px solid ${getStatusColor(threat.status)}40`
                    }}
                  >
                    {threat.status.toUpperCase()}
                  </Badge>
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
                    <Tooltip label="Download Report">
                      <ActionIcon 
                        size="sm"
                        style={{ 
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: '#3b82f6',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}
                      >
                        <FaDownload size={12} />
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
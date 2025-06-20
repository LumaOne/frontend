'use client';

import { Card, Text, Group, Badge, Table, ActionIcon, Tooltip, Button, TextInput, Modal, Code, CopyButton } from '@mantine/core';
import { FaKey, FaPlus, FaEye, FaTrash, FaCopy, FaEdit, FaCalendarAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function ApiKeysPage() {
  const [opened, setOpened] = useState(false);
  const [keyName, setKeyName] = useState('');
  
  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'luma_live_sk_1234567890abcdef',
      masked: 'luma_live_sk_••••••••••••cdef',
      created: '2024-01-10',
      lastUsed: '2 hours ago',
      requests: '47,382',
      status: 'active'
    },
    {
      id: 2,
      name: 'Development Key',
      key: 'luma_test_sk_abcdef1234567890',
      masked: 'luma_test_sk_••••••••••••7890',
      created: '2024-01-08',
      lastUsed: '5 minutes ago',
      requests: '1,249',
      status: 'active'
    },
    {
      id: 3,
      name: 'Legacy Integration',
      key: 'luma_live_sk_fedcba0987654321',
      masked: 'luma_live_sk_••••••••••••4321',
      created: '2023-12-15',
      lastUsed: '3 days ago',
      requests: '892,441',
      status: 'inactive'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'inactive': return '#64748b';
      case 'revoked': return '#ef4444';
      default: return '#64748b';
    }
  };

  const generateNewKey = () => {
    // Simulate key generation
    console.log('Generating new API key:', keyName);
    setOpened(false);
    setKeyName('');
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
            api_keys.manage()
          </Text>
          <Text 
            size="sm" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {`// Manage API keys and access tokens`}
          </Text>
        </div>
        
        <Button 
          size="sm"
          onClick={() => setOpened(true)}
          style={{ 
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            color: '#22c55e',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            fontFamily: '"JetBrains Mono", monospace'
          }}
        >
          <FaPlus size={12} style={{ marginRight: '8px' }} />
          {`> generate_key()`}
        </Button>
      </Group>

      {/* API Keys Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <Card 
          p="md"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group position="apart" mb="xs">
            <FaKey size={20} color="#22c55e" />
            <Badge 
              size="sm"
              style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                color: '#22c55e',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}
            >
              ACTIVE
            </Badge>
          </Group>
          <Text 
            size="xs" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
            mb={4}
          >
            {`// ACTIVE_KEYS`}
          </Text>
          <Text 
            size="xl" 
            weight={700} 
            color="#22c55e"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {apiKeys.filter(key => key.status === 'active').length}
          </Text>
          <Text 
            size="xs" 
            color="#94a3b8"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            out of {apiKeys.length} total keys
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
            <FaCalendarAlt size={20} color="#3b82f6" />
            <Badge 
              size="sm"
              style={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              USAGE
            </Badge>
          </Group>
          <Text 
            size="xs" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
            mb={4}
          >
            {`// TOTAL_REQUESTS`}
          </Text>
          <Text 
            size="xl" 
            weight={700} 
            color="#3b82f6"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            941K
          </Text>
          <Text 
            size="xs" 
            color="#94a3b8"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            this month | +12% from last month
          </Text>
        </Card>
      </div>

      {/* API Keys Table */}
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
            api_keys.list()
          </Text>
          <Text 
            size="xs" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {apiKeys.length} keys configured
          </Text>
        </Group>

        <Table 
          style={{ 
            backgroundColor: 'transparent',
            fontFamily: '"JetBrains Mono", monospace'
          }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(34, 197, 94, 0.2)' }}>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>NAME</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>API KEY</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>USAGE</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>LAST USED</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>STATUS</th>
              <th style={{ color: '#64748b', fontSize: '12px', padding: '12px 8px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((apiKey) => (
              <tr key={apiKey.id} style={{ borderBottom: '1px solid rgba(34, 197, 94, 0.1)' }}>
                <td style={{ padding: '12px 8px' }}>
                  <Text size="sm" color="#e2e8f0" weight={600} style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    {apiKey.name}
                  </Text>
                  <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    Created: {apiKey.created}
                  </Text>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <Group spacing="xs">
                    <Code 
                      style={{ 
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        color: '#22c55e',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '12px'
                      }}
                    >
                      {apiKey.masked}
                    </Code>
                    <CopyButton value={apiKey.key}>
                      {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy key'}>
                          <ActionIcon 
                            size="sm"
                            onClick={copy}
                            style={{ 
                              backgroundColor: 'rgba(34, 197, 94, 0.1)',
                              color: '#22c55e',
                              border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}
                          >
                            <FaCopy size={10} />
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Group>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <Text size="sm" color="#3b82f6" weight={600} style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    {apiKey.requests}
                  </Text>
                  <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    requests
                  </Text>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <Text size="sm" color="#94a3b8" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    {apiKey.lastUsed}
                  </Text>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <Badge 
                    size="sm"
                    style={{ 
                      backgroundColor: `${getStatusColor(apiKey.status)}20`,
                      color: getStatusColor(apiKey.status),
                      border: `1px solid ${getStatusColor(apiKey.status)}40`
                    }}
                  >
                    {apiKey.status.toUpperCase()}
                  </Badge>
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <Group spacing="xs">
                    <Tooltip label="View Details">
                      <ActionIcon 
                        size="sm"
                        style={{ 
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: '#3b82f6',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}
                      >
                        <FaEye size={12} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Edit Key">
                      <ActionIcon 
                        size="sm"
                        style={{ 
                          backgroundColor: 'rgba(245, 158, 11, 0.1)',
                          color: '#f59e0b',
                          border: '1px solid rgba(245, 158, 11, 0.2)'
                        }}
                      >
                        <FaEdit size={12} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Delete Key">
                      <ActionIcon 
                        size="sm"
                        style={{ 
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          border: '1px solid rgba(239, 68, 68, 0.2)'
                        }}
                      >
                        <FaTrash size={12} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* API Documentation */}
      <Card 
        p="lg" 
        mt="xl"
        style={{ 
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(59, 130, 246, 0.2)',
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
          quick_start.example()
        </Text>
        
        <Text 
          size="sm" 
          color="#64748b"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
          mb="md"
        >
          {`// Example API usage with your keys`}
        </Text>

        <Code 
          block
          style={{ 
            backgroundColor: '#0a0a0a',
            color: '#e2e8f0',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '13px',
            padding: '16px'
          }}
        >
{`curl -X POST https://api.lumaone.ai/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": {
      "subject": "Urgent: Verify Your Account",
      "body": "Click here to verify...",
      "sender": "security@bank.com"
    }
  }'

// Response
{
  "threat_detected": true,
  "confidence": 98.7,
  "threat_type": "phishing",
  "risk_score": 9.2,
  "action": "block"
}`}
        </Code>
      </Card>

      {/* Generate New Key Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text 
            weight={600}
            style={{ 
              fontFamily: '"JetBrains Mono", monospace',
              color: '#e2e8f0'
            }}
          >
            generate_new_key()
          </Text>
        }
        styles={{
          modal: { backgroundColor: '#1a1a1a', border: '1px solid rgba(34, 197, 94, 0.2)' },
          header: { backgroundColor: '#1a1a1a', borderBottom: '1px solid rgba(34, 197, 94, 0.2)' },
          title: { color: '#e2e8f0' }
        }}
      >
        <div style={{ padding: '16px 0' }}>
          <Text 
            size="sm" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
            mb="md"
          >
            {`// Create a new API key for your application`}
          </Text>
          
          <TextInput
            label="Key Name"
            placeholder="e.g., Production API Key"
            value={keyName}
            onChange={(e) => setKeyName(e.currentTarget.value)}
            mb="md"
            styles={{
              label: { 
                color: '#e2e8f0',
                fontFamily: '"JetBrains Mono", monospace'
              },
              input: { 
                backgroundColor: '#0a0a0a',
                borderColor: 'rgba(34, 197, 94, 0.2)',
                color: '#e2e8f0',
                fontFamily: '"JetBrains Mono", monospace'
              }
            }}
          />
          
          <Group position="right" mt="md">
            <Button 
              variant="outline"
              onClick={() => setOpened(false)}
              style={{ 
                borderColor: 'rgba(100, 116, 139, 0.2)',
                color: '#64748b',
                fontFamily: '"JetBrains Mono", monospace'
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={generateNewKey}
              disabled={!keyName.trim()}
              style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                color: '#22c55e',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                fontFamily: '"JetBrains Mono", monospace'
              }}
            >
              Generate Key
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
} 
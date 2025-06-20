'use client';

import { Card, Text, Group, Badge, Button, Switch, TextInput, Divider, SimpleGrid } from '@mantine/core';
import { FaPlug, FaGoogle, FaMicrosoft, FaAws, FaSlack, FaGithub, FaLink, FaKey, FaCheckCircle, FaCog } from 'react-icons/fa';
import { useState } from 'react';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState({
    gmail: { connected: true, status: 'active' },
    outlook: { connected: true, status: 'active' },
    aws_ses: { connected: false, status: 'inactive' },
    slack: { connected: true, status: 'active' },
    github: { connected: false, status: 'inactive' },
    webhook: { connected: true, status: 'active' }
  });

  const toggleIntegration = (key) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        connected: !prev[key].connected,
        status: !prev[key].connected ? 'active' : 'inactive'
      }
    }));
  };

  const availableIntegrations = [
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Connect your Gmail account for email processing',
      icon: FaGoogle,
      color: '#ea4335',
      category: 'Email Providers',
      features: ['Real-time scanning', 'Bulk processing', 'Advanced filters']
    },
    {
      id: 'outlook',
      name: 'Microsoft Outlook',
      description: 'Integrate with Microsoft 365 and Outlook',
      icon: FaMicrosoft,
      color: '#0078d4',
      category: 'Email Providers',
      features: ['Exchange integration', 'Office 365 support', 'Enterprise features']
    },
    {
      id: 'aws_ses',
      name: 'AWS SES',
      description: 'Amazon Simple Email Service integration',
      icon: FaAws,
      color: '#ff9900',
      category: 'Email Providers',
      features: ['High volume processing', 'Cost effective', 'Scalable infrastructure']
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Receive threat alerts in your Slack workspace',
      icon: FaSlack,
      color: '#4a154b',
      category: 'Notifications',
      features: ['Real-time alerts', 'Custom channels', 'Rich formatting']
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Monitor repository security and code analysis',
      icon: FaGithub,
      color: '#24292e',
      category: 'Development',
      features: ['Code scanning', 'Security alerts', 'Automated workflows']
    },
    {
      id: 'webhook',
      name: 'Custom Webhooks',
      description: 'Send data to your custom endpoints',
      icon: FaLink,
      color: '#22c55e',
      category: 'Custom',
      features: ['Flexible payload', 'Retry logic', 'Authentication support']
    }
  ];

  const groupedIntegrations = availableIntegrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = [];
    }
    acc[integration.category].push(integration);
    return acc;
  }, {});

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
            integrations.connect()
          </Text>
          <Text 
            size="sm" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {`// Connect your email providers, APIs, and services`}
          </Text>
        </div>
        
        <Button 
          size="sm"
          style={{ 
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            color: '#22c55e',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            fontFamily: '"JetBrains Mono", monospace'
          }}
        >
          <FaPlug size={12} style={{ marginRight: '8px' }} />
          {`> add_integration()`}
        </Button>
      </Group>

      {/* Connected Integrations Summary */}
      <Card 
        p="lg"
        mb="xl"
        style={{ 
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(34, 197, 94, 0.2)',
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
          connection_status()
        </Text>
        
        <SimpleGrid cols={4} spacing="lg">
          <div>
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb={4}
            >
              TOTAL_INTEGRATIONS
            </Text>
            <Text 
              size="xl" 
              weight={700} 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {availableIntegrations.length}
            </Text>
          </div>
          
          <div>
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb={4}
            >
              CONNECTED
            </Text>
            <Text 
              size="xl" 
              weight={700} 
              color="#22c55e"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {Object.values(integrations).filter(i => i.connected).length}
            </Text>
          </div>
          
          <div>
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb={4}
            >
              ACTIVE
            </Text>
            <Text 
              size="xl" 
              weight={700} 
              color="#3b82f6"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {Object.values(integrations).filter(i => i.status === 'active').length}
            </Text>
          </div>
          
          <div>
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb={4}
            >
              HEALTH_SCORE
            </Text>
            <Text 
              size="xl" 
              weight={700} 
              color="#22c55e"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              98.5%
            </Text>
          </div>
        </SimpleGrid>
      </Card>

      {/* Integration Categories */}
      {Object.entries(groupedIntegrations).map(([category, categoryIntegrations]) => (
        <div key={category} style={{ marginBottom: '32px' }}>
          <Text 
            size="lg" 
            weight={600} 
            color="#e2e8f0"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
            mb="md"
          >
            {category.toLowerCase().replace(' ', '_')}()
          </Text>
          
          <SimpleGrid cols={2} spacing="lg">
            {categoryIntegrations.map((integration) => {
              const Icon = integration.icon;
              const isConnected = integrations[integration.id]?.connected;
              const status = integrations[integration.id]?.status;
              
              return (
                <Card 
                  key={integration.id}
                  p="lg"
                  style={{ 
                    backgroundColor: '#1a1a1a',
                    border: `1px solid ${isConnected ? 'rgba(34, 197, 94, 0.2)' : 'rgba(148, 163, 184, 0.1)'}`,
                    borderRadius: '12px'
                  }}
                >
                  <Group position="apart" mb="md">
                    <Group>
                      <div style={{
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: `${integration.color}20`,
                        border: `1px solid ${integration.color}40`
                      }}>
                        <Icon size={24} color={integration.color} />
                      </div>
                      <div>
                        <Text 
                          size="md" 
                          weight={600} 
                          color="#e2e8f0"
                          style={{ fontFamily: '"JetBrains Mono", monospace' }}
                        >
                          {integration.name}
                        </Text>
                        <Badge 
                          size="sm"
                          style={{ 
                            backgroundColor: isConnected ? 'rgba(34, 197, 94, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                            color: isConnected ? '#22c55e' : '#94a3b8'
                          }}
                        >
                          {status || 'inactive'}
                        </Badge>
                      </div>
                    </Group>
                    
                    <Switch 
                      checked={isConnected}
                      onChange={() => toggleIntegration(integration.id)}
                      color="#22c55e"
                    />
                  </Group>
                  
                  <Text 
                    size="sm" 
                    color="#94a3b8"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                    mb="md"
                  >
                    {integration.description}
                  </Text>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <Text 
                      size="xs" 
                      color="#64748b"
                      style={{ fontFamily: '"JetBrains Mono", monospace' }}
                      mb="xs"
                    >
                      FEATURES:
                    </Text>
                                         <Group spacing="xs">
                       {integration.features.map((feature) => (
                         <Badge 
                           key={feature}
                           size="xs"
                           style={{ 
                             backgroundColor: 'rgba(59, 130, 246, 0.1)',
                             color: '#3b82f6',
                             border: '1px solid rgba(59, 130, 246, 0.2)'
                           }}
                         >
                           {feature}
                         </Badge>
                       ))}
                     </Group>
                  </div>
                  
                  <Group spacing="xs">
                    <Button 
                      size="sm"
                      fullWidth
                      style={{ 
                        backgroundColor: isConnected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                        color: isConnected ? '#3b82f6' : '#22c55e',
                        border: `1px solid ${isConnected ? 'rgba(59, 130, 246, 0.2)' : 'rgba(34, 197, 94, 0.2)'}`,
                        fontFamily: '"JetBrains Mono", monospace'
                      }}
                    >
                      {isConnected ? (
                        <>
                          <FaCog size={12} style={{ marginRight: '8px' }} />
                          {`> configure()`}
                        </>
                      ) : (
                        <>
                          <FaPlug size={12} style={{ marginRight: '8px' }} />
                          {`> connect()`}
                        </>
                      )}
                    </Button>
                  </Group>
                </Card>
              );
            })}
          </SimpleGrid>
        </div>
      ))}

      {/* API Configuration */}
      <Card 
        p="lg"
        style={{ 
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(34, 197, 94, 0.2)',
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
          api_configuration()
        </Text>
        
        <SimpleGrid cols={2} spacing="lg">
          <div>
            <Text 
              size="sm" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb="xs"
            >
              WEBHOOK_URL
            </Text>
            <TextInput
              placeholder="https://your-app.com/webhooks/lumaone"
              styles={{
                input: { 
                  backgroundColor: '#0a0a0a',
                  borderColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#e2e8f0',
                  fontFamily: '"JetBrains Mono", monospace'
                }
              }}
            />
          </div>
          
          <div>
            <Text 
              size="sm" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb="xs"
            >
              SECRET_KEY
            </Text>
            <TextInput
              placeholder="Enter your webhook secret"
              type="password"
              styles={{
                input: { 
                  backgroundColor: '#0a0a0a',
                  borderColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#e2e8f0',
                  fontFamily: '"JetBrains Mono", monospace'
                }
              }}
            />
          </div>
        </SimpleGrid>
        
        <Group position="apart" mt="md">
          <Text 
            size="xs" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {`// Webhook events: threat_detected, email_processed, system_alert`}
          </Text>
          
          <Button 
            size="sm"
            style={{ 
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              color: '#22c55e',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              fontFamily: '"JetBrains Mono", monospace'
            }}
          >
            <FaKey size={12} style={{ marginRight: '8px' }} />
            {`> test_webhook()`}
          </Button>
        </Group>
      </Card>
    </div>
  );
} 
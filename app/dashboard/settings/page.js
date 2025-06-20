'use client';

import { Card, Text, Group, Badge, Switch, TextInput, Button, Select, Divider } from '@mantine/core';
import { FaCog, FaUser, FaBell, FaShieldAlt, FaSave, FaKey } from 'react-icons/fa';
import { useState } from 'react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [realTimeAlerts, setRealTimeAlerts] = useState(true);
  const [autoBlock, setAutoBlock] = useState(true);
  const [apiVersion, setApiVersion] = useState('v3');
  const [threshold, setThreshold] = useState('high');

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
            settings.configure()
          </Text>
          <Text 
            size="sm" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {`// Configure your LumaOne AI settings and preferences`}
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
          <FaSave size={12} style={{ marginRight: '8px' }} />
          {`> save_config()`}
        </Button>
      </Group>

      {/* Settings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* User Profile */}
        <Card 
          p="lg"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group mb="md">
            <FaUser size={20} color="#22c55e" />
            <Text 
              size="lg" 
              weight={600} 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              user_profile()
            </Text>
          </Group>
          
          <div style={{ marginBottom: '16px' }}>
            <TextInput
              label="Email Address"
              value="dev@lumaone.ai"
              disabled
              styles={{
                label: { 
                  color: '#e2e8f0',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '12px',
                  marginBottom: '4px'
                },
                input: { 
                  backgroundColor: '#0a0a0a',
                  borderColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#94a3b8',
                  fontFamily: '"JetBrains Mono", monospace'
                }
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <TextInput
              label="Organization"
              placeholder="Your Company Name"
              styles={{
                label: { 
                  color: '#e2e8f0',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '12px',
                  marginBottom: '4px'
                },
                input: { 
                  backgroundColor: '#0a0a0a',
                  borderColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#e2e8f0',
                  fontFamily: '"JetBrains Mono", monospace'
                }
              }}
            />
          </div>

          <div style={{
            padding: '12px',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '8px',
            marginTop: '16px'
          }}>
            <Text 
              size="sm" 
              color="#22c55e"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb={4}
            >
              {`// PLAN_STATUS`}
            </Text>
            <Group position="apart">
              <Text size="sm" color="#e2e8f0" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                Pro Plan
              </Text>
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
          </div>
        </Card>

        {/* Notification Settings */}
        <Card 
          p="lg"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group mb="md">
            <FaBell size={20} color="#3b82f6" />
            <Text 
              size="lg" 
              weight={600} 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              notifications.config()
            </Text>
          </Group>
          
          <div style={{ marginBottom: '20px' }}>
            <Group position="apart" mb="xs">
              <div>
                <Text size="sm" color="#e2e8f0" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  Email Notifications
                </Text>
                <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  Receive threat alerts via email
                </Text>
              </div>
              <Switch 
                checked={notifications}
                onChange={setNotifications}
                color="#22c55e"
              />
            </Group>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Group position="apart" mb="xs">
              <div>
                <Text size="sm" color="#e2e8f0" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  Real-time Alerts
                </Text>
                <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  Instant notifications for critical threats
                </Text>
              </div>
              <Switch 
                checked={realTimeAlerts}
                onChange={setRealTimeAlerts}
                color="#22c55e"
              />
            </Group>
          </div>

          <div>
            <Text 
              size="sm" 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb="xs"
            >
              Alert Threshold
            </Text>
            <Select
              value={threshold}
              onChange={setThreshold}
              data={[
                { value: 'low', label: 'Low - All threats' },
                { value: 'medium', label: 'Medium - Moderate+ threats' },
                { value: 'high', label: 'High - Critical threats only' },
              ]}
              styles={{
                input: { 
                  backgroundColor: '#0a0a0a',
                  borderColor: 'rgba(59, 130, 246, 0.2)',
                  color: '#e2e8f0',
                  fontFamily: '"JetBrains Mono", monospace'
                },
                dropdown: {
                  backgroundColor: '#0a0a0a',
                  borderColor: 'rgba(59, 130, 246, 0.2)'
                },
                item: {
                  color: '#e2e8f0',
                  fontFamily: '"JetBrains Mono", monospace',
                  '&[data-selected]': {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                  }
                }
              }}
            />
          </div>
        </Card>

        {/* Security Settings */}
        <Card 
          p="lg"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group mb="md">
            <FaShieldAlt size={20} color="#ef4444" />
            <Text 
              size="lg" 
              weight={600} 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              security.config()
            </Text>
          </Group>
          
          <div style={{ marginBottom: '20px' }}>
            <Group position="apart" mb="xs">
              <div>
                <Text size="sm" color="#e2e8f0" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  Auto-block Threats
                </Text>
                <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  Automatically block detected threats
                </Text>
              </div>
              <Switch 
                checked={autoBlock}
                onChange={setAutoBlock}
                color="#ef4444"
              />
            </Group>
          </div>

          <Divider my="md" color="rgba(239, 68, 68, 0.2)" />

          <div>
            <Text 
              size="sm" 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb="xs"
            >
              Two-Factor Authentication
            </Text>
            <Button 
              size="sm"
              variant="outline"
              style={{ 
                borderColor: 'rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                fontFamily: '"JetBrains Mono", monospace'
              }}
            >
              {`> enable_2fa()`}
            </Button>
          </div>
        </Card>

        {/* API Configuration */}
        <Card 
          p="lg"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group mb="md">
            <FaKey size={20} color="#f59e0b" />
            <Text 
              size="lg" 
              weight={600} 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              api.config()
            </Text>
          </Group>
          
          <div style={{ marginBottom: '20px' }}>
            <Text 
              size="sm" 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb="xs"
            >
              API Version
            </Text>
            <Select
              value={apiVersion}
              onChange={setApiVersion}
              data={[
                { value: 'v1', label: 'v1 - Legacy (deprecated)' },
                { value: 'v2', label: 'v2 - Stable' },
                { value: 'v3', label: 'v3 - Latest (recommended)' },
                { value: 'beta', label: 'Beta - Experimental' },
              ]}
              styles={{
                input: { 
                  backgroundColor: '#0a0a0a',
                  borderColor: 'rgba(245, 158, 11, 0.2)',
                  color: '#e2e8f0',
                  fontFamily: '"JetBrains Mono", monospace'
                },
                dropdown: {
                  backgroundColor: '#0a0a0a',
                  borderColor: 'rgba(245, 158, 11, 0.2)'
                },
                item: {
                  color: '#e2e8f0',
                  fontFamily: '"JetBrains Mono", monospace',
                  '&[data-selected]': {
                    backgroundColor: 'rgba(245, 158, 11, 0.1)'
                  }
                }
              }}
            />
          </div>

          <div style={{
            padding: '12px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '8px'
          }}>
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb={4}
            >
              {`// RATE_LIMITS`}
            </Text>
            <Text size="sm" color="#f59e0b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
              Pro Plan: 10,000 requests/hour
            </Text>
            <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
              Current usage: 2,847 requests this hour
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
} 
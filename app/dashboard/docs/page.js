'use client';

import { Card, Text, Group, Badge, Button, Divider, Accordion } from '@mantine/core';
import { FaBook, FaCode, FaQuestionCircle, FaExternalLinkAlt, FaCopy, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useState } from 'react';

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState('');

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/v3/analyze',
      description: 'Analyze email content for threats',
      example: `curl -X POST https://api.lumaone.ai/v3/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": {
      "subject": "Urgent: Verify Your Account",
      "body": "Click here to verify...",
      "sender": "security@bank.com",
      "recipient": "user@company.com"
    }
  }'`
    },
    {
      method: 'GET',
      endpoint: '/api/v3/threats',
      description: 'Retrieve threat detection results',
      example: `curl -X GET https://api.lumaone.ai/v3/threats \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -G -d "limit=50" -d "status=blocked"`
    },
    {
      method: 'POST',
      endpoint: '/api/v3/webhooks',
      description: 'Configure webhook endpoints',
      example: `curl -X POST https://api.lumaone.ai/v3/webhooks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhook",
    "events": ["threat_detected", "email_processed"],
    "secret": "your_webhook_secret"
  }'`
    }
  ];

  const sdkExamples = [
    {
      language: 'JavaScript',
      code: `import { LumaOneClient } from '@lumaone/sdk';

const client = new LumaOneClient({
  apiKey: 'your_api_key_here'
});

// Analyze an email
const result = await client.analyze({
  subject: 'Urgent: Verify Your Account',
  body: 'Click here to verify your account...',
  sender: 'security@bank.com'
});

console.log('Threat Score:', result.threatScore);
console.log('Classification:', result.classification);`
    },
    {
      language: 'Python',
      code: `from lumaone import Client

client = Client(api_key='your_api_key_here')

# Analyze an email
result = client.analyze(
    subject='Urgent: Verify Your Account',
    body='Click here to verify your account...',
    sender='security@bank.com'
)

print(f"Threat Score: {result.threat_score}")
print(f"Classification: {result.classification}")`
    },
    {
      language: 'cURL',
      code: `#!/bin/bash

API_KEY="your_api_key_here"
ENDPOINT="https://api.lumaone.ai/v3/analyze"

curl -X POST "$ENDPOINT" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": {
      "subject": "Urgent: Verify Your Account",
      "body": "Click here to verify...",
      "sender": "security@bank.com"
    }
  }'`
    }
  ];

  const troubleshooting = [
    {
      title: 'API Rate Limiting',
      problem: 'Receiving 429 Too Many Requests errors',
      solution: 'Implement exponential backoff and respect rate limit headers. Pro plan allows 50K requests/month.',
      severity: 'warning'
    },
    {
      title: 'Webhook Timeouts',
      problem: 'Webhooks not being delivered consistently',
      solution: 'Ensure your webhook endpoint responds within 5 seconds and returns 200 status code.',
      severity: 'error'
    },
    {
      title: 'False Positives',
      problem: 'Legitimate emails being flagged as threats',
      solution: 'Adjust confidence threshold in settings or use whitelist functionality for trusted senders.',
      severity: 'info'
    },
    {
      title: 'Integration Issues',
      problem: 'Email provider integration not working',
      solution: 'Verify API credentials and ensure proper OAuth scopes are granted.',
      severity: 'error'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#22c55e';
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
            documentation.help()
          </Text>
          <Text 
            size="sm" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {`// API documentation, guides, and troubleshooting`}
          </Text>
        </div>
        
        <Group spacing="xs">
          <Button 
            size="sm"
            style={{ 
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              fontFamily: '"JetBrains Mono", monospace'
            }}
          >
            <FaExternalLinkAlt size={12} style={{ marginRight: '8px' }} />
            {`> open_postman()`}
          </Button>
          <Button 
            size="sm"
            style={{ 
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              color: '#22c55e',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              fontFamily: '"JetBrains Mono", monospace'
            }}
          >
            <FaBook size={12} style={{ marginRight: '8px' }} />
            {`> view_examples()`}
          </Button>
        </Group>
      </Group>

      {/* Quick Start Guide */}
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
          quick_start_guide()
        </Text>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <Group mb="xs">
              <Badge 
                size="sm"
                style={{ 
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e'
                }}
              >
                STEP 1
              </Badge>
              <Text 
                size="sm" 
                weight={600} 
                color="#e2e8f0"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Get API Key
              </Text>
            </Group>
            <Text 
              size="sm" 
              color="#94a3b8"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Navigate to API Keys section and generate your first key
            </Text>
          </div>
          
          <div>
            <Group mb="xs">
              <Badge 
                size="sm"
                style={{ 
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6'
                }}
              >
                STEP 2
              </Badge>
              <Text 
                size="sm" 
                weight={600} 
                color="#e2e8f0"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Install SDK
              </Text>
            </Group>
            <Text 
              size="sm" 
              color="#94a3b8"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              npm install @lumaone/sdk or pip install lumaone
            </Text>
          </div>
          
          <div>
            <Group mb="xs">
              <Badge 
                size="sm"
                style={{ 
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  color: '#f59e0b'
                }}
              >
                STEP 3
              </Badge>
              <Text 
                size="sm" 
                weight={600} 
                color="#e2e8f0"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Make First Call
              </Text>
            </Group>
            <Text 
              size="sm" 
              color="#94a3b8"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Use the analyze endpoint to scan your first email
            </Text>
          </div>
        </div>
      </Card>

      {/* API Endpoints */}
      <Text 
        size="lg" 
        weight={600} 
        color="#e2e8f0"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
        mb="md"
      >
        api_endpoints()
      </Text>
      
      <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
        {apiEndpoints.map((endpoint, index) => (
          <Card 
            key={index}
            p="lg"
            style={{ 
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '12px'
            }}
          >
            <Group position="apart" mb="md">
              <Group>
                <Badge 
                  size="sm"
                  style={{ 
                    backgroundColor: endpoint.method === 'POST' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    color: endpoint.method === 'POST' ? '#22c55e' : '#3b82f6'
                  }}
                >
                  {endpoint.method}
                </Badge>
                <Text 
                  size="md" 
                  weight={600} 
                  color="#e2e8f0"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {endpoint.endpoint}
                </Text>
              </Group>
              
              <Button 
                size="xs"
                onClick={() => copyToClipboard(endpoint.example, `endpoint-${index}`)}
                style={{ 
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  fontFamily: '"JetBrains Mono", monospace'
                }}
              >
                {copiedCode === `endpoint-${index}` ? (
                  <>
                    <FaCheckCircle size={10} style={{ marginRight: '4px' }} />
                    copied
                  </>
                ) : (
                  <>
                    <FaCopy size={10} style={{ marginRight: '4px' }} />
                    copy
                  </>
                )}
              </Button>
            </Group>
            
            <Text 
              size="sm" 
              color="#94a3b8"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb="md"
            >
              {endpoint.description}
            </Text>
            
            <div style={{
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '8px',
              padding: '16px',
              overflow: 'auto'
            }}>
              <pre style={{
                margin: 0,
                color: '#e2e8f0',
                fontSize: '12px',
                fontFamily: '"JetBrains Mono", monospace',
                lineHeight: '1.4'
              }}>
                {endpoint.example}
              </pre>
            </div>
          </Card>
        ))}
      </div>

      {/* SDK Examples */}
      <Text 
        size="lg" 
        weight={600} 
        color="#e2e8f0"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
        mb="md"
      >
        sdk_examples()
      </Text>
      
      <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
        {sdkExamples.map((example, index) => (
          <Card 
            key={index}
            p="lg"
            style={{ 
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '12px'
            }}
          >
            <Group position="apart" mb="md">
              <Text 
                size="md" 
                weight={600} 
                color="#e2e8f0"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {example.language}
              </Text>
              
              <Button 
                size="xs"
                onClick={() => copyToClipboard(example.code, `sdk-${index}`)}
                style={{ 
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  fontFamily: '"JetBrains Mono", monospace'
                }}
              >
                {copiedCode === `sdk-${index}` ? (
                  <>
                    <FaCheckCircle size={10} style={{ marginRight: '4px' }} />
                    copied
                  </>
                ) : (
                  <>
                    <FaCopy size={10} style={{ marginRight: '4px' }} />
                    copy
                  </>
                )}
              </Button>
            </Group>
            
            <div style={{
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '8px',
              padding: '16px',
              overflow: 'auto'
            }}>
              <pre style={{
                margin: 0,
                color: '#e2e8f0',
                fontSize: '12px',
                fontFamily: '"JetBrains Mono", monospace',
                lineHeight: '1.4'
              }}>
                {example.code}
              </pre>
            </div>
          </Card>
        ))}
      </div>

      {/* Troubleshooting */}
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
          troubleshooting.common_issues()
        </Text>
        
        <Accordion
          styles={{
            item: { 
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(148, 163, 184, 0.1)',
              marginBottom: '8px'
            },
            control: { 
              backgroundColor: 'transparent',
              color: '#e2e8f0',
              fontFamily: '"JetBrains Mono", monospace'
            },
            content: { 
              color: '#94a3b8',
              fontFamily: '"JetBrains Mono", monospace'
            }
          }}
        >
          {troubleshooting.map((item, index) => (
            <Accordion.Item key={index} value={`item-${index}`}>
              <Accordion.Control>
                <Group>
                  {item.severity === 'error' && <FaExclamationTriangle color="#ef4444" size={14} />}
                  {item.severity === 'warning' && <FaExclamationTriangle color="#f59e0b" size={14} />}
                  {item.severity === 'info' && <FaQuestionCircle color="#3b82f6" size={14} />}
                  <Text size="sm" weight={600}>
                    {item.title}
                  </Text>
                  <Badge 
                    size="xs"
                    style={{ 
                      backgroundColor: `rgba(${getSeverityColor(item.severity).replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.1)`,
                      color: getSeverityColor(item.severity)
                    }}
                  >
                    {item.severity.toUpperCase()}
                  </Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <div style={{ marginBottom: '12px' }}>
                  <Text size="xs" color="#64748b" mb="xs">
                    PROBLEM:
                  </Text>
                  <Text size="sm" color="#94a3b8">
                    {item.problem}
                  </Text>
                </div>
                <div>
                  <Text size="xs" color="#64748b" mb="xs">
                    SOLUTION:
                  </Text>
                  <Text size="sm" color="#e2e8f0">
                    {item.solution}
                  </Text>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    </div>
  );
} 
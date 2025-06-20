'use client';

import { Card, Text, Group, Badge, Button, SimpleGrid, Progress, Divider } from '@mantine/core';
import { FaCreditCard, FaDownload, FaClock, FaCheckCircle, FaExclamationTriangle, FaChartLine, FaCalendarAlt, FaArrowUp } from 'react-icons/fa';
import { useState } from 'react';

export default function BillingPage() {
  const [currentPlan] = useState('pro');
  
  const subscriptionData = {
    plan: 'Pro',
    status: 'active',
    nextBilling: '2024-02-15',
    amount: 29.00,
    currency: 'USD',
    billingCycle: 'monthly',
    daysLeft: 12
  };

  const usageData = {
    emailsProcessed: 42847,
    emailsLimit: 100000,
    apiCalls: 15234,
    apiLimit: 50000,
    storage: 2.4,
    storageLimit: 10
  };

  const invoiceHistory = [
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: 29.00,
      status: 'paid',
      description: 'Pro Plan - Monthly'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      amount: 29.00,
      status: 'paid',
      description: 'Pro Plan - Monthly'
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-15',
      amount: 29.00,
      status: 'paid',
      description: 'Pro Plan - Monthly'
    },
    {
      id: 'INV-2023-010',
      date: '2023-10-15',
      amount: 9.00,
      status: 'paid',
      description: 'Starter Plan - Monthly'
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: 9,
      features: [
        '10K emails/month',
        '5K API calls/month',
        '1GB storage',
        'Basic support'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: 29,
      features: [
        '100K emails/month',
        '50K API calls/month',
        '10GB storage',
        'Priority support',
        'Advanced analytics',
        'Custom integrations'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99,
      features: [
        'Unlimited emails',
        'Unlimited API calls',
        '100GB storage',
        '24/7 dedicated support',
        'Custom ML models',
        'On-premise deployment',
        'SLA guarantee'
      ],
      popular: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'paid': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'overdue': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getUsagePercentage = (used, limit) => {
    return Math.min((used / limit) * 100, 100);
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
            billing.manage()
          </Text>
          <Text 
            size="sm" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {`// Manage your subscription and billing information`}
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
            <FaCreditCard size={12} style={{ marginRight: '8px' }} />
            {`> update_payment()`}
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
            <FaDownload size={12} style={{ marginRight: '8px' }} />
            {`> download_invoices()`}
          </Button>
        </Group>
      </Group>

      {/* Current Subscription */}
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
          current_subscription()
        </Text>
        
        <SimpleGrid cols={4} spacing="lg">
          <div>
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb={4}
            >
              PLAN
            </Text>
            <Group spacing="xs">
              <Text 
                size="xl" 
                weight={700} 
                color="#22c55e"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {subscriptionData.plan}
              </Text>
              <Badge 
                size="sm"
                style={{ 
                  backgroundColor: `rgba(${getStatusColor(subscriptionData.status).replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.1)`,
                  color: getStatusColor(subscriptionData.status)
                }}
              >
                {subscriptionData.status.toUpperCase()}
              </Badge>
            </Group>
          </div>
          
          <div>
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb={4}
            >
              NEXT_BILLING
            </Text>
            <Text 
              size="lg" 
              weight={700} 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {subscriptionData.nextBilling}
            </Text>
            <Text 
              size="xs" 
              color="#94a3b8"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {subscriptionData.daysLeft} days left
            </Text>
          </div>
          
          <div>
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb={4}
            >
              AMOUNT
            </Text>
            <Text 
              size="xl" 
              weight={700} 
              color="#3b82f6"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              ${subscriptionData.amount}
            </Text>
            <Text 
              size="xs" 
              color="#94a3b8"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              /{subscriptionData.billingCycle}
            </Text>
          </div>
          
          <div>
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb={4}
            >
              PAYMENT_METHOD
            </Text>
            <Group spacing="xs">
              <FaCreditCard size={16} color="#e2e8f0" />
              <Text 
                size="sm" 
                color="#e2e8f0"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                •••• 4242
              </Text>
            </Group>
            <Text 
              size="xs" 
              color="#94a3b8"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Visa ending in 4242
            </Text>
          </div>
        </SimpleGrid>
      </Card>

      {/* Usage Overview */}
      <Card 
        p="lg"
        mb="xl"
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
          usage_metrics()
        </Text>
        
        <SimpleGrid cols={3} spacing="lg">
          <div>
            <Group position="apart" mb="xs">
              <Text 
                size="sm" 
                color="#e2e8f0"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Emails Processed
              </Text>
              <Text 
                size="sm" 
                color="#3b82f6"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {usageData.emailsProcessed.toLocaleString()} / {usageData.emailsLimit.toLocaleString()}
              </Text>
            </Group>
            <Progress 
              value={getUsagePercentage(usageData.emailsProcessed, usageData.emailsLimit)}
              size="sm"
              color="#3b82f6"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Text 
              size="xs" 
              color="#94a3b8"
              style={{ fontFamily: '"JetBrains Mono", monospace', marginTop: '4px' }}
            >
              {getUsagePercentage(usageData.emailsProcessed, usageData.emailsLimit).toFixed(1)}% used
            </Text>
          </div>
          
          <div>
            <Group position="apart" mb="xs">
              <Text 
                size="sm" 
                color="#e2e8f0"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                API Calls
              </Text>
              <Text 
                size="sm" 
                color="#22c55e"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {usageData.apiCalls.toLocaleString()} / {usageData.apiLimit.toLocaleString()}
              </Text>
            </Group>
            <Progress 
              value={getUsagePercentage(usageData.apiCalls, usageData.apiLimit)}
              size="sm"
              color="#22c55e"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
            />
            <Text 
              size="xs" 
              color="#94a3b8"
              style={{ fontFamily: '"JetBrains Mono", monospace', marginTop: '4px' }}
            >
              {getUsagePercentage(usageData.apiCalls, usageData.apiLimit).toFixed(1)}% used
            </Text>
          </div>
          
          <div>
            <Group position="apart" mb="xs">
              <Text 
                size="sm" 
                color="#e2e8f0"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Storage Used
              </Text>
              <Text 
                size="sm" 
                color="#f59e0b"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {usageData.storage}GB / {usageData.storageLimit}GB
              </Text>
            </Group>
            <Progress 
              value={getUsagePercentage(usageData.storage, usageData.storageLimit)}
              size="sm"
              color="#f59e0b"
              style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
            />
            <Text 
              size="xs" 
              color="#94a3b8"
              style={{ fontFamily: '"JetBrains Mono", monospace', marginTop: '4px' }}
            >
              {getUsagePercentage(usageData.storage, usageData.storageLimit).toFixed(1)}% used
            </Text>
          </div>
        </SimpleGrid>
      </Card>

      {/* Available Plans */}
      <Text 
        size="lg" 
        weight={600} 
        color="#e2e8f0"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
        mb="md"
      >
        available_plans()
      </Text>
      
      <SimpleGrid cols={3} spacing="lg" mb="xl">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            p="lg"
            style={{ 
              backgroundColor: '#1a1a1a',
              border: plan.popular ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(148, 163, 184, 0.1)',
              borderRadius: '12px',
              position: 'relative'
            }}
          >
            {plan.popular && (
              <Badge 
                size="sm"
                style={{ 
                  position: 'absolute',
                  top: '-8px',
                  right: '16px',
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.4)'
                }}
              >
                CURRENT
              </Badge>
            )}
            
            <Text 
              size="lg" 
              weight={600} 
              color="#e2e8f0"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              mb="xs"
            >
              {plan.name}
            </Text>
            
            <Group spacing="xs" mb="md">
              <Text 
                size="xl" 
                weight={700} 
                color="#22c55e"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                ${plan.price}
              </Text>
              <Text 
                size="sm" 
                color="#94a3b8"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                /month
              </Text>
            </Group>
            
            <div style={{ marginBottom: '20px' }}>
              {plan.features.map((feature) => (
                <Group key={feature} spacing="xs" mb="xs">
                  <FaCheckCircle size={12} color="#22c55e" />
                  <Text 
                    size="sm" 
                    color="#e2e8f0"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    {feature}
                  </Text>
                </Group>
              ))}
            </div>
            
            <Button 
              fullWidth
              size="sm"
              disabled={currentPlan === plan.name.toLowerCase()}
              style={{ 
                backgroundColor: currentPlan === plan.name.toLowerCase() 
                  ? 'rgba(148, 163, 184, 0.1)' 
                  : 'rgba(34, 197, 94, 0.1)',
                color: currentPlan === plan.name.toLowerCase() 
                  ? '#94a3b8' 
                  : '#22c55e',
                border: `1px solid ${currentPlan === plan.name.toLowerCase() 
                  ? 'rgba(148, 163, 184, 0.2)' 
                  : 'rgba(34, 197, 94, 0.2)'}`,
                fontFamily: '"JetBrains Mono", monospace'
              }}
            >
              {currentPlan === plan.name.toLowerCase() ? (
                `> current_plan()`
              ) : (
                <>
                  <FaArrowUp size={12} style={{ marginRight: '8px' }} />
                  {`> upgrade_to_${plan.name.toLowerCase()}()`}
                </>
              )}
            </Button>
          </Card>
        ))}
      </SimpleGrid>

      {/* Invoice History */}
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
            invoice_history()
          </Text>
          
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
            {`> export_all()`}
          </Button>
        </Group>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          {invoiceHistory.map((invoice) => (
            <div 
              key={invoice.id}
              style={{
                padding: '16px',
                backgroundColor: '#0a0a0a',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                borderRadius: '8px'
              }}
            >
              <Group position="apart">
                <div>
                  <Text 
                    size="sm" 
                    weight={600} 
                    color="#e2e8f0"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    {invoice.id}
                  </Text>
                  <Text 
                    size="xs" 
                    color="#94a3b8"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    {invoice.description}
                  </Text>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <Text 
                    size="sm" 
                    color="#64748b"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    {invoice.date}
                  </Text>
                  <Group spacing="xs" position="right">
                    <Text 
                      size="sm" 
                      weight={600} 
                      color="#22c55e"
                      style={{ fontFamily: '"JetBrains Mono", monospace' }}
                    >
                      ${invoice.amount.toFixed(2)}
                    </Text>
                    <Badge 
                      size="xs"
                      style={{ 
                        backgroundColor: `rgba(${getStatusColor(invoice.status).replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.1)`,
                        color: getStatusColor(invoice.status)
                      }}
                    >
                      {invoice.status.toUpperCase()}
                    </Badge>
                  </Group>
                </div>
              </Group>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 
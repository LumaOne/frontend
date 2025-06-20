'use client';

import { Card, Text, Group, Badge, Button, SimpleGrid, Table, ActionIcon, Modal, TextInput, Select, Switch, Avatar, Progress } from '@mantine/core';
import { FaBuilding, FaUsers, FaPlus, FaEdit, FaTrash, FaShieldAlt, FaEnvelope, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import { useState } from 'react';

export default function DepartmentsPage() {
  const [addDeptModal, setAddDeptModal] = useState(false);
  const [editDeptModal, setEditDeptModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  // Mock departments data
  const departments = [
    {
      id: 1,
      name: 'Engineering',
      head: 'John Smith',
      userCount: 45,
      emailsProtected: 12847,
      threatsBlocked: 89,
      riskLevel: 'medium',
      policies: {
        autoBlock: true,
        quarantine: true,
        allowExternal: false,
        mfaRequired: true
      },
      budget: 4500,
      spent: 3200
    },
    {
      id: 2,
      name: 'Sales',
      head: 'Sarah Johnson',
      userCount: 32,
      emailsProtected: 18934,
      threatsBlocked: 156,
      riskLevel: 'high',
      policies: {
        autoBlock: true,
        quarantine: false,
        allowExternal: true,
        mfaRequired: true
      },
      budget: 3200,
      spent: 2800
    },
    {
      id: 3,
      name: 'Marketing',
      head: 'Lisa Wang',
      userCount: 28,
      emailsProtected: 9876,
      threatsBlocked: 67,
      riskLevel: 'medium',
      policies: {
        autoBlock: false,
        quarantine: true,
        allowExternal: true,
        mfaRequired: false
      },
      budget: 2800,
      spent: 2100
    },
    {
      id: 4,
      name: 'HR',
      head: 'Mike Chen',
      userCount: 12,
      emailsProtected: 4567,
      threatsBlocked: 23,
      riskLevel: 'low',
      policies: {
        autoBlock: true,
        quarantine: true,
        allowExternal: false,
        mfaRequired: true
      },
      budget: 1200,
      spent: 890
    },
    {
      id: 5,
      name: 'Finance',
      head: 'David Brown',
      userCount: 15,
      emailsProtected: 6789,
      threatsBlocked: 34,
      riskLevel: 'high',
      policies: {
        autoBlock: true,
        quarantine: true,
        allowExternal: false,
        mfaRequired: true
      },
      budget: 1500,
      spent: 1200
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#22c55e';
      default: return '#64748b';
    }
  };

  const getTotalStats = () => {
    return departments.reduce((acc, dept) => ({
      totalUsers: acc.totalUsers + dept.userCount,
      totalEmails: acc.totalEmails + dept.emailsProtected,
      totalThreats: acc.totalThreats + dept.threatsBlocked,
      totalBudget: acc.totalBudget + dept.budget,
      totalSpent: acc.totalSpent + dept.spent
    }), { totalUsers: 0, totalEmails: 0, totalThreats: 0, totalBudget: 0, totalSpent: 0 });
  };

  const stats = getTotalStats();

  const handleEditDept = (dept) => {
    setSelectedDept(dept);
    setEditDeptModal(true);
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
            department_management()
          </Text>
          <Text 
            size="sm" 
            color="#64748b"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {`// Organize teams by departments and manage policies`}
          </Text>
        </div>
        
        <Button 
          size="sm"
          onClick={() => setAddDeptModal(true)}
          style={{ 
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            color: '#22c55e',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            fontFamily: '"JetBrains Mono", monospace'
          }}
        >
          <FaPlus size={12} style={{ marginRight: '8px' }} />
          {`> create_department()`}
        </Button>
      </Group>

      {/* Overview Stats */}
      <SimpleGrid cols={4} spacing="lg" mb="xl">
        <Card 
          p="lg"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group position="apart" mb="xs">
            <FaBuilding size={20} color="#22c55e" />
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              DEPARTMENTS
            </Text>
          </Group>
          <Text 
            size="xl" 
            weight={700} 
            color="#e2e8f0"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {departments.length}
          </Text>
        </Card>
        
        <Card 
          p="lg"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group position="apart" mb="xs">
            <FaUsers size={20} color="#3b82f6" />
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              TOTAL_USERS
            </Text>
          </Group>
          <Text 
            size="xl" 
            weight={700} 
            color="#e2e8f0"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {stats.totalUsers}
          </Text>
        </Card>
        
        <Card 
          p="lg"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group position="apart" mb="xs">
            <FaEnvelope size={20} color="#f59e0b" />
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              EMAILS_PROTECTED
            </Text>
          </Group>
          <Text 
            size="xl" 
            weight={700} 
            color="#e2e8f0"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {stats.totalEmails.toLocaleString()}
          </Text>
        </Card>
        
        <Card 
          p="lg"
          style={{ 
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group position="apart" mb="xs">
            <FaExclamationTriangle size={20} color="#ef4444" />
            <Text 
              size="xs" 
              color="#64748b"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              THREATS_BLOCKED
            </Text>
          </Group>
          <Text 
            size="xl" 
            weight={700} 
            color="#e2e8f0"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {stats.totalThreats}
          </Text>
        </Card>
      </SimpleGrid>

      {/* Departments Grid */}
      <SimpleGrid cols={2} spacing="lg" mb="xl">
        {departments.map((dept) => (
          <Card 
            key={dept.id}
            p="lg"
            style={{ 
              backgroundColor: '#1a1a1a',
              border: `1px solid ${getRiskColor(dept.riskLevel)}40`,
              borderRadius: '12px'
            }}
          >
            <Group position="apart" mb="md">
              <div>
                <Group spacing="xs" mb="xs">
                  <Text 
                    size="lg" 
                    weight={600} 
                    color="#e2e8f0"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    {dept.name}
                  </Text>
                  <Badge 
                    size="sm"
                    style={{ 
                      backgroundColor: `${getRiskColor(dept.riskLevel)}20`,
                      color: getRiskColor(dept.riskLevel)
                    }}
                  >
                    {dept.riskLevel.toUpperCase()}
                  </Badge>
                </Group>
                <Text 
                  size="sm" 
                  color="#94a3b8"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  Head: {dept.head}
                </Text>
              </div>
              
              <Group spacing="xs">
                <ActionIcon
                  size="sm"
                  onClick={() => handleEditDept(dept)}
                  style={{ 
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: '#3b82f6',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}
                >
                  <FaEdit size={12} />
                </ActionIcon>
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
              </Group>
            </Group>
            
            <SimpleGrid cols={2} spacing="md" mb="md">
              <div>
                <Text 
                  size="xs" 
                  color="#64748b"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  mb={4}
                >
                  USERS
                </Text>
                <Text 
                  size="lg" 
                  weight={600} 
                  color="#3b82f6"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {dept.userCount}
                </Text>
              </div>
              
              <div>
                <Text 
                  size="xs" 
                  color="#64748b"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  mb={4}
                >
                  THREATS_BLOCKED
                </Text>
                <Text 
                  size="lg" 
                  weight={600} 
                  color="#ef4444"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {dept.threatsBlocked}
                </Text>
              </div>
              
              <div>
                <Text 
                  size="xs" 
                  color="#64748b"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  mb={4}
                >
                  EMAILS_PROTECTED
                </Text>
                <Text 
                  size="sm" 
                  weight={600} 
                  color="#22c55e"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {dept.emailsProtected.toLocaleString()}
                </Text>
              </div>
              
              <div>
                <Text 
                  size="xs" 
                  color="#64748b"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  mb={4}
                >
                  BUDGET_USAGE
                </Text>
                <Text 
                  size="sm" 
                  weight={600} 
                  color="#f59e0b"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  ${dept.spent}/${dept.budget}
                </Text>
              </div>
            </SimpleGrid>
            
            <div>
              <Text 
                size="xs" 
                color="#64748b"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
                mb="xs"
              >
                Budget Usage: {Math.round((dept.spent / dept.budget) * 100)}%
              </Text>
              <Progress 
                value={(dept.spent / dept.budget) * 100}
                color={dept.spent / dept.budget > 0.8 ? "#ef4444" : "#22c55e"}
                size="sm"
                styles={{
                  root: { backgroundColor: 'rgba(148, 163, 184, 0.1)' }
                }}
              />
            </div>
          </Card>
        ))}
      </SimpleGrid>

      {/* Department Policies Comparison */}
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
          department_policies.compare()
        </Text>
        
        <div style={{ overflowX: 'auto' }}>
          <Table
            styles={{
              root: { backgroundColor: 'transparent' },
              header: { backgroundColor: '#0a0a0a' },
              row: { 
                backgroundColor: 'transparent',
                borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
              }
            }}
          >
            <thead>
              <tr>
                <th style={{ color: '#64748b', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px' }}>
                  DEPARTMENT
                </th>
                <th style={{ color: '#64748b', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px' }}>
                  AUTO_BLOCK
                </th>
                <th style={{ color: '#64748b', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px' }}>
                  QUARANTINE
                </th>
                <th style={{ color: '#64748b', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px' }}>
                  EXTERNAL_EMAIL
                </th>
                <th style={{ color: '#64748b', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px' }}>
                  MFA_REQUIRED
                </th>
                <th style={{ color: '#64748b', fontFamily: '"JetBrains Mono", monospace', fontSize: '12px' }}>
                  RISK_LEVEL
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td>
                    <Text 
                      size="sm" 
                      weight={600} 
                      color="#e2e8f0"
                      style={{ fontFamily: '"JetBrains Mono", monospace' }}
                    >
                      {dept.name}
                    </Text>
                  </td>
                  <td>
                    <Badge 
                      size="sm"
                      style={{ 
                        backgroundColor: dept.policies.autoBlock ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: dept.policies.autoBlock ? '#22c55e' : '#ef4444'
                      }}
                    >
                      {dept.policies.autoBlock ? 'ENABLED' : 'DISABLED'}
                    </Badge>
                  </td>
                  <td>
                    <Badge 
                      size="sm"
                      style={{ 
                        backgroundColor: dept.policies.quarantine ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: dept.policies.quarantine ? '#22c55e' : '#ef4444'
                      }}
                    >
                      {dept.policies.quarantine ? 'ENABLED' : 'DISABLED'}
                    </Badge>
                  </td>
                  <td>
                    <Badge 
                      size="sm"
                      style={{ 
                        backgroundColor: dept.policies.allowExternal ? 'rgba(245, 158, 11, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                        color: dept.policies.allowExternal ? '#f59e0b' : '#22c55e'
                      }}
                    >
                      {dept.policies.allowExternal ? 'ALLOWED' : 'BLOCKED'}
                    </Badge>
                  </td>
                  <td>
                    <Badge 
                      size="sm"
                      style={{ 
                        backgroundColor: dept.policies.mfaRequired ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: dept.policies.mfaRequired ? '#22c55e' : '#ef4444'
                      }}
                    >
                      {dept.policies.mfaRequired ? 'REQUIRED' : 'OPTIONAL'}
                    </Badge>
                  </td>
                  <td>
                    <Badge 
                      size="sm"
                      style={{ 
                        backgroundColor: `${getRiskColor(dept.riskLevel)}20`,
                        color: getRiskColor(dept.riskLevel)
                      }}
                    >
                      {dept.riskLevel.toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Add Department Modal */}
      <Modal
        opened={addDeptModal}
        onClose={() => setAddDeptModal(false)}
        title={
          <Text 
            size="lg" 
            weight={600} 
            color="#e2e8f0"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            create_department()
          </Text>
        }
        styles={{
          modal: { backgroundColor: '#1a1a1a', border: '1px solid rgba(34, 197, 94, 0.2)' },
          header: { backgroundColor: '#1a1a1a', borderBottom: '1px solid rgba(34, 197, 94, 0.2)' }
        }}
      >
        <div style={{ display: 'grid', gap: '16px' }}>
          <TextInput
            label="Department Name"
            placeholder="e.g., Customer Success"
            styles={{
              label: { 
                color: '#e2e8f0',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '12px'
              },
              input: { 
                backgroundColor: '#0a0a0a',
                borderColor: 'rgba(34, 197, 94, 0.2)',
                color: '#e2e8f0',
                fontFamily: '"JetBrains Mono", monospace'
              }
            }}
          />
          
          <Select
            label="Department Head"
            placeholder="Select department head"
            data={[
              { value: 'john', label: 'John Smith' },
              { value: 'sarah', label: 'Sarah Johnson' },
              { value: 'mike', label: 'Mike Chen' }
            ]}
            styles={{
              label: { 
                color: '#e2e8f0',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '12px'
              },
              input: { 
                backgroundColor: '#0a0a0a',
                borderColor: 'rgba(34, 197, 94, 0.2)',
                color: '#e2e8f0',
                fontFamily: '"JetBrains Mono", monospace'
              }
            }}
          />
          
          <TextInput
            label="Monthly Budget ($)"
            placeholder="2500"
            styles={{
              label: { 
                color: '#e2e8f0',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '12px'
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
              onClick={() => setAddDeptModal(false)}
              style={{ 
                backgroundColor: 'rgba(148, 163, 184, 0.1)',
                color: '#94a3b8',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                fontFamily: '"JetBrains Mono", monospace'
              }}
            >
              {`> cancel()`}
            </Button>
            <Button 
              style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                color: '#22c55e',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                fontFamily: '"JetBrains Mono", monospace'
              }}
            >
              <FaBuilding size={12} style={{ marginRight: '8px' }} />
              {`> create_dept()`}
            </Button>
          </Group>
        </div>
      </Modal>

      {/* Edit Department Modal */}
      <Modal
        opened={editDeptModal}
        onClose={() => setEditDeptModal(false)}
        title={
          <Text 
            size="lg" 
            weight={600} 
            color="#e2e8f0"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            edit_department({selectedDept?.name})
          </Text>
        }
        styles={{
          modal: { backgroundColor: '#1a1a1a', border: '1px solid rgba(34, 197, 94, 0.2)' },
          header: { backgroundColor: '#1a1a1a', borderBottom: '1px solid rgba(34, 197, 94, 0.2)' }
        }}
      >
        {selectedDept && (
          <div style={{ display: 'grid', gap: '16px' }}>
            <TextInput
              label="Department Name"
              value={selectedDept.name}
              styles={{
                label: { 
                  color: '#e2e8f0',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '12px'
                },
                input: { 
                  backgroundColor: '#0a0a0a',
                  borderColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#e2e8f0',
                  fontFamily: '"JetBrains Mono", monospace'
                }
              }}
            />
            
            <div>
              <Text 
                size="sm" 
                color="#64748b"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
                mb="xs"
              >
                SECURITY_POLICIES
              </Text>
              <div style={{ display: 'grid', gap: '12px' }}>
                <Switch 
                  label="Auto-block high-risk emails"
                  checked={selectedDept.policies.autoBlock}
                  color="#22c55e"
                  styles={{
                    label: { 
                      color: '#e2e8f0',
                      fontFamily: '"JetBrains Mono", monospace'
                    }
                  }}
                />
                <Switch 
                  label="Quarantine suspicious emails"
                  checked={selectedDept.policies.quarantine}
                  color="#22c55e"
                  styles={{
                    label: { 
                      color: '#e2e8f0',
                      fontFamily: '"JetBrains Mono", monospace'
                    }
                  }}
                />
                <Switch 
                  label="Allow external email domains"
                  checked={selectedDept.policies.allowExternal}
                  color="#f59e0b"
                  styles={{
                    label: { 
                      color: '#e2e8f0',
                      fontFamily: '"JetBrains Mono", monospace'
                    }
                  }}
                />
                <Switch 
                  label="Require multi-factor authentication"
                  checked={selectedDept.policies.mfaRequired}
                  color="#22c55e"
                  styles={{
                    label: { 
                      color: '#e2e8f0',
                      fontFamily: '"JetBrains Mono", monospace'
                    }
                  }}
                />
              </div>
            </div>
            
            <Group position="right" mt="md">
              <Button 
                onClick={() => setEditDeptModal(false)}
                style={{ 
                  backgroundColor: 'rgba(148, 163, 184, 0.1)',
                  color: '#94a3b8',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  fontFamily: '"JetBrains Mono", monospace'
                }}
              >
                {`> cancel()`}
              </Button>
              <Button 
                style={{ 
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  fontFamily: '"JetBrains Mono", monospace'
                }}
              >
                {`> save_changes()`}
              </Button>
            </Group>
          </div>
        )}
      </Modal>
    </div>
  );
}
</rewritten_file>
'use client';

import { useState, useEffect } from 'react';
import { Card, Text, Group, Badge, Table, ActionIcon, Tooltip, Button, TextInput, Modal, Code, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FaKey, FaPlus, FaEye, FaTrash, FaCopy, FaEdit, FaCalendarAlt } from 'react-icons/fa';
import { FiRefreshCcw } from "react-icons/fi";
import { getApiKeys, createApiKey, deleteApiKey, updateApiKeyStatus } from '../../../lib/database';
import { useAuth } from '../../../contexts/AuthContext';

export default function ApiKeysPage() {
  const { user } = useAuth();
  const [opened, setOpened] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newKeyData, setNewKeyData] = useState(null);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);

  // Load API keys
  useEffect(() => {
    const loadApiKeys = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await getApiKeys();
        if (error) {
          console.error('Error loading API keys:', error);
          notifications.show({
            title: 'Error',
            message: 'Failed to load API keys',
            color: 'red',
          });
        } else {
          setApiKeys(data || []);
        }
      } catch (error) {
        console.error('Error loading API keys:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApiKeys();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return '#22c55e';
      case 'INACTIVE': return '#64748b';
      case 'REVOKED': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ACTIVE': return 'active';
      case 'INACTIVE': return 'inactive';
      case 'REVOKED': return 'revoked';
      default: return 'unknown';
    }
  };

  const generateNewKey = async () => {
    if (!keyName.trim()) return;
    
    try {
      setCreating(true);
      const { data, error } = await createApiKey(keyName.trim());
      
      if (error) {
        console.error('Error creating API key:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to create API key',
          color: 'red',
        });
      } else {
        // Store the new key data to show in modal
        setNewKeyData(data);
        setShowNewKeyModal(true);
        
        // Refresh the API keys list
        const { data: updatedKeys } = await getApiKeys();
        setApiKeys(updatedKeys || []);
        
        notifications.show({
          title: 'Success',
          message: 'API key created successfully',
          color: 'green',
        });
      }
    } catch (error) {
      console.error('Error creating API key:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to create API key',
        color: 'red',
      });
    } finally {
      setCreating(false);
      setOpened(false);
      setKeyName('');
    }
  };

  const handleDeleteKey = async (keyId) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await deleteApiKey(keyId);
      
      if (error) {
        console.error('Error deleting API key:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to delete API key',
          color: 'red',
        });
      } else {
        // Remove from local state
        setApiKeys(prev => prev.filter(key => key.id !== keyId));
        notifications.show({
          title: 'Success',
          message: 'API key deleted successfully',
          color: 'green',
        });
      }
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  };

  const handleToggleStatus = async (keyId, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    
    try {
      const { error } = await updateApiKeyStatus(keyId, newStatus);
      
      if (error) {
        console.error('Error updating API key status:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to update API key status',
          color: 'red',
        });
      } else {
        // Update local state
        setApiKeys(prev => prev.map(key => 
          key.id === keyId ? { ...key, status: newStatus } : key
        ));
        notifications.show({
          title: 'Success',
          message: `API key ${newStatus.toLowerCase()} successfully`,
          color: 'green',
        });
      }
    } catch (error) {
      console.error('Error updating API key status:', error);
    }
  };

  const refreshApiKeys = async () => {
    setLoading(true);
    const { data } = await getApiKeys();
    setApiKeys(data || []);
    setLoading(false);
  };

  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const result = document.execCommand('copy');
        document.body.removeChild(textArea);
        return result;
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Never';
    
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const activeKeys = apiKeys.filter(key => key.status === 'ACTIVE');
  const totalRequests = apiKeys.reduce((sum, key) => sum + (key.usage_count || 0), 0);

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
        
        <Group spacing="xs">
          <ActionIcon
            onClick={refreshApiKeys}
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '4px'
            }}
          >
            <FiRefreshCcw size={12} color="#22c55e" />
          </ActionIcon>
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
            {loading ? '---' : activeKeys.length}
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
            {loading ? '---' : totalRequests.toLocaleString()}
          </Text>
          <Text 
            size="xs" 
            color="#94a3b8"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            total API calls made
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
            active_keys.list()
          </Text>
          <Badge 
            size="sm"
            style={{ 
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              color: '#22c55e',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}
          >
            {apiKeys.length} KEYS
          </Badge>
        </Group>
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Loader color="#22c55e" />
          </div>
        ) : apiKeys.length > 0 ? (
          <Table
            style={{ 
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px'
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(34, 197, 94, 0.2)' }}>
                <th style={{ color: '#64748b', fontWeight: '600' }}>Name</th>
                <th style={{ color: '#64748b', fontWeight: '600' }}>Key</th>
                <th style={{ color: '#64748b', fontWeight: '600' }}>Status</th>
                <th style={{ color: '#64748b', fontWeight: '600' }}>Usage</th>
                <th style={{ color: '#64748b', fontWeight: '600' }}>Last Used</th>
                <th style={{ color: '#64748b', fontWeight: '600' }}>Created</th>
                <th style={{ color: '#64748b', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key) => (
                <tr key={key.id} style={{ borderBottom: '1px solid rgba(100, 116, 139, 0.1)' }}>
                  <td>
                    <Text size="sm" color="#e2e8f0" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                      {key.name}
                    </Text>
                  </td>
                  <td>
                    <Group spacing="xs">
                      <Code 
                        style={{ 
                          backgroundColor: 'rgba(34, 197, 94, 0.1)',
                          color: '#22c55e',
                          border: '1px solid rgba(34, 197, 94, 0.2)',
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '11px'
                        }}
                      >
                        {key.key_prefix}••••••••••••••••
                      </Code>
                      <Tooltip label="Copy Key">
                        <ActionIcon 
                          size="sm" 
                          style={{ color: '#64748b' }}
                          onClick={async () => {
                            const success = await copyToClipboard(key.key_hash);
                            if (success) {
                              notifications.show({
                                title: 'Copied!',
                                message: 'API key copied to clipboard',
                                color: 'green',
                              });
                            } else {
                              notifications.show({
                                title: 'Copy failed',
                                message: 'Could not copy to clipboard',
                                color: 'red',
                              });
                            }
                          }}
                        >
                          <FaCopy size={10} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </td>
                  <td>
                    <Badge 
                      size="xs"
                      style={{ 
                        backgroundColor: `${getStatusColor(key.status)}20`,
                        color: getStatusColor(key.status),
                        border: `1px solid ${getStatusColor(key.status)}40`,
                        cursor: 'pointer'
                      }}
                      onClick={() => handleToggleStatus(key.id, key.status)}
                    >
                      {getStatusText(key.status)}
                    </Badge>
                  </td>
                  <td>
                    <Text size="xs" color="#94a3b8" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                      {(key.usage_count || 0).toLocaleString()} calls
                    </Text>
                  </td>
                  <td>
                    <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                      {formatTimeAgo(key.last_used_at)}
                    </Text>
                  </td>
                  <td>
                    <Text size="xs" color="#64748b" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                      {formatDate(key.created_at)}
                    </Text>
                  </td>
                  <td>
                    <Group spacing={4}>
                      <Tooltip label="View Details">
                        <ActionIcon size="sm" style={{ color: '#3b82f6' }}>
                          <FaEye size={10} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete Key">
                        <ActionIcon 
                          size="sm" 
                          style={{ color: '#ef4444' }}
                          onClick={() => handleDeleteKey(key.id)}
                        >
                          <FaTrash size={10} />
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
              {`// No API keys found`}
            </Text>
            <Text size="xs" mt="xs">
              Create your first API key to get started
            </Text>
          </div>
        )}
      </Card>

      {/* Create API Key Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text 
            style={{ 
              fontFamily: '"JetBrains Mono", monospace',
              color: '#22c55e',
              fontWeight: '600'
            }}
          >
            generate_new_key()
          </Text>
        }
        styles={{
          modal: {
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          },
          header: {
            backgroundColor: '#1a1a1a',
            borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
          },
          title: {
            color: '#22c55e',
          },
        }}
      >
        <div>
          <Text 
            size="sm" 
            color="#94a3b8" 
            mb="md"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {`// Create a new API key for your application`}
          </Text>
          
          <TextInput
            label="Key Name"
            placeholder="e.g., Production API Key"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            mb="md"
            styles={{
              label: {
                color: '#e2e8f0',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '14px',
              },
              input: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                color: '#e2e8f0',
                fontFamily: '"JetBrains Mono", monospace',
              },
            }}
          />
          
          <Group position="right" mt="md">
            <Button 
              variant="outline" 
              onClick={() => setOpened(false)}
              style={{
                color: '#64748b',
                borderColor: '#64748b',
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={generateNewKey}
              loading={creating}
              disabled={!keyName.trim()}
              style={{
                backgroundColor: '#22c55e',
                color: '#0a0a0a',
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              {creating ? 'Generating...' : 'Generate Key'}
            </Button>
          </Group>
        </div>
      </Modal>

      {/* New Key Display Modal */}
      <Modal
        opened={showNewKeyModal}
        onClose={() => setShowNewKeyModal(false)}
        title={
          <Text 
            style={{ 
              fontFamily: '"JetBrains Mono", monospace',
              color: '#22c55e',
              fontWeight: '600'
            }}
          >
            key_generated_successfully()
          </Text>
        }
        styles={{
          modal: {
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          },
          header: {
            backgroundColor: '#1a1a1a',
            borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
          },
        }}
      >
        {newKeyData && (
          <div>
            <Text 
              size="sm" 
              color="#ef4444" 
              mb="md"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {`// WARNING: Save this key now. You won't be able to see it again!`}
            </Text>
            
            <Text 
              size="sm" 
              color="#e2e8f0" 
              mb="xs"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Your new API key:
            </Text>
            
            <Group spacing="xs" mb="md">
              <Code 
                style={{ 
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '12px',
                  padding: '8px 12px',
                  flex: 1
                }}
              >
                {newKeyData.full_key}
              </Code>
                             <Button
                 size="xs"
                 onClick={async () => {
                   const success = await copyToClipboard(newKeyData.full_key);
                   if (success) {
                     notifications.show({
                       title: 'Copied!',
                       message: 'API key copied to clipboard',
                       color: 'green',
                     });
                   } else {
                     notifications.show({
                       title: 'Copy failed',
                       message: 'Could not copy to clipboard',
                       color: 'red',
                     });
                   }
                 }}
                 style={{
                   backgroundColor: 'rgba(34, 197, 94, 0.1)',
                   color: '#22c55e',
                   border: '1px solid rgba(34, 197, 94, 0.2)',
                 }}
               >
                 Copy
               </Button>
            </Group>
            
            <Group position="right">
              <Button 
                onClick={() => {
                  setShowNewKeyModal(false);
                  setNewKeyData(null);
                }}
                style={{
                  backgroundColor: '#22c55e',
                  color: '#0a0a0a',
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                I've saved the key
              </Button>
            </Group>
          </div>
        )}
      </Modal>
    </div>
  );
} 
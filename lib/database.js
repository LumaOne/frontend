import { supabase } from './supabase'

// Profile functions
export const getProfile = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .single()
  
  return { data, error }
}

export const updateProfile = async (updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', (await supabase.auth.getUser()).data.user?.id)
    .select()
    .single()
  
  return { data, error }
}

// API Keys functions
export const getApiKeys = async () => {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const createApiKey = async (name) => {
  // Generate a random API key
  const keyPrefix = 'luma_' + Math.random().toString(36).substr(2, 8)
  const fullKey = keyPrefix + '_' + Math.random().toString(36).substr(2, 24)
  
  const { data, error } = await supabase
    .from('api_keys')
    .insert([{
      name,
      key_hash: btoa(fullKey), // In production, use proper hashing
      key_prefix: keyPrefix,
      user_id: (await supabase.auth.getUser()).data.user?.id
    }])
    .select()
    .single()
  
  return { data: { ...data, full_key: fullKey }, error }
}

export const deleteApiKey = async (keyId) => {
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', keyId)
  
  return { error }
}

export const updateApiKeyStatus = async (keyId, status) => {
  const { data, error } = await supabase
    .from('api_keys')
    .update({ status })
    .eq('id', keyId)
    .select()
    .single()
  
  return { data, error }
}

// Email Logs functions
export const getEmailLogs = async (limit = 50, offset = 0) => {
  const { data, error } = await supabase
    .from('email_logs')
    .select('*')
    .order('processed_at', { ascending: false })
    .range(offset, offset + limit - 1)
  
  return { data, error }
}

export const getEmailLogsByThreatLevel = async (threatLevel) => {
  const { data, error } = await supabase
    .from('email_logs')
    .select('*')
    .eq('threat_level', threatLevel)
    .order('processed_at', { ascending: false })
    .limit(20)
  
  return { data, error }
}

export const searchEmailLogs = async (searchTerm) => {
  const { data, error } = await supabase
    .from('email_logs')
    .select('*')
    .or(`sender_email.ilike.%${searchTerm}%,recipient_email.ilike.%${searchTerm}%,subject.ilike.%${searchTerm}%`)
    .order('processed_at', { ascending: false })
    .limit(50)
  
  return { data, error }
}

// System Metrics functions
export const getSystemMetrics = async (days = 7) => {
  const { data, error } = await supabase
    .from('system_metrics')
    .select('*')
    .gte('metric_date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('metric_date', { ascending: false })
  
  return { data, error }
}

export const getTodayMetrics = async () => {
  const today = new Date().toISOString().split('T')[0]
  
  const { data, error } = await supabase
    .from('system_metrics')
    .select('*')
    .eq('metric_date', today)
    .single()
  
  return { data, error }
}

// Threat Patterns functions
export const getThreatPatterns = async () => {
  const { data, error } = await supabase
    .from('threat_patterns')
    .select('*')
    .eq('is_active', true)
    .order('detection_count', { ascending: false })
  
  return { data, error }
}

export const createThreatPattern = async (pattern) => {
  const { data, error } = await supabase
    .from('threat_patterns')
    .insert([{
      ...pattern,
      user_id: (await supabase.auth.getUser()).data.user?.id
    }])
    .select()
    .single()
  
  return { data, error }
}

export const updateThreatPattern = async (patternId, updates) => {
  const { data, error } = await supabase
    .from('threat_patterns')
    .update(updates)
    .eq('id', patternId)
    .select()
    .single()
  
  return { data, error }
}

// Notifications functions
export const getNotifications = async (limit = 20) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  return { data, error }
}

export const markNotificationAsRead = async (notificationId) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
    .select()
    .single()
  
  return { data, error }
}

export const getUnreadNotificationCount = async () => {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false)
  
  return { count, error }
}

// Dashboard Analytics functions
export const getDashboardStats = async () => {
  try {
    // Get today's metrics
    const todayMetrics = await getTodayMetrics()
    
    // Get recent email logs for threat analysis
    const { data: recentLogs } = await supabase
      .from('email_logs')
      .select('threat_level, status, processing_time_ms')
      .gte('processed_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    
    // Get API key usage
    const { data: apiKeys } = await getApiKeys()
    
    // Calculate stats
    const stats = {
      emailsProcessed: todayMetrics.data?.emails_processed || 0,
      threatsDetected: todayMetrics.data?.threats_detected || 0,
      threatsBlocked: todayMetrics.data?.threats_blocked || 0,
      avgProcessingTime: todayMetrics.data?.avg_processing_time_ms || 0,
      apiCallsUsed: todayMetrics.data?.api_calls_made || 0,
      activeApiKeys: apiKeys?.filter(key => key.status === 'ACTIVE').length || 0,
      threatLevelBreakdown: {
        LOW: recentLogs?.filter(log => log.threat_level === 'LOW').length || 0,
        MEDIUM: recentLogs?.filter(log => log.threat_level === 'MEDIUM').length || 0,
        HIGH: recentLogs?.filter(log => log.threat_level === 'HIGH').length || 0,
        CRITICAL: recentLogs?.filter(log => log.threat_level === 'CRITICAL').length || 0,
      }
    }
    
    return { data: stats, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Real-time subscriptions
export const subscribeToEmailLogs = (callback) => {
  return supabase
    .channel('email_logs_changes')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'email_logs' },
      callback
    )
    .subscribe()
}

export const subscribeToNotifications = (callback) => {
  return supabase
    .channel('notifications_changes')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'notifications' },
      callback
    )
    .subscribe()
} 
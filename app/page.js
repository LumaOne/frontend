'use client';

import { FaCode, FaTerminal, FaBolt, FaShieldAlt, FaRocket, FaDatabase, FaArrowRight, FaCog, FaChartLine, FaLock, FaMicrochip, FaNetworkWired } from 'react-icons/fa';

export default function LandingPage() {
  const handleMouseOver = (e, color) => {
    e.target.style.background = color;
  };

  const handleMouseOut = (e, color) => {
    e.target.style.background = color;
  };

  const handleButtonMouseOver = (e, bgColor, textColor = 'white') => {
    e.target.style.background = bgColor;
    e.target.style.color = textColor;
    e.target.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.4)';
  };

  const handleButtonMouseOut = (e, bgColor, textColor) => {
    e.target.style.background = bgColor;
    e.target.style.color = textColor;
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', 
      color: '#e2e8f0',
      fontFamily: '"JetBrains Mono", "Fira Code", monospace, system-ui'
    }}>
      {/* Navigation */}
      <nav style={{ 
        background: 'rgba(10, 10, 10, 0.95)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: '#22c55e',
            fontFamily: '"JetBrains Mono", monospace'
          }}>
            <FaTerminal style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            LumaOne.ai
          </div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#api" style={{ 
              color: '#94a3b8', 
              textDecoration: 'none', 
              fontWeight: '500',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '14px'
            }}>
              /api/docs
            </a>
            <a href="#sdk" style={{ 
              color: '#94a3b8', 
              textDecoration: 'none', 
              fontWeight: '500',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '14px'
            }}>
              /sdk
            </a>
            <a href="#github" style={{ 
              color: '#94a3b8', 
              textDecoration: 'none', 
              fontWeight: '500',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '14px'
            }}>
              /github
            </a>
            <button 
              type="button"
              style={{ 
                padding: '8px 20px', 
                background: 'linear-gradient(45deg, #22c55e, #16a34a)', 
                color: '#0a0a0a', 
                border: 'none', 
                borderRadius: '6px', 
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '14px',
                boxShadow: '0 0 10px rgba(34, 197, 94, 0.3)'
              }}
            >
              {'> start_demo()'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '80px 0 120px 0', position: 'relative' }}>
        {/* Animated background grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3
        }}></div>
        
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            {/* Terminal-style badge */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              padding: '8px 16px', 
              borderRadius: '8px', 
              background: 'rgba(10, 10, 10, 0.8)', 
              border: '1px solid rgba(34, 197, 94, 0.3)', 
              marginBottom: '32px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#22c55e',
              fontFamily: '"JetBrains Mono", monospace',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)'
            }}>
              <FaMicrochip style={{ width: '14px', height: '14px', marginRight: '8px' }} />
              {'> status: AI_BEHAVIORAL_ENGINE_ACTIVE'}
            </div>
            
            <h1 style={{ 
              fontSize: '72px', 
              fontWeight: '900', 
              lineHeight: '1.1', 
              marginBottom: '24px',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              textShadow: '0 0 30px rgba(34, 197, 94, 0.3)'
            }}>
              {'AI.detect('}<span style={{ color: '#22c55e' }}>threats</span>{')'}<br />
              <span style={{ fontSize: '48px', color: '#64748b' }}>{`// before humans see them`}</span>
            </h1>
            
            <p style={{ 
              fontSize: '20px', 
              color: '#94a3b8', 
              lineHeight: '1.6',
              marginBottom: '48px',
              fontWeight: '400',
              fontFamily: '"JetBrains Mono", monospace'
            }}>
              Real-time behavioral analysis engine that processes 10M+ emails/sec<br />
              {'\u003E'} Machine learning models trained on 50B+ threat patterns<br />
              {'\u003E'} 99.97% accuracy with {'\u003C'}0.01% false positives
            </p>
            
            {/* Code snippet preview */}
            <div style={{
              background: 'rgba(10, 10, 10, 0.9)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '48px',
              textAlign: 'left',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '14px',
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.1)'
            }}>
                             <div style={{ color: '#64748b', marginBottom: '8px' }}>{`// Initialize LumaOne AI Engine`}</div>
              <div style={{ color: '#22c55e' }}>{'const'} <span style={{ color: '#e2e8f0' }}>lumaone</span> = <span style={{ color: '#f59e0b' }}>new</span> <span style={{ color: '#3b82f6' }}>LumaOne</span>({'{'}</div>
              <div style={{ paddingLeft: '20px', color: '#e2e8f0' }}>
                <span style={{ color: '#8b5cf6' }}>apiKey</span>: <span style={{ color: '#10b981' }}>'your-api-key'</span>,<br />
                <span style={{ color: '#8b5cf6' }}>model</span>: <span style={{ color: '#10b981' }}>'behavioral-ai-v3'</span>,<br />
                <span style={{ color: '#8b5cf6' }}>realtime</span>: <span style={{ color: '#f59e0b' }}>true</span>
              </div>
              <div style={{ color: '#e2e8f0' }}>{'});'}</div>
                             <div style={{ marginTop: '12px', color: '#64748b' }}>{`// Analyze threat patterns`}</div>
               <div style={{ color: '#22c55e' }}>lumaone</div><span style={{ color: '#e2e8f0' }}>.analyze(email).then(</span><span style={{ color: '#f59e0b' }}>result</span> <span style={{ color: '#e2e8f0' }}>{`=>`}</span> <span style={{ color: '#64748b' }}>{'{'}</span>
               <div style={{ paddingLeft: '20px', color: '#64748b' }}>{`// Threat blocked in 0.003s`}</div>
               <div style={{ color: '#64748b' }}>{'});'}</div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              justifyContent: 'center',
              marginBottom: '48px',
              flexWrap: 'wrap'
            }}>
              <button 
                type="button" 
                style={{ 
                  padding: '16px 32px', 
                  background: 'linear-gradient(45deg, #22c55e, #16a34a)', 
                  color: '#0a0a0a', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontWeight: '700', 
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: '"JetBrains Mono", monospace',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseOver={(e) => handleButtonMouseOver(e, 'linear-gradient(45deg, #16a34a, #15803d)', '#0a0a0a')}
                onMouseOut={(e) => handleButtonMouseOut(e, 'linear-gradient(45deg, #22c55e, #16a34a)', '#0a0a0a')}
                onFocus={(e) => handleButtonMouseOver(e, 'linear-gradient(45deg, #16a34a, #15803d)', '#0a0a0a')}
                onBlur={(e) => handleButtonMouseOut(e, 'linear-gradient(45deg, #22c55e, #16a34a)', '#0a0a0a')}
              >
                <FaRocket style={{ marginRight: '8px' }} />
                {'> deploy_now()'}
              </button>
              <a 
                href="/dashboard"
                style={{ 
                  padding: '16px 32px', 
                  background: 'transparent', 
                  color: '#3b82f6', 
                  border: '2px solid #3b82f6', 
                  borderRadius: '8px', 
                  fontWeight: '600', 
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: '"JetBrains Mono", monospace',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => handleButtonMouseOver(e, '#3b82f6', '#0a0a0a')}
                onMouseOut={(e) => handleButtonMouseOut(e, 'transparent', '#3b82f6')}
                onFocus={(e) => handleButtonMouseOver(e, '#3b82f6', '#0a0a0a')}
                onBlur={(e) => handleButtonMouseOut(e, 'transparent', '#3b82f6')}
              >
                <FaChartLine style={{ marginRight: '8px' }} />
                {'> view_dashboard()'}
              </a>
              <button 
                type="button" 
                style={{ 
                  padding: '16px 32px', 
                  background: 'transparent', 
                  color: '#22c55e', 
                  border: '2px solid #22c55e', 
                  borderRadius: '8px', 
                  fontWeight: '600', 
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: '"JetBrains Mono", monospace',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseOver={(e) => handleButtonMouseOver(e, '#22c55e', '#0a0a0a')}
                onMouseOut={(e) => handleButtonMouseOut(e, 'transparent', '#22c55e')}
                onFocus={(e) => handleButtonMouseOver(e, '#22c55e', '#0a0a0a')}
                onBlur={(e) => handleButtonMouseOut(e, 'transparent', '#22c55e')}
              >
                <FaCode style={{ marginRight: '8px' }} />
                {'> view_docs()'}
              </button>
            </div>

            {/* Tech stack badges */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '32px',
              opacity: 0.7,
              marginBottom: '32px'
            }}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#64748b',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                Python • TensorFlow • Kubernetes • Redis
              </div>
            </div>

            {/* Live metrics */}
            <div style={{
              background: 'rgba(10, 10, 10, 0.6)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '12px',
              padding: '24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              fontFamily: '"JetBrains Mono", monospace'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>47,382,941</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>threats_blocked_today</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>0.003s</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>avg_response_time</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>99.97%</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>accuracy_rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '120px 0', background: 'rgba(10, 10, 10, 0.5)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#22c55e', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              marginBottom: '16px',
              fontFamily: '"JetBrains Mono", monospace'
            }}>
              {'// CORE_MODULES'}
            </div>
            <h2 style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              lineHeight: '1.2', 
              color: '#ffffff',
              marginBottom: '24px',
              fontFamily: '"JetBrains Mono", monospace'
            }}>
              class <span style={{ color: '#22c55e' }}>ThreatEngine</span> {'{'}
            </h2>
            <p style={{ 
              fontSize: '18px', 
              color: '#94a3b8', 
              maxWidth: '600px', 
              margin: '0 auto',
              fontFamily: '"JetBrains Mono", monospace'
            }}>
              {'// Advanced AI modules for real-time threat detection'}
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '32px' 
          }}>
            <div style={{ 
              padding: '32px', 
              background: 'rgba(10, 10, 10, 0.8)', 
              borderRadius: '12px',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                background: 'linear-gradient(45deg, #22c55e, #16a34a)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '24px',
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
              }}>
                <FaNetworkWired style={{ width: '24px', height: '24px', color: '#0a0a0a' }} />
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                marginBottom: '12px',
                color: '#ffffff',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                neural_network_analysis()
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6', fontFamily: '"JetBrains Mono", monospace', fontSize: '14px' }}>
                {'// Deep learning models process email patterns'}<br />
                {'// 50B+ training samples, 99.97% accuracy'}<br />
                {'// Real-time inference in 0.003 seconds'}
              </p>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                fontSize: '12px',
                color: '#22c55e',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                [ACTIVE]
              </div>
            </div>
            
            <div style={{ 
              padding: '32px', 
              background: 'rgba(10, 10, 10, 0.8)', 
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                background: 'linear-gradient(45deg, #3b82f6, #2563eb)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '24px',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
              }}>
                <FaShieldAlt style={{ width: '24px', height: '24px', color: '#ffffff' }} />
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                marginBottom: '12px',
                color: '#ffffff',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                behavioral_firewall()
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6', fontFamily: '"JetBrains Mono", monospace', fontSize: '14px' }}>
                {'// Monitors human interaction patterns'}<br />
                {'// Detects anomalies in user behavior'}<br />
                {'// Blocks zero-day social engineering'}
              </p>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                fontSize: '12px',
                color: '#3b82f6',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                [LEARNING]
              </div>
            </div>
            
            <div style={{ 
              padding: '32px', 
              background: 'rgba(10, 10, 10, 0.8)', 
              borderRadius: '12px',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                background: 'linear-gradient(45deg, #f59e0b, #d97706)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '24px',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
              }}>
                <FaDatabase style={{ width: '24px', height: '24px', color: '#0a0a0a' }} />
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                marginBottom: '12px',
                color: '#ffffff',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                threat_intelligence()
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6', fontFamily: '"JetBrains Mono", monospace', fontSize: '14px' }}>
                {'// Real-time threat feed integration'}<br />
                {'// 10M+ IOCs updated every second'}<br />
                {'// Global threat correlation engine'}
              </p>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                fontSize: '12px',
                color: '#f59e0b',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                [SYNCING]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section style={{ padding: '120px 0', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#22c55e', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                marginBottom: '16px',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                {'// DEVELOPER_API'}
              </div>
              <h2 style={{ 
                fontSize: '42px', 
                fontWeight: '800', 
                lineHeight: '1.2', 
                color: '#ffffff',
                marginBottom: '24px',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                REST API<br />
                <span style={{ color: '#22c55e' }}>{'+ GraphQL'}</span>
              </h2>
              <p style={{ 
                fontSize: '18px', 
                color: '#94a3b8', 
                marginBottom: '32px',
                lineHeight: '1.6',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                {'// Integrate in minutes, not months'}<br />
                {'// RESTful endpoints + GraphQL queries'}<br />
                {'// Real-time webhooks + streaming'}<br />
                {'// SDKs for Python, Node.js, Go, Rust'}
              </p>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  type="button" 
                  style={{ 
                    padding: '12px 24px', 
                    background: 'transparent', 
                    color: '#22c55e', 
                    border: '1px solid #22c55e', 
                    borderRadius: '6px', 
                    fontWeight: '600', 
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: '"JetBrains Mono", monospace'
                  }}
                >
                  {'> curl -X POST api.lumaone.ai'}
                </button>
              </div>
            </div>
            
            <div style={{
              background: 'rgba(10, 10, 10, 0.9)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '12px',
              padding: '24px',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '13px',
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.1)'
            }}>
              <div style={{ color: '#64748b', marginBottom: '16px' }}>{'// Real-time threat analysis'}</div>
              <div style={{ color: '#f59e0b' }}>POST</div> <span style={{ color: '#22c55e' }}>/api/v2/analyze</span>
              <div style={{ marginTop: '16px', color: '#64748b' }}>{'{'}</div>
              <div style={{ paddingLeft: '16px' }}>
                <div style={{ color: '#8b5cf6' }}>"email"</div>: <span style={{ color: '#10b981' }}>"suspicious@domain.com"</span>,
                <div style={{ color: '#8b5cf6' }}>"content"</div>: <span style={{ color: '#10b981' }}>"Click here now!"</span>,
                <div style={{ color: '#8b5cf6' }}>"realtime"</div>: <span style={{ color: '#f59e0b' }}>true</span>
              </div>
              <div style={{ color: '#64748b' }}>{'}'}</div>
              
              <div style={{ marginTop: '20px', color: '#64748b' }}>{'// Response (0.003s)'}</div>
              <div style={{ color: '#64748b' }}>{'{'}</div>
              <div style={{ paddingLeft: '16px' }}>
                <div style={{ color: '#8b5cf6' }}>"threat_score"</div>: <span style={{ color: '#ef4444' }}>0.97</span>,
                <div style={{ color: '#8b5cf6' }}>"classification"</div>: <span style={{ color: '#10b981' }}>"phishing"</span>,
                <div style={{ color: '#8b5cf6' }}>"action"</div>: <span style={{ color: '#10b981' }}>"block"</span>,
                <div style={{ color: '#8b5cf6' }}>"confidence"</div>: <span style={{ color: '#22c55e' }}>99.7</span>
              </div>
              <div style={{ color: '#64748b' }}>{'}'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '120px 0', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            lineHeight: '1.2', 
            color: '#ffffff',
            marginBottom: '24px',
            fontFamily: '"JetBrains Mono", monospace'
          }}>
            {'if (threats.detected) {'}<br />
            <span style={{ color: '#22c55e', paddingLeft: '40px' }}>deploy.now()</span><br />
            {'}'}
          </h2>
          
          <p style={{ 
            fontSize: '18px', 
            color: '#94a3b8', 
            marginBottom: '48px',
            lineHeight: '1.6',
            fontFamily: '"JetBrains Mono", monospace'
          }}>
            {'// Start protecting your infrastructure in under 5 minutes'}<br />
            {'// No configuration required. Pure AI-driven detection.'}
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'center'
          }}>
            <button 
              type="button" 
              style={{ 
                padding: '16px 32px', 
                background: 'linear-gradient(45deg, #22c55e, #16a34a)', 
                color: '#0a0a0a', 
                border: 'none', 
                borderRadius: '8px', 
                fontWeight: '700', 
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"JetBrains Mono", monospace',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseOver={(e) => handleButtonMouseOver(e, 'linear-gradient(45deg, #16a34a, #15803d)', '#0a0a0a')}
              onMouseOut={(e) => handleButtonMouseOut(e, 'linear-gradient(45deg, #22c55e, #16a34a)', '#0a0a0a')}
              onFocus={(e) => handleButtonMouseOver(e, 'linear-gradient(45deg, #16a34a, #15803d)', '#0a0a0a')}
              onBlur={(e) => handleButtonMouseOut(e, 'linear-gradient(45deg, #22c55e, #16a34a)', '#0a0a0a')}
            >
              <FaRocket style={{ marginRight: '8px' }} />
              {'> initialize_protection()'}
            </button>
            <button 
              type="button" 
              style={{ 
                padding: '16px 32px', 
                background: 'transparent', 
                color: '#22c55e', 
                border: '2px solid #22c55e', 
                borderRadius: '8px', 
                fontWeight: '600', 
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"JetBrains Mono", monospace',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseOver={(e) => handleButtonMouseOver(e, '#22c55e', '#0a0a0a')}
              onMouseOut={(e) => handleButtonMouseOut(e, 'transparent', '#22c55e')}
              onFocus={(e) => handleButtonMouseOver(e, '#22c55e', '#0a0a0a')}
              onBlur={(e) => handleButtonMouseOut(e, 'transparent', '#22c55e')}
            >
              <FaCode style={{ marginRight: '8px' }} />
              {'> explore_api()'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: '#0a0a0a', 
        borderTop: '1px solid rgba(34, 197, 94, 0.2)',
        padding: '64px 0 32px 0'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '48px',
            marginBottom: '48px'
          }}>
            <div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#22c55e', 
                marginBottom: '16px',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                <FaTerminal style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                LumaOne.ai
              </div>
              <p style={{ 
                color: '#64748b', 
                lineHeight: '1.6',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '14px'
              }}>
                {'// AI-powered threat detection'}<br />
                {'// Built for developers, by developers'}<br />
                {'// Real-time protection at scale'}
              </p>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#ffffff', 
                marginBottom: '16px',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                {'// DEVELOPERS'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#api-docs" style={{ 
                  color: '#64748b', 
                  textDecoration: 'none', 
                  fontSize: '14px',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  /api/docs
                </a>
                <a href="#sdk" style={{ 
                  color: '#64748b', 
                  textDecoration: 'none', 
                  fontSize: '14px',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  /sdk/python
                </a>
                <a href="#github" style={{ 
                  color: '#64748b', 
                  textDecoration: 'none', 
                  fontSize: '14px',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  /github
                </a>
              </div>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#ffffff', 
                marginBottom: '16px',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                {'// RESOURCES'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#status" style={{ 
                  color: '#64748b', 
                  textDecoration: 'none', 
                  fontSize: '14px',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  /status
                </a>
                <a href="#changelog" style={{ 
                  color: '#64748b', 
                  textDecoration: 'none', 
                  fontSize: '14px',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  /changelog
                </a>
                <a href="#support" style={{ 
                  color: '#64748b', 
                  textDecoration: 'none', 
                  fontSize: '14px',
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  /support
                </a>
              </div>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#ffffff', 
                marginBottom: '16px',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                {'// SYSTEM'}
              </h4>
              <div style={{ fontSize: '12px', fontFamily: '"JetBrains Mono", monospace' }}>
                <div style={{ color: '#22c55e', marginBottom: '4px' }}>
                  {'> status: OPERATIONAL'}
                </div>
                <div style={{ color: '#64748b', marginBottom: '4px' }}>
                  {'> uptime: 99.99%'}
                </div>
                <div style={{ color: '#64748b', marginBottom: '4px' }}>
                  {'> latency: 0.003s'}
                </div>
                <div style={{ color: '#3b82f6' }}>
                  {'> threats_blocked: 47M+'}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            borderTop: '1px solid rgba(34, 197, 94, 0.2)', 
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{ 
              color: '#64748b', 
              fontSize: '14px',
              fontFamily: '"JetBrains Mono", monospace'
            }}>
              {'// © 2024 LumaOne.ai - All systems operational'}
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#terms" style={{ 
                color: '#64748b', 
                fontSize: '14px', 
                textDecoration: 'none',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                /terms
              </a>
              <a href="#privacy" style={{ 
                color: '#64748b', 
                fontSize: '14px', 
                textDecoration: 'none',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                /privacy
              </a>
              <a href="#security" style={{ 
                color: '#64748b', 
                fontSize: '14px', 
                textDecoration: 'none',
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                /security.txt
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

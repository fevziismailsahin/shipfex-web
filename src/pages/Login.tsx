import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApiError } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, getRedirectPath } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await login(email, password);
      const target = getRedirectPath(user.role);
      navigate(target, { replace: true });
    } catch (err) {
      console.error('❌ Login error:', err);
      const apiError = err as ApiError;
      const errorMsg = typeof apiError === 'object' ? (apiError.message || JSON.stringify(err)) : String(err);
      setError(errorMsg || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '16px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '400px', 
        width: '100%', 
        backgroundColor: '#1e293b', 
        borderRadius: '12px', 
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        border: '1px solid #334155'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            backgroundColor: '#3b82f6', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontSize: '28px',
            fontWeight: 'bold',
            margin: '0 auto 20px'
          }}>
            S
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            ShipFex
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            Logistics Management System
          </p>
        </div>

        {error && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#7f1d1d', 
            border: '1px solid #dc2626',
            borderRadius: '6px', 
            color: '#fca5a5', 
            marginBottom: '20px',
            fontSize: '14px',
            wordBreak: 'break-word'
          }}>
            ❌ {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '13px', 
              fontWeight: '600',
              color: '#cbd5e1', 
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Email
            </label>
            <input 
              type="email" 
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                backgroundColor: '#0f172a',
                border: '1px solid #475569',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#f1f5f9',
                boxSizing: 'border-box'
              }}
              placeholder="admin@shipfex.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '13px', 
              fontWeight: '600',
              color: '#cbd5e1', 
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Password
            </label>
            <input 
              type="password" 
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                backgroundColor: '#0f172a',
                border: '1px solid #475569',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#f1f5f9',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              width: '100%', 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              fontWeight: '600', 
              padding: '10px',
              borderRadius: '6px', 
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer', 
              opacity: isLoading ? 0.6 : 1,
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            {isLoading ? 'Signing in...' : '🔓 Sign In'}
          </button>
        </form>

        <div style={{ 
          marginTop: '24px', 
          paddingTop: '20px',
          borderTop: '1px solid #475569',
          textAlign: 'center', 
          fontSize: '12px', 
          color: '#64748b' 
        }}>
          📝 Demo Credentials:<br />
          <strong style={{ color: '#cbd5e1' }}>admin@shipfex.com</strong><br />
          <strong style={{ color: '#cbd5e1' }}>admin123</strong>
        </div>
      </div>
    </div>
  );
}
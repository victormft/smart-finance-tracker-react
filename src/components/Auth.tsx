import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const cardStyle: React.CSSProperties = {
  maxWidth: 360,
  margin: '80px auto',
  padding: '32px 28px',
  borderRadius: 12,
  background: '#fff',
  boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'sans-serif'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 10px',
  margin: '8px 0 18px 0',
  borderRadius: 6,
  border: '1px solid #d0d6dd',
  fontSize: 16,
  background: '#f7f7fa',
  boxSizing: 'border-box'
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  borderRadius: 6,
  border: 'none',
  background: '#196aff',
  color: '#fff',
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
  marginTop: 6
};

const toggleTextStyle: React.CSSProperties = {
  marginTop: 20,
  color: '#474c57',
  fontSize: 15,
  background: 'none',
  border: 'none',
  cursor: 'pointer'
};

const errorStyle: React.CSSProperties = {
  color: '#cc0000',
  marginBottom: 14,
  fontSize: 15,
  textAlign: 'center'
};

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password
        });
        if (error) {
          setError(error.message);
        } else {
          alert('Account created! Please check your email for a confirmation link.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          setError(error.message);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ marginBottom: 18, fontWeight: 700 }}>
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form style={{ width: '100%' }} onSubmit={handleAuth} autoComplete="off">
        <label htmlFor="email" style={{ fontWeight: 500, fontSize: 15 }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="john@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
          autoComplete="email"
        />
        <label htmlFor="password" style={{ fontWeight: 500, fontSize: 15 }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
        />
        <button
          type="submit"
          style={buttonStyle}
          disabled={loading}
        >
          {isSignUp ? (loading ? 'Signing Up...' : 'Sign Up') : (loading ? 'Signing In...' : 'Sign In')}
        </button>
      </form>
      <button
        type="button"
        style={toggleTextStyle}
        onClick={() => { setIsSignUp(prev => !prev); setError(null); }}
        tabIndex={0}
      >
        {isSignUp
          ? 'Already have an account? Sign In'
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};
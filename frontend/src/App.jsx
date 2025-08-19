import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [healthStatus, setHealthStatus] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_BASE_URL}/api/data`)
      setData(response.data.data)
    } catch (err) {
      setError('Failed to fetch data. Make sure the backend is running.')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const checkHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/health`)
      setHealthStatus(response.data.status)
    } catch (err) {
      setHealthStatus('unhealthy')
      console.error('Health check failed:', err)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 Barebones App</h1>
        <p style={styles.subtitle}>
          A minimal full-stack application with React & FastAPI
        </p>
        
        <div style={styles.statusContainer}>
          <div style={styles.statusItem}>
            <span style={styles.statusLabel}>Backend Status:</span>
            <span style={{
              ...styles.statusValue,
              color: healthStatus === 'healthy' ? '#10b981' : '#ef4444'
            }}>
              {healthStatus === 'healthy' ? '✅ Healthy' : '❌ Unhealthy'}
            </span>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button 
            onClick={fetchData} 
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Loading...' : 'Fetch Sample Data'}
          </button>
        </div>

        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {data.length > 0 && (
          <div style={styles.dataContainer}>
            <h3 style={styles.dataTitle}>Sample Data:</h3>
            <div style={styles.dataList}>
              {data.map((item) => (
                <div key={item.id} style={styles.dataItem}>
                  <h4 style={styles.itemName}>{item.name}</h4>
                  <p style={styles.itemDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Frontend: <code>http://localhost:5173</code> | 
            Backend: <code>http://localhost:8000</code>
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '0 0 10px 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#6b7280',
    textAlign: 'center',
    margin: '0 0 30px 0'
  },
  statusContainer: {
    marginBottom: '30px'
  },
  statusItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0'
  },
  statusLabel: {
    fontWeight: '600',
    color: '#374151'
  },
  statusValue: {
    fontWeight: '600'
  },
  buttonContainer: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
  },
  error: {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  dataContainer: {
    marginTop: '30px'
  },
  dataTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '15px'
  },
  dataList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  dataItem: {
    background: '#f9fafb',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  itemName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 8px 0'
  },
  itemDescription: {
    color: '#6b7280',
    margin: '0',
    lineHeight: '1.5'
  },
  footer: {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #e5e7eb',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '0.9rem',
    color: '#6b7280',
    margin: '0'
  }
}

export default App

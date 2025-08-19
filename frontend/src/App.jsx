import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'



function App() {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)

    const [healthStatus, setHealthStatus] = useState(null)



    // Stock price states

    const [ticker, setTicker] = useState('')

    const [stockPrice, setStockPrice] = useState(null)

    const [stockLoading, setStockLoading] = useState(false)

    const [stockError, setStockError] = useState(null)



    const fetchData = async () => {

        setLoading(true)

        setError(null)

        try {

            const response = await axios.get(`${API_BASE_URL}/api/data`)

            setData(response.data)

        } catch (err) {

            setError('Failed to fetch data. Make sure the backend is running.')

            console.error('Error fetching data:', err)

        } finally {

            setLoading(false)

        }

    }



    const fetchStockPrice = async () => {

        if (!ticker.trim()) {

            setStockError('Please enter a stock ticker')

            return

        }



        setStockLoading(true)

        setStockError(null)

        setStockPrice(null)



        try {

            const response = await axios.get(`${API_BASE_URL}/api/stock?ticker=${ticker.trim().toUpperCase()}`)

            setStockPrice({
                ticker: ticker.trim().toUpperCase(),
                price: response.data.latestPrice.toFixed(2)
            })

        } catch (err) {

            setStockError('Failed to fetch stock price. Please check the ticker symbol.')

            console.error('Error fetching stock price:', err)

        } finally {

            setStockLoading(false)

        }

    }



    const handleTickerSubmit = (e) => {

        e.preventDefault()

        fetchStockPrice()

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



                {/* Stock Price Section */}

                <div style={styles.stockSection}>

                    <h3 style={styles.sectionTitle}>📈 Stock Price Lookup</h3>

                    <form onSubmit={handleTickerSubmit} style={styles.stockForm}>

                        <div style={styles.inputContainer}>

                            <input

                                type="text"

                                value={ticker}

                                onChange={(e) => setTicker(e.target.value)}

                                placeholder="Enter stock ticker (e.g., AAPL, TSLA)"

                                style={styles.input}

                                disabled={stockLoading}

                            />

                            <button

                                type="submit"

                                disabled={stockLoading}

                                style={styles.stockButton}

                            >

                                {stockLoading ? 'Loading...' : 'Get Price'}

                            </button>

                        </div>

                    </form>



                    {stockError && (

                        <div style={styles.error}>

                            ⚠️ {stockError}

                        </div>

                    )}



                    {stockPrice && (

                        <div style={styles.stockResult}>

                            <h4 style={styles.stockTicker}>{stockPrice.ticker}</h4>

                            <div style={styles.priceInfo}>

                                <span style={styles.priceLabel}>Current Price:</span>

                                <span style={styles.priceValue}>${stockPrice.price}</span>

                            </div>

                            {stockPrice.name && (

                                <p style={styles.companyName}>{stockPrice.name}</p>

                            )}

                        </div>

                    )}

                </div>



                <div style={styles.divider}></div>



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

    stockSection: {

        marginBottom: '30px',

        padding: '25px',

        background: '#f8fafc',

        borderRadius: '15px',

        border: '1px solid #e2e8f0'

    },

    sectionTitle: {

        fontSize: '1.3rem',

        fontWeight: '600',

        color: '#374151',

        marginBottom: '20px',

        textAlign: 'center'

    },

    stockForm: {

        marginBottom: '20px'

    },

    inputContainer: {

        display: 'flex',

        gap: '10px',

        alignItems: 'center'

    },

    input: {

        flex: 1,

        padding: '12px 16px',

        borderRadius: '8px',

        border: '2px solid #e5e7eb',

        fontSize: '1rem',

        outline: 'none',

        transition: 'border-color 0.2s',

        ':focus': {

            borderColor: '#667eea'

        }

    },

    stockButton: {

        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',

        color: 'white',

        border: 'none',

        borderRadius: '8px',

        padding: '12px 20px',

        fontSize: '1rem',

        fontWeight: '600',

        cursor: 'pointer',

        transition: 'transform 0.2s',

        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',

        whiteSpace: 'nowrap'

    },

    stockResult: {

        background: 'white',

        padding: '20px',

        borderRadius: '10px',

        border: '1px solid #e5e7eb',

        textAlign: 'center'

    },

    stockTicker: {

        fontSize: '1.5rem',

        fontWeight: 'bold',

        color: '#374151',

        margin: '0 0 15px 0'

    },

    priceInfo: {

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        gap: '10px',

        marginBottom: '10px'

    },

    priceLabel: {

        fontSize: '1.1rem',

        color: '#6b7280',

        fontWeight: '500'

    },

    priceValue: {

        fontSize: '1.5rem',

        fontWeight: 'bold',

        color: '#059669'

    },

    companyName: {

        color: '#6b7280',

        fontSize: '0.95rem',

        margin: '0'

    },

    divider: {

        height: '1px',

        background: '#e5e7eb',

        margin: '30px 0'

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

import React, { useState } from 'react';
import axios from 'axios';
import { Search, MapPin, Wheat, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const PriceLookup = () => {
  const [formData, setFormData] = useState({
    crop: '',
    location: ''
  });
  const [priceData, setPriceData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setPriceData([]);

    if (!formData.crop || !formData.location) {
      setError('Please enter both crop name and location.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/lookup',
        { crop: formData.crop, location: formData.location }
      );

      if (response.data.data && response.data.data.length > 0) {
        const sortedData = response.data.data.sort((a, b) => a.year - b.year);
        setPriceData(sortedData);
      } else {
        setError('No data found for the given crop and location.');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 50%, #faf5ff 100%)',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    iconContainer: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, #10b981, #3b82f6)',
      borderRadius: '50%',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #059669, #2563eb)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.125rem',
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '2rem',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '2rem',
      marginBottom: '1.5rem',
    },
    formSection: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '2rem',
    },
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1.5rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem',
    },
    inputContainer: {
      position: 'relative',
    },
    inputIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      pointerEvents: 'none',
      zIndex: 1,
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(5px)',
      transition: 'all 0.2s',
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
      background: 'rgba(255, 255, 255, 0.7)',
    },
    submitButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #10b981, #3b82f6)',
      color: 'white',
      fontWeight: '600',
      padding: '1rem 1.5rem',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s',
      transform: 'scale(1)',
    },
    submitButtonHover: {
      background: 'linear-gradient(135deg, #059669, #2563eb)',
      transform: 'scale(1.05)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    },
    submitButtonDisabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
      transform: 'scale(1)',
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    errorResult: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#dc2626',
      marginTop: '1rem',
      padding: '1rem',
      background: 'rgba(220, 38, 38, 0.1)',
      borderRadius: '0.5rem',
    },
    errorIcon: {
      background: '#fef2f2',
      borderRadius: '50%',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorMessage: {
      fontSize: '0.875rem',
    },
    resultsTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '1.5rem',
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '0.75rem',
      overflow: 'hidden',
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #10b981, #3b82f6)',
      color: 'white',
      textAlign: 'left',
    },
    tableHeaderCell: {
      padding: '1rem',
      fontWeight: '600',
    },
    tableRow: {
      borderBottom: '1px solid #e5e7eb',
      transition: 'background 0.2s',
    },
    tableRowHover: {
      background: 'rgba(16, 185, 129, 0.1)',
    },
    tableCell: {
      padding: '1rem',
      color: '#4b5563',
    },
    highlightCell: {
      fontWeight: '600',
      color: '#059669',
    },
    noResults: {
      textAlign: 'center',
      padding: '2rem',
      color: '#6b7280',
    },
    successHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#16a34a',
      marginBottom: '1rem',
    },
    successIcon: {
      background: '#f0fdf4',
      borderRadius: '50%',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  // Add CSS animation for spinner
  const spinnerStyle = document.createElement('style');
  spinnerStyle.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinnerStyle);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <TrendingUp size={32} color="white" />
          </div>
          <h1 style={styles.title}>Crop Price Lookup</h1>
          <p style={styles.subtitle}>
            Find historical price data for crops in your region
          </p>
        </div>

        <div style={styles.mainGrid}>
          {/* Form Section */}
          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>
              <Wheat size={24} color="#10b981" />
              Search Criteria
            </h2>

            <form onSubmit={handleSearch} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Crop Name</label>
                <div style={styles.inputContainer}>
                  <div style={styles.inputIcon}>
                    <Wheat size={20} />
                  </div>
                  <input
                    type="text"
                    name="crop"
                    value={formData.crop}
                    onChange={handleChange}
                    placeholder="e.g., Wheat, Rice, Corn"
                    required
                    style={styles.input}
                    onFocus={(e) => {
                      Object.assign(e.target.style, styles.inputFocus);
                    }}
                    onBlur={(e) => {
                      e.target.style.outline = 'none';
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255, 255, 255, 0.5)';
                    }}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Location</label>
                <div style={styles.inputContainer}>
                  <div style={styles.inputIcon}>
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Punjab, Maharashtra"
                    required
                    style={styles.input}
                    onFocus={(e) => {
                      Object.assign(e.target.style, styles.inputFocus);
                    }}
                    onBlur={(e) => {
                      e.target.style.outline = 'none';
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(255, 255, 255, 0.5)';
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.submitButton,
                  ...(loading ? styles.submitButtonDisabled : {})
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    Object.assign(e.target.style, styles.submitButtonHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.background = 'linear-gradient(135deg, #10b981, #3b82f6)';
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? (
                  <>
                    <div style={styles.spinner}></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Search Prices
                  </>
                )}
              </button>
            </form>

            {error && (
              <div style={styles.errorResult}>
                <div style={styles.errorIcon}>
                  <AlertCircle size={24} />
                </div>
                <p style={styles.errorMessage}>{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {priceData.length > 0 && (
            <div style={styles.card}>
              <div style={styles.successHeader}>
                <div style={styles.successIcon}>
                  <CheckCircle size={24} />
                </div>
                <h2 style={styles.sectionTitle}>Historical Price Data</h2>
              </div>

              <table style={styles.resultsTable}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.tableHeaderCell}>Year</th>
                    <th style={styles.tableHeaderCell}>Season</th>
                    <th style={styles.tableHeaderCell}>Price (₹/ton)</th>
                    <th style={styles.tableHeaderCell}>Yield (ton/acre)</th>
                    <th style={styles.tableHeaderCell}>Est. Price for 5 Acres (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {priceData.map((item, index) => (
                    <tr
                      key={index}
                      style={styles.tableRow}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = styles.tableRowHover.background;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '';
                      }}
                    >
                      <td style={styles.tableCell}>{item.year}</td>
                      <td style={styles.tableCell}>{item.season}</td>
                      <td style={styles.tableCell}>{item.price}</td>
                      <td style={styles.tableCell}>{item.yield}</td>
                      <td style={{ ...styles.tableCell, ...styles.highlightCell }}>
                        {item.estimated_price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceLookup;
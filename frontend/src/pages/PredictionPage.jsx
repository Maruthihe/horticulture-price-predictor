import React, { useState } from 'react';
import { Wheat, MapPin, Mountain, Thermometer, Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const PredictionPage = () => {
  const [formData, setFormData] = useState({
    crop: '',
    location: '',
    soil_type: '',
    temperature: '',
    year: '',
  });

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const currentYear = new Date().getFullYear();
    if (parseInt(formData.year) <= currentYear) {
      setResult({ error: `Year must be greater than ${currentYear}.` });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      setTimeout(() => {
        const mockPrice = (Math.random() * 5000 + 1000).toFixed(2);
        setResult({
          predicted_price: mockPrice,
          unit: 'per quintal',
          confidence: '92%',
          trend: 'Upward'
        });
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setResult({ error: 'Something went wrong. Please try again.' });
      setIsLoading(false);
    }
  };

  const formFields = [
    { label: 'Crop Type', name: 'crop', icon: Wheat, placeholder: 'e.g., Wheat, Rice, Corn' },
    { label: 'Location', name: 'location', icon: MapPin, placeholder: 'e.g., Punjab, Maharashtra' },
    { label: 'Soil Type', name: 'soil_type', icon: Mountain, placeholder: 'e.g., Clay, Sandy, Loamy' },
    { label: 'Temperature (°C)', name: 'temperature', icon: Thermometer, type: 'number', placeholder: 'Average temperature' },
    { label: 'Target Year', name: 'year', icon: Calendar, type: 'number', placeholder: `Must be > ${new Date().getFullYear()}` },
  ];

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
      gridTemplateColumns: '1fr 1fr',
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
      height: 'fit-content',
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
    resultsSection: {
      display: 'flex',
      flexDirection: 'column',
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem',
    },
    resultCard: {
      opacity: result ? 1 : 0,
      transform: result ? 'scale(1)' : 'scale(0.95)',
      transition: 'all 0.5s',
    },
    errorResult: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#dc2626',
    },
    errorIcon: {
      background: '#fef2f2',
      borderRadius: '50%',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorTitle: {
      fontWeight: '600',
      marginBottom: '0.25rem',
    },
    errorMessage: {
      fontSize: '0.875rem',
      color: '#ef4444',
    },
    successResult: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    successHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#16a34a',
    },
    successIcon: {
      background: '#f0fdf4',
      borderRadius: '50%',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    successTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
    },
    priceDisplay: {
      background: 'linear-gradient(135deg, #10b981, #3b82f6)',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      textAlign: 'center',
      color: 'white',
    },
    priceAmount: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    priceUnit: {
      fontSize: '1.125rem',
      color: 'rgba(255, 255, 255, 0.8)',
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
    },
    metric: {
      textAlign: 'center',
      padding: '1rem',
      borderRadius: '0.5rem',
    },
    metricConfidence: {
      background: '#eff6ff',
    },
    metricTrend: {
      background: '#f0fdf4',
    },
    metricValue: {
      fontSize: '1.125rem',
      fontWeight: '600',
      marginBottom: '0.25rem',
    },
    metricLabel: {
      fontSize: '0.875rem',
    },
    tipsList: {
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    tipItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.5rem',
      color: '#6b7280',
      fontSize: '0.875rem',
    },
    tipBullet: {
      marginTop: '0.125rem',
      fontSize: '1rem',
    },
  };

  // Add CSS animation for spinner
  const spinnerStyle = document.createElement('style');
  spinnerStyle.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @media (max-width: 1024px) {
      .main-grid { grid-template-columns: 1fr !important; }
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
          <h1 style={styles.title}>Crop Price Predictor</h1>
          <p style={styles.subtitle}>
            Get accurate price predictions for your crops using AI-powered analytics
          </p>
        </div>

        <div style={{ ...styles.mainGrid, ...(window.innerWidth <= 1024 ? { gridTemplateColumns: '1fr' } : {}) }}>
          {/* Form Section */}
          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>
              <Wheat size={24} color="#10b981" />
              Prediction Details
            </h2>

            <form onSubmit={handleSubmit} style={styles.form}>
              {formFields.map(({ label, name, icon: Icon, type = 'text', placeholder }) => (
                <div key={name} style={styles.inputGroup}>
                  <label style={styles.label}>{label}</label>
                  <div style={styles.inputContainer}>
                    <div style={styles.inputIcon}>
                      <Icon size={20} />
                    </div>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
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
                      onMouseEnter={(e) => {
                        if (document.activeElement !== e.target) {
                          e.target.style.background = 'rgba(255, 255, 255, 0.7)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (document.activeElement !== e.target) {
                          e.target.style.background = 'rgba(255, 255, 255, 0.5)';
                        }
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...styles.submitButton,
                  ...(isLoading ? styles.submitButtonDisabled : {})
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    Object.assign(e.target.style, styles.submitButtonHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.background = 'linear-gradient(135deg, #10b981, #3b82f6)';
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <div style={styles.spinner}></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp size={20} />
                    Predict Price
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div style={styles.resultsSection}>
            {/* Results Display */}
            {result && (
              <div style={{ ...styles.card, ...styles.resultCard }}>
                {result.error ? (
                  <div style={styles.errorResult}>
                    <div style={styles.errorIcon}>
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h3 style={styles.errorTitle}>Prediction Error</h3>
                      <p style={styles.errorMessage}>{result.error}</p>
                    </div>
                  </div>
                ) : (
                  <div style={styles.successResult}>
                    <div style={styles.successHeader}>
                      <div style={styles.successIcon}>
                        <CheckCircle size={24} />
                      </div>
                      <h3 style={styles.successTitle}>Prediction Complete</h3>
                    </div>

                    <div style={styles.priceDisplay}>
                      <div style={styles.priceAmount}>₹{result.predicted_price}</div>
                      <div style={styles.priceUnit}>{result.unit}</div>
                    </div>


                  </div>
                )}
              </div>
            )}

            {/* Tips Card */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Key, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setIsLoading(true);

        try {
            const res = await axios.post("http://localhost:5000/send-otp", { email });

            if (res.data.message === "OTP sent successfully") {
                setMessage("OTP sent. Check your email.");
                navigate("/verify-otp", { state: { email } });
            } else {
                setError("Failed to send OTP.");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Error sending OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dbeafe 50%, #faf5ff 100%)',
            padding: '1rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            maxWidth: '480px',
            width: '100%',
            margin: '0 auto',
        },
        card: {
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '2.5rem',
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
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #059669, #2563eb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
        },
        subtitle: {
            color: '#6b7280',
            fontSize: '1rem',
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
            zIndex: '1',
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
            marginBottom: '1rem',
            padding: '0.75rem',
            background: '#fef2f2',
            borderRadius: '0.5rem',
        },
        successResult: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#16a34a',
            marginBottom: '1rem',
            padding: '0.75rem',
            background: '#f0fdf4',
            borderRadius: '0.5rem',
        },
        messageIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        linksContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '1.5rem',
            textAlign: 'center',
        },
        link: {
            color: '#3b82f6',
            textDecoration: 'none',
            fontSize: '0.875rem',
            transition: 'color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
        },
        linkHover: {
            color: '#2563eb',
            textDecoration: 'underline',
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
                <div style={styles.card}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div style={styles.iconContainer}>
                            <Key size={32} color="white" />
                        </div>
                        <h1 style={styles.title}>Reset Password</h1>
                        <p style={styles.subtitle}>
                            Enter your email to receive a reset OTP
                        </p>
                    </div>

                    {error && (
                        <div style={styles.errorResult}>
                            <div style={styles.messageIcon}>
                                <AlertCircle size={18} />
                            </div>
                            <span>{error}</span>
                        </div>
                    )}

                    {message && (
                        <div style={styles.successResult}>
                            <div style={styles.messageIcon}>
                                <CheckCircle size={18} />
                            </div>
                            <span>{message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSendOtp} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email Address</label>
                            <div style={styles.inputContainer}>
                                <div style={styles.inputIcon}>
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
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
                                    Sending OTP...
                                </>
                            ) : (
                                <>
                                    <ArrowRight size={20} />
                                    Send OTP
                                </>
                            )}
                        </button>
                    </form>

                    <div style={styles.linksContainer}>
                        <Link
                            to="/login"
                            style={styles.link}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#2563eb';
                                e.target.style.textDecoration = 'underline';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#3b82f6';
                                e.target.style.textDecoration = 'none';
                            }}
                        >
                            Remember your password? Login instead
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
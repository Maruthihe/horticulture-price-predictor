import React from 'react';
import { LineChart, Award, Sprout, Database, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div style={{ backgroundColor: '#f7faf7', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#166534', marginBottom: '1rem' }}>
            About Our Crop Price Prediction System
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#4b5563', maxWidth: '768px', margin: '0 auto' }}>
            Empowering farmers and agricultural stakeholders with data-driven price forecasting
          </p>
        </div>

        {/* Mission Statement */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#15803d', marginBottom: '1rem' }}>
            Our Mission
          </h2>
          <p style={{ fontSize: '1rem', color: '#4b5563', marginBottom: '1.5rem' }}>
            We aim to revolutionize agricultural planning by providing accurate price predictions
            for horticulture crops, helping farmers make informed decisions and maximize their profits.
          </p>
          <div style={{
            borderLeft: '4px solid #22c55e',
            paddingLeft: '1rem',
            fontStyle: 'italic',
            color: '#6b7280'
          }}>
            "Bridging the gap between agricultural data and market intelligence to create sustainable farming futures."
          </div>
        </div>

        {/* Features Section */}
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          color: '#15803d',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Key Features
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <FeatureCard
            icon={<LineChart color="#16a34a" size={32} />}
            title="Advanced Price Predictions"
            description="Our machine learning models analyze historical data to forecast future crop prices with high accuracy."
          />
          <FeatureCard
            icon={<Sprout color="#16a34a" size={32} />}
            title="Crop Specific Analysis"
            description="Get tailored predictions based on specific crop types and their unique market behaviors."
          />
          <FeatureCard
            icon={<Database color="#16a34a" size={32} />}
            title="Comprehensive Data Integration"
            description="We incorporate soil type, location, temperature, and other relevant factors to enhance prediction accuracy."
          />
          <FeatureCard
            icon={<Users color="#16a34a" size={32} />}
            title="Farmer-Centric Approach"
            description="Designed with input from agricultural experts to address the real needs of farmers."
          />
        </div>

        {/* Technology Section */}
        <div style={{
          backgroundColor: '#166534',
          color: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Our Technology
          </h2>
          <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
            We leverage state-of-the-art machine learning algorithms to process vast amounts of agricultural data,
            including historical price trends, weather patterns, soil conditions, and market dynamics.
          </p>
          <p style={{ fontSize: '1rem' }}>
            Our models are continuously refined to improve prediction accuracy, helping farmers
            make informed decisions about when to plant, harvest, and sell their crops.
          </p>
        </div>

        {/* Team/Contact Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#15803d', marginBottom: '1.5rem' }}>
            Behind the Project
          </h2>
          <p style={{ fontSize: '1rem', color: '#4b5563', marginBottom: '2rem', maxWidth: '768px', margin: '0 auto 2rem auto' }}>
            This project was developed by a team of data scientists and agricultural experts
            passionate about using technology to solve real-world farming challenges.
          </p>
          <button style={{
            backgroundColor: '#16a34a',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Contact Our Team
          </button>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f3f4f6',
      transition: 'box-shadow 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        {icon}
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#15803d', marginLeft: '0.75rem' }}>
          {title}
        </h3>
      </div>
      <p style={{ color: '#4b5563' }}>
        {description}
      </p>
    </div>
  );
};

export default AboutPage;
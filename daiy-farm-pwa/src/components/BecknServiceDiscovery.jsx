import React, { useState, useEffect } from 'react';
import { becknService } from '../services/becknService';
import './BecknServiceDiscovery.css';

const BecknServiceDiscovery = () => {
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    location: "12.9716,77.5946", // Default location (Bangalore)
  });

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await becknService.discoverServices(searchParams);
      
      // Extract providers and services from the response
      const providersData = response.message?.catalog?.['bpp/providers'] || [];
      setProviders(providersData);
      
      // Flatten all items from all providers
      const allServices = providersData.flatMap(provider => 
        (provider.items || []).map(item => ({
          ...item,
          providerName: provider.descriptor?.name || 'Unknown Provider'
        }))
      );
      
      setServices(allServices);
    } catch (err) {
      setError('Failed to discover services. Please try again later.');
      console.error('Discovery error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch services on component mount
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="beckn-discovery-container">
      <h2>Discover Delivery Services</h2>
      
      <div className="search-form">
        <div className="form-group">
          <label htmlFor="location">Location (GPS Coordinates):</label>
          <input
            type="text"
            id="location"
            name="location"
            value={searchParams.location}
            onChange={handleInputChange}
            placeholder="e.g., 12.9716,77.5946"
          />
        </div>
        
        <button 
          className="search-button" 
          onClick={handleSearch} 
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search Services'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading services...</div>
      ) : (
        <>
          <h3>Available Providers ({providers.length})</h3>
          <div className="providers-list">
            {providers.map((provider, index) => (
              <div key={provider.id || index} className="provider-card">
                <h4>{provider.descriptor?.name || 'Unnamed Provider'}</h4>
                <p>{provider.descriptor?.short_desc || 'No description available'}</p>
                {provider.locations && provider.locations.length > 0 && (
                  <div className="provider-location">
                    <strong>Location:</strong> {provider.locations[0].address || 'Address not available'}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <h3>Available Services ({services.length})</h3>
          <div className="services-list">
            {services.map((service, index) => (
              <div key={service.id || index} className="service-card">
                <div className="service-header">
                  <h4>{service.descriptor?.name || 'Unnamed Service'}</h4>
                  <span className="provider-tag">{service.providerName}</span>
                </div>
                <p>{service.descriptor?.short_desc || 'No description available'}</p>
                <p className="service-description">
                  {service.descriptor?.long_desc || 'No detailed description available'}
                </p>
                
                {service.price && (
                  <div className="service-price">
                    <strong>Price:</strong> {service.price.currency} {service.price.value}
                  </div>
                )}
                
                {service.time && (
                  <div className="service-time">
                    <strong>Delivery Time:</strong> {service.time.range.start} - {service.time.range.end}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BecknServiceDiscovery;

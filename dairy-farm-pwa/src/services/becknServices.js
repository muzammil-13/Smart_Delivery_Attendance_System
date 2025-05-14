/**
 * Service for interacting with Beckn APIs
 */
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const becknService = {
  /**
   * Send a discovery request to the Beckn network
   * @param {Object} searchParams - Parameters for the search
   * @returns {Promise<Object>} - The discovery response
   */
  discoverServices: async (searchParams = {}) => {
    try {
      // Create a Beckn-compliant search request
      const requestBody = {
        context: {
          domain: "delivery",
          country: "IND",
          city: "std:080",
          action: "search",
          core_version: "1.0.0",
          bap_id: "smart-delivery-consumer.com",
          bap_uri: "https://smart-delivery-consumer.com/beckn/api",
          transaction_id: `txn-${Date.now()}`,
          message_id: `msg-${Date.now()}`,
          timestamp: new Date().toISOString()
        },
        message: {
          intent: {
            ...searchParams,
            fulfillment: {
              type: "Delivery",
              stops: [
                {
                  location: {
                    gps: searchParams.location || "12.9716,77.5946"
                  }
                }
              ]
            }
          }
        }
      };

      const response = await fetch(`${BACKEND_URL}/beckn/discovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error discovering services:', error);
      throw error;
    }
  }
};

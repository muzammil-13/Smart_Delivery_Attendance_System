# Beckn Protocol Integration Documentation

## Overview

This document explains how the Smart Delivery Attendance System integrates with the Beckn Protocol, specifically focusing on the Discovery API implementation. The integration allows our application to act as a Beckn Provider Platform (BPP), making our dairy delivery services discoverable by any Beckn Application Platform (BAP).

## What is Beckn Protocol?

Beckn Protocol is an open protocol that enables location-aware, local commerce across industries. It creates an interoperable, decentralized ecosystem allowing small businesses to be discovered and engaged by any consumer-facing application.

## Architecture

Our implementation follows the Beckn Protocol architecture:

1. **BAP (Beckn Application Platform)**: External consumer applications that search for services
2. **BPP (Beckn Provider Platform)**: Our Smart Delivery Attendance System, which offers delivery services
3. **Beckn Gateway**: A middleware that facilitates communication between BAPs and BPPs

## Discovery API

The Discovery API is the first step in the Beckn transaction flow. It allows our delivery services to be discovered by consumer applications.

### API Endpoint

- **URL**: `/beckn/discovery`
- **Method**: POST
- **Description**: Receives search requests from BAPs and responds with available delivery services

### Request Format

```json
{
  "context": {
    "domain": "delivery",
    "country": "IND",
    "city": "std:080",
    "action": "search",
    "core_version": "1.0.0",
    "bap_id": "example-bap.com",
    "bap_uri": "https://example-bap.com/beckn/api",
    "transaction_id": "txn-123456789",
    "message_id": "msg-123456789",
    "timestamp": "2023-04-06T10:00:00.000Z"
  },
  "message": {
    "intent": {
      "fulfillment": {
        "type": "Delivery",
        "stops": [
          {
            "location": {
              "gps": "12.9716,77.5946"
            }
          }
        ]
      }
    }
  }
}
```

### Response Format

```json
{
  "context": {
    "domain": "delivery",
    "country": "IND",
    "city": "std:080",
    "action": "on_search",
    "core_version": "1.0.0",
    "bap_id": "example-bap.com",
    "bap_uri": "https://example-bap.com/beckn/api",
    "bpp_id": "smart-delivery-attendance-system.com",
    "bpp_uri": "https://smart-delivery-attendance-system.com/beckn/api",
    "transaction_id": "txn-123456789",
    "message_id": "msg-123456789",
    "timestamp": "2023-04-06T10:05:00.000Z"
  },
  "message": {
    "catalog": {
      "bpp/descriptor": {
        "name": "Smart Delivery Attendance System",
        "short_desc": "Dairy Farm Delivery Service"
      },
      "bpp/providers": [
        {
          "id": "dairy-farm-provider-1",
          "descriptor": {
            "name": "Premium Dairy Farm"
          },
          "items": [
            {
              "id": "milk-delivery-standard",
              "descriptor": {
                "name": "Standard Milk Delivery"
              },
              "price": {
                "currency": "INR",
                "value": "30.00"
              }
            }
          ]
        }
      ]
    }
  }
}
```

## Testing Locally

To test the Beckn integration locally:

1. **Start the Django backend**:

   ```
   python manage.py runserver
   ```
2. **Start the React frontend**:

   ```
   npm start
   ```
3. **Test the Discovery API**:

   - Use a tool like Postman to send a POST request to `http://localhost:8000/beckn/discovery`
   - Use the request format shown above
   - Verify that you receive a properly formatted response
4. **Test the frontend integration**:

   - Open the React app in your browser (typically at `http://localhost:3000`)
   - The BecknServiceDiscovery component should automatically fetch and display services
   - Try searching with different GPS coordinates to test the search functionality

## Next Steps

After implementing the Discovery API, the next steps in the Beckn integration would be:

1. **Select API**: Allow users to select specific services
2. **Init API**: Initialize the transaction
3. **Confirm API**: Confirm the order
4. **Status API**: Track the delivery status

These will be implemented in future phases of the project.

## References

- [Beckn Protocol Specification](https://beckn.org/docs/protocol-specifications/)
- [Beckn for Mobility](https://beckn.org/docs/mobility/)
- [Beckn API Reference](https://developers.becknprotocol.io/docs/introduction/overview/)

```

## 4. Testing Instructions

### 4.1 Testing the Backend API

1. Start your Django server:
```bash
python manage.py runserver
```

2. Use a tool like Postman or curl to send a POST request to the Discovery API endpoint:

```bash
curl -X POST http://localhost:8000/beckn/discovery \
  -H "Content-Type: application/json" \
  -d '{
    "context": {
      "domain": "delivery",
      "country": "IND",
      "city": "std:080",
      "action": "search",
      "core_version": "1.0.0",
      "bap_id": "example-bap.com",
      "bap_uri": "https://example-bap.com/beckn/api",
      "transaction_id": "txn-123456789",
      "message_id": "msg-123456789",
      "timestamp": "2023-04-06T10:00:00.000Z"
    },
    "message": {
      "intent": {
        "fulfillment": {
          "type": "Delivery",
          "stops": [
            {
              "location": {
                "gps": "12.9716,77.5946"
              }
            }
          ]
        }
      }
    }
  }'
```

3. Verify that you receive a properly formatted Beckn response with a catalog of services.

### 4.2 Testing the Frontend Component

1. Start your React development server:

```bash
npm start
```

2. Open your browser to `http://localhost:3000`
3. The BecknServiceDiscovery component should load and display the list of services
4. Try entering different GPS coordinates and click "Search Services" to test the search functionality

## 5. Summary

This implementation provides a solid foundation for integrating your Smart Delivery Attendance System with the Beckn Protocol. The key components are:

1. **Django Backend** : Implements the Discovery API endpoint that responds to search requests from BAPs with a catalog of delivery services.
2. **React Frontend** : Provides a user-friendly interface to view the services discovered through the Beckn Protocol.
3. **Documentation** : Explains the purpose of the Discovery API, how it integrates with the Beckn Protocol, and steps to test the integration.

The code follows clean, modular design principles and is structured for scalability as you add more Beckn APIs in the future. The implementation is beginner-friendly while adhering to the Beckn Protocol specifications.

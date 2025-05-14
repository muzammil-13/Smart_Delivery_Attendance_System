from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
import uuid
import json

class BecknDiscoveryAPI(APIView):
    def post(self, request, *args, **kwargs):
        # Extract context from the request
        try:
            data = request.data
            context = data.get('context', {})
            message = data.get('message', {})
            
            # Validate the request
            if not context or not message:
                return Response({"error": "Invalid request format"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create a Beckn-compliant response
            response = self.generate_discovery_response(context, message)
            return Response(response, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def generate_discovery_response(self, context, message):
        # Generate a mock catalog of delivery services
        current_time = timezone.now().isoformat()
        transaction_id = context.get('transaction_id', str(uuid.uuid4()))
        
        # Create a response context
        response_context = {
            "domain": "delivery",
            "country": "IND",
            "city": "std:080",
            "action": "on_search",
            "core_version": "1.0.0",
            "bap_id": context.get('bap_id', ''),
            "bap_uri": context.get('bap_uri', ''),
            "bpp_id": "smart-delivery-attendance-system.com",
            "bpp_uri": "https://smart-delivery-attendance-system.com/beckn/api",
            "transaction_id": transaction_id,
            "message_id": context.get('message_id', str(uuid.uuid4())),
            "timestamp": current_time
        }
        
        # Create mock catalog items
        catalog = {
            "bpp/descriptor": {
                "name": "Smart Delivery Attendance System",
                "short_desc": "Dairy Farm Delivery Service",
                "long_desc": "Efficient milk delivery service with QR code tracking",
                "images": ["https://example.com/logo.png"]
            },
            "bpp/providers": [
                {
                    "id": "dairy-farm-provider-1",
                    "descriptor": {
                        "name": "Premium Dairy Farm",
                        "short_desc": "Quality milk delivery service",
                        "images": ["https://example.com/dairy-farm.png"]
                    },
                    "locations": [
                        {
                            "id": "location-1",
                            "gps": "12.9716,77.5946",
                            "address": "Bangalore Urban, Karnataka"
                        }
                    ],
                    "items": [
                        {
                            "id": "milk-delivery-standard",
                            "descriptor": {
                                "name": "Standard Milk Delivery",
                                "short_desc": "Daily milk delivery service",
                                "long_desc": "Fresh milk delivered to your doorstep every morning",
                                "images": ["https://example.com/milk.png"]
                            },
                            "price": {
                                "currency": "INR",
                                "value": "30.00"
                            },
                            "category_id": "dairy-delivery",
                            "fulfillment_id": "fulfillment-1",
                            "location_id": "location-1",
                            "time": {
                                "label": "Delivery Time",
                                "duration": "PT1H",
                                "range": {
                                    "start": "06:00:00",
                                    "end": "08:00:00"
                                }
                            }
                        },
                        {
                            "id": "milk-delivery-premium",
                            "descriptor": {
                                "name": "Premium Milk Delivery",
                                "short_desc": "Premium milk delivery service",
                                "long_desc": "Organic milk delivered to your doorstep every morning",
                                "images": ["https://example.com/premium-milk.png"]
                            },
                            "price": {
                                "currency": "INR",
                                "value": "45.00"
                            },
                            "category_id": "dairy-delivery",
                            "fulfillment_id": "fulfillment-1",
                            "location_id": "location-1",
                            "time": {
                                "label": "Delivery Time",
                                "duration": "PT1H",
                                "range": {
                                    "start": "06:00:00",
                                    "end": "08:00:00"
                                }
                            }
                        }
                    ],
                    "fulfillments": [
                        {
                            "id": "fulfillment-1",
                            "type": "Delivery",
                            "tracking": True,
                            "agent": {
                                "name": "Delivery Agent",
                                "phone": "+91-9876543210"
                            }
                        }
                    ]
                }
            ]
        }
        
        # Construct the full response
        response = {
            "context": response_context,
            "message": {
                "catalog": catalog
            }
        }
        
        return response

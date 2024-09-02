# import random
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view

# from .models import Quote
# from .serializers import QuoteSerializer


@api_view(["GET"])
def get_random_quote(request):
    response = requests.get("https://quotes-api-self.vercel.app/quote")
    data = response.json()["quote"].lower().replace("’", "'").strip()
    print(data)
    return Response(data)

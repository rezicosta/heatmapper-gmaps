from geopy.geocoders import Nominatim

geolocator = Nominatim()
location = geolocator.reverse("37.766656, -122.436459")

print(location.address)

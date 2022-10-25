import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useRef, useState } from "react";

const API = process.env.REACT_APP_API;

export const useMapController = (poiTypes: string, radius: number) => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[] | null>(
    null
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLocationOn, setIsLocationOn] = useState(true);

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: API as string,
    libraries: useMemo(() => ["places"], []),
  });

  const mapRef = useRef<google.maps.Map>();

  const googlePlacesRequest = useMemo(() => {
    const request = {
      location: userLocation,
      radius: radius,
      type: poiTypes,
    };
    return request;
  }, [userLocation, poiTypes, radius]);

  const onLoad = (passedMap: google.maps.Map) => {
    mapRef.current = passedMap;
    setMap(passedMap);
  };

  //   INITIAL - LISTEN FOR GEOLOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUserLocation(coords);
      },
      () => {
        setIsLocationOn(false);
      }
    );
    console.log("State");
    console.log(userLocation);
  }, []);

  //   GET AND SET NEARBY GOOGLE PLACES
  useEffect(() => {
    if (!map || userLocation.lat === 0) {
      return;
    }
    const service = new google.maps.places.PlacesService(map);

    service.nearbySearch(googlePlacesRequest, (res, s) => {
      console.log(res);
      setPlaces(res);
    });
  }, [map, userLocation]);

  useEffect(() => {
    console.log("PLACES STATE");
    console.log(places);
  }, [places]);

  return { isLoaded, userLocation, onLoad, places, mapRef, isLocationOn };
};

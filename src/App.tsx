import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
// import { Map } from "./Map";
import "./Map.css";

const API = process.env.REACT_APP_API;
// const API = "";
const places = ["places"];

export const App = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [places, setPlaces] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: API as string,
    // @ts-ignore
    libraries: places,
  });

  const mapRef = useRef<GoogleMap>();

  const onLoad = (passedMap: any) => {
    console.log("onLoad");
    console.log("passed map");
    console.log(passedMap);
    mapRef.current = passedMap;
    setMap(passedMap);
    console.log("map state");
    console.log(map);
    console.log("isLoaded?");
    console.log(isLoaded);

    // let service = new window.google.maps.places.PlacesService(map);
    // console.log("service");
    // console.log(service);
  };

  useEffect(() => {
    console.log(
      "***************************************************************"
    );
    console.log("start");
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      //   @ts-ignore
      setUserLocation(coords);
    });
    console.log("State");
    console.log(userLocation);
  }, []);

  useEffect(() => {
    if (!map || userLocation.lat === 0) {
      console.log("map undefined or user location undefined");
    } else {
      console.log("");
    }
  }, [map, userLocation]);

  //   if (!isLoaded) return <div>Loading...</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <h1>App</h1>
      {/* <Map center={userLocation} /> */}
      <GoogleMap
        zoom={15}
        center={userLocation}
        mapContainerClassName="map-container"
        // options={options}
        onLoad={onLoad}
      >
        <Marker
          key={userLocation.lat}
          position={userLocation}
          onLoad={(marker) => {
            console.log("loaded marker");
            console.log(marker);
          }}
        ></Marker>
      </GoogleMap>
    </div>
  );
};

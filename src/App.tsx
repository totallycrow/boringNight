import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
  useLoadScript,
  InfoWindowF,
} from "@react-google-maps/api";
// import { Map } from "./Map";
import "./Map.css";

const API = process.env.REACT_APP_API;
// const API = "";

export const App = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [places, setPlaces] = useState(null);
  const [map, setMap] = useState(null);

  const placesLibraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: API as string,
    // @ts-ignore
    libraries: placesLibraries,
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
      return;
    } else {
      console.log("map defined and user location defined");
      console.log("object");
      const service = new google.maps.places.PlacesService(map);
      console.log("service:");
      console.log(service);

      var request = {
        location: userLocation,
        radius: "1000",
        type: ["restaurant"],
      };

      // @ts-ignore
      service.nearbySearch(request, (res, s) => {
        console.log(res);
        // @ts-ignore
        setPlaces(res);
      });
    }
  }, [map, userLocation]);

  useEffect(() => {
    console.log("PLACES STATE");
    console.log(places);
  }, [places]);

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
  };

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
        {places === null
          ? ""
          : // @ts-ignore
            places.map((place: any) => {
              return (
                <Marker
                  position={place.geometry.location}
                  key={place.geometry.location.lat}
                >
                  <InfoWindowF position={place.geometry.location}>
                    <div style={divStyle}>
                      <div>
                        <h2>
                          <span>{place.name}</span>
                        </h2>
                      </div>
                      <div>
                        Rating: <span>{place.rating}</span>
                      </div>
                      <div>
                        Total Ratings: <span>{place.user_ratings_total}</span>
                      </div>
                    </div>
                  </InfoWindowF>
                </Marker>
              );
            })}
      </GoogleMap>
      <button
        onClick={() => {
          if (places === null) return;
          // @ts-ignore
          mapRef.current?.panTo(places[5].geometry.location);
        }}
      >
        CHOOSE FOR ME
      </button>
    </div>
  );
};

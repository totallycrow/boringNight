import { GoogleMap, InfoWindowF, Marker } from "@react-google-maps/api";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};

interface IMapProps {
  userLocation: {
    lat: number;
    lng: number;
  };
  onLoad: (passedMap: google.maps.Map) => void;
  places: google.maps.places.PlaceResult[] | null;
  mapRef: React.MutableRefObject<google.maps.Map | undefined>;
}

export const Map = ({ userLocation, onLoad, places, mapRef }: IMapProps) => {
  return (
    <div>
      <GoogleMap
        zoom={15}
        center={userLocation}
        mapContainerClassName="map-container"
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
                  key={place.name + uuidv4()}
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
    </div>
  );
};

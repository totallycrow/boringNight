// @ts-nocheck

import React from "react";

export const Map = () => {
  return <div>Map</div>;
};

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   GoogleMap,
//   Marker,
//   useJsApiLoader,
//   InfoWindow,
//   useLoadScript,
// } from "@react-google-maps/api";
// import "./Map.css";

// type LatLngLiteral = google.maps.LatLngLiteral;

// const sample: LatLngLiteral = { lat: 51.5819576, lng: -0.3730268 };

// const centers = [
//   {
//     lat: 37.772,
//     lng: -122.214,
//   },
//   {
//     lat: 37.672,
//     lng: -122.219,
//   },
//   {
//     lat: 37.832,
//     lng: -122.424,
//   },
// ];

// const options = {
//   disableDefaultUI: true,
//   clickableIcons: false,
// };

// // ****************** MAP COMPONENT *******************************************************
// export const Map = ({ center, isLoaded }: any) => {
//   const mapRef = useRef<GoogleMap>();
//   const [places, setPlaces] = useState([]);
//   const [map, setMap] = useState();

//   const onLoad = (map: any) => {
//     mapRef.current = map;
//     setMap(map);
//   };

//   const coords = {
//     lat: center[0],
//     lng: center[1],
//   };

//   useEffect(() => {
//     console.log("use effect");
//     console.log(coords);
//     console.log(map);

//     if (coords.lat === undefined || map === undefined) {
//       console.log("coords undefined");
//       return;
//     }
//     let service = new window.google.maps.places.PlacesService(map);
//     console.log(service);

//     const request = {
//       location: coords,
//       radius: "5500",
//       type: ["restaurant"],
//     };

//     service.nearbySearch(request, (res, s) => {
//       console.log(res);
//       setPlaces(res);
//       console.log("placces found:");
//       console.log(places);
//     });
//   }, [coords]);

//   //   const coords: LatLngLiteral = {
//   //     lat: center[0],
//   //     lng: center[1],
//   //   };

//   //   if (center.length === 0) return <div>loading</div>;

//   console.log("coords", coords);
//   if (coords.lat === undefined) return <GoogleMap></GoogleMap>;

//   return (
//     <GoogleMap
//       zoom={15}
//       center={coords}
//       mapContainerClassName="map-container"
//       options={options}
//       onLoad={onLoad}
//     >
//       <Marker
//         key={coords.lat}
//         position={coords}
//         onLoad={(marker) => {
//           console.log("loaded marker");
//           console.log(marker);
//         }}
//       ></Marker>
//       <Marker
//         icon={{
//           path: google.maps.SymbolPath.CIRCLE,
//           scale: 7,
//         }}
//         position={centers[0]}
//       />
//       <Marker
//         icon={
//           "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
//         }
//         position={centers[1]}
//       />
//       <Marker
//         icon={{
//           path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
//           fillColor: "yellow",
//           fillOpacity: 0.9,
//           scale: 2,
//           strokeColor: "gold",
//           strokeWeight: 2,
//         }}
//         position={centers[2]}
//       />
//     </GoogleMap>
//   );
// };

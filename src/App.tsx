import "./Map.css";
import { Map } from "./components/Map";
import { useMapController } from "./hooks/useMapController";

const poiTypes = "restaurant";
const radius = 1000;

export const App = () => {
  const { isLoaded, userLocation, onLoad, places, mapRef, isLocationOn } =
    useMapController(poiTypes, radius);

  if (!isLoaded) return <div>Loading...</div>;
  if (!isLocationOn) return <div>GeoLocation is disabled</div>;

  return (
    <div>
      <h1>App</h1>

      <Map
        userLocation={userLocation}
        onLoad={onLoad}
        places={places}
        mapRef={mapRef}
      />
      <button
        onClick={() => {
          if (places === null) return;
          // @ts-ignore
          // type never?
          mapRef.current?.panTo(places[5].geometry.location);
        }}
      >
        CHOOSE FOR ME
      </button>
    </div>
  );
};

import * as React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

const deepCompareEqualsForMaps = createCustomEqual(
  /* @ts-ignore */
  (deepEqual) => (a, b) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    /* @ts-ignore */
    return deepEqual(a, b);
  }
);

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
  latLngs: google.maps.LatLngLiteral[];
}
const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  latLngs,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          zoom: 12,
          center: latLngs[0],
        })
      );
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      const lat = Number(options.position?.lat) || 0;
      const lng = Number(options.position?.lng) || 0;
      setMarker(new google.maps.Marker(
        { position: { lat, lng }, 
        icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' 
      }));
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const LocationMap = ({
  googleApiKey,
  latLngs,
}: {
  googleApiKey: string;
  latLngs: google.maps.LatLngLiteral[];
}): JSX.Element => {
  return (
    <div className="w-full">
      <Wrapper apiKey={googleApiKey} render={render}>
       
        <Map
          center={{ lat: 51.48695, lng: -0.095091 }}
          zoom={12}
          style={{ flexGrow: '1', height: '100%' }}
          latLngs={latLngs}
        >
          {latLngs.map(latLng=>(
            <Marker position={latLng} />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};

export default LocationMap;

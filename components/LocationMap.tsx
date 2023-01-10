import * as React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { LocationMap, MapProps } from '../types';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};


const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  latLng,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          zoom: 12,
          center: latLng,
        })
      );
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946

  return (
    <>
      <div ref={ref} className="flex flex-grow-1 h-full" />
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

function infowindow(contentString: string, ariaLabel: string) {
  return new google.maps.InfoWindow({
    content: contentString,
    ariaLabel,
  });
}

const Marker = (options: any) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  debugger;
  React.useEffect(() => {
    if (!marker) {
      const lat = Number(options?.position?.lat) || 0;
      const lng = Number(options?.position?.lng) || 0;
      setMarker(
        new google.maps.Marker({
          position: { lat, lng },
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        })
      );
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
      marker.setOptions({ ...options, title: '', label: '' });
      marker.addListener('click', () => {
        infowindow(
          `<h1>${options.title}</h1><p>${options.label}</p>`,
          `${options.title}`
        ).open({
          anchor: marker,
        });
      });
    }
  }, [marker, options]);

  return null;
};

const LocationMap = (input: LocationMap): JSX.Element => {
  const { googleApiKey, data: searchResults } = input;
  return (
    <div className="w-full">
      <Wrapper apiKey={googleApiKey} render={render}>
        <Map
          center={{ lat: searchResults[3].lat, lng: searchResults[3].long }}
          zoom={14}
          latLng={{ lat: searchResults[0].lat, lng: searchResults[0].long }}
        >
          {searchResults.map((searchResult, idx) => (
            <Marker
              key={`marker-${idx}`}
              position={{ lat: searchResult.lat, lng: searchResult.long }}
              title={`<b>${searchResult.title}</b>`}
              label={`${searchResult.description} <br/>${searchResult.price}`}
            />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};

export default LocationMap;

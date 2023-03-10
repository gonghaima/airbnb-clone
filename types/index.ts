export interface IExplore {
  img: string;
  location: string;
  distance: string;
}

export interface ICard {
  img: string;
  title: string;
}
export interface ILiveAnywhere extends ICard {}

export interface IGreatestOutdoors extends ICard {
  description: string;
  buttonText: string;
}

export interface SearchResult {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
  long: number;
  lat: number;
}

export interface SearchComponent {
  searchResults: SearchResult[];
  googleApiKey: string;
}

export interface LocationMap {
  googleApiKey: string;
  data: SearchResult[];
}

export interface MapProps extends google.maps.MapOptions {
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
  latLng: google.maps.LatLngLiteral;
}
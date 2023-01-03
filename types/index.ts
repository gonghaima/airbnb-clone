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

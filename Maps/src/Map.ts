// Instructions to every other class on how they can be an argument to 'addMarker'
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class Map {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(divId) as HTMLElement,
      {
        center: { lat: 34.667685918050864, lng: 135.43027967345125 },
        zoom: 18,
        mapId: '6b475196092939b2',
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      }
    );
  }

  addMarker(mappable: Mappable) {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
      // icon: {
      //   url: 'yoshi_house.svg',
      //   scaledSize: new google.maps.Size(38, 31),
      // },
      // animation: google.maps.Animation.DROP
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });

      infoWindow.open({
        anchor: marker,
        map: this.googleMap,
        shouldFocus: false,
      });
    });
  }
}

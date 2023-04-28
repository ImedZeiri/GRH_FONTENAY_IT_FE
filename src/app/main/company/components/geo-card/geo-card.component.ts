import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import axios from 'axios';

@Component({
  selector: 'app-geo-card',
  templateUrl: './geo-card.component.html',
  styleUrls: ['./geo-card.component.css'],
})
export class GeoCardComponent implements OnInit {
  private _cityName: string;
  @Input()
  set CityName(cityName: string) {
    this._cityName = cityName;
    this.searchCityCoordinates();
  }
  get CityName(): string {
    return this._cityName;
  }
  lat: number = 51.5073359;
  lng: number = -0.12765;
  map: L.Map;

  ngOnInit() {
    this.map = L.map('map').setView([51.5073359, -0.12765], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  searchCityCoordinates() {
    const provider = new OpenStreetMapProvider();
    provider
      .search({ query: this.CityName })
      .then((result) => {
        this.lat = result[0].y;
        this.lng = result[0].x;
        console.log(this.lat);
        console.log(this.lng);
        const coords: L.LatLngExpression = [this.lat, this.lng];
        L.marker(coords)
          .addTo(this.map)
          .bindPopup('Loading...')
          .openPopup();
        this.map.setView(coords, 13);
        axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${this.lat}&lon=${this.lng}&format=jsonv2`)
          .then((response) => {
            const address = response.data.address;
            let city = address.city;
            if (!city) {
              city = address.town || address.village || address.hamlet || address.county || address.state;
            }
            L.marker(coords)
              .addTo(this.map)
              .bindPopup(city)
              .openPopup();
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }
}

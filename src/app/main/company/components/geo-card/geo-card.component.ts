import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-geo-card',
  templateUrl: './geo-card.component.html',
  styleUrls: ['./geo-card.component.css']
})
export class GeoCardComponent implements OnInit {
  public location: any = {
    x: 0,
    y: 0,
    label: '',
  };

  ngOnInit() {
    this.initMap();
  }

  public initMap(): void {
    const mapContainer = document.getElementById('contain-map');
    if (mapContainer) {
      mapContainer.innerHTML = `<div id='map' style='width: 100%; height: 100%;'></div>`;
      const map = L.map('map', {
        center: [this.location.y, this.location.x],
        zoom: 16,
      });
      L.control.scale().addTo(map);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      }).addTo(map);
      const provider = new OpenStreetMapProvider();
      let marker = L.marker([this.location.y, this.location.x])
        .addTo(map)
        .bindPopup(this.location.label)
        .openPopup();
      map.on('geosearch/showlocation', (e) => {
        if (marker) {
          map.removeLayer(marker);
        }
        marker = new L.Marker([e.location.y, e.location.x])
          .addTo(map)
          .bindPopup(e.location.label)
          .openPopup();
      });

      const cityName = 'Kairouan';
      this.getLocationByCityName(cityName).then((location: any) => {
        this.location = location;
        map.setView([location.y, location.x], 16);
        if (marker) {
          map.removeLayer(marker);
        }
        marker = L.marker([location.y, location.x])
          .addTo(map)
          .bindPopup(location.label)
          .openPopup();
      });
    }

  }
  public async getLocationByCityName(cityName: string): Promise<any> {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: cityName });
    const { x, y, label } = results[0];
    return { x, y, label };
  }
}

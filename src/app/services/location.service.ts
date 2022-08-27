import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  //Mevcut konum bilgilerini aldığımız promise yapısı.
  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
      resolve(
        {lng: resp.coords.longitude, lat: resp.coords.latitude});
    },
    err => {
      reject();
      }
    );
  });
}
}
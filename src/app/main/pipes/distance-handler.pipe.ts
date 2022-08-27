import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceHandler'
})
export class DistanceHandlerPipe implements PipeTransform {

  current_distance:any;
  // API sorgumuzdan gelen data içerisindeki koordinat verilerine ve mevcut lokasyon verilerine göre uzaklık hesabı yaparak veriyi geri döndüren Pipe .
  transform(value: any, lat:any , lng:any) {

    this.current_distance = this.getDistance(lat , lng , value[1], value[0])
    
    return this.current_distance;
  }
  //Koordinatlar arası uzaklık hesabı yapan fonksiyon.
  getDistance(latitude1:number, longitude1:number, latitude2:number, longitude2:number) {
    let theta = longitude1 - longitude2; 
    let distance :any = (Math.sin(this.deg2rad(latitude1)) * Math.sin(this.deg2rad(latitude2))) + (Math.cos(this.deg2rad(latitude1)) * Math.cos(this.deg2rad(latitude2)) * Math.cos(this.deg2rad(theta))); 
    distance = Math.acos(distance); 
    distance = this.rad2deg(distance); 
    distance = distance * 60 * 1.1515; 
    distance = distance * 1.609344; 
    distance < 1 ? distance = Math.round(distance * 1000) + ' m' : distance = (distance).toFixed(1) + ' km'
    return distance; 
  
  }
  // Degree to Radian & Radian to Degree Functions
  deg2rad(deg:number){
    return deg* Math.PI /180;
  }
  rad2deg(rad:number){
    return rad* 180 / Math.PI;
  }

}

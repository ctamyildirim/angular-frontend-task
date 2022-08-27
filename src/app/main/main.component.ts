import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  lat: any;
  lng: any;
  payload : any;  
  isLoading : any;
  restaurants : any = [];
  total_api_data_length : number = 660;
  counter : number = 1;
  searchText : any;

  constructor(private locationService : LocationService , private apiService : ApiService) {
    // Scroll Eventi ile Lazyload
    window.addEventListener('scroll' , ()=>{
      let screen_height = window.innerHeight;
      let scrollTop = document.documentElement.scrollTop;
      var body = document.body,
      html = document.documentElement;
  
      var body_heigth = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight );
      
      // Scroll sayfa dibinde olduğunda API fonksiyonunu çağırıyoruz.
      if(scrollTop + 1 > body_heigth - screen_height && this.counter * 30 <= this.total_api_data_length){ 
          this.payload.skip = this.counter *10;
          //Inputtan girilen veri olup olmamasına göre ilgili dataları ileterek API sorgusunu yapıyoruz.
          if(this.searchText === undefined){
            this.apiDataHandling(this.payload)
          }
          else{
            this.apiDataHandling(this.payload, this.searchText)
          }
          this.counter++
      }
    })     
  }
  ngOnInit(): void {
    //Sayfa ilk açıldığında lokasyon verilerini alıyoruz. Lokasyon engellendiyse default olarak latitude ve longitude tanımlıyoruz.
    this.locationService.getPosition().then(pos => { 
      this.lat = pos.lat;
      this.lng = pos.lng;  
      this.payload = {
        skip : 0,
        limit : 10,
        latitude : pos.lat,
        longitude : pos.lng,
      }
      this.apiDataHandling(this.payload)
    }).catch(err => {
      this.lat = 0;
      this.lng = 0;  
      this.payload = {
        skip : 0,
        limit : 10,
        latitude : 0,
        longitude : 0,
      }
      this.apiDataHandling(this.payload)
      throw err
    })
  }

  // Gelen Payload değerini ve Input verisini API sorgusu için apiService 'imiz içerisindeki postData fonksiyonumuza iletiyoruz.
  // Inputun boş olduğu durumlara istinaden yönetilir olması için default olarak veriye '' veriyoruz. 
  apiDataHandling = (payload:any , searchData:string = '') =>{
    this.isLoading = true;
    this.apiService.postData(payload , searchData).then(data => {
      this.restaurants = this.restaurants.concat(data.response);
    }).then(res => this.isLoading = false);
  }

  // Arama Inputundan bir veri girildiğinde sayfa verilerini resetleyerek gelen veri ile yeni API sorgusu yapıyoruz.
  searcherMethod(data:string){ 
    this.searchText = data
    this.payload.skip = 0;
    this.restaurants=[];
    this.apiDataHandling(this.payload, this.searchText)
  }
}

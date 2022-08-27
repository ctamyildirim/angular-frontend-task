import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  filtered_items:any =[];
  postData = async (payload:any , searchText:string) => {
    //1- API Fetch işlemimizi yapıyoruz.
      const response =  await fetch("https://smarty.kerzz.com:4004/api/mock/getFeed", {
          body: JSON.stringify(payload),
          headers: {
              Accept: "application/json",
              Apikey: "bW9jay04ODc3NTU2NjExMjEyNGZmZmZmZmJ2",
              "Content-Type": "application/json"
          },
          method: "POST"
          })
      const data = await response.json()
      //2- Inputtan verimiz geldiyse veriye göre filtreleme işlemi yapıyoruz. Gelmediyse doğrudan datayı return ediyoruz.
      if( searchText ===''){
      return data
      } 
      else{
        this.filtered_items= [];
        data.response.map((item:any) => {
          if(item.title.toLowerCase().includes(searchText.toLowerCase()) == true){  //Filtre
            this.filtered_items.push(item)
          }
        })
        let obj = {
          response : this.filtered_items
        }
        return obj
      }
      
    }
  constructor() { }
}

import { Component, EventEmitter, ElementRef, Output } from '@angular/core';


@Component({
  selector: 'app-searchinput',
  templateUrl: './searchinput.component.html',
  styleUrls: ['./searchinput.component.scss']
})
export class SearchinputComponent {
  timer:any
  searchInput:any;
  searchText:any;
  @Output() searcher = new EventEmitter<any>();

  // windows scroll çalıştırılacak, postdataya search input değeri yollanacak. Şayet bu değer undefined gitmiyorsa api içerisinde veri döndürülmeden 
  //önce filtreleme yapacak ve sonra döndürecek. 

    constructor(private elementRef:ElementRef ) {}

    ngAfterViewInit() {
      this.searchInput = this.elementRef.nativeElement.querySelector('.search_input')
      this.searchInput.addEventListener('keyup', ()=>{
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.searchText = this.searchInput.value;  
          this.searcher.emit(this.searchText)
        },1000)
      });
                                    
    }
    
}  

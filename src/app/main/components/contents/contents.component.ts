import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent {

  // Hazır handle edilmiş verilerimiz.
  @Input() lat:any;
  @Input() lng:any;
  @Input() restaurants:any;

  constructor( ) {
  }
  
}

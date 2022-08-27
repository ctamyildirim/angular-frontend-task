import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SearchinputComponent } from './components/searchinput/searchinput.component';
import { ContentsComponent } from './components/contents/contents.component';
import { RateOrganiserPipe } from './pipes/rate-organiser.pipe';
import { DistanceHandlerPipe } from './pipes/distance-handler.pipe';



@NgModule({
  declarations: [
    MainComponent,
    SearchinputComponent,
    ContentsComponent,
    RateOrganiserPipe,
    DistanceHandlerPipe,
  ],
  exports : [
    MainComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }

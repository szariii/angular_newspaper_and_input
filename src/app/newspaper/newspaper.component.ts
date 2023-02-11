import { Component, EventEmitter, Output } from '@angular/core';
import { NewspaperDataService } from '../newspaper-data.service';

@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrls: ['./newspaper.component.css'],
})
export class NewspaperComponent {
  public arrayWithNameOfPhotos: Array<NewspaperInfo> = [];
  @Output() public selectedNewspaper = new EventEmitter();
  @Output() public changeView = new EventEmitter();

  constructor(private ser: NewspaperDataService) {
    this.arrayWithNameOfPhotos = ser.arrayWithInfoOfNewspaper;
  }

  clickFotoHandler(name: string) {
    this.selectedNewspaper.emit(name);
    this.changeView.emit('years');
  }
}

interface NewspaperInfo {
  name: string;
  img: string;
}

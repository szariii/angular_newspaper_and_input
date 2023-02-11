import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NewspaperDataService } from '../newspaper-data.service';

@Component({
  selector: 'app-newspapers-years',
  templateUrl: './newspapers-years.component.html',
  styleUrls: ['./newspapers-years.component.css'],
  providers: [],
})
export class NewspapersYearsComponent {
  @Output() public changeView = new EventEmitter();
  @Input('newspaperName') public newspaperName: string = '';
  arrayWithYears: Array<string> = [];
  arrayWithNewspapers: Array<NewspaperFullInfo> = [];
  selectedYearFlag = false;
  selectedYear: string = '';
  service;

  constructor(private ser: NewspaperDataService) {
    this.service = ser;
  }

  async ngOnInit() {
    this.arrayWithYears = await this.service.getYearsOfNewspapers(
      this.newspaperName
    );
  }

  clickYearHandler = async (year: string) => {
    this.selectedYear = year;
    this.selectedYearFlag = true;
    this.arrayWithNewspapers = await this.service.getNewspapersInSelectedYear(
      this.newspaperName,
      year
    );
  };

  goBack = () => {
    this.newspaperName = '';
    this.changeView.emit('newspaper');
  };
}

interface NewspaperFullInfo {
  nazwa: string;
  numer: string;
  wydawca: string;
  format: string;
  stron: string;
  miniaturka: string;
  plik: string;
  skan: string;
  przetworzenie: string;
  podeslal: string;
}

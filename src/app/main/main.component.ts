import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  public date = new Date();
  public earnings = '';
  public showingPage = 'input';
  //input
  //newspaper
  //years

  public selectedNewspaper = '';

  ngOnInit() {
    setInterval(() => {
      this.changeDate();
    }, 1000);
  }

  changeInput(e: Event) {
    let input = e.target as HTMLInputElement;
    let eventValue = input.value;
    const regexp = /^\d+(?:\.\d*)?$/g;
    // ^\d+(?:\.\d{0,2})?$
    // [0-9]+{\.}?[0-9]*

    if (eventValue === '666.666') {
      this.showingPage = 'newspaper';
    }

    if (eventValue.match(regexp)) {
      this.earnings = eventValue;
    } else {
      const checkIfDigit = /[0-9]/g;
      let newValue = '';
      let inputedDot = false;
      for (let i = 0; i < eventValue.length; i++) {
        if (eventValue[i].match(checkIfDigit)) {
          newValue += eventValue[i];
        } else {
          if (eventValue[i] === '.' && inputedDot === false) {
            newValue += eventValue[i];
            inputedDot = true;
          }
        }
      }
      this.earnings = newValue;
      input.value = newValue;
    }
  }

  changeDate() {
    this.date = new Date();
  }
}

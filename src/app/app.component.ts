import { Component } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-testing-service';

  ngOnInit(): void {
    const calculator = new Calculator();
    const multi = calculator.multiply(2, 15);
    const divi = calculator.divide(60, 0);
  }
}

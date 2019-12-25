//our root app component
import { Component, NgModule, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

@Component({
  selector: 'my-app',
  template: `
        <h3>
            Change detection is triggered at:
            <span [textContent]="time | date:'hh:mm:ss:SSS'"></span>
        </h3>
        <button (click)="0">Trigger Change Detection</button>
    `
})
export class HomeComponent {
  _time;
  get time() {
    return this._time;
  }

  constructor(zone: NgZone) {
    this._time = Date.now();

    zone.runOutsideAngular(() => {
      setInterval(() => {
        this._time = Date.now()
      }, 1);
    });
  }

}

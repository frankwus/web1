import { Component, NgModule, VERSION, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    items: any[] = [{
        text: 'Item1',
        items: [{ text: 'Item1.1' }, { text: 'Item1.2', items: [{ text: 'Item1.2.1' }, { text: 'Item1.2.2' }] }]
    }, {
        text: 'Item2',
        items: [{ text: 'Item2.1' }, { text: 'Item2.2' }, { text: 'Item2.3' }]
    }, {
        text: 'Item3'
    }];

}
@Component({
  selector: 'parent-component',
  template: `
  <button (click)="changeCountClick()">Change Count</button>
  <child-component (onCountChange)="onCountChange($event)" [count]="recordCount"></child-component>
  {{recordCount}}
  <br/>
  <br/>
  <div *ngFor="let chg of eventCalled">{{chg}}</div>
  `
})
export class Parent1Component {
  recordCount: number;
  eventCalled: string[] = [];
  constructor() { }

  ngOnInit() {
    this.recordCount = 5;
  }

  changeCountClick() {
    this.resetCount();
    this.recordCount = 5; /*Not Working*/
     	this.recordCount = 2; /*Working*/
  }

  resetCount() {
    this.recordCount = 0;
  }

  onCountChange() {
    this.eventCalled.push('called');
  }
}

@Component({
  selector: 'child-component',
  template: ''
})
export class Child1Component implements OnInit, OnChanges {
  @Input('count') public count: number;

  @Output() public onCountChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (changes.count.currentValue !== changes.count.previousValue) {
      this.onCountChange.emit(changes.count);
    }
  }
}

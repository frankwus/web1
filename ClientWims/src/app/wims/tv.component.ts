import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  template: '<tree-root  (dblclick)="onEvent($event)" [nodes]="nodes" [options]="options"></tree-root>'
})
export class TvComponent implements OnInit {
  nodes = [
    {
      id: 1,
      name: 'root1',
      type: 'test', 
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];
  options = {};
  constructor() { }

  ngOnInit() {
  }
  onEvent( event ) {
    console.log(event)
  }
}

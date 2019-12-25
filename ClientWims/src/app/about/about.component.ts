import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
@Component({
  selector: 'app-root',
  template: `
    <div *ngFor="let item of [1,2]">
      <app-card *appDelay="500 * item">
     <p>   {{item}} test2</p> 
      </app-card>
    </div>
  <button class="mat-raised-button mat-primary"(click)="onSave()">Save</button>
  `
})
export class AboutComponent {
  data;
  constructor(
    private dialogRef: MatDialogRef<AboutComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }
  onSave() {
    this.dialogRef.close('junk ' +this.data) 
  }
}

@Component({
  selector: 'app-card',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      padding: 2rem;
      font-size: 2rem;
      font-family: 'Helvetica', sans-serif;
      font-weight: 300;
      background: #e3f2fd;
      margin: 1rem;
      display: inline-block;
    }
  `]
})
export class CardComponent {
  ngOnInit() {
    console.log('card component loaded!');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'parent',
  templateUrl: './parent.component.html',
})
export class parentComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: 'Person\'s name',
      address: this.formBuilder.group({
        line1: 'Address line 1',
        line2: 'Address line 2',
      })
    });
  }
}

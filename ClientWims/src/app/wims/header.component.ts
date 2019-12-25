import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Guid } from "guid-typescript";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutComponent } from "../about/about.component";
import { Form, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ControlContainer, FormGroupDirective, NgModel }
  from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { JobStepComponent } from './jobStep.component';
import { Subscription, Observable } from 'rxjs';
import { wiToolsComponent } from './wiTools.component';
import { Location } from '@angular/common'
import { BirthYearValidatorDirective } from './birth.directive';
import { CreditCardValidator } from './credit.component';
@Component({
  selector: 'header1',
  templateUrl: './header.component.html'
  , changeDetection: ChangeDetectionStrategy.OnPush,
  // viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class headerComponent implements OnInit {
  headerFormGroup
  id: string
  equipmentMakes: [any] = [{ id: 0, name: '' }]
  equipmentTypes: [any] = [{ id: 0, name: '' }]
  
  subscription: Subscription = new Subscription();
  apiUrl: string = 'http://localhost/WebApi1/api//values/'

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef, private dialog: MatDialog, private location: Location
    , private route: ActivatedRoute, private router: Router, private http: HttpClient, private parentF: FormGroupDirective
    , private controlContainer: ControlContainer) {

  }

  getData() {
    this.subscription.add(this.http.get<any>(this.apiUrl + 'equipment', { withCredentials: true }).subscribe(data => {
      this.equipmentTypes = data
      this.ref.detectChanges()
      this.onChange()
    }, err => alert(err.message), () => console.log('done')));
  }
  onChange() {
    console.log('on change')
    let id1 = this.headerFormGroup.controls.equipmentType.value
    this.equipmentMakes.length = 1
    if (id1 == 0)
      return
    this.subscription.add(this.http.get<any>(this.apiUrl + 'equipment/' + id1).subscribe(data => {
      console.log(data)
      this.equipmentMakes = data
      this.ref.detectChanges()
    }, err => alert(err.message)));
  }
  ngOnInit() {
    this.headerFormGroup = <FormGroup>this.controlContainer.control;
    this.getData()
  }
}

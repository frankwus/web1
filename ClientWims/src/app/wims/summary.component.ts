import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutComponent } from "../about/about.component";
import { Form, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { JobStepComponent } from './jobStep.component';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'summary',
  templateUrl: './summary.component.html'
   , changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WimsComponent implements OnInit {
  form;
  showImage=false 
  imgUrl = 'http://localhost/webApi1/images'
  id:string  
  subscription: Subscription = new Subscription();
  apiUrl: string ='http://localhost/WebApi1/api//values/'
  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef, private dialog: MatDialog
    , private route: ActivatedRoute, private router: Router, private http: HttpClient ) {

      this.getData()
  }
  getData() {
    this.subscription.add(this.http.get<any>(this.apiUrl+ this.id, { withCredentials: true })
      .subscribe(data => {        

      }, err => alert(err.message), () => console.log('done')));
  }
  ngAfterViewInit() {

  }
  ngOnInit() {

  }
}
class header {
  id: number=0
  jobTitle: string = 'defulat '
  facility: string = ''
  equipmentType: number =0
  equipmentMake: number =0
  generalPrecaution: string = ''
  localPrecaution: string = ''
  wiNo: string = ''
  status: string = ''
}
export class jobStep {
  id: number = 0
  wiid: number =0
  description: string = ''
  warning: string = '';
  Caution: string = ''
  note: string  = ''
  photo: string = ''
  Barrier: boolean = false
}

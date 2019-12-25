import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Guid } from "guid-typescript";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutComponent } from "../about/about.component";
import { Form, FormBuilder, FormGroup, FormControl, FormArray, Validators, ControlContainer  } from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { JobStepComponent } from './jobStep.component';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { wiToolsComponent } from './wiTools.component';
import { Location } from '@angular/common'
import { BirthYearValidatorDirective } from './birth.directive';
import { CreditCardValidator } from './credit.component';
import { AddressEditorComponent } from '../home/child.component';
@Component({
  selector: 'jobStepControl',
  templateUrl: './jobStepControl.component.html'
   , changeDetection: ChangeDetectionStrategy.OnPush,
})
export class jobStepControlComponent implements OnInit, OnChanges {
  form;
  isDone=false 
  formArray1:FormArray 
  formData = new FormData();
  showImage=false 
  imgUrl = 'http://localhost/webApi1/images'
  id:string  
  equipmentMakes: [any] = [{ id: 0, name: '' }]
  equipmentTypes = [{ id: 0, name: '' },
  {
    id: 1, name: "Chevrolet"
  }
  ];
  //@ViewChild('imgTemplate', { static: false }) imgTemplate: ElementRef;
  //@ViewChild('imgTemplate') imgTemplate; 
  subscription: Subscription = new Subscription();
  apiUrl: string = 'http://localhost/WebApi1/api//values/'
  getForm() {
    return this.form
  }
  @Input () count
  @Input() users;
  @Input() jobSteps;
  jobSteps1: FormArray

  private _data = new BehaviorSubject(this.count );
  @Input()
  set data(value) {
    console.log('set data')
    this._data.next(value);
  };
  get data() {
    return this._data.getValue();
  }

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef, private dialog: MatDialog, private location: Location
    , private route: ActivatedRoute, private router: Router, private http: HttpClient, private controlContainer: ControlContainer) {

    return 
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)]  ) ], 
      header: this.fb.group(new header()),
      address: this.fb.group({
        line1: 'Address line 1',
        line2: 'Address line 2',
      }), 
      jobSteps: this.fb.array([]), 
      wiTools: this.fb.array([])
    });
    this.id = this.route.snapshot.paramMap.get('id')

    if (this.id !='0')
      this.getData()

  }
  ngOnChanges(changes) {
    console.log('ngOnChanges ')
    this.form = <FormGroup>this.controlContainer.control;
    console.log(this.form )
   // this.ref.detectChanges()
  }
   emailDomainValidator(control: FormControl) {

     return {
       emailDomain: {
         parsedDomain: 'test'
       }
     }
  return null;
  }
  ngDoCheck() {
   console.log('checking')

   // if (this.id !== this.o.id) {
   //   this.ref.markForCheck();
   // }
  }
  getData() {
    return 
    this.subscription.add(this.http.get<any>(this.apiUrl + 'equipment',  { withCredentials: true } ).subscribe(data => {
      this.equipmentTypes = data
      this.ref.detectChanges()
      this.onChange()
      }, err => alert(err.message), () => console.log('done')));
    //return 
    this.subscription.add(this.http.get<any>(this.apiUrl+ this.id ).subscribe(data => {        
      this.form.get('header').setValue(data.header)
      this.pushJobStep(data.jobSteps)
      let id1 = this.form.get('header').value.equipmentType
      this.ref.detectChanges()
      this.onChange()
      //this.form.disable();
      //$('form').find('*').prop('disabled', true)
      //$('#Save').prop('disabled', false)
      
      }, err => alert(err.message), () => console.log('done')));
  }
  onChange() {
    return 
    let id1 = this.form.get('header').value.equipmentType
    this.equipmentMakes.length = 1
    if (id1 == 0)
      return
    this.subscription.add(this.http.get<any>(this.apiUrl + 'equipment/'+id1 ).subscribe(data => {
        console.log(data)
      this.equipmentMakes = data
        this.ref.detectChanges()
      }, err => alert(err.message)));
  }
  ngAfterViewInit() {
    this.onChange();
  }

  ngOnInit() {

    console.log('ngOnInit ' )
    this.form = <FormGroup>this.controlContainer.control;
    this.formArray1 = this.form.get('jobSteps')
    this.isDone = true 

    this.ref.detectChanges()
    this._data
      // add this line
      // listen to data as long as groupPosts is undefined or null
      // Unsubscribe once groupPosts has value
      // .takeWhile(() => !this.groupPosts)
      .subscribe(x => {
       // this.count = this.count + 1
      });
   // return 
    return 
    this.pushJobStep([new jobStep() ])
  }
  pushJobStep(arr: jobStep[]) {
    let jsArr = this.jobStepFormArray
    jsArr.clear()
    let fb = this.fb
    arr.forEach(function (value) {
      jsArr.push(fb.group(value )  )
    }); 
  }
  get jobStepFormArray(): FormArray {
    return this.form.get('jobSteps') as FormArray
  }
  get wiTools(): FormArray {
    return this.form.get('wiTools') as FormArray
  }
  openDialog(comp, data, action, index) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data; //this.form.get('header').value.facility; 
    const dialogRef = this.dialog.open(comp, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data1 => {
        if (data1 == null)
          return 
        if (action == 'add') {
          this.jobStepFormArray.insert(index, this.fb.group(data1))
        } else
          this.jobStepFormArray.controls[index].setValue(data1)
        this.ref.detectChanges()
      }
    );
  }
  startTimer() {
    setInterval(() => {
      console.log('timeing')
      let h = new header()
      h.jobTitle='done '
      this.form.get('header').setValue(h )
      this.ref.detectChanges()
    }, 1000)
  }
  onAdd() {
    let js = this.fb.group(new jobStep())
    this.jobStepFormArray.push(js)
    //this.ref.detectChanges()
  }
  onAction(js, action, index) {
    if (action == 'delete') {
      this.jobStepFormArray.removeAt(index)
      return
    }
    if (action == 'add')
      js = new jobStep()
    this.openDialog(JobStepComponent, js, action, index)

  }
  onFacility() {
    //this.openDialog()
  }
  uploadFiles(file, index) {
    console.log('file', file)
    if (file == null)
      return
    this.jobStepFormArray.controls[index].value.photo = file[0].name
  }
  onFileChange(event, index ) {
    if (event.target.files.length > 0) {
      this.formData = new FormData()
      let file = event.target.files[0];
      let guid = Guid.create().toString() + file.name.split('.').pop().toLowerCase()
      this.formData.append(guid , file ) ;
      this.subscription.add(this.http.post<any>(this.apiUrl+'file', this.formData, { withCredentials: true })
        .subscribe(data => {
          console.log(data)
          this.jobStepFormArray.controls[index].value.photo = data
          this.ref.detectChanges()
        }, err => alert(err.message), () => console.log('')));

    //  this.form.get('test').setValue(file);
    }
  }
  onSave() {
    this.subscription.add(this.http.post<any>(this.apiUrl, this.form.value, { withCredentials: true })
      .subscribe(data => {
        this.id = data
        this.getData()
        this.location.replaceState('wi/'+this.id);
      }, err => alert(err.message), () => console.log('')));
  }
  onSubmit() {

  }
  onImgClick(event) {
    console.log('event')
    console.log(event)
    let src = event.srcElement.src
    this.showImage = true
    //src=this.imgUrl + '/warning.png'
//    this.imgTemplate.nativeElement.src = src 
  }
  onWiTools(event) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.wiTools.value
    const dialogRef = this.dialog.open(wiToolsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data1 => {
        this.pushArr( 'wiTools', data1 ) 
        this.ref.detectChanges()
      }
    );
  }
  pushArr( type:string ,  arr: []) {
    let jsArr = this.jobStepFormArray
    if (type == 'wiTools')
      jsArr=this.wiTools
    jsArr.clear()
    let fb = this.fb
    arr.forEach(function (value) {
      jsArr.push(fb.group(value))
    });
  }
  drop(event: CdkDragDrop<jobStep[]>) {
    let previousIndex = event.previousIndex
    let currentIndex = event.currentIndex
    moveItemInArray(this.jobStepFormArray.value, previousIndex, currentIndex);
    this.form.value.jobSteps[currentIndex].Caution = 'Caution' + currentIndex
    this.form.value.jobSteps[previousIndex].Caution = 'Caution' + previousIndex
    this.pushJobStep( this.form.value.jobSteps )
    this.ref.detectChanges()
  }
  onSelectPhoto(event) {
    $(event).next().trigger('click')
  }
}
export class jobStep {
    id: number = 10
    Wiid: number = 0
    Description: string = 'test1'
    Warning: string = '';
    Caution: string = ''
    Note: string = ''
    Photo: string = ''
    Barrier: boolean = false
}
class header {
    id: number = 0
    jobTitle: string = 'defulat '
    facility: string = ''
    equipmentType: number = 0
    equipmentMake: number = 0
    generalPrecaution: string = ''
    localPrecaution: string = ''
    wiNo: string = ''
    status: string = ''
}

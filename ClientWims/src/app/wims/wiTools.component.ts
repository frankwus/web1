import { Component, Inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { HttpClient } from '@angular/common/http';
import { jobStep } from "./wims.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Subscription, Observable } from 'rxjs';
import { CKEditorComponent } from 'ckeditor4-angular';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'wiTools',
  templateUrl: './wiTools.component.html'
  , changeDetection: ChangeDetectionStrategy.OnPush,
})
export class wiToolsComponent implements OnInit {
  form;
  data;
  editors = []
  results = []
  items = [];
  pageOfItems: Array<any>;

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
  ];
  drop(event: CdkDragDrop<keyValue[]>) {
    moveItemInArray(this.pageOfItems, event.previousIndex, event.currentIndex);
  }
  drop1(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  //@ViewChild('text'), { static: false }) text: ElementRef;
  @ViewChild('text', { static: false }) text: ElementRef;
  @ViewChild('f', { static: false }) f: ElementRef;
  subscription: Subscription = new Subscription();
  apiUrl: string = 'http://localhost/WebApi1/api/values/'
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<wiToolsComponent>, private ref: ChangeDetectorRef
    , private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data, private renderer: Renderer2, private http: HttpClient, private router: Router ) {
    this.data = data;
    this.form = this.fb.group(
      data
    );
  }
  ngOnInit() {
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  ngAfterViewInit() {
    this.onSearch()
  }
  onSearch() {
    let text = this.text.nativeElement.value
    if (text == '')
      text='t'
    this.subscription.add(this.http.get<any>(this.apiUrl +"search\\"+ text).subscribe(data => {
      this.results=data 
      this.ref.detectChanges()
    }, err => alert(err.message)));
  }
  onSubmit() {
    this.dialogRef.close(this.data) 
  }
  onToggle(flag, id, name, event ) {
    console.log(id + name)
    if (flag == 1) {
      this.data.push({ id: id, name: name })
      event.srcElement.parentElement.hidden = true
    } else {
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i] .id=== id) {
          this.data.splice(i, 1);
          i--;
        }
      }
    }

  }
  //drop(event: CdkDragDrop<string[]>) {
  //  if (event.previousContainer === event.container) {
  //    moveItemInArray(event.container.data,
  //      event.previousIndex, event.currentIndex);
  //  } else {
  //    transferArrayItem(event.previousContainer.data,
  //      event.container.data,
  //      event.previousIndex,
  //      event.currentIndex);
  //  }
  //}
}
class keyValue{
  id
  name
}

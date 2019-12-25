import { Component, Inject, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms'; 
import { MatDialog, MatDialogConfig } from "@angular/material";
import { jobStep } from "./wims.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CKEditorComponent } from 'ckeditor4-angular';
@Component({
  selector: 'jobStep',
  templateUrl: './jobStep.component.html'
  , changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobStepComponent implements OnInit {
  form;
  data;
    editors = []
  //@ViewChild('f') f;
  @ViewChild('f', { static: false }) f: ElementRef;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<JobStepComponent>
    , private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data, private renderer: Renderer2) {
    this.data = data;
    this.form = this.fb.group(
      data
    );
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    let inputs = this.f.nativeElement.querySelectorAll('input[formControlName]');
    for (let i = 0; i < inputs.length; i++) {
      let name = inputs[i].getAttribute('formControlName')
      //ClassicEditor
      //.create(t )
      //.then(editor => {
      //  myEditors.push(editor ) 
      //})
      //.catch(error => {
      //  console.error(error);
      //});
    }
    let myEditors = this.editors
  }
  onSubmit() {
    //for (let editor of this.editors) {
    //  let name = editor.sourceElement.id
    //  this.form.value[name]=editor.getData()
    //}

    this.dialogRef.close(this.form.value ) 
  }
}


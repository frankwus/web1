import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  // Ensure we either have a [formGroup] or [formGroupName] with our address-editor tag
  selector: 'header2',
  templateUrl: './child.component.html'
})
export class AddressEditorComponent implements OnInit {
  public addressFormGroup: FormGroup;
  @Input() users;
  // Let Angular inject the control container
  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {
    // Set our addressFormGroup property to the parent control
    // (i.e. FormGroup) that was passed to us, so that our
    // view can data bind to it
    this.addressFormGroup = <FormGroup>this.controlContainer.control;
    console.log(this.users )
  }
}

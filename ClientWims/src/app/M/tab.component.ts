import { Observable } from 'rxjs';
import { Component, OnInit, Inject, Renderer2} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Product } from './product';
import { map } from 'rxjs/operators';
import { EditService } from './edit.service';
import { MatDialog, MatDialogConfig } from "@angular/material";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'myTab',
    templateUrl: './winvoice.component.html'
  //  , changeDetection: ChangeDetectionStrategy.OnPush,
})
export class tabiComponent implements OnInit {
    public gridData: any
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    constructor(@Inject(EditService) editServiceFactory: any, private dialogRef: MatDialogRef<tabiComponent>
        , private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data, private renderer: Renderer2) {
    }
    editHandler({ sender, rowIndex, dataItem }) {

        sender.editRow(rowIndex);
    }

    public ngOnInit(): void {
    }

    onClose() {
        this.dialogRef.close('test' ) 
    }
}

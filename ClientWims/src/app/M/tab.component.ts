
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gridComponent } from './grid.component';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'myTab',
    templateUrl: './tab.component.html'
  //  , changeDetection: ChangeDetectionStrategy.OnPush,
})
export class tabComponent implements AfterViewInit {
    apiUrl: string = config.apiUrl+'/home/'
    @ViewChild(gridComponent, { static: false }) gridComp: gridComponent;
    subscription: Subscription = new Subscription();
    tabs: string[] = ['test 1', 'test2']
    activeIndex: number = 0

    constructor(private http: HttpClient) {

    }
    editHandler({ sender, rowIndex, dataItem }) {

        sender.editRow(rowIndex);
    }

    public ngAfterViewInit(): void {
        this.get('GetTransaction?id=0&buId=1110&pageSize=2', null, function (data) {
            console.log('initgrid', data)
            this.gridComp.gridData = data
            this.gridComp.ref.detectChanges()
        }.bind(this))
    }
    getData(url, fn) {
        this.subscription.add(this.http.get<any>(this.apiUrl + url, { withCredentials: true })
            .subscribe(data => fn(data), err => alert(err.message), () => console.log('done')));
    }
    onTab(i) {
        this.activeIndex=i 
        return false 
    }
    get(url, name, fn = null) {
        this.getData(url, function (data) {
            if (data == null)
                return
            var p = data[0]
            var arr = []
            for (var key in p) {
                if (p.hasOwnProperty(key)) {
                    arr.push(key)
                }
            }
            if (arr.length == 2 && arr[0] == 'id' && arr[1] == 'name')
                data.unshift({ id: 0, name: '--Select--' })
            if (name != null) {
                let s = 'this.' + name + '=data '
                eval(s)
                this.ref.detectChanges()
            }
            if (fn != null)
                fn(data)
        }.bind(this)
        )
    }
}

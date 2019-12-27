import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { ExportService } from './excelService'
import * as ts from "typescript";
import { gridComponent } from './grid.component';
import { tap } from 'rxjs/operators';
import * as $ from 'jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Guid } from "guid-typescript";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutComponent } from "../about/about.component";
import { Form, FormsModule , FormBuilder, FormGroup, FormControl, FormArray, Validators  } from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Subscription, Observable } from 'rxjs';

import { Location } from '@angular/common'

import {
    toDataSourceRequestString,
    translateDataSourceResultGroups,
    translateAggregateResults,
    DataResult,
    process, State, 
    DataSourceRequestState
} from '@progress/kendo-data-query';
import { GridDataResult, GridModule, ExcelModule , DataStateChangeEvent } from '@progress/kendo-angular-grid';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { setTime } from '@progress/kendo-angular-dateinputs/dist/es2015/util';
@Component({
    selector: 'invoice',
    templateUrl: './invoice.component.html'
    , changeDetection: ChangeDetectionStrategy.OnPush,
})
export class invoiceComponent implements AfterViewInit {
    form;
    myForm
    isDateDone = false
    formData = new FormData();
    showImage = false
    imgUrl = 'http://localhost/emoc/images'
    id:string 
    clients: [any] = [{ ID: 0, CompanyName: '' }]
    bus: [any] = [{ Id: 0, BusinessUnitName: '' }]
    accounts
    //@ViewChild('imgTemplate', { static: false }) imgTemplate: ElementRef;
    @ViewChild(gridComponent, { static: false }) gridComp: gridComponent;
    @ViewChild('save', { static: false }) htmlSave: ElementRef; 

    subscription: Subscription = new Subscription();
    apiUrl: string = 'http://localhost/webApi1/api//home/'
    getForm() {
        return this.form
    }
    userForm: FormGroup;

    public columns: any[] //= [{ field: "ProductID" }, { field: "ProductName" }, { field: "QuantityPerUnit" }];
    public bindingType: String = 'array';
    public view: Observable<GridDataResult>;
    
    public gridDataResult: GridDataResult // = { data: [], total: 1 };

    editedPPeOriginalState: GenericResource;
    public gridData: any
    
    editedRowIndex: number;
   // editedPPeOriginalState: GenericResource;
    loading: boolean;
    pageSize = 2;
    skip = 0;
    state: State = {
        skip: this.skip,
        take: this.pageSize
    };
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    constructor(private fb: FormBuilder, private ref: ChangeDetectorRef, private dialog: MatDialog, private location: Location, private exportService: ExportService
        , private route: ActivatedRoute, private router: Router, private http: HttpClient) {
        var url = window.location.href //  this.route.snapshot.paramMap.get('id')

        this.id = this.getParameterByName('id')
        console.log(this.id)
        //return 
        //if (this.id == null)
        //    this.id='0'
        this.form = this.fb.group({
            header: this.fb.group(new header()),
            wiTools: this.fb.array([])
           // , test: new FormControl('fds' ) //, [Validators.required, Validators.minLength(5)])
        });
this.addValidator()
        if (this.id != '0')
            this.get('get/' + this.id, null, function (data) {
                console.log(data)
                this.form.get('header').setValue(data[0])
                this.init()
            }.bind(this)
            )
        else
            this.init()
        this.get('client', 'clients')
        //this.get('GetTransaction?id=0&buId=1110&pageSize=' + this.pageSize, 'gridData')
        return
       // this.openDialog(winvoiceComponent, null, null, null)
    }
    ngAfterViewInit() {
        this.initGrid()
    }
    initGrid() {
        this.get('GetTransaction?id=0&buId=1110&pageSize=' + this.pageSize, null, function (data) {
            console.log('initgrid', data)
            this.gridComp.gridData = data
            this.gridComp.ref.detectChanges()
        }.bind(this) )

    }
    addValidator() {
        var arr=['name', 'iAccount']
        for (var i in arr) {
            var name = arr[i]
            this.form.get('header').removeControl(name )
            const validators = [Validators.required ]//, Validators.minLength(5)];
            this.form.get('header').addControl(name, new FormControl('', validators));
        }
    }
    getParameterByName(name) {
        name = name.toLowerCase()
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search.toLowerCase());
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    init() {
        let clientId = this.form.get('header').value.clientId
        console.log(clientId )
        let buId = this.form.get('header').value.buId
        if (clientId != 0) {
            this.get('bu/0?clientId=' + clientId, 'bus') 
        }
        if (buId != 0) {
            this.get('account/0?buId=' + buId, 'accounts')
        }
    }
    get(url, name, fn=null) {
        this.getData(url, function (data) {
            if (data == null )
                return 
            var p = data[0]
            var arr=[]
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
                fn(data )
        }.bind(this)
        )
    }
    openDialog(comp, data, action, index) {
        const dialogConfig = new MatDialogConfig();        
        dialogConfig.autoFocus = true;
        dialogConfig.data = data; 
        const dialogRef = this.dialog.open(comp, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data1 => {
                if (data1 == null)
                    return
                alert(data1)
                this.ref.detectChanges()
            }
        );
    }
    onRefresh() {
        this.subscription.add(this.http.get<any>(this.apiUrl + 'equipment', { withCredentials: true }).subscribe(data => {
            this.clients = data
        }, err => alert(err.message), () => console.log('done')));

    }
    getData(url, fn ) {
        this.subscription.add(this.http.get<any>(this.apiUrl + url, { withCredentials: true })
            .subscribe(data => fn( data), err => alert(err.message), () => console.log('done')));       
    }
    refreshGridDataLocally(state) {
        const queryStr = `${toDataSourceRequestString(state)}`; 
        this.getData('GetTransaction?id=0&buId=1110&'+queryStr , function (data) {
            console.log('queryStr:' + queryStr )
            let arr = []
            let p = data[0]
            for (var key in p) {
                if (p.hasOwnProperty(key)) {
                    arr.push({ field: key })
                }
            }
            this.gridData = process(data, this.state);
            console.log(this.gridData  )
            this.ref.detectChanges()

        }.bind(this)
        )
    }

    dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.fetch(state).subscribe(r => { console.log(r); this.gridData = r; this.ref.detectChanges() } );return 
        return 
        this.refreshGridDataLocally(state );
    }
    getId(id): HTMLElement {
        let src: HTMLElement = document.getElementById(id) as HTMLElement
        return src 
    }
    onChange(e) {
        var name = e.srcElement.getAttribute('formcontrolname')
        var id = e.target.value
        var url = 'account/0?buId='
        if (name == 'clientId') {
            this.accounts = null
            this.bus = null            
            this.form.value.header.iAccount = null
            this.form.controls.header.controls.iAccount.value = null
            this.form.controls.header.controls.iAccount.status = 'invalid'
            this.form.controls.header.controls.iAccount.setErrors({ 'incorrect': true });
            this.form.markAllAsTouched()
            console.log('is valid '+ this.form.invalid)
            var src = this.getId('account')
            src.click()
            url = 'bu/0?clientId='
        } else
            this.accounts=null 
        url += id
        if (id != 0)
            this.get(url, name == 'clientId' ? 'bus' : 'accounts')
        else
            this.ref.detectChanges()
    }
    ngOnInit() {

    }
    public fetch(state: DataSourceRequestState): Observable<DataResult> {
        const queryStr = `${toDataSourceRequestString(state)}`; // Serialize the state
        const hasGroups = state.group && state.group.length;
        var url = this.apiUrl + 'GetTransaction?id=0&buId=1110&'
        return this.http
            .get(`${url}${queryStr}`)
            .pipe(
                map(({ data, total/*, aggregateResults*/ }: GridDataResult) => // Process the response
                    (<GridDataResult>{
                        // If there are groups, convert them to a compatible format 
                        data: data,
                        total: total,
                        // Convert the aggregates if such exist
                        //aggregateResult: translateAggregateResults(aggregateResults)
                    })
                )
            )
    }
    onSubmit() {
        console.log(this.form.get('header').value)
        console.log(this.gridComp.gridData.data)

        this.subscription.add(this.http.post(this.apiUrl + '/post', { header: this.form.get('header').value, grid: this.gridComp.gridData.data }  ).pipe(tap(() => this.loading = false))
            .subscribe(() => {

            }, err => alert(err.message)));
    }
    update(equipment: GenericResource): Observable<any> {
        if (!equipment) { return; }
        this.loading = true;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + '/post2',   equipment )
            .pipe(tap(() => this.loading = false));
    }

    addHandler({ sender }, formInstance) {
        formInstance.reset();
        sender.addRow({});
    }

    cancelHandler({ sender, rowIndex }) {
        this.gridData[rowIndex] = this.editedPPeOriginalState;
        this.closeEditor(sender, rowIndex);
    }

    editHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);
        this.editedRowIndex = rowIndex;
        this.editedPPeOriginalState = Object.assign({}, dataItem);
        sender.editRow(rowIndex);
    }

    closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.editedPPeOriginalState = undefined;
        this.refreshGridDataLocally1();
    }

    saveHandler({ sender, rowIndex, dataItem, isNew }) {
        console.log(dataItem); 
        if (isNew)
            this.gridData.data.push(dataItem)
        if (true ) { // ADD
            
        } else { // UPDATE
            this.subscription.add(this.update(dataItem as GenericResource)
                .subscribe(() => {
                    this.closeEditor(sender, rowIndex);
                }, err => alert(err.message)));
        }
        this.closeEditor(sender, rowIndex);
        this.editedRowIndex = undefined;
        this.editedPPeOriginalState = undefined;
    }

    removeHandler(equipment: GenericResource) {
        if (confirm('Confirm delete equipment ' + equipment.id + '?')) {
            this.subscription.add(this.http.delete(this.apiUrl + '/delete?id='+ equipment.id)
                .subscribe(
                    () => {
                        this.gridData = this.gridData.filter(p => p.id !== equipment.id);
                        this.refreshGridDataLocally1();
                    },

                ));
        }
    }
    refreshGridDataLocally1() {

    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onClearFilter() {
        this.form.get('header').setValue(new header())
        this.bus = null
        this.accounts=null 
        this.ref.detectChanges()
    }
    exportExcel() {
        var url = 'GetTransaction?id=0&buId=1110&pageSize=111111'
        this.subscription.add(this.http.get<any>(this.apiUrl + url, { withCredentials: true })
            .subscribe(data => this.exportService.exportExcel(data.data, 'customers') , err => alert(err.message), () => console.log('done')));        
    }
    test() {
        this.htmlSave.nativeElement.text='test'
    }
}
class header {
    id: number = 0
    clientId: number=0
    buId: number = 0
    iAccount: number = 0
    counterPartyId: number = 0
    name: string = ''
    dtTradeDate: Date =new  Date();
}

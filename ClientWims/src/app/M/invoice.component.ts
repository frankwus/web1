import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
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
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Component({
    selector: 'invoice',
    templateUrl: './invoice.component.html'
    , changeDetection: ChangeDetectionStrategy.OnPush,
})
export class invoiceComponent implements OnInit {
    form;
    isDateDone = false
    formData = new FormData();
    showImage = false
    imgUrl = 'http://localhost/emoc/images'
    id: string
    clients: [any] = [{ ID: 0, CompanyName: '' }]
    bus: [any] = [{ Id: 0, BusinessUnitName: '' }]
    //@ViewChild('imgTemplate', { static: false }) imgTemplate: ElementRef;
    //@ViewChild('imgTemplate') imgTemplate; 
    subscription: Subscription = new Subscription();
    apiUrl: string = 'http://localhost/webApi1/api//home/'
    getForm() {
        return this.form
    }
    userForm: FormGroup;

    public columns: any[] //= [{ field: "ProductID" }, { field: "ProductName" }, { field: "QuantityPerUnit" }];
    public bindingType: String = 'array';
    public view: Observable<GridDataResult>;
    public gridData1: any //= products;
    public gridDataResult: GridDataResult // = { data: [], total: 1 };


    public gridData: any// = products;

    //gridData: GridDataResult;
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
    constructor(private fb: FormBuilder, private ref: ChangeDetectorRef, private dialog: MatDialog, private location: Location
        , private route: ActivatedRoute, private router: Router, private http: HttpClient) {
        this.form = this.fb.group({
            client: [''],
            bu: [''],
            account: [''] , 
            wiTools: this.fb.array([])
        });        
        this.getData('client', function (data) {
            this.clients = data
            this.ref.detectChanges()
            }.bind(this)
        )
        this.get('GetTransaction?id=0&buId=1110&pageSize=' + this.pageSize)
        this.gridData = prod11
    }
    get(url) {
        this.getData(url, function (data) {
            console.log(data)
            let arr = []
            let p = data[0]
            for (var key in p) {
                if (p.hasOwnProperty(key)) {
                    arr.push({ field: key })
                }
            }
            this.columns = arr// [{ field: "id" }, { field: "name" }];
            this.gridData = data 
            this.ref.detectChanges()

        }.bind(this)
        )
    }
    getData0() {
        this.subscription.add(this.http.get<any>(this.apiUrl + 'equipment', { withCredentials: true }).subscribe(data => {
            this.clients = data
        }, err => alert(err.message), () => console.log('done')));

    }
    getData(url, fn ) {
        this.subscription.add(this.http.get<any>(this.apiUrl + url, { withCredentials: true }).subscribe(data =>fn(data) , err => alert(err.message), () => console.log('done')));       
    }
    pageChange(e) {

    }
    onClientChange(e) {
        var id=e.target.value
        this.getData('bu/0?clientId='+id, function (data) {
            this.bus = data
            this.ref.detectChanges()
        }.bind(this)
        )
    }
    onBuChange(e) {
        var id = e.target.value
        this.getData('account/0?buId=' + id, function (data) {
            this.accounts = data
            this.ref.detectChanges()
        }.bind(this)
        )
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
    onChange(e) {
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
}

const Products = [
    { id: 1 }
    , { id: 11 }
    , { id: 111 }
]
const prod11 = [{ "ProductID": 1, "ProductName": "Chai", "UnitPrice": 18, "UnitsInStock": 39, "Discontinued": false }, { "ProductID": 2, "ProductName": "Chang", "UnitPrice": 19, "UnitsInStock": 17, "Discontinued": false }, { "ProductID": 3, "ProductName": "Aniseed Syrup", "UnitPrice": 10, "UnitsInStock": 13, "Discontinued": false }, { "ProductID": 4, "ProductName": "Chef Anton\u0027s Cajun Seasoning", "UnitPrice": 22, "UnitsInStock": 53, "Discontinued": false }, { "ProductID": 5, "ProductName": "Chef Anton\u0027s Gumbo Mix", "UnitPrice": 21.35, "UnitsInStock": 0, "Discontinued": true }, { "ProductID": 6, "ProductName": "Grandma\u0027s Boysenberry Spread", "UnitPrice": 25, "UnitsInStock": 120, "Discontinued": false }, { "ProductID": 7, "ProductName": "Uncle Bob\u0027s Organic Dried Pears", "UnitPrice": 30, "UnitsInStock": 15, "Discontinued": false }, { "ProductID": 8, "ProductName": "Northwoods Cranberry Sauce", "UnitPrice": 40, "UnitsInStock": 6, "Discontinued": false }, { "ProductID": 9, "ProductName": "Mishi Kobe Niku", "UnitPrice": 97, "UnitsInStock": 29, "Discontinued": true }, { "ProductID": 10, "ProductName": "Ikura", "UnitPrice": 31, "UnitsInStock": 31, "Discontinued": false }, { "ProductID": 11, "ProductName": "Queso Cabrales", "UnitPrice": 21, "UnitsInStock": 22, "Discontinued": false }, { "ProductID": 12, "ProductName": "Queso Manchego La Pastora", "UnitPrice": 38, "UnitsInStock": 86, "Discontinued": false }, { "ProductID": 13, "ProductName": "Konbu", "UnitPrice": 6, "UnitsInStock": 24, "Discontinued": false }, { "ProductID": 14, "ProductName": "Tofu", "UnitPrice": 23.25, "UnitsInStock": 35, "Discontinued": false }, { "ProductID": 15, "ProductName": "Genen Shouyu", "UnitPrice": 15.5, "UnitsInStock": 39, "Discontinued": false }, { "ProductID": 16, "ProductName": "Pavlova", "UnitPrice": 17.45, "UnitsInStock": 29, "Discontinued": false }, { "ProductID": 17, "ProductName": "Alice Mutton", "UnitPrice": 39, "UnitsInStock": 0, "Discontinued": true }, { "ProductID": 18, "ProductName": "Carnarvon Tigers", "UnitPrice": 62.5, "UnitsInStock": 42, "Discontinued": false }, { "ProductID": 19, "ProductName": "Teatime Chocolate Biscuits", "UnitPrice": 9.2, "UnitsInStock": 25, "Discontinued": false }, { "ProductID": 20, "ProductName": "Sir Rodney\u0027s Marmalade", "UnitPrice": 81, "UnitsInStock": 40, "Discontinued": false }, { "ProductID": 21, "ProductName": "Sir Rodney\u0027s Scones", "UnitPrice": 10, "UnitsInStock": 3, "Discontinued": false }, { "ProductID": 22, "ProductName": "Gustaf\u0027s Knäckebröd", "UnitPrice": 21, "UnitsInStock": 104, "Discontinued": false }, { "ProductID": 23, "ProductName": "Tunnbröd", "UnitPrice": 9, "UnitsInStock": 61, "Discontinued": false }, { "ProductID": 24, "ProductName": "Guaraná Fantástica", "UnitPrice": 4.5, "UnitsInStock": 20, "Discontinued": true }, { "ProductID": 25, "ProductName": "NuNuCa Nuß-Nougat-Creme", "UnitPrice": 14, "UnitsInStock": 76, "Discontinued": false }, { "ProductID": 26, "ProductName": "Gumbär Gummibärchen", "UnitPrice": 31.23, "UnitsInStock": 15, "Discontinued": false }, { "ProductID": 27, "ProductName": "Schoggi Schokolade", "UnitPrice": 43.9, "UnitsInStock": 49, "Discontinued": false }, { "ProductID": 28, "ProductName": "Rössle Sauerkraut", "UnitPrice": 45.6, "UnitsInStock": 26, "Discontinued": true }, { "ProductID": 29, "ProductName": "Thüringer Rostbratwurst", "UnitPrice": 123.79, "UnitsInStock": 0, "Discontinued": true }, { "ProductID": 30, "ProductName": "Nord-Ost Matjeshering", "UnitPrice": 25.89, "UnitsInStock": 10, "Discontinued": false }, { "ProductID": 31, "ProductName": "Gorgonzola Telino", "UnitPrice": 12.5, "UnitsInStock": 0, "Discontinued": false }, { "ProductID": 32, "ProductName": "Mascarpone Fabioli", "UnitPrice": 32, "UnitsInStock": 9, "Discontinued": false }, { "ProductID": 33, "ProductName": "Geitost", "UnitPrice": 2.5, "UnitsInStock": 112, "Discontinued": false }, { "ProductID": 34, "ProductName": "Sasquatch Ale", "UnitPrice": 14, "UnitsInStock": 111, "Discontinued": false }, { "ProductID": 35, "ProductName": "Steeleye Stout", "UnitPrice": 18, "UnitsInStock": 20, "Discontinued": false }, { "ProductID": 36, "ProductName": "Inlagd Sill", "UnitPrice": 19, "UnitsInStock": 112, "Discontinued": false }, { "ProductID": 37, "ProductName": "Gravad lax", "UnitPrice": 26, "UnitsInStock": 11, "Discontinued": false }, { "ProductID": 38, "ProductName": "Côte de Blaye", "UnitPrice": 263.5, "UnitsInStock": 17, "Discontinued": false }, { "ProductID": 39, "ProductName": "Chartreuse verte", "UnitPrice": 18, "UnitsInStock": 69, "Discontinued": false }, { "ProductID": 40, "ProductName": "Boston Crab Meat", "UnitPrice": 18.4, "UnitsInStock": 123, "Discontinued": false }, { "ProductID": 41, "ProductName": "Jack\u0027s New England Clam Chowder", "UnitPrice": 9.65, "UnitsInStock": 85, "Discontinued": false }, { "ProductID": 42, "ProductName": "Singaporean Hokkien Fried Mee", "UnitPrice": 14, "UnitsInStock": 26, "Discontinued": true }, { "ProductID": 43, "ProductName": "Ipoh Coffee", "UnitPrice": 46, "UnitsInStock": 17, "Discontinued": false }, { "ProductID": 44, "ProductName": "Gula Malacca", "UnitPrice": 19.45, "UnitsInStock": 27, "Discontinued": false }, { "ProductID": 45, "ProductName": "Rogede sild", "UnitPrice": 9.5, "UnitsInStock": 5, "Discontinued": false }, { "ProductID": 46, "ProductName": "Spegesild", "UnitPrice": 12, "UnitsInStock": 95, "Discontinued": false }, { "ProductID": 47, "ProductName": "Zaanse koeken", "UnitPrice": 9.5, "UnitsInStock": 36, "Discontinued": false }, { "ProductID": 48, "ProductName": "Chocolade", "UnitPrice": 12.75, "UnitsInStock": 15, "Discontinued": false }, { "ProductID": 49, "ProductName": "Maxilaku", "UnitPrice": 20, "UnitsInStock": 10, "Discontinued": false }, { "ProductID": 50, "ProductName": "Valkoinen suklaa", "UnitPrice": 16.25, "UnitsInStock": 65, "Discontinued": false }, { "ProductID": 51, "ProductName": "Manjimup Dried Apples", "UnitPrice": 53, "UnitsInStock": 20, "Discontinued": false }, { "ProductID": 52, "ProductName": "Filo Mix", "UnitPrice": 7, "UnitsInStock": 38, "Discontinued": false }, { "ProductID": 53, "ProductName": "Perth Pasties", "UnitPrice": 32.8, "UnitsInStock": 0, "Discontinued": true }, { "ProductID": 54, "ProductName": "Tourtière", "UnitPrice": 7.45, "UnitsInStock": 21, "Discontinued": false }, { "ProductID": 55, "ProductName": "Pâté chinois", "UnitPrice": 24, "UnitsInStock": 115, "Discontinued": false }, { "ProductID": 56, "ProductName": "Gnocchi di nonna Alice", "UnitPrice": 38, "UnitsInStock": 21, "Discontinued": false }, { "ProductID": 57, "ProductName": "Ravioli Angelo", "UnitPrice": 19.5, "UnitsInStock": 36, "Discontinued": false }, { "ProductID": 58, "ProductName": "Escargots de Bourgogne", "UnitPrice": 13.25, "UnitsInStock": 62, "Discontinued": false }, { "ProductID": 59, "ProductName": "Raclette Courdavault", "UnitPrice": 55, "UnitsInStock": 79, "Discontinued": false }, { "ProductID": 60, "ProductName": "Camembert Pierrot", "UnitPrice": 34, "UnitsInStock": 19, "Discontinued": false }, { "ProductID": 61, "ProductName": "Sirop d\u0027érable", "UnitPrice": 28.5, "UnitsInStock": 113, "Discontinued": false }, { "ProductID": 62, "ProductName": "Tarte au sucre", "UnitPrice": 49.3, "UnitsInStock": 17, "Discontinued": false }, { "ProductID": 63, "ProductName": "Vegie-spread", "UnitPrice": 43.9, "UnitsInStock": 24, "Discontinued": false }, { "ProductID": 64, "ProductName": "Wimmers gute Semmelknödel", "UnitPrice": 33.25, "UnitsInStock": 22, "Discontinued": false }, { "ProductID": 65, "ProductName": "Louisiana Fiery Hot Pepper Sauce", "UnitPrice": 21.05, "UnitsInStock": 76, "Discontinued": false }, { "ProductID": 66, "ProductName": "Louisiana Hot Spiced Okra", "UnitPrice": 17, "UnitsInStock": 4, "Discontinued": false }, { "ProductID": 67, "ProductName": "Laughing Lumberjack Lager", "UnitPrice": 14, "UnitsInStock": 52, "Discontinued": false }, { "ProductID": 68, "ProductName": "Scottish Longbreads", "UnitPrice": 12.5, "UnitsInStock": 6, "Discontinued": false }, { "ProductID": 69, "ProductName": "Gudbrandsdalsost", "UnitPrice": 36, "UnitsInStock": 26, "Discontinued": false }, { "ProductID": 70, "ProductName": "Outback Lager", "UnitPrice": 15, "UnitsInStock": 15, "Discontinued": false }, { "ProductID": 71, "ProductName": "Flotemysost", "UnitPrice": 21.5, "UnitsInStock": 26, "Discontinued": false }, { "ProductID": 72, "ProductName": "Mozzarella di Giovanni", "UnitPrice": 34.8, "UnitsInStock": 14, "Discontinued": false }, { "ProductID": 73, "ProductName": "Röd Kaviar", "UnitPrice": 15, "UnitsInStock": 101, "Discontinued": false }, { "ProductID": 74, "ProductName": "Longlife Tofu", "UnitPrice": 10, "UnitsInStock": 4, "Discontinued": false }, { "ProductID": 75, "ProductName": "Rhönbräu Klosterbier", "UnitPrice": 7.75, "UnitsInStock": 125, "Discontinued": false }, { "ProductID": 76, "ProductName": "Lakkalikööri", "UnitPrice": 18, "UnitsInStock": 57, "Discontinued": false }, { "ProductID": 77, "ProductName": "Original Frankfurter grüne Soße", "UnitPrice": 13, "UnitsInStock": 32, "Discontinued": false }]

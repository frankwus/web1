import { NotificationService } from './notificationservice';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { GenericResource } from './generic-resource.model';
import { Subscription, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { tap } from 'rxjs/operators';
import { State, process } from '@progress/kendo-data-query';

@Component({
    selector: 'pnl',
    templateUrl: 'pnl.component.html',
    styles: []
})
export class pnlComponent implements OnInit, OnDestroy {
    apiUrl: string = environment.apiUrl;
    equipmentData: GenericResource[] = [];
    gridData: GridDataResult;
    editedRowIndex: number;
    editedPPeOriginalState: GenericResource;
    loading: boolean;
    pageSize = 30;
    skip = 0;
    subscription: Subscription = new Subscription();
    state: State = {
        skip: this.skip,
        take: this.pageSize
    };

    constructor(private http: HttpClient, private notificationService: NotificationService) { }

    ngOnInit() {
        this.getEquipments();
    }

    getEquipments() {
        for (let i = 0; i < 11; i++) {
            let a: GenericResource = { english: 'te' + i.toString(), id: i }
            this.equipmentData.push(a)

        }
        this.refreshGridDataLocally();
        return 
        this.loading = true;
        this.subscription.add(this.http.get<GenericResource[]>(this.apiUrl + '/equipment')
            .subscribe(data => {
                this.equipmentData = data;
                this.refreshGridDataLocally();
            }, err => alert(err.message), () => this.loading = false));
    }

    addEquipment(ppe: GenericResource): Observable<GenericResource> {
        this.loading = true;
        return this.http.post<GenericResource>(this.apiUrl + '/equipment', ppe);
    }

    updateEquipment(equipment: GenericResource): Observable<any> {
        if (!equipment) { return; }
        this.loading = true;

        return this.http.put(this.apiUrl + '/equipment/' + equipment.id, equipment)
            .pipe(tap(() => this.loading = false));
    }

    addHandler({ sender }, formInstance) {
        formInstance.reset();
        sender.addRow({});
    }

    cancelHandler({ sender, rowIndex }) {
        this.equipmentData[rowIndex] = this.editedPPeOriginalState;
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
        this.refreshGridDataLocally();
    }

    saveHandler({ sender, rowIndex, dataItem, isNew }) {
        console.log(dataItem);
        if (isNew) { // ADD
            this.subscription.add(this.addEquipment(dataItem as GenericResource)
                .subscribe((data: GenericResource) => {
                    this.equipmentData.push(data);
                    this.refreshGridDataLocally();
                    this.closeEditor(sender);
                    this.notificationService.showSuccess('Record created!');
                }, err => alert(err.message),
                    () => this.loading = false));
        } else { // UPDATE
            this.subscription.add(this.updateEquipment(dataItem as GenericResource)
                .subscribe(() => {
                    this.closeEditor(sender, rowIndex);
                }, err => alert(err.message)));
        }

        this.editedRowIndex = undefined;
        this.editedPPeOriginalState = undefined;
    }

    removeHandler(equipment: GenericResource) {
        if (confirm('Confirm delete equipment ' + equipment.english + '?')) {
            this.subscription.add(this.http.delete(this.apiUrl + '/equipment/' + equipment.id)
                .subscribe(
                    () => {
                        this.equipmentData = this.equipmentData.filter(p => p.id !== equipment.id);
                        this.refreshGridDataLocally();
                    },
                    (response) => this.notificationService.showError('Error: ' + response.error.exceptionMessage)
                ));
        }
    }

    refreshGridDataLocally() {
        this.loading = true;
        this.gridData = process(this.equipmentData, this.state);
        this.loading = false;
    }

    dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.refreshGridDataLocally();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

 interface GenericResource {
    english: string;
    disabled?: boolean;
    portugueseId?: number;
    portuguese?: string;
    bahasaId?: number;
    bahasa?: string;
    arabicId?: number;
    arabic?: string;
    id?: number;
}

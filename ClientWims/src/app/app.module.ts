import { BrowserModule } from '@angular/platform-browser';
import { TreeModule } from 'angular-tree-component';
import { MenuModule } from '@progress/kendo-angular-menu';
import { GridModule } from '@progress/kendo-angular-grid';
import { DragDropModule } from '@angular/cdk/drag-drop'
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent, Parent1Component, Child1Component} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import {CourseComponent} from "./course/course.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import {CoursesService} from "./services/courses.service";
import {HttpClientModule} from "@angular/common/http";
import {CourseResolver} from "./services/course.resolver";
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@angular/material-moment-adapter";

import {  CardComponent } from './about/about.component';
import { DelayDirective } from './about/delaycomponent';
import { WimsComponent } from './wims/wims.component';
import { TreeDynamicExample } from './wims/tree.component';
import { JobStepComponent } from './wims/jobStep.component';
import { wiToolsComponent } from './wims/wiTools.component';
import { ShowErrorsComponent } from './wims/showerrors.component';
import { BirthYearValidatorDirective } from './wims/birth.directive';
import { CreditCardValidator } from './wims/credit.component';
import { headerComponent } from './wims/header.component';

import { parentComponent } from './home/parent.component';
import { AddressEditorComponent } from './home/child.component';
import { jobStepControlComponent } from './wims/jobStepControl.component';


import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS , HttpInterceptor } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { MatTreeModule } from '@angular/material/tree';
import { TvComponent } from './wims/tv.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { JwPaginationComponent } from 'jw-angular-pagination';

import { invoiceComponent } from './m/invoice.component';
import { tabComponent } from './m/tab.component';
import { gridComponent } from './m/grid.component';
import { LoginComponent } from './m/login.component';
import { pnlComponent } from './m/pnl.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { NotificationService } from './m/NotificationService';
@Injectable()
export class CustomInterceptor implements HttpInterceptor  {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true
    });
    return next.handle(request);
  }
}
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        CourseComponent,
        CoursesCardListComponent,
      CourseDialogComponent,
      CardComponent, 
      DelayDirective
      , WimsComponent
      , TreeDynamicExample
      , JobStepComponent, TvComponent, wiToolsComponent, JwPaginationComponent, ShowErrorsComponent
      , BirthYearValidatorDirective, CreditCardValidator, headerComponent, parentComponent, AddressEditorComponent
        , jobStepControlComponent, Parent1Component, Child1Component
        , invoiceComponent
        , tabComponent
        , gridComponent
        , LoginComponent
      , pnlComponent
    ],
    imports: [
      BrowserModule,
      DragDropModule, 
      MatTreeModule,
      CKEditorModule, 
        BrowserAnimationsModule,
        HttpClientModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        AppRoutingModule,
        MatSelectModule,
        MatDatepickerModule,
      MatMomentDateModule,
        TreeModule.forRoot(), 
        ReactiveFormsModule, GridModule
        //, ExcelModule 
        , FormsModule, MenuModule, NotificationModule      
    ],
    providers: [
        CoursesService,
        NotificationService, 
      CourseResolver,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: CustomInterceptor,
        multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [CourseDialogComponent, JobStepComponent, wiToolsComponent ]
})
export class AppModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { parentComponent } from "./home/parent.component";
import { AboutComponent } from "./about/about.component";
import { WimsComponent } from "./wims/wims.component";
import { TreeDynamicExample } from "./wims/tree.component";
import {CourseComponent} from "./course/course.component";
import {CourseResolver} from "./services/course.resolver";
import { TvComponent } from './wims/tv.component';
import { invoiceComponent } from './m/invoice.component';
import { tabComponent } from './m/tab.component';
import { LoginComponent } from './m/login.component';
const routes: Routes = [
    {
    path: "wi/:id",
        component: WimsComponent

  },
  {
    path: "parent",
    component: parentComponent

    }, {
      path: "invoice",
      component: invoiceComponent
    }, {
        path: "tab",
        component: tabComponent
    }, {
        path: "login",
        component: LoginComponent

    },
  {
    path: "tv",
    component: TvComponent

  },
  {
    path: "home",
    component: HomeComponent

  },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: 'courses/:id',
        component: CourseComponent,
        resolve: {
            course: CourseResolver
        }
    },
    {
        path: "**",
        redirectTo: '/'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

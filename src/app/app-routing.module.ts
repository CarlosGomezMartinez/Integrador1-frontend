import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './components/auth/send-email/send-email.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CategoryComponent } from './components/user/category/category.component';
import { CategoryAddComponent } from './components/user/category-add/category-add.component';
import { ConceptComponent } from './components/user/concept/concept.component';
import { ConceptAddComponent } from './components/user/concept-add/concept-add.component';
import { ProductComponent } from './components/user/product/product.component';
import { ProductAddComponent } from './components/user/product-add/product-add.component';
import { AcquisitionPointComponent } from './components/user/acquisition-point/acquisition-point.component';
import { MovementComponent } from './components/user/movement/movement.component';
import { ProductEditComponent } from './components/user/product-edit/product-edit.component';
import { AcquisitionPointAddComponent } from './components/user/acquisition-point-add/acquisition-point-add.component';
import { AcquisitionPointEditComponent } from './components/user/acquisition-point-edit/acquisition-point-edit.component';
import { ReportComponent } from './components/user/report/report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  // { 
  //   path: 'home', 
  //   loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) 
  // }, 

  { 
    path: 'login', 
    loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) 
  }, 

  { 
    path: 'register', 
    loadChildren: () => import('./components/auth/register/register.module').then(m => m.RegisterModule) 
  },

  {
    path: 'verification-email', component: SendEmailComponent,
  },

  { path: 'forgot-password', 
    loadChildren: () => import('./components/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) 
  },

  {
    path:'profile',
    component: ProfileComponent,
  },

  {
    path:'category',
    component: CategoryComponent,
  },

  {
    path:'category/add',
    component: CategoryAddComponent,
  },

  {
    path:'category/:id_categoria/concept',
    component: ConceptComponent,
  },
  {
    path:'category/:id_categoria/concept/add',
    component: ConceptAddComponent,
  },
  {
    path: 'category/:id_categoria/concept/:id_concepto/product',
    component: ProductComponent,
  },
  {
    path: 'category/:id_categoria/concept/:id_concepto/product/add',
    component: ProductAddComponent,
  },
  {
    path: 'acquisition-point',
    component:AcquisitionPointComponent,
  },
  {
    path: 'acquisition-point/add',
    component: AcquisitionPointAddComponent,
  },
  {
    path: 'acquisition-point/:id_punto',
    component: AcquisitionPointEditComponent,
  },
  {
    path: 'movement',
    component: MovementComponent,
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'category/:id_categoria/concept/:id_concepto/product/:id_producto',
    component: ProductEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

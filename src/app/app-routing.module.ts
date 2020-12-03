import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './components/auth/send-email/send-email.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CategoryComponent } from './components/user/category/category.component';
import { CategoryAddComponent } from './components/user/category-add/category-add.component';
import { ConceptComponent } from './components/user/concept/concept.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  { 
    path: 'home', 
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) 
  }, 

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
    path:'category/:nombre/concept',
    component: ConceptComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../environments/environment';
import { SendEmailComponent } from './components/auth/send-email/send-email.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CategoryComponent } from './components/user/category/category.component';
import { CategoryAddComponent } from './components/user/category-add/category-add.component';
import { ConceptComponent } from './components/user/concept/concept.component';
import { ProductComponent } from './components/user/product/product.component';
import { MovementComponent } from './components/user/movement/movement.component';
import { AcquisitionPointComponent } from './components/user/acquisition-point/acquisition-point.component';




@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    SendEmailComponent,
    ProfileComponent,
    CategoryComponent,
    CategoryAddComponent,
    ConceptComponent,
    ProductComponent,
    MovementComponent,
    AcquisitionPointComponent, 
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

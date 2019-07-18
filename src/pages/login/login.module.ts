import { NgModule } from '@angular/core';
import { LoginPage } from './login';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    FormsModule,
    ReactiveFormsModule,
    NgxErrorsModule
  ],
  exports: [
    LoginPage,
    FormsModule,
    ReactiveFormsModule,
    NgxErrorsModule
  ]
})
export class LoginPageModule { }

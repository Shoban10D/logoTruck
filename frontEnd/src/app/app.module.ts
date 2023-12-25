import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import {HttpClientModule} from '@angular/common/http';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule } from '@angular/forms';
import { ResultImageComponent } from './result-image/result-image.component';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './header/header.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UploadImageComponent,
    ResultImageComponent,
    LandingComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NzSpinModule,
    FormsModule,
    NzFormModule,
    NzPageHeaderModule,
    HttpClientModule,
    NzDividerModule,
    NzUploadModule,
    AppRoutingModule,
    NzStepsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {path:'',redirectTo:'',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'upload-image',component:UploadImageComponent},
  {path:'',component:LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

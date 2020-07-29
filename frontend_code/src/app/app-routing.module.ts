import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { CameraComponent } from './camera/camera.component';
import { ShowDetailsComponent } from './show-details/show-details.component';


const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'form', component: RegistrationComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'showDetails', component: ShowDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

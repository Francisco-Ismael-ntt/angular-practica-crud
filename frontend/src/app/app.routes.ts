import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFormComponent } from './components/car-form/car-form.component';

export const routes: Routes = [

  {path:'',component: HomePageComponent},
  {path:'cars/:id',component: CarDetailComponent},
  {path:'form/:id',component: CarFormComponent},
  {path:'form',component: CarFormComponent},
];

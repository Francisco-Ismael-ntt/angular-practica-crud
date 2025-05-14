import { Routes } from '@angular/router';
<<<<<<< Updated upstream

export const routes: Routes = [];
=======
import { HomePageComponent } from './components/home-page/home-page.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

export const routes: Routes = [

  {path:'',component: HomePageComponent},
  {path:'cars/:id',component: CarDetailComponent}
];
>>>>>>> Stashed changes

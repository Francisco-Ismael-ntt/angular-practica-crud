import { Component, inject } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarSummary } from '../../models/car-summary-model';
import { CustomButtonDirective } from '../../directives/custom-button.directive';
import { RouterLink } from '@angular/router';

import { TableComponentComponent } from '../table-component/table-component.component';
import { CarFormComponent } from '../car-form/car-form.component';

@Component({
  selector: 'app-home-page',
  imports: [TableComponentComponent, RouterLink, CustomButtonDirective],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  carService = inject(CarService)
  carArray!: CarSummary[]
  carMock:CarSummary[] = [
    {brand: 'asd', model: 'asd', id: 'asd', total: 'asd'},
    {brand: 'asd', model: 'asd', id: 'asd', total: 'asd'},
    {brand: 'asd', model: 'asd', id: 'asd', total: 'asd'},
  ]
  isMenuShowing: boolean = false

  tableHead = ['id','modelo','marca','total','acciones']
  tableBody!: any[]

  showMenu(){
    this.isMenuShowing = !this.isMenuShowing
  }

  ngOnInit(){
    this.getAllCars()
  }

  getAllCars(){
    this.carService.getAllCars().subscribe({
      next: (value)=>{
        console.log(value)
        this.tableBody = []
        this.tableBody = value
      },
      error(err) {
        console.log(err)
      },
    })
  }



}

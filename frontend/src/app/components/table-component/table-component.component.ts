import { Component, inject } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarModel } from '../../models/car-model';
import { CarSummary } from '../../models/car-summary-model';
import { CustomButtonDirective } from '../../directives/custom-button.directive';

@Component({
  selector: 'app-table-component',
  imports: [CustomButtonDirective],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.css'
})
export class TableComponentComponent {

  carService = inject(CarService)
  carArray!: CarSummary[]
  carMock:CarSummary[] = [
    {brand: 'asd', model: 'asd', id: 'asd', total: 'asd'},
    {brand: 'asd', model: 'asd', id: 'asd', total: 'asd'},
    {brand: 'asd', model: 'asd', id: 'asd', total: 'asd'},
  ]


  ngOnInit(){
    this.getAllCars()
  }

  getAllCars(){
    this.carService.getAllCars().subscribe({
      next: (value)=>{
        console.log(value)
        this.carArray = value
      },
      error(err) {
        console.log(err)
      },
    })
  }

}

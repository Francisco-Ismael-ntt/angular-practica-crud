import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CarModel } from '../../models/car-model';
import { CustomButtonDirective } from '../../directives/custom-button.directive';


@Component({
  selector: 'app-car-detail',
  imports: [CustomButtonDirective],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent {

  private route = inject(ActivatedRoute)
  private carService = inject(CarService)
  car!: CarModel


  // car: CarModel = {brand:'',model:'',carDetails:{registrationDate:'',mileage:0,currency:'',price:'',manufactureYear:0,availability:false,licensePlate:''},id:'',total:0}

  ngOnInit(){
    this.route.params.subscribe((params)=>{
      if(params['id']){

        this.getCarById(params['id'])
      }
    })
  }

  getCarById(id: string){

    this.carService.getCarById(id).subscribe({
      next:(value) => {
        console.log(value)
        this.car = value

      },
      error(err) {
        console.log(err)
      },
    })
  }

}

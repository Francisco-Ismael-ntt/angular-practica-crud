import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CarModel } from '../../models/car-model';
import { CustomButtonDirective } from '../../directives/custom-button.directive';
import { MileagePipe } from '../../pipes/mileage.pipe';
import { TagModule } from 'primeng/tag';
import { TableComponentComponent } from "../table-component/table-component.component";
import { RouterLink } from '@angular/router';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-car-detail',
  imports: [CustomButtonDirective, TagModule, TableComponentComponent, RouterLink, DeleteModalComponent],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss'
})
export class CarDetailComponent {

  private route = inject(ActivatedRoute)
  private carService = inject(CarService)
  // car!: CarModel

  tableHead = ['Fecha de registro', 'Año de fabricacion', 'Precio','Kilometraje','Matricula','Disponibilidad']
  isModalVisible = false
  car: CarModel = {
    brand:'',
    model:'',
    carDetails:[{
      registrationDate:'',
      mileage:0,
      currency:'',
      price:0,
      manufactureYear:0,
      availability:false,
      licensePlate:''
    }],
    id:'',
    total:0
  }

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
  showModal(){
    this.isModalVisible = true
  }
  hideModal(){
    this.isModalVisible = false
  }



}

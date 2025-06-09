import { Component, Output, Input, EventEmitter, inject } from '@angular/core';
import { CarSummary } from '../../models/car-summary-model';
import { CarService } from '../../services/car.service';
import { CarModel } from '../../models/car-model';
import { Router } from '@angular/router';
import { CustomButtonDirective } from '../../directives/custom-button.directive';

@Component({
  selector: 'app-delete-modal',
  imports: [CustomButtonDirective],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  @Input() carSummary!: CarSummary
  @Input() carModel!: CarModel
  @Output() close = new EventEmitter<void>()

  car = {brand:'',model:''}

  carService = inject(CarService)

  constructor(private router: Router){}

  ngOnInit(){
    if(this.carSummary){
      this.car.brand = this.carSummary.brand
      this.car.model = this.carSummary.model
    }
    if(this.carModel){
      this.car.brand = this.carModel.brand
      this.car.model = this.carModel.model
    }
  }

  deleteCar(){
    let id = ''
    if (this.carSummary){
      id = this.carSummary.id
    }
    if(this.carModel){
      id = this.carModel.id
    }
    console.log('eliminar '+id)
    this.carService.deleteCar(id).subscribe({
      next:(value) => {
        console.log(value)
        this.close.emit()
        this.router.navigate(['/'])
      }, error(err) {
        console.log(err)
      },
    })
  }

  closeModal(){
    this.close.emit()
  }

}

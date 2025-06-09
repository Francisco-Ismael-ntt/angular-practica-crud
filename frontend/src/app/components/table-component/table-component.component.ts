import { CarService } from './../../services/car.service';
import { Component, inject, Input, output } from '@angular/core';
import { CarSummary } from '../../models/car-summary-model';
import { CustomButtonDirective } from '../../directives/custom-button.directive';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';

import { CarModel } from '../../models/car-model';
import { MileagePipe } from '../../pipes/mileage.pipe';

import { DeleteModalComponent } from '../delete-modal/delete-modal.component';


@Component({
  selector: 'app-table-component',
  imports: [RouterLink, MileagePipe, TagModule, DeleteModalComponent],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss'
})
export class TableComponentComponent {

  @Input() tableHead!: string[]
  @Input() tableBodyCarSum!: CarSummary[]
  @Input() tableBodyCar!: CarModel

  carDeletedEvent = output()

  isModalVisible = false

  showModal(){
    this.isModalVisible = true
  }
  hideModal(){
    this.isModalVisible = false
    this.carDeletedEvent.emit()
  }

  // carService = inject(CarService)

  // deleteCar(carId: string){
  //   this.carService.deleteCar(carId).subscribe({
  //     next:(value) => {
  //       console.log(value)
  //       this.carDeletedEvent.emit()
  //     }, error(err) {
  //       console.log(err)
  //     },
  //   })
  // }



}

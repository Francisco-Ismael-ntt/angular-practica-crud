import { Component, inject, Input } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarSummary } from '../../models/car-summary-model';
import { CustomButtonDirective } from '../../directives/custom-button.directive';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';

import { CarModel } from '../../models/car-model';
import { MileagePipe } from '../../pipes/mileage.pipe';


@Component({
  selector: 'app-table-component',
  imports: [RouterLink, MileagePipe, TagModule],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.css'
})
export class TableComponentComponent {

  @Input() tableHead!: string[]
  @Input() tableBodyCarSum!: CarSummary[]
  @Input() tableBodyCar!: CarModel



}

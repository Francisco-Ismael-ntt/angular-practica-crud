import { Component, inject, Input } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarSummary } from '../../models/car-summary-model';
import { CustomButtonDirective } from '../../directives/custom-button.directive';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';

import { CarModel } from '../../models/car-model';
import { MileagePipe } from '../../pipes/mileage.pipe';

// import { CdkMenu, CdkMenuItem, CdkMenuGroup, CdkMenuTrigger } from '@angular/cdk/menu';

/**
 * Logica de la tabla
 * pasar 2 arrays
 *  array 1 cabecera
 *  array 2 objetos para dibujar
 *
 * en funion de array 1 por la cuenta de objetos se sabra cada cuanto tien que hacer el salto array 2 para dibujar los objetos en su sitio
 *
 * si un objeto es un string que empieza por / es un enlace
 * si un objetos es una funcion es un boton
 */


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

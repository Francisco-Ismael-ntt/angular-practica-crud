import { Component } from '@angular/core';
import { TableComponentComponent } from '../table-component/table-component.component';

@Component({
  selector: 'app-home-page',
  imports: [TableComponentComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}

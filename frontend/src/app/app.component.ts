import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomButtonDirective } from './directives/custom-button.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomButtonDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

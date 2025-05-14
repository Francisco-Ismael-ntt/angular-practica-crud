import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< Updated upstream
=======
import { CustomButtonDirective } from './directives/custom-button.directive';
import { HomePageComponent } from './components/home-page/home-page.component';
>>>>>>> Stashed changes

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< Updated upstream
  imports: [RouterOutlet],
=======
  imports: [RouterOutlet, HomePageComponent],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

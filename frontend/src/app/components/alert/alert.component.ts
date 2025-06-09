import { Component, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Output() close = new EventEmitter<void>()
  constructor(private router: Router){}
  closeAlert(){
    this.close.emit()
    this.router.navigate(['/'])
  }
}

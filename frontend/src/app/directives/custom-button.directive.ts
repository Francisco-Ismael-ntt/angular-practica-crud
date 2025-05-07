import { Directive, ElementRef, HostBinding, Input, inject } from '@angular/core';


@Directive({
  selector: '[appCustomButton]'
})
export class CustomButtonDirective {

  @Input('appCustomButton') style!: string
  @HostBinding('class.blueButton') blue: boolean = false
  @HostBinding('class.whiteButton') white: boolean = false
  @HostBinding('class.redButton') red: boolean = false
  @HostBinding('class.greenButton') green: boolean = false

  ngOnInit() {
    switch(this.style){

      case 'white':
        this.white = true

      break;
      case 'red':
        this.red = true

      break;
      case 'blue':
        this.blue = true

      break;
      case 'green':
        this.green = true

      break;
      default:


      break;
    }


  }

}

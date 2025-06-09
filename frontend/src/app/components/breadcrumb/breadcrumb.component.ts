import { Component, Pipe } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  breadcrumb: {label: string, url: string}[] = []

  constructor(router: Router){
    router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(()=>{

      const currentUrl = router.url.split('/').filter(Boolean)
      this.breadcrumb = []
      const baseBreadcrumb = [
        {label: 'Inicio', url: '/'},
        {label: 'Detalles', url: '/cars'},
        {label: 'Editar coche', url: '/form'}
      ]
      if(currentUrl.includes('form')){
        this.breadcrumb.push(baseBreadcrumb[0], baseBreadcrumb[1], baseBreadcrumb[2])
      }else if(currentUrl.includes('cars')){
        this.breadcrumb.push(baseBreadcrumb[0], baseBreadcrumb[1])
      } else {
        this.breadcrumb.push(baseBreadcrumb[0])
      }

    })
  }


}

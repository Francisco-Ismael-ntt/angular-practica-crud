import { Component, inject, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgModel, FormsModule, FormControl } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { CreateCarDto } from '../../models/create-car-model';
import { CarDetailsDto } from '../../models/car-details-model';
import { CarSummary } from '../../models/car-summary-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent {
/**
 * LOGICA
 * el formulario es el mismo para editar y añadir un coche nuevo
 *
 * si viene con id como parametro hacer la peticion para obtener el coche en concreto y poner los campos del formulario relleno para editarlo
 *
 * si NO viene id dejar los campos del formulario en blanco para que el usuario lo añada
 *
 * si viene id el submit del boton llamara a la peticion para actualizar, si no a la de crear
 */
  carId!: string
  private route = inject(ActivatedRoute)

  ngOnInit(){
    this.getBrands()

    this.route.params.subscribe((params)=>{
      if(params['id']){
        this.carId = params['id']
      }
    })


  }

  carForm = new FormBuilder().group({
    brand: new FormControl('',[Validators.required]),
    model: new FormControl('',[Validators.required]),
    registerDate:  new FormControl('',[Validators.required]),
    manufactureYear: new FormControl(0,[Validators.required]),
    currency: new FormControl('',[Validators.required]),
    price: new FormControl(0,[Validators.required]),
    licensePlate: new FormControl('',[Validators.required]),
    milleage: new FormControl(0,[Validators.required]),
    avaiability: new FormControl(false, [Validators.required])
  })

  onSubmit(){


    const myBrand = this.carForm.controls['brand'].value
    const myModel = this.carForm.controls['model'].value

    const registerDateStr = this.carForm.controls['registerDate'].value

    const myManufactureYear = Number(this.carForm.controls['manufactureYear'].value)
    const myCurrency = this.carForm.controls['currency'].value
    const myPrice = Number(this.carForm.controls['price'].value)
    const myLicensePlate = this.carForm.controls['licensePlate'].value
    const myMilleage = Number(this.carForm.controls['milleage'].value)
    const myAvaiability = Boolean(this.carForm.controls['avaiability'].value)

    console.log(myBrand)
    console.log(myModel)
    console.log(registerDateStr)
    console.log(myManufactureYear)
    console.log(myCurrency)
    console.log(myPrice)
    console.log(myLicensePlate)
    console.log(myMilleage)
    console.log(myAvaiability)

    if(myBrand && myModel && registerDateStr && myManufactureYear && myCurrency && myPrice && myLicensePlate && myMilleage && myAvaiability){

      const registrationDate = new Date(registerDateStr).toISOString()



      const carDetails: CarDetailsDto[] = [{
        registrationDate: registrationDate,
        mileage: myMilleage,
        currency: myCurrency,
        price: myPrice,
        manufactureYear: myManufactureYear,
        availability: myAvaiability,
        licensePlate: myLicensePlate
      }]
      const car: CreateCarDto = {
        brand: myBrand,
        model: myModel,
        carDetails: carDetails
      }

      console.log('datos del coche')
      console.log(car)

      if(this.carId != null){
        console.log('updateCar')
        this.carService.updateCar(this.carId, car).subscribe({
          next:(value) => {
            console.log(value)
          },
          error(err) {
            console.log(err)
          },
        })

      } else {
        console.log('createCar')

        this.carService.createCar(car).subscribe({
          next: (value) => {
            console.log(value)
          },
          error(err) {
            console.log(err)
          },
        })
      }

    } else {
      console.log('fallo en validacion')
    }


  }

  brandsArray!: string[]
  modelsArray!: string[]

  carService = inject(CarService)
  getBrands(){
    this.carService.getBrands().subscribe({
      next: (value) => {
        this.brandsArray = value
      },
      error(err) {
        console.log(err)
      },
    })
  }

  getModels(brand: string){
    console.log('getModel')
    this.carService.getModels(brand).subscribe({
      next: (value) => {
        this.modelsArray = value
      },
      error(err) {
        console.log(err)
      },
    })
  }

}

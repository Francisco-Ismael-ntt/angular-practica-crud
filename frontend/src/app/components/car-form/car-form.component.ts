
import { Component, inject, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray, FormRecord } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { CreateCarDto } from '../../models/create-car-model';
import { CarDetailsDto } from '../../models/car-details-model';
import { CarSummary } from '../../models/car-summary-model';
import { ActivatedRoute } from '@angular/router';
import { CarModel } from '../../models/car-model';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent {




  //refactorizacion
  private route = inject(ActivatedRoute)
  carService = inject(CarService)

  carId!: string
  brandsArray!: string[]
  modelsArray!: string[]
  car!: CarModel

  fb = new FormBuilder
  carForm: FormRecord = this.fb.group({
    brand: this.fb.control('',[Validators.required]),
    model: this.fb.control('',[Validators.required]),
    details: this.fb.array([
      this.fb.group(
        {
          registerDate:  this.fb.control('',[Validators.required]),
          manufactureYear: this.fb.control(0,[Validators.required]),
          currency: this.fb.control('',[Validators.required]),
          price: this.fb.control(0,[Validators.required]),
          licensePlate: this.fb.control('',[Validators.required]),
          milleage: this.fb.control(0,[Validators.required]),
          avaiability: this.fb.control(false, [Validators.required])
        }
      )
    ])
  })
  details():FormArray{
    return <FormArray>this.carForm.get('details')
  }


  ngOnInit(){
    this.route.params.subscribe((params)=>{
      if(params['id']){
        console.log(params['id'])
        this.carId = params['id']
        this.getBrands()
        this.getCarById(this.carId)
      } else {
        console.log('no car id')
        this.getBrands()
      }
    })


  }



  /** CREACION Y MODIFICACION DEL FORMULARIO */
  addDetails(){
    const newCarDetail: FormGroup = this.fb.group({
        registerDate:  this.fb.control('',[Validators.required]),
        manufactureYear: this.fb.control(0,[Validators.required]),
        currency: this.fb.control('',[Validators.required]),
        price: this.fb.control(0,[Validators.required]),
        licensePlate: this.fb.control('',[Validators.required]),
        milleage: this.fb.control(0,[Validators.required]),
        avaiability: this.fb.control(false, [Validators.required])
    });

    this.details().push(newCarDetail)


  }

  deleteDetals(index: number){
    this.details().removeAt(index)
  }


  /** ENTRADA DE DATOS */
  collectData(): CreateCarDto {

    let carDetailsDto: CarDetailsDto[] = []
    let carDto!: CreateCarDto

    const myBrand = this.carForm.get('brand')?.value
    const myModel = this.carForm.get('model')?.value

    for(let control of this.details().controls){
      const registerDateStr = control.get('registerDate')?.value
      const myManufactureYear = control.get('manufactureYear')?.value
      const myCurrency = control.get('currency')?.value
      const myPrice = control.get('price')?.value
      const myLicensePlate = control.get('licensePlate')?.value
      const myMilleage = control.get('milleage')?.value
      const myAvaiability = control.get('avaiability')?.value
      const registrationDate = new Date(registerDateStr).toISOString()
      let carDetails: CarDetailsDto = {
        registrationDate: registrationDate,
        mileage: Number(myMilleage),
        currency: myCurrency,
        price: Number(myPrice),
        manufactureYear: Number(myManufactureYear),
        availability: myAvaiability,
        licensePlate: myLicensePlate
      }

      carDetailsDto.push(carDetails)
      carDto = {
        brand: myBrand,
        model: myModel,
        carDetails: carDetailsDto
      }

    }
    return carDto
  }
  onSubmit(){
    console.log(this.carForm)
    const newCar = this.collectData()
    if(newCar){
      console.log(newCar)

      if(this.carId != null){
        this.updateCar(this.carId, newCar)

      } else {
        this.createCar(newCar)
      }

    } else {
      console.log('fallo en validacion')
    }
  }

  populatingByServerData(data: CarModel){

    this.carForm.removeControl('brand')
    this.carForm.removeControl('model')
    this.carForm.removeControl('details')

    const brandControl = this.fb.control(data.brand, Validators.required)
    const modelControl =  this.fb.control(data.model, Validators.required)
    const detailControl = data.carDetails.map( detail => {
      return this.fb.control(detail, Validators.required)
    })

    this.carForm.addControl('brand', brandControl)
    this.carForm.addControl('model', modelControl)
    this.carForm.addControl('details', this.fb.array(detailControl))
  }

  /** LLAMADAS API */
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
    this.carService.getModels(brand).subscribe({
      next: (value) => {
        this.modelsArray = value
      },
      error(err) {
        console.log(err)
      },
    })
  }
  updateCar(carId: string, car:CreateCarDto){
    console.log('updateCar')
    this.carService.updateCar(carId, car).subscribe({
      next:(value) => {
        console.log(value)
      },
      error(err) {
        console.log(err)
      },
    })
  }
  createCar(car:CreateCarDto){
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
  getCarById(carId: string){
    this.carService.getCarById(carId).subscribe({
      next:(value) => {
        this.car = value
        this.getModels(value.brand)
        this.populatingByServerData(value)
      },error(err) {
        console.log(err)
      },
    })

  }
}

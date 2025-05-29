
import { Component, inject, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
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
  carForm: FormGroup = this.fb.group({
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
  iterateCarDetails: any[] = [this.carForm.controls['details']]



  ngOnInit(){
    this.route.params.subscribe((params)=>{
      if(params['id']){
        console.log(params['id'])
        this.carId = params['id']
        this.getCarById(this.carId)
      } else {
        console.log('no car id')
        this.getBrands()
        // this.carForm = this.createCarForm()
      }
    })


  }
/**
  editForm(car: CarModel): FormGroup{
    const form = this.fb.group({
      brand: this.fb.control(car.brand, [Validators.required]),
      model: this.fb.control(car.model, [Validators.required]),

      details: this.fb.array([])
    })

    car.carDetails.forEach((element)=>{
      const detail = this.fb.group({
        registerDate: this.fb.control(element.registrationDate || '', [Validators.required]),
        manufactureYear: this.fb.control(element.manufactureYear || 0, [Validators.required]),
        currency: this.fb.control(element.currency || '', [Validators.required]),
        price: this.fb.control(element.price || 0, [Validators.required]),
        licensePlate: this.fb.control(element.licensePlate || '', [Validators.required]),
        milleage: this.fb.control(element.mileage || 0, [Validators.required]),
        avaiability: this.fb.control(element.availability || false, [Validators.required]),
      })
      // this.carForm.details.push(detail)
    })

    return form
  }
  */

  // createCarForm(): FormGroup {

  //   const detailsGroup = this.fb.group({
  //     registerDate:  this.fb.control('',[Validators.required]),
  //     manufactureYear: this.fb.control(0,[Validators.required]),
  //     currency: this.fb.control('',[Validators.required]),
  //     price: this.fb.control(0,[Validators.required]),
  //     licensePlate: this.fb.control('',[Validators.required]),
  //     milleage: this.fb.control(0,[Validators.required]),
  //     avaiability: this.fb.control(false, [Validators.required])
  //   })

  //   let form = this.fb.group({
  //     brand: this.fb.control('',[Validators.required]),
  //     model: this.fb.control('',[Validators.required]),
  //     details: this.fb.array([detailsGroup])
  //   })
  //   return form
  // }


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

    (<FormArray>this.carForm.controls['details']).push(newCarDetail)

    this.updateIterateCarDetails()
  }
  updateIterateCarDetails(){
    this.iterateCarDetails = []
    this.iterateCarDetails = [this.carForm.controls['details']]
  }

  /** ENTRADA DE DATOS */
  collectData(): CreateCarDto {

    let detailsDto: CarDetailsDto[] = [{
      registrationDate: '',
      mileage: 0,
      currency: '',
      price: 0,
      manufactureYear: 0,
      availability: false,
      licensePlate: ''
    }]
    let carDto: CreateCarDto = {
      brand:'',
      model:'',
      carDetails: detailsDto
    }

    const myBrand = this.carForm.controls['brand'].value
    const myModel = this.carForm.controls['model'].value

    const registerDateStr = this.carForm.controls['registerDate'].value

    const myManufactureYear = this.carForm.controls['manufactureYear'].value
    const myCurrency = this.carForm.controls['currency'].value
    const myPrice = this.carForm.controls['price'].value
    const myLicensePlate = this.carForm.controls['licensePlate'].value
    const myMilleage = this.carForm.controls['milleage'].value
    const myAvaiability = this.carForm.controls['avaiability'].value

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
      let carDetails: CarDetailsDto = {
        registrationDate: registrationDate,
        mileage: Number(myMilleage),
        currency: myCurrency,
        price: Number(myPrice),
        manufactureYear: Number(myManufactureYear),
        availability: myAvaiability,
        licensePlate: myLicensePlate
      }

      detailsDto.push(carDetails)


    }


    return carDto
  }
  onSubmit(){
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
        this.getBrands()
        this.getModels(value.brand)
        // this.editForm(value)
      },error(err) {
        console.log(err)
      },
    })

  }
}

import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomButtonDirective } from '../../directives/custom-button.directive';
import { CarDetailsDto } from '../../models/car-details-model';
import { CarModel } from '../../models/car-model';
import { CreateCarDto } from '../../models/create-car-model';
import { FormDetails } from '../../models/form-details';
import { CarService } from '../../services/car.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule, AlertComponent, CustomButtonDirective],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.scss',
})
export class CarFormComponent {
  private route = inject(ActivatedRoute);
  carService = inject(CarService);

  prueba = signal('');


  carId!: string;
  brandsArray!: string[];
  modelsArray!: string[];
  car: CarModel = {
    brand: '',
    model: '',
    id: '',
    total: 0,
    carDetails: [],
  };

  fb = inject(NonNullableFormBuilder);
  carForm = this.fb.group({
    brand: this.fb.control('', [Validators.required]),
    model: this.fb.control('', [Validators.required]),
    details: this.fb.array([
      this.fb.group({
        registerDate: this.fb.control('', [Validators.required]),
        manufactureYear: this.fb.control(0, [Validators.required]),
        currency: this.fb.control('', [Validators.required]),
        price: this.fb.control(0, [Validators.required]),
        licensePlate: this.fb.control('', [Validators.required]),
        milleage: this.fb.control(0, [Validators.required]),
        avaiability: this.fb.control(false, [Validators.required]),
      },
      //TODO añadir validadores
      {
        validators:[

      ]
    }),
    ]),
  });

  showAlert: boolean = false;

  get details(){
    return this.carForm.controls.details;
  }

  constructor() {
    this.route.params.subscribe((params) => {
      this.getBrands();
      if (params['id']) {
        console.log(params['id']);
        this.carId = params['id'];
        this.getCarById(this.carId);
      } else {
        console.log('no car id');
      }
    });
  }



  populatingByServerData(data: CarModel) {
    console.log('populating with server data');
    let formDetailsArray: FormGroup<FormDetails>[] = data.carDetails.map((detail)=>{
      const detailComponent = this.fb.group(
        {
          registerDate: this.fb.control(detail.registrationDate.split('T')[0], [
            Validators.required,
          ]),
          manufactureYear: this.fb.control(detail.manufactureYear, [
            Validators.required,
          ]),
          currency: this.fb.control(detail.currency, [Validators.required]),
          price: this.fb.control(detail.price, [Validators.required]),
          licensePlate: this.fb.control(detail.licensePlate, [
            Validators.required,
          ]),
          milleage: this.fb.control(detail.mileage, [Validators.required]),
          avaiability: this.fb.control(detail.availability, [
            Validators.required,
          ]),
        },
        {
          //TODO añadir validadores
          validators: [

          ],
        }
      );
      return(detailComponent)
    })  ;


    this.carForm = this.fb.group({
      brand: this.fb.control(data.brand, [Validators.required]),
      model: this.fb.control(data.model, [Validators.required]),
      details: this.fb.array(formDetailsArray)
    });
  }




  addDetails() {
    const newCarDetail: FormGroup = this.fb.group({
      registerDate: this.fb.control('', [Validators.required]),
      manufactureYear: this.fb.control(0, [Validators.required]),
      currency: this.fb.control('', [Validators.required]),
      price: this.fb.control(0, [Validators.required]),
      licensePlate: this.fb.control('', [Validators.required]),
      milleage: this.fb.control(0, [Validators.required]),
      avaiability: this.fb.control(false, [Validators.required]),
    });

    this.details.push(newCarDetail);
  }

  deleteDetals(index: number) {
    this.details.removeAt(index);
  }

  /** ENTRADA DE DATOS */
  collectData(): CreateCarDto {
    let carDetailsDto: CarDetailsDto[] = [];
    let carDto!: CreateCarDto;

    const myBrand = this.carForm.get('brand')?.value || '';
    const myModel = this.carForm.get('model')?.value || '';

    for (let control of this.details.controls) {
      const registerDateStr = control.get('registerDate')?.value  || '';
      const myManufactureYear = control.get('manufactureYear')?.value  || '';
      const myCurrency = control.get('currency')?.value  || '';
      const myPrice = control.get('price')!.value  || '';
      const myLicensePlate = control.get('licensePlate')!.value  || '';
      const myMilleage = control.get('milleage')!.value  || '';
      const myAvaiability = control.get('avaiability')?.value || false;
      const registrationDate = new Date(registerDateStr).toISOString();
      let carDetails: CarDetailsDto = {
        registrationDate: registrationDate,
        mileage: Number(myMilleage),
        currency: myCurrency,
        price: Number(myPrice),
        manufactureYear: Number(myManufactureYear),
        availability: myAvaiability,
        licensePlate: myLicensePlate,
      };

      carDetailsDto.push(carDetails);
      carDto = {
        brand: myBrand,
        model: myModel,
        carDetails: carDetailsDto,
      };
    }
    return carDto;
  }
  onSubmit() {
    console.log(this.carForm);
    const newCar = this.collectData();
    if (newCar) {
      console.log(newCar);

      if (this.carId != null) {
        this.updateCar(this.carId, newCar);
      } else {
        this.createCar(newCar);
      }
    } else {
      console.log('fallo en validacion');
    }
  }

  /** LLAMADAS API */
  getBrands() {
    this.carService.getBrands().subscribe({
      next: (value) => {
        console.log(value);
        this.brandsArray = value;
      },
      error(err) {
        console.log(err);
      },
    });
  }
  getModels(brand: string) {
    this.carService.getModels(brand).subscribe({
      next: (value) => {
        this.modelsArray = value;
      },
      error(err) {
        console.log(err);
      },
    });
  }
  updateCar(carId: string, car: CreateCarDto) {
    console.log('updateCar');
    this.carService.updateCar(carId, car).subscribe({
      next: (value) => {
        console.log(value);
        this.showAlert = true;
      },
      error(err) {
        console.log(err);
      },
    });
  }
  createCar(car: CreateCarDto) {
    console.log('createCar');
    this.carService.createCar(car).subscribe({
      next: (value) => {
        console.log(value);
        this.showAlert = true;
      },
      error(err) {
        console.log(err);
      },
    });
  }
  getCarById(carId: string) {
    this.carService.getCarById(carId).subscribe({
      next: (value) => {
        console.log(value)
        this.car = value;
        this.getModels(value.brand);
        this.populatingByServerData(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  // cerrar alert
  closeAlert() {
    this.showAlert = false;
  }
}

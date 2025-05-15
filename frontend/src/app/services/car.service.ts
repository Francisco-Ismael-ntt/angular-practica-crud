import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarModel } from '../models/car-model';
import { CreateCarDto } from '../models/create-car-model';
import { CarSummary } from '../models/car-summary-model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private http = inject(HttpClient)
  baseUrl: string = 'http://localhost:3000'

  getAllCars(){
    const endpoint = this.baseUrl + '/cars'
    return this.http.get<[CarSummary]>(endpoint)
  }

  createCar(car: CreateCarDto){
    const endpoint = this.baseUrl + '/cars'
     return this.http.post<CreateCarDto>(endpoint, car)
  }
  getCarById(id: string){
    const endpoint = this.baseUrl + '/cars/' + id
     return this.http.get<CarModel>(endpoint)
  }
  updateCar(id: string, car: CreateCarDto){
    const endpoint = this.baseUrl + '/cars/' + id
     return this.http.put<CreateCarDto>(endpoint, car)
  }
  deleteCar(id: string){
    const endpoint = this.baseUrl + '/cars/' + id
     return this.http.delete(endpoint)
  }

}

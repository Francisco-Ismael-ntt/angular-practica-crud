import { CarDetailsDto } from "./car-details-model"

export interface CarModel {
  brand: string
  model: string
  carDetails: CarDetailsDto[]
  id: string
  total: number
}

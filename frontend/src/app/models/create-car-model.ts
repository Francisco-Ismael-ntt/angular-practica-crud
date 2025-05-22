import { CarDetailsDto } from "./car-details-model"

export interface CreateCarDto{
  brand: string
  model: string
  carDetails: CarDetailsDto[]
}

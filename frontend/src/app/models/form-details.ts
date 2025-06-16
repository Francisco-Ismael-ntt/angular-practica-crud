import { FormControl } from "@angular/forms";

export interface FormDetails {

  registerDate: FormControl<string>,
  manufactureYear: FormControl<number>,
  currency: FormControl<string>,
  price: FormControl<number>,
  licensePlate: FormControl<string>,
  milleage: FormControl<number>,
  avaiability: FormControl<boolean>,
}

import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMinDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinDateDirective,
      multi: true
    }
  ]
})
export class MinDateDirective implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
      const date = new Date(control.value);
      return date < new Date() ? { minDate: true } : null;
  }
}

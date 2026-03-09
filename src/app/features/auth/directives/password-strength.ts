import { Directive, Output, EventEmitter } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

export interface PasswordStrengthState {
  minLength: boolean;
  uppercase: boolean;
  number: boolean;
  strength: 'débil' | 'media' | 'fuerte';
  percentage: number;
}

@Directive({
  selector: '[appPasswordStrength]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true
    }
  ]
})
export class PasswordStrengthDirective implements Validator {

  @Output() strengthChange = new EventEmitter<PasswordStrengthState>();

  validate(control: AbstractControl): ValidationErrors | null {

    const value: string = control.value || '';

    const hasMinLength = value.length >= 6;
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    let strength: 'débil' | 'media' | 'fuerte' = 'débil';
    let percentage = 0;

    const criteriaMatched = [hasMinLength, hasUppercase, hasNumber].filter(Boolean).length;

    if (criteriaMatched === 0) {
      percentage = 0;
      strength = 'débil';
    } else if (criteriaMatched === 1) {
      percentage = 33;
      strength = 'débil';
    } else if (criteriaMatched === 2) {
      percentage = 66;
      strength = 'media';
    } else {
      percentage = 100;
      strength = 'fuerte';
    }

    const state: PasswordStrengthState = {
      minLength: hasMinLength,
      uppercase: hasUppercase,
      number: hasNumber,
      strength,
      percentage
    };

    this.strengthChange.emit(state);

    const isValid = hasMinLength && hasUppercase && hasNumber;

    if (!isValid) {
      return {
        passwordStrength: true
      };
    }

    return null;
  }

}

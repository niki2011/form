import { AbstractControl } from '@angular/forms';

export function ValidateString(control: AbstractControl) {
    if ( control.value && control.value.trim() !== '' ) {
        if (!/^.+$/.test(control.value) || (control.value.length > 15) || (control.value.length < 1) ) {
            return { validPhone: true };
        }
    }

    return null;
}

import { ElementRef } from '@angular/core';

export const validationEmail = (element: HTMLInputElement) => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (EMAIL_REGEXP.test(element.value)) {
        element.style.border = '1px solid #D7DADD';
        return true
      } else {
        element.style.border = '1px solid #FF4242';
        return false
      }
}

export const validationPassword = (element: HTMLInputElement) => {
    if (element.value.length > 3) {
        element.style.border = '1px solid #D7DADD';
        return true
      } else {
        element.style.border = '1px solid #FF4242';
        return false
      }
}
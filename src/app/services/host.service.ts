import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor() { }

  getHost(): string {
    return window.location.host
  }
}

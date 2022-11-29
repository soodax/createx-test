import { Injectable } from '@angular/core';

@Injectable()
export class HostService {
  constructor() {}

  getHost(): string {
    return window.location.host;
  }
}

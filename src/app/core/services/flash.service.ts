import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashService {
  flashes: any[] = [];

  constructor() { }

  info(message: string | TemplateRef<any>, options: any = { classname: 'bg-info text-light' }) {
    this.flashes.push({ message, ...options });
  }

  err(message: string | TemplateRef<any>, options: any = { classname: 'bg-danger text-light' }) {
    this.flashes.push({ message, ...options });
  }

  remove(flash) {
    this.flashes = this.flashes.filter(f => f !== flash);
  }

}

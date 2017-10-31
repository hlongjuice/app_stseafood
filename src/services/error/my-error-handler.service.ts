import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { Events } from "ionic-angular";
@Injectable()
export class MyErrorHandler implements ErrorHandler {

  constructor(public eventCtrl:Events){}
  handleError(err: any,): void {
    console.log('In Error Handler')
    console.log(err)
    this.eventCtrl.publish('logout')
  }
}
import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  public today: Date;
  public DD: any
  public MM: any
  public YY: any
  public hh: any
  public mm: any
  public hhEnd: any

  constructor() {
    this.today = new Date();
    this.DD = this.today.getDate();
    this.MM = this.today.getMonth() + 1;
    this.YY = this.today.getFullYear();
    this.hh = this.today.getHours();
    this.mm = this.today.getMinutes();
    this.hhEnd = this.hh + 1;
    if (this.MM < 10)
      this.MM = "0" + this.MM;
    if (this.DD < 10)
      this.DD = "0" + this.DD;
    if (this.hh < 10)
      this.hh = "0" + this.hh;
    if (this.hhEnd < 10)
      this.hhEnd = "0" + this.hhEnd;
    if (this.mm < 10)
      this.mm = "0" + this.mm;
  }

  /*Current Date*/
  getCurrentDateTime() {
    let currentDate = {
      'DD': this.DD,
      'MM': this.MM,
      'YY': this.YY,
      'hh': this.hh,
      'mm': this.mm
    }
    return currentDate;
  }
  /*Get Date*/
  getDate() {
    let date = this.YY + '-' + this.MM + '-' + this.DD;
    return date;
  }
  /*Get Time*/
  getTime() {
    let time = {
      'currentTime': this.hh + ':' + this.mm,
      'hh': this.hh,
      'mm': this.mm
    }
    return time
  }

  /* get Month Name */
  getMonthName() {
    let months = [
      'ม.ค.','ก.พ.', 'มี.ค.','เม.ย.',
      'พ.ค.','มิ.ย.','ก.ค.','ส.ค.',
      'ก.ย.','ต.ค.','พ.ย.','ธ.ค.'
    ]
    return months
  }



}
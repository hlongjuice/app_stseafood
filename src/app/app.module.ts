import { Eng_5x7HighTankService } from './../services/eng/_5x7-high-tank.service';
import { PasswordService } from './../services/password.service';
import { RepairInvoiceService } from './../services/other/repair-invoice.service';
import { ProductionExpService } from './../services/production/expiration.service';
import { ProductionProductService } from './../services/production/product.service';
import { EngWaterUsageService } from './../services/eng/water_usage.service';
import { EngColdStorageResultService } from './../services/eng/cold-storage-result.service';
import { EngWaterFiltrationService } from './../services/eng/water-filtration.service';
import { EngBoilerService } from './../services/eng/boiler.service';
import { EngIceMakerService } from './../services/eng/ice-maker.service';
import { EngWaterCoolerService } from './../services/eng/water_cooler.service';
import { EngColdStorageService } from './../services/eng/cold-storage.service';
import { EngDefrostTimeService } from './../services/eng/defrost-time.service';
import { EngChlorineLabService } from './../services/eng/chlorine-lab.service';
import { EngChlorineService } from './../services/eng/chlorine.service';
import { EngCondensService } from './../services/eng/condens.service';
import { EngHighTankService } from './../services/eng/high-tank.service';
import { Eng_5x7Service } from './../services/eng/_5x7.service';
import { EngWaterMeterService } from './../services/eng/water-meter.service';
import { EngRiverWaterService } from './../services/eng/river-water.service';
import { EngTank210Service } from './../services/eng/tank-210.service';
import { EngWsOutsideService } from './../services/eng/ws-outside.service';
import { HttpHanderService } from './../services/error/http-handler.service';
import { Http } from '@angular/http';
import { QcShrimpResultService } from './../services/qc/shrimp_result.service';
// import {MyErrorHandler} from './../services/error/my-error-handler.service'

import { SupplierService } from './../services/supplier.service';
import { QcShrimpReceivingService } from './../services/qc/shrimp_receiving.service';
import { CarUsageService } from './../services/human-resource/car/car-usage.service';
import { RankService } from './../services/rank.service';
import { CarAccessService } from './../services/human-resource/car/car-access.service';
import { CarDriverService } from './../services/human-resource/car/car-driver.service';
import { NextPageService } from './../services/next-page.service';
import { CarResponseService } from './../services/human-resource/car/car-response.service';
import { CarManageService } from './../services/human-resource/car/car-manage.service';
import { DepartmentService } from './../services/department.service';
import { DateService } from './../services/date.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
// import { Transfer, TransferObject } from '@ionic-native/transfer';
// import { FileChooser } from '@ionic-native/file-chooser';
// import { FilePath } from '@ionic-native/file-path';
// import { ImagePicker } from '@ionic-native/image-picker';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';
// tslint:disable-next-line:no-unused-variable
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { EmployeeService } from "../services/employee.service";
// import { ProductionScheduleService } from "../services/production-schedule.service";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
// import { ProductionService } from "../services/production.service";
import { WebUrlService } from "../services/weburl.service";
import { DivisionService } from "../services/division.service";
import { ProductionActivityService } from "../services/production/activity.service";
import { ProductionShrimpTypeService } from "../services/production/shrimp-type.service";
import { ProductionShrimpSizeService } from "../services/production/shrimp-size.service";
import { ProductionEmployeeService } from "../services/production/employee.service";
import { ProductionWorkService } from "../services/production/work.service";
import { CarRequestService } from "../services/human-resource/car/car-request.service";
// import { Camera, CameraOptions } from '@ionic-native/camera';
import{Camera} from '@ionic-native/camera';







@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    }),
    IonicStorageModule.forRoot(
      {
        name: '__mydb',
        // driverOrder:['indexeddb']
        //  driverOrder: ['indexeddb']
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    // {provide:ErrorHandler,useClass:MyErrorHandler,},
    {provide:Http,useClass:HttpHanderService},
    // Transfer,
    // TransferObject,
    // FileChooser,
    // FilePath,
    // ImagePicker,
    ScreenOrientation,
    Camera,

    /*Service*/
    EmployeeService,
    UserService,
    AuthService,
    WebUrlService,
    DivisionService,
    DepartmentService,
    RankService,
    DateService,
    NextPageService,
    CarDriverService,
    SupplierService,
    /* Other */
    RepairInvoiceService,
    PasswordService,
    /* Engineer */
    EngWsOutsideService,
    EngTank210Service,
    EngRiverWaterService,
    EngWaterMeterService,
    Eng_5x7Service,
    Eng_5x7HighTankService,
    EngHighTankService,
    EngCondensService,
    EngChlorineService,
    EngChlorineLabService,
    EngDefrostTimeService,
    EngColdStorageService,
    EngWaterCoolerService,
    EngIceMakerService,
    EngBoilerService,
    EngWaterFiltrationService,
    EngColdStorageResultService,
    EngWaterUsageService,
    /*Production*/
    ProductionActivityService,
    ProductionShrimpTypeService,
    ProductionShrimpSizeService,
    ProductionEmployeeService,
    ProductionWorkService,
    ProductionProductService,
    ProductionExpService,
    /*Human Resource*/
    CarManageService,
    CarResponseService,
    CarRequestService,
    CarAccessService,
    CarUsageService,
    /* Qc */
    QcShrimpReceivingService,
    QcShrimpResultService
  ]
})
export class AppModule { }

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
// import {ProductionService} from "../../services/production.service";


/**
 * Generated class for the ProductionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-production',
    templateUrl: 'production.html',
})
export class ProductionPage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                ) {
    }

    ngOnInit() {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductionPage');
    }

}

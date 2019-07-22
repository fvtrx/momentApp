import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AuthService } from '../../providers/auth-service/auth.service';
import { LoginPage } from '../login/login';


/**
 * Generated class for the QrReaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-reader',
  templateUrl: 'qr-reader.html',
})
export class QrReaderPage {

  data = { };
  option: BarcodeScannerOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService,
  public alertCtrl: AlertController, public barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrReaderPage');
  }

  scan () {
    this.option = {
      // preferFrontCamera: true,
      prompt: 'Please scan the QR Code clearly'
    }
    this.barcodeScanner.scan(this.option).then(barcodeData => {
     // show success
     console.log(barcodeData);
     this.data = barcodeData;
    //  barcodeData.cancelled;
    //  barcodeData.format;
    //  barcodeData.text;

    }).catch(err => {
        //show error
        console.log(err);
    });
  }

  logOut(): void {
    this.auth.logOutUser().then( response => {
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'You have been logout from Moment',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(LoginPage);
    });
  }

}

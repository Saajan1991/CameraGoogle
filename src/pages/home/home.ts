import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { environment } from '../../environment';


import { DataProvider } from './../../providers/data/data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  alert: any;
  base64image;
  downloadURL: any;
  uploadProgress: AngularFireUploadTask;
  task: any;
  ref: any;
  // items: Observable<any[]>;
  items: any;


  constructor(public navCtrl: NavController,
    private dataProvider: DataProvider,
    private alertCtrl: AlertController,
    private afStorage: AngularFireStorage,
    private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    private db: AngularFireDatabase) {
      this.items = db.list('items').valueChanges();

  }

  // takePhoto() {

  //   this.base64image = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Small-world-network-example.png/220px-Small-world-network-example.png";
  //   // const options: CameraOptions = {
  //   //   quality: 100,
  //   //   destinationType: this.camera.DestinationType.DATA_URL,
  //   //   //encodingType: this.camera.EncodingType.JPEG,
  //   //   mediaType: this.camera.MediaType.PICTURE,
  //   //   correctOrientation: true
  //   // }

  //   // this.camera.getPicture(options).then((imageData) => {
  //   //   this.base64image = 'data:image/jpeg;base64,' + imageData;
  //   //   this.upload(this.base64image);
  //   //   alert("Success1");
  //   // }, (err) => {
  //   //   // Handle error
  //   // });
  // }

  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  saveResults(imageData, results) {
    alert(JSON.stringify(results));
    this.items.push({ imageData: imageData, results: JSON.stringify(results)})
      .then(_ => { })
      .catch(err => { alert(err) });
  }


  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      alert("Take photo");
      this.vision.getLabels(imageData).subscribe((result) => {
        this.saveResults(imageData, result);
        alert("Save success");
        alert(this.items);
        // .json().responses
      }, err => {
        alert(err);
      });
    }, err => {
      alert(err);
    });
  }


  


  // upload(event) {
  //   const randomId = Math.random().toString(36).substring(2);
  //   // this.ref = this.afStorage.ref('/files/'+ randomId);
  //   this.ref = this.afStorage.ref(randomId);
  //   this.task = this.ref.put(event.target.files[0]);
  //   // this.task = this.ref.put(event);
  //   alert("File");
  //   alert(this.task);
  //   this.uploadProgress = this.task.percentageChanges();
  //   this.downloadURL = this.task.downloadURL();
  // }


}

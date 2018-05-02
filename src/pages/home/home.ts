import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';


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
  items;
  items1: { responses: {} };


  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private afStorage: AngularFireStorage,
    private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    private db: AngularFireDatabase) {
    // if (this.items == undefined) {
    //   alert(this.items);
    // }
    // else {
      // this.items = db.list('items').valueChanges();
    // }
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
      this.vision.getLabels(imageData).subscribe((result) => {
        alert("Save success");
        this.items = JSON.stringify(result);
        this.items = JSON.parse(this.items);
        alert(this.items);
        this.items1 = this.items.responses[0].labelAnnotations;
        alert(this.items1 + "item to display");
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


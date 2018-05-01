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

import * as firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  loading: any;
  currentImage: any;
  base64image;
  downloadURL: any;
  uploadProgress: AngularFireUploadTask;
  task: any;
  ref: any;
  files: Observable<any[]>;

  constructor(public navCtrl: NavController,
    private dataProvider: DataProvider,
    private alertCtrl: AlertController,
    private afStorage: AngularFireStorage,
    private camera: Camera) {

  }

  takePhoto() {

    this.base64image = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Small-world-network-example.png/220px-Small-world-network-example.png";
    // this.base64image = this.dataURItoBlob('data:image/jpeg;base64,' + this.base64image);
    this.upload();
    // this.upload(this.base64image);
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   //encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true
    // }

    // this.camera.getPicture(options).then((imageData) => {
    // this.base64image = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
    //   this.upload(this.base64image);
    //   alert("Success1");
    // }, (err) => {
    //   // Handle error
    // });
  }

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  upload() {
    if (this.base64image) {
      const randomId = Math.random().toString(36).substring(2);
      var uploadTask = this.afStorage.ref(randomId)
        .child('images/uploaded.png')
        .put(this.base64image);
      uploadTask.then(this.onSuccess, this.onError);
    }
  }

  onSuccess = (snapshot) => {
    this.currentImage = snapshot.downloadURL;
    this.loading.dismiss();
  }

  onError = (error) => {
    console.log('error', error);
    this.loading.dismiss();
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

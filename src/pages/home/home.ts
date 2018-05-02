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
  items;
  items1: { responses: {} };




  constructor(public navCtrl: NavController,
    private dataProvider: DataProvider,
    private alertCtrl: AlertController,
    private afStorage: AngularFireStorage,
    private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    private db: AngularFireDatabase) {
    if (this.items == undefined) {
      alert(this.items);
    }
    else {
      // this.items = db.list('items').valueChanges();
    }

  }

  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  // saveResults(imageData, results) {
  //   this.items = JSON.stringify(results);
  //   // this.items.push({ imageData: imageData, results: JSON.stringify(results.response) });
  //   // .then(_ => { })
  //   // .catch(err => { alert(err) });
  //   alert(this.items);
  // }


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
        // this.saveResults(imageData, result);
        alert("Save success");
        this.items = JSON.stringify(result);
        alert(this.items);
        this.items1 = this.items.responses[0].labelAnnotations;
        alert(this.items1);
        // .json().responses
      }, err => {
        alert(err);
      });
    }, err => {
      alert(err);
    });

    // this.items1 = 
    // {
    //   "responses": [
    //     {
    //       "labelAnnotations": [
    //         {
    //           "mid": "/m/0bt9lr",
    //           "description": "dog",
    //           "score": 0.97346616
    //         },
    //         {
    //           "mid": "/m/09686",
    //           "description": "vertebrate",
    //           "score": 0.85700572
    //         },
    //         {
    //           "mid": "/m/01pm38",
    //           "description": "clumber spaniel",
    //           "score": 0.84881884
    //         },
    //         {
    //           "mid": "/m/04rky",
    //           "description": "mammal",
    //           "score": 0.847575
    //         },
    //         {
    //           "mid": "/m/02wbgd",
    //           "description": "english cocker spaniel",
    //           "score": 0.75829375
    //         }
    //       ]
    //     }
    //   ]
    // };


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

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public base64image: string;
  items: FirebaseListObservable<any[]>;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public http: HttpClientModule,
    private vision: GoogleCloudVisionServiceProvider,
    private db: AngularFireDatabase,
  ) {

    var item = db.list('items');
    console.log(item);

  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      //encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64image = 'data:image/jpeg;base64,' + imageData;
      this.vision.getLabels(imageData);
      // var vision_api_json = {
      //   "requests": [
      //     {
      //       "image": {
      //         "content": imageData
      //       },
      //       "features": [
      //         {
      //           "type": 'LABEL_DETECTION',
      //           "maxResults": 1
      //         }
      //       ]
      //     }
      //   ]
      // };
      // var file_contents = JSON.stringify(vision_api_json);
      // alert (file_contents);
      // this.http.post('https://www.googleapis.com/upload/storage/v1/b/myBucket/o?uploadType=media' + this.googleCloudVisionAPIKey, file_contents);
      // // this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + this.googleCloudVisionAPIKey, file_contents);

    }, (err) => {
      // Handle error
    });
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public base64image: string;
  googleCloudVisionAPIKey: "AIzaSyCAnoY5Jqqj85bXTrdGshQecHJUYg-mdOs";

  constructor(public navCtrl: NavController, private camera: Camera, public http: Http) {

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
      
      var vision_api_json = {
        "requests":[
          {
            "image":{
              "content": imageData
            },
            "features":[
              {
                "type": 'LABEL_DETECTION',
                "maxResults": 1
              }
            ]
          }
        ]
      };
      var file_contents = JSON.stringify(vision_api_json);
      this.http.post('https://www.googleapis.com/upload/storage/v1/b/myBucket/o?uploadType=media'+ this.googleCloudVisionAPIKey, file_contents);
      // this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + this.googleCloudVisionAPIKey, file_contents);

    }, (err) => {
      // Handle error
    });
  }

}

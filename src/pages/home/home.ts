import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  items1;
  items;

  constructor(public navCtrl: NavController,
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
        this.items = JSON.stringify(result);
        this.items = JSON.parse(this.items);
        this.items1 = this.items.responses[0].faceAnnotations;
        alert(this.items1)
      }, err => {
        alert(err);
      });
    }, err => {
      alert(err);
    });
  }

}

/*

items =
    {
      "responses": [
        {
          "faceAnnotations": [
            {
              "boundingPoly": {
                "vertices": [
                  {
                    "x": 932,
                    "y": 313
                  },
                  {
                    "x": 1028,
                    "y": 313
                  },
                  {
                    "x": 1028,
                    "y": 425
                  },
                  {
                    "x": 932,
                    "y": 425
                  }
                ]
              },
              "fdBoundingPoly": {
                "vertices": [
                  {
                    "x": 936,
                    "y": 333
                  },
                  {
                    "x": 1017,
                    "y": 333
                  },
                  {
                    "x": 1017,
                    "y": 413
                  },
                  {
                    "x": 936,
                    "y": 413
                  }
                ]
              },
              "landmarks": [
                {
                  "type": "LEFT_EYE",
                  "position": {
                    "x": 959.60065,
                    "y": 355.98782,
                    "z": -0.00016746686
                  }
                },
                {
                  "type": "RIGHT_EYE",
                  "position": {
                    "x": 984.92914,
                    "y": 362.48074,
                    "z": -14.466843
                  }
                },
                {
                  "type": "LEFT_OF_LEFT_EYEBROW",
                  "position": {
                    "x": 954.3997,
                    "y": 348.13577,
                    "z": 7.6285343
                  }
                },
                {
                  "type": "RIGHT_OF_LEFT_EYEBROW",
                  "position": {
                    "x": 965.15735,
                    "y": 349.91434,
                    "z": -7.9691405
                  }
                },
                {
                  "type": "LEFT_OF_RIGHT_EYEBROW",
                  "position": {
                    "x": 976.60974,
                    "y": 352.59775,
                    "z": -14.814832
                  }
                },
                {
                  "type": "RIGHT_OF_RIGHT_EYEBROW",
                  "position": {
                    "x": 995.2661,
                    "y": 359.14246,
                    "z": -15.962653
                  }
                },
                {
                  "type": "MIDPOINT_BETWEEN_EYES",
                  "position": {
                    "x": 968.7824,
                    "y": 356.87964,
                    "z": -12.243763
                  }
                },
                {
                  "type": "NOSE_TIP",
                  "position": {
                    "x": 959.8401,
                    "y": 371.1136,
                    "z": -21.012028
                  }
                },
                {
                  "type": "UPPER_LIP",
                  "position": {
                    "x": 960.88947,
                    "y": 382.35114,
                    "z": -15.794773
                  }
                },
                {
                  "type": "LOWER_LIP",
                  "position": {
                    "x": 959.00604,
                    "y": 392.5613,
                    "z": -14.722658
                  }
                },
                {
                  "type": "MOUTH_LEFT",
                  "position": {
                    "x": 953.558,
                    "y": 385.6143,
                    "z": -3.7360961
                  }
                },
                {
                  "type": "MOUTH_RIGHT",
                  "position": {
                    "x": 975.03265,
                    "y": 390.148,
                    "z": -14.706936
                  }
                },
                {
                  "type": "MOUTH_CENTER",
                  "position": {
                    "x": 960.53326,
                    "y": 387.2606,
                    "z": -14.258573
                  }
                },
                {
                  "type": "NOSE_BOTTOM_RIGHT",
                  "position": {
                    "x": 971.79193,
                    "y": 376.1076,
                    "z": -15.152608
                  }
                },
                {
                  "type": "NOSE_BOTTOM_LEFT",
                  "position": {
                    "x": 957.7185,
                    "y": 373.1746,
                    "z": -7.1614866
                  }
                },
                {
                  "type": "NOSE_BOTTOM_CENTER",
                  "position": {
                    "x": 962.575,
                    "y": 376.29388,
                    "z": -15.418351
                  }
                },
                {
                  "type": "LEFT_EYE_TOP_BOUNDARY",
                  "position": {
                    "x": 959.1816,
                    "y": 353.80328,
                    "z": -1.5174211
                  }
                },
                {
                  "type": "LEFT_EYE_RIGHT_CORNER",
                  "position": {
                    "x": 964.36786,
                    "y": 357.51196,
                    "z": -2.7060971
                  }
                },
                {
                  "type": "LEFT_EYE_BOTTOM_BOUNDARY",
                  "position": {
                    "x": 958.7769,
                    "y": 358.01065,
                    "z": -0.3359541
                  }
                },
                {
                  "type": "LEFT_EYE_LEFT_CORNER",
                  "position": {
                    "x": 955.79767,
                    "y": 355.51834,
                    "z": 5.151253
                  }
                },
                {
                  "type": "LEFT_EYE_PUPIL",
                  "position": {
                    "x": 958.7773,
                    "y": 355.84012,
                    "z": -0.38514262
                  }
                },
                {
                  "type": "RIGHT_EYE_TOP_BOUNDARY",
                  "position": {
                    "x": 983.61804,
                    "y": 359.85156,
                    "z": -15.601014
                  }
                },
                {
                  "type": "RIGHT_EYE_RIGHT_CORNER",
                  "position": {
                    "x": 990.0031,
                    "y": 364.02197,
                    "z": -14.567666
                  }
                },
                {
                  "type": "RIGHT_EYE_BOTTOM_BOUNDARY",
                  "position": {
                    "x": 983.9871,
                    "y": 364.64563,
                    "z": -14.510015
                  }
                },
                {
                  "type": "RIGHT_EYE_LEFT_CORNER",
                  "position": {
                    "x": 978.7498,
                    "y": 361.2154,
                    "z": -11.121486
                  }
                },
                {
                  "type": "RIGHT_EYE_PUPIL",
                  "position": {
                    "x": 983.81213,
                    "y": 362.04236,
                    "z": -14.877491
                  }
                },
                {
                  "type": "LEFT_EYEBROW_UPPER_MIDPOINT",
                  "position": {
                    "x": 959.80444,
                    "y": 345.24878,
                    "z": -1.5490607
                  }
                },
                {
                  "type": "RIGHT_EYEBROW_UPPER_MIDPOINT",
                  "position": {
                    "x": 986.2949,
                    "y": 351.80408,
                    "z": -16.823978
                  }
                },
                {
                  "type": "LEFT_EAR_TRAGION",
                  "position": {
                    "x": 956.0783,
                    "y": 372.93738,
                    "z": 39.021652
                  }
                },
                {
                  "type": "RIGHT_EAR_TRAGION",
                  "position": {
                    "x": 1012.669,
                    "y": 387.13126,
                    "z": 7.191323
                  }
                },
                {
                  "type": "FOREHEAD_GLABELLA",
                  "position": {
                    "x": 970.6526,
                    "y": 350.78348,
                    "z": -12.321499
                  }
                },
                {
                  "type": "CHIN_GNATHION",
                  "position": {
                    "x": 956.40735,
                    "y": 406.87085,
                    "z": -12.346105
                  }
                },
                {
                  "type": "CHIN_LEFT_GONION",
                  "position": {
                    "x": 948.2937,
                    "y": 388.85358,
                    "z": 25.902096
                  }
                },
                {
                  "type": "CHIN_RIGHT_GONION",
                  "position": {
                    "x": 998.49835,
                    "y": 401.61972,
                    "z": -3.1576655
                  }
                }
              ],
              "rollAngle": 16.379295,
              "panAngle": -29.333826,
              "tiltAngle": 4.458676,
              "detectionConfidence": 0.980691,
              "landmarkingConfidence": 0.57905465,
              "joyLikelihood": "VERY_LIKELY",
              "sorrowLikelihood": "VERY_UNLIKELY",
              "angerLikelihood": "VERY_UNLIKELY",
              "surpriseLikelihood": "VERY_UNLIKELY",
              "underExposedLikelihood": "VERY_UNLIKELY",
              "blurredLikelihood": "VERY_UNLIKELY",
              "headwearLikelihood": "VERY_UNLIKELY"
            }
          ]
        }
      ]
    };

    */
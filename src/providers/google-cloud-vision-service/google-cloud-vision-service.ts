import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import 'rxjs/add/operator/map';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class GoogleCloudVisionServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GoogleCloudVisionServiceProvider Provider');   

  }

  getLabels(base64Image) {
    alert("Hello get label" + base64Image)
    const body = {
      "requests": [
        {
          "image": {
            "content": base64Image
          },
          "features": [
            {
              "type": "LABEL_DETECTION"
            }
          ]
        }
      ]
    }
    console.log ("success");
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.firebaseConfig.googleCloudVisionAPIKey, body);
    
    }

}

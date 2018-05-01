import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
 
@Injectable()
export class DataProvider {
 
  constructor(private db: AngularFireDatabase, 
    private afStorage: AngularFireStorage) { 
        
    }
 
  
 
}
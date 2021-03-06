import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public photos : any;
    public base64Image : string;
    constructor(public navCtrl: NavController, private camera : Camera, private alertCtrl : AlertController) {
        this.photos = [];
    }

    takePhoto() {
        const options : CameraOptions = {
            quality: 50, // picture quality
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            cameraDirection: 1
        }
        this.camera.getPicture(options) .then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.photos.push(this.base64Image);
            this.photos.reverse();
        }, (err) => {
            console.log(err);
        });
    }

    deletePhoto(index) {
        let confirm = this.alertCtrl.create({
            title: 'Sure you want to delete this photo? There is NO undo!',
            message: '',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        console.log('Agree clicked');
                        this.photos.splice(index, 1);
                    }
                }
            ]
        });
        confirm.present();
    }

}

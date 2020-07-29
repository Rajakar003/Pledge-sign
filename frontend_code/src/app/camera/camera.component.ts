import { Component, OnInit,ElementRef,Renderer2, ViewChild, EventEmitter, Output } from '@angular/core';
import { MyserviceService } from '../service/myservice.service';
import { Router } from '@angular/router';
// import {Subject} from 'rxjs/Subject';
// import {Observable} from 'rxjs/Observable';
import { Subject, Observable } from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  

  constructor(private renderer: Renderer2,
    public router:Router,
    private myService:MyserviceService) { }

// OLD camera

  // ngOnInit(): void {
  //   this.startCamera();
  // }
//   @ViewChild('video', { static: true }) videoElement: ElementRef;
//   @ViewChild('canvas', { static: true }) canvas: ElementRef;
//   videoWidth = 0;
//   videoHeight = 0;

//   constraints = {
//     video: {
//         facingMode: "environment",
//         width: { ideal: 4096 },
//         height: { ideal: 2160 }
//     }
// };
// startCamera() {
//   if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
// navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
//   } else {
//       alert('Sorry, camera not available.');
//   }
// }
// handleError(error) {
// console.log('Error: ', error);
// }
// attachVideo(stream) {
// this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
// this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
//   this.videoHeight = this.videoElement.nativeElement.videoHeight;
//   this.videoWidth = this.videoElement.nativeElement.videoWidth;
// });
// }
// capture() {
// this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
// this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
// this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
// }





@Output()
public pictureTaken = new EventEmitter<WebcamImage>();
// toggle webcam on/off
public showWebcam = true;
public allowCameraSwitch = true;
public multipleWebcamsAvailable = false;
public deviceId: string;
public videoOptions: MediaTrackConstraints = {
// width: {ideal: 1024},
// height: {ideal: 576}
};
public errors: WebcamInitError[] = [];
// webcam snapshot trigger
private trigger: Subject<void> = new Subject<void>();
// switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
public ngOnInit(): void {
WebcamUtil.getAvailableVideoInputs()
.then((mediaDevices: MediaDeviceInfo[]) => {
this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
});
}
public triggerSnapshot(): void {
this.trigger.next();
}
public toggleWebcam(): void {
this.showWebcam = !this.showWebcam;
}
public handleInitError(error: WebcamInitError): void {
this.errors.push(error);
}
public showNextWebcam(directionOrDeviceId: boolean|string): void {
// true => move forward through devices
// false => move backwards through devices
// string => move to device with given deviceId
this.nextWebcam.next(directionOrDeviceId);
}
public handleImage(webcamImage: WebcamImage): void {
console.info('received webcam image', webcamImage);
this.pictureTaken.emit(webcamImage);
}
public cameraWasSwitched(deviceId: string): void {
console.log('active device: ' + deviceId);
this.deviceId = deviceId;
}
public get triggerObservable(): Observable<void> {
return this.trigger.asObservable();
}
public get nextWebcamObservable(): Observable<boolean|string> {
return this.nextWebcam.asObservable();
}


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {
  @ViewChild(SignaturePad) signaturePad : SignaturePad;
  public signaturePadOptions = {
    'minWidth' : '2',
    penColor: 'rgb(66,133,244)',
    backgroundColor: 'rgb(255,255,255)',
    'canvasWidth': 233,
    'canvasHeight': 78
  }; 
  constructor() { }

  ngOnInit(): void {
  }

  // Signature
drawClear(){
  this.signaturePad.clear();
}
ngAfterViewInit() {
  // this.signaturePad is now available
  this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
  this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
}
drawComplete() {
  // will be notified of szimek/signature_pad's onEnd event
  console.log(this.signaturePad.toDataURL());
}

drawStart() {
  // will be notified of szimek/signature_pad's onBegin event
  console.log('begin drawing');
}

}

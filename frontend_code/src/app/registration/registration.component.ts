import { Component, OnInit, ElementRef,Renderer2, ViewChild  } from '@angular/core';
import { Signup } from './signup';
import { MyserviceService } from '../service/myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private renderer: Renderer2,
    public router:Router,
    private myService:MyserviceService) { }

  ngOnInit(): void {
    
  }
  submit(form) {
    console.log(form.value);
    this.myService.signUp(form.value)
    
    .subscribe((res) => {
      console.log('sign up',res);
    })
    this.router.navigateByUrl('camera');
  }
  userModel = new Signup('','','')

  navigate(route:string){
    this.router.navigateByUrl(route, { skipLocationChange: true  });
  }


}

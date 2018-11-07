import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { RegisterPage } from '../register/register';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ViewPage } from '../view/view';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData={"email":"","password":"","status":""}
  sessionData:any;
  loading: any;
  resposeData: any;
  

  constructor(public navCtrl: NavController,public authService: AuthServiceProvider,public loadingController:LoadingController,public toastCtrl: ToastController) {
    if(localStorage.getItem('userData')){
      this.sessionData=JSON.parse(localStorage.getItem('userData'));
      if(this.sessionData.email!="")
      {
        if(this.sessionData.email=="ad12@gmail.com"){
          this.navCtrl.setRoot(ViewPage);
        }
        else
        {
       this.navCtrl.setRoot(MainPage);
        }
      }
      else
      {
        this.navCtrl.setRoot(HomePage);
      }
    }

  }
  public login()
  {
    if(this.userData.password==""||this.userData.email==""){
      let toast = this.toastCtrl.create({
        message: 'Please fill the fields',
        duration: 500,
      });
      toast.present(toast);
     }
      else{
        this.loading = this.loadingController.create({
          content: "loading.please wait..."
        });
        this.loading.present();
        this.authService.postData(this.userData,"login").then((result)=>{
          this.resposeData = result;
          //console.log(result['error'].text);
        
         if(result['error'].text=="")
          {
            this.loading.dismissAll();
            const toast = this.toastCtrl.create({
              message: 'Login Success',
              showCloseButton: false,
              position : "top",          
              duration: 2000,
            });
            localStorage.setItem('userData',JSON.stringify(this.userData));         
          
            toast.present();
            if(this.userData.email=="ad12@gmail.com"&&this.userData.password=="ad12"){
              
              localStorage.setItem('userData',JSON.stringify(this.userData));
              this.navCtrl.push(ViewPage);
            }
            else
            {
            
              this.userData.email='';
              this.userData.password='';
              this.navCtrl.push(MainPage);
            
           
           }
          }
          else{
            this.loading.dismissAll();
            const toast = this.toastCtrl.create({
              message: result['error'].text,
              showCloseButton: true,
              closeButtonText: 'Ok',
              duration: 3000,
            });
            toast.present();
          }
        }, (err) => {
          this.loading.dismissAll();
          const toast = this.toastCtrl.create({
            message: 'Network Error',
            showCloseButton: true,
            closeButtonText: 'Ok',
            duration: 3000,
          });
          toast.present();
        });
       
      }

  }
  public register(){
    this.navCtrl.push(RegisterPage);
  }
}

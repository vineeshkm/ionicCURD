import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerData={"name":"","email":"","address":"","password":""};
  loading: any;
  resposeData: any;
  constructor(public navCtrl: NavController,public loadingController:LoadingController,public authService: AuthServiceProvider, public navParams: NavParams,public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  public register2(){
    if(this.registerData.name==""||this.registerData.email==""||this.registerData.address==""||this.registerData.password==""){
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
        this.authService.postData(this.registerData,"register").then((result)=>{
          this.resposeData = result;
          //console.log(result['error'].text);
          if(result['error'].text=="")
          {
            this.loading.dismissAll();
            const toast = this.toastCtrl.create({
              message: 'Registration Success',
              showCloseButton: false,
              position : "top",          
              duration: 2000,
            });
                        
            this.registerData.name='';
            this.registerData.email='';
            this.registerData.password='';
            this.registerData.address='';
            toast.present();
            this.navCtrl.push(MainPage);
          }else{
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
}

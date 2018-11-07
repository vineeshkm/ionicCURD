import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the MembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
  
})
export class MembersPage {
  loading: any;
  userData = {"limit":"all"};
  resposeData:any;
  customers:any;
  nocustomers:any;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,public authService: AuthServiceProvider,public loadingController:LoadingController) {

  }
  

  ionViewDidLoad() {
   
  this.loading = this.loadingController.create({
    content: "loading.please wait..."
  });
  this.loading.present();
  this.authService.postData(this.userData,"getFeed").then((result)=>{
    //console.log(result);
    this.resposeData = result;
    if(this.resposeData.feedData.length>0)
    {
      this.loading.dismissAll();
      this.customers = this.resposeData.feedData;
    }
    else{
      this.loading.dismissAll();
      this.nocustomers = true;
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
  public allow(item,memberIndex){

    this.authService.postData(item,"allow").then((result)=>{
      this.resposeData = result;
      //console.log(result['error'].text);
      if(result['error'].text=="")
      {
        this.loading.dismissAll();
        const toast = this.toastCtrl.create({
          message: 'Status Updateed',
          showCloseButton: false,
          position : "top",          
          duration: 2000,
        });
        toast.present();
      //console.log(result['error'].status);
      // console.log(this.customers[memberIndex].status);
        this.customers[memberIndex].status=result['error'].status;
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
   
    //console.log(item);
  }
  public delete(item,memberIndex){

    this.authService.postData(item,"delete").then((result)=>{
      this.resposeData = result;
      //console.log(result['error'].text);
      if(result['error'].text=="Deleted successfully")
      {
        this.loading.dismissAll();
        const toast = this.toastCtrl.create({
          message: 'Deleted Successfully',
          showCloseButton: false,
          position : "top",          
          duration: 2000,
        });
        toast.present();
        this.customers.splice(memberIndex,1);
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
   
    //console.log(item);
  }
}
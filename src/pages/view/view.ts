import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { MembersPage } from '../members/members';
import { HomePage } from '../home/home';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }
  public logout(){
    localStorage.clear();
    const root=this.app.getRootNav();
    root.popToRoot();
    this.navCtrl.setPages([
      {page:HomePage}
    ]);
  }
  public register3(){
    
    this.navCtrl.push(MembersPage);
  }

}

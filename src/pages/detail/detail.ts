import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { MarvelApiProvider } from '../../providers/marvel-api/marvel-api';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  heroData: any;
  comics: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public marvel: MarvelApiProvider) {
    this.heroData = this.navParams;
    this.marvel.loadComics(this.heroData.data[0].comics.items);
  }

  ionViewDidLoad() {
    this.comics = this.marvel.comicsData;
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MarvelApiProvider } from '../../providers/marvel-api/marvel-api';
import { LoadingController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public result: any;
  public characters: any;
  public dataStorage: any;

  constructor(public navCtrl: NavController, public marvel: MarvelApiProvider, public loadingCtrl: LoadingController) {
    this.getCharacters();
  }

  getCharacters() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.marvel.load().then(data => {
      loader.dismiss();
      this.result = data;
      this.characters = this.result.data.results;
      this.dataStorage = this.result.data.results;
    })
  }

  getHero(searchbar) {
    try {
      var q = searchbar.srcElement.value;

        this.marvel.load(q).then(data => {
          this.result = data;
          this.characters = this.result.data.results;
        })
    } catch (error) {

    }
  }

  getDescription(id) {
    try {
        this.marvel.load(null, id).then(data => {
          this.result = data;
          this.navCtrl.push(DetailPage, this.result.data.results);
        })
    } catch (error) {

    }
  }
}

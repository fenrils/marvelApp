import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';

/*
  Generated class for the MarvelApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MarvelApiProvider {
  data: any;
  dataStore: any;
  comicsData = [];

  constructor(public http: Http) {

  }

  load(name?: string, id?) {
    return new Promise(resolve => {
      let link: string;

      var timestamp = Number(new Date());
      var hash = Md5.hashStr(timestamp + '321a97cfaad8b16dacd742622a97a659ebf19229' + '7a71cd5bb55e929d556056fe3889d2ee');
      if (name && name.length > 1) {
        link = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&ts=${timestamp}&orderBy=name&limit=20&apikey=7a71cd5bb55e929d556056fe3889d2ee&hash=${hash}`;
      } else if (id) {
        link = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&apikey=7a71cd5bb55e929d556056fe3889d2ee&hash=${hash}`;
      } else {
        link = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&orderBy=name&limit=100&apikey=7a71cd5bb55e929d556056fe3889d2ee&hash=${hash}`;
      }
      this.http.get(link)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          this.dataStore = this.data;
          resolve(this.data);
        });
    });
  }

  loadComics(item) {
    this.comicsData = [];
    var fisicPrice = ""
    var digitalPrice = ""
    item.forEach(element => {
      try {
        var timestamp = Number(new Date());
        var hash = Md5.hashStr(timestamp + '321a97cfaad8b16dacd742622a97a659ebf19229' + '7a71cd5bb55e929d556056fe3889d2ee');
        this.http.get(element.resourceURI + `?ts=${timestamp}&apikey=7a71cd5bb55e929d556056fe3889d2ee&hash=${hash}`)
          .map(res => res.json())
          .subscribe(data => {
            console.log(data);
            if (data.data.results[0].prices.length > 1) {
               fisicPrice = data.data.results[0].prices[0].price
               digitalPrice = data.data.results[0].prices[1].price
            } else {
               fisicPrice = data.data.results[0].prices[0].price
               digitalPrice = ""
            }
           
            this.comicsData.push({ name: data.data.results[0].title, thumnails: data.data.results[0].thumbnail, fisicPrice:fisicPrice, digitalPrice:digitalPrice, url:data.data.results[0].urls[0].url });
          });
      } catch (error) {
        console.log(error);

      }
    });
  }
}
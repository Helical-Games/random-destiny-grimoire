//import {computedFrom} from 'aurelia-framework';
import {
  inject
}
from 'aurelia-framework';
import {
  HttpClient, json
}
from 'aurelia-fetch-client';

@
inject(HttpClient)
export class CardView {

  themes = null;
  card = null;
  cardName = '';
  themeName = '';
  http = null;
  id = '';

  constructor(httpClient) {
    this.http = httpClient;
  }

  activate(params) {
    this.id = params.id;
  }

  attached() {
    var self = this;
    this.http
      .fetch('data/grimoire.json')
      .then(response => response.json())
      .then(themeData => {
        //this.themes = themeData.Response.themeCollection;

        for (var i = 0; i < themeData.Response.themeCollection.length; i++) {
          var theme = themeData.Response.themeCollection[i];

          for (var j = 0; j < theme.pageCollection.length; j++) {
            var page = theme.pageCollection[j];


            for (var k = 0; k < page.cardCollection.length; k++) {
              var card = page.cardCollection[k];

              if (card.cardId == self.id) {
                self.themeName = theme.themeName;
                self.card = card;
                self.cardName = card.cardName;
                document.getElementById('body').className = 'color-' + card
                  .rarity;
                break;
              }
            }
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  get title() {
    return `${this.themeName} :: ${this.cardName}`;
  }
}
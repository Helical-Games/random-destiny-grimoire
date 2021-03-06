import ProgressBar from 'progressbar.js';
import { fetchGrimoire } from 'data-service';

export class RandomCardView {

  constructor() {
    this.themes = null;
    this.card = null;
    this.cardName = '';
    this.pageName = '';
    this.themeName = '';    
    this.bar = null;
    this.color = 'footer-color-1';
    this.shareHref = encodeURIComponent(window.location.href);
    this.timerPlaying = true;
  }

  attached() {

    if (localStorage.rdgTimerPlaying) {
      this.timerPlaying = (localStorage.rdgTimerPlaying == "true");
    }

    fetchGrimoire().then(themeData => {
        this.themes = themeData;
        this.updateCard();
      });
  }

  updateCard() {

    document.getElementById('grimoire-card').scrollIntoView();
    const theme = this.themes[Math.floor(Math.random() * this.themes.length)];
    this.themeName = theme.themeName;
    const page = theme.pageCollection[Math.floor(Math.random() * theme.pageCollection
      .length)];
    this.pageName = page.pageName;
    this.card = page.cardCollection[Math.floor(Math.random() * page.cardCollection
      .length)];
    this.cardName = this.card.cardName;

    document.getElementById('body').className = 'color-' + this.card.rarity;
    this.color = 'footer-color-' + this.card.rarity;   

    var introLength = this.card.cardIntro === undefined || this.card.cardIntro === null ? 0 : this.card.cardIntro.split(" ").length;
    var secs = Math.max(((this.card.cardDescription.split(" ").length + introLength) / 200) *
      60, 10);

    if (this.bar !== null) {
      this.bar.destroy();
    }

    var colorTo = '#2196F3';    
    if (this.card.rarity === 2) {
      colorTo = '#673AB7';
    }
    if (this.card.rarity === 3) {
      colorTo = '#FF9800';
    }

    this.bar = new ProgressBar.Line(document.getElementById('progressBar'), {
      duration: secs * 1000,
      color: '#f44336',
      trailColor: '#e9e9e9',
      svgStyle: {
        width: '100%',
        height: '100%'
      },
      from: {
        color: '#f44336'
      },
      to: {
        color: colorTo
      },
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
      }
    });
    this.bar.set(1.0);

    var timerStop = document.querySelector("#timerStop");
    if (this.timerPlaying) {
      timerStop.classList.add("hidden");
      const self = this;
      this.bar.animate(0.0, {}, function() {
        self.updateCard()
      });
    } else {
      timerStop.classList.remove("hidden");
    }
  }

  toggleTimer() {

    this.timerPlaying = !this.timerPlaying;
    localStorage.setItem("rdgTimerPlaying", this.timerPlaying);

    var timerStop = document.querySelector("#timerStop");
    if (this.timerPlaying === true) {

      timerStop.classList.add("hidden");

      if (this.bar !== null) {
        const self = this;
        this.bar.animate(0.0, {
          duration: this.bar._opts.duration * this.bar.value()
        }, function() {
          self.updateCard();
        });
      }
    } else {

      timerStop.classList.remove("hidden");

      if (this.bar !== null) {
        this.bar.stop();
      }
    }
  }

  detached() {
    if (this.bar !== null) {
      this.bar.destroy();
    }
  }

  get title() {
    return `${this.cardName}`;
  }

  get categoryTitle() {
    return `${this.themeName} :: ${this.pageName}`;
  }
}

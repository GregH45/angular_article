import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  _body: HTMLElement;

  constructor() {
    this._body = document.body;
  }

  ngOnInit() {
    this.hiddenFn();
  }

  private hiddenFn() {
    const keys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let counter = 0;

    this._body.addEventListener('keyup', (e) => {
      if (e.keyCode === keys[counter]) {
        counter++;
      } else {
        counter = 0;
      }

      if (counter === keys.length) {
        counter = 0;
        this.fireFn();
      }
    });
  }

  private fireFn() {
    const dom = document.getElementById('hiddenFunction'),
        elts = dom.getElementsByTagName('li'),
        rand = parseInt((elts.length * Math.random()).toString());

    dom.getElementsByClassName('active')[0].classList.remove('active');
    elts[rand].classList.add('active');
    dom.classList.add('active');

    setTimeout(() => {
      dom.classList.remove('active');
    }, 5000);
  }
}

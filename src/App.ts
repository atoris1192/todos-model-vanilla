import { element, render } from './view/html-util';

export class App {
  constructor() {
    console.log("App initialized");
  }
  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement: any = document.querySelector('#js-form-input');

    formElement.addEventListener('submit', event => {
      event.preventDefault();
      console.log(`Input: ${ inputElement.value }`);
      
    })
  }
  elementSample() {
    // htmlString -> htmlElement
    const newElement = element`<ul>
      <li> --- elementSample --- </li>
    </ul>`;
    document.body.appendChild(newElement);
    // render(newElement, document.body);  // 一旦全要素削除が設定されている
  }
}
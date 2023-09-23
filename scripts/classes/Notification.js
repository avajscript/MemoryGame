import { O } from "../annoying.js";

export class Notification {
  notifyElem = O("notify");
  constructor() {}

  notify(message, timer = null) {
    if (timer == null) {
      timer = 3000;
    }
    const notDiv = document.createElement("div");
    notDiv.classList.add("notification");

    const p = document.createElement("p");
    p.innerHTML = message;

    notDiv.appendChild(p);
    this.notifyElem.appendChild(notDiv);

    setTimeout(() => {
      this.notifyElem.removeChild(notDiv);
    }, timer);
  }
}

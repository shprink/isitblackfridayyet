import { Component, h } from "@stencil/core";
import getYear from "date-fns/getYear";
import { getBlackFridayDate, isItBlackFriday, isItSoon } from "./dates.utils";

@Component({
  tag: "app-jumbo",
  styles: `
    :host {
      text-align: center;
    }
    .title {
      font-size: 9rem;
      color: var(--title-color, black);
    }
    .title small {
      display: block;
      font-size: 20%;
      color: var(--subtitle-color, grey);
    }
  `,
  shadow: true
})
export class AppJumboComponent {
  todayDate = new Date();
  blackFridayDate = getBlackFridayDate(getYear(this.todayDate));

  render() {
    return (
      <div>
        <h1 class="title">
          {isItBlackFriday(this.todayDate)}
          <small class="subtitle">{isItSoon(this.todayDate)}</small>
        </h1>
      </div>
    );
  }
}

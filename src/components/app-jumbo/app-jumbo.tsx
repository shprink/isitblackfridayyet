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
      color: var(--light-color);
    }
    .title small {
      display: block;
      font-size: 20%;
      color: var(--light-subtitle-color);
    }

    @media (prefers-color-scheme: dark) {
      .title {
        color: var(--dark-color);
      }
      .title small {
        color: var(--dark-subtitle-color);
      }
    }
    @media (prefers-color-scheme: light) {
      .title {
        color: var(--light-color);
      }
      .title small {
        color: var(--light-subtitle-color);
      }
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

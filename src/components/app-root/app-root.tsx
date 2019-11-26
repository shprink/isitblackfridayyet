import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <Host>
        <header>
          <a
            href="https://twitter.com/isitblackfriday"
            target="_blank"
            rel="noreferrer"
          >
            #isItBlackFridayYet
          </a>{' '}
          ?
        </header>

        <main>
          <app-jumbo></app-jumbo>
        </main>

        <footer>
          <app-footer></app-footer>
        </footer>
      </Host>
    );
  }
}

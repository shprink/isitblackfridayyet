import { Component, h } from "@stencil/core";

@Component({
  tag: "app-footer",
  styles: `
    :host {
      font-size: 1rem;
    }
  `,
  shadow: true
})
export class AppFooterComponent {
  render() {
    return (
      <p>
        Made in 🇫🇷 by{" "}
        <a
          href="https://twitter.com/julienrenaux"
          target="_blank"
          rel="noreferrer"
        >
          @julienrenaux
        </a>{" "}
        using{" "}
        <a href="https://stenciljs.com/" target="_blank" rel="noreferrer">
          StencilJS
        </a>
      </p>
    );
  }
}

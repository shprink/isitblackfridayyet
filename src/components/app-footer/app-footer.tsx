import { Component, h } from "@stencil/core";

@Component({
  tag: "app-footer",
  styles: `
    :host {
      font-size: 1rem;
    }

    a {
      color: var(--light-link-color);
    }
    a:hover {
      color: var(--light-link-hover-color);
    }

    @media (prefers-color-scheme: dark) {
      a {
        color: var(--dark-link-color);
      }
      a:hover {
        color: var(--dark-link-hover-color);
      }
    }
    @media (prefers-color-scheme: light) {
      a {
        color: var(--light-link-color);
      }
      a:hover {
        color: var(--light-link-hover-color);
      }
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

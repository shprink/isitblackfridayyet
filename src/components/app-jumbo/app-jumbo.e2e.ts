import { newE2EPage } from "@stencil/core/testing";

describe("app-jumbo", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<app-jumbo></app-jumbo>");

    const element = await page.find("app-jumbo");
    expect(element).toHaveClass("hydrated");
  });
});

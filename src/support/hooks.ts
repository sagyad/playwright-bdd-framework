import { Before, After, Status } from "@cucumber/cucumber";
import { CustomWorld } from "./world";

Before(async function (this:CustomWorld){
  await this.launchBrowser();
})

After(async function(this:CustomWorld,scenario){
  if(scenario.result?.status === Status.FAILED){
    const timestamp = new Date().toISOString().replace(/[:.]/g,"-");
    const screenshotName = `${scenario.pickle.name}-${timestamp}`;
    const screenshot = await this.page.screenshot({
      path: `reports/screenshots/${screenshotName}.png`,
      fullPage: true,
    });
    this.attach(screenshot, "image/png");
  }
  await this.closeBrowser();
});

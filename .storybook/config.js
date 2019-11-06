import { configure, addDecorator } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import { withInfo } from "@storybook/addon-info";
import centered from "@storybook/addon-centered/react";
import { withA11y } from "@storybook/addon-a11y";
import "antd/dist/antd.less";

addDecorator(centered);
addDecorator(withA11y);
addDecorator(
  withInfo({
    inline: false,
    header: true,
    source: true
  })
);

setTimeout(
  () =>
    withOptions({
      showAddonPanel: true,
      addonPanelInRight: true,
      theme: {
        brandTitle: "HappyHooks",
        brandUrl: "http://www.baidu.com"
      }
    }),
  1000
);

// 自动加载stories目录下story
const req = require.context("../stories", true, /.story.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

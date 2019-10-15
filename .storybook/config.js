import { configure, addDecorator } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import { setDefaults } from "@storybook/addon-info";
import centered from "@storybook/addon-centered";
import { checkA11y } from "@storybook/addon-a11y";
import "antd/dist/antd.less";

addDecorator(centered);
addDecorator(checkA11y);

setDefaults({
  inline: false,
  header: true,
  source: true
});

setTimeout(
  () =>
    setOptions({
      name: "HappyHooks",
      url: "http://www.baidu.com",
      showAddonPanel: true,
      addonPanelInRight: true
    }),
  1000
);

// 自动加载stories目录下story
const req = require.context("../stories", true, /.story.jsx$/);
req.keys().forEach(filename => req(filename));

configure(loadStories, module);

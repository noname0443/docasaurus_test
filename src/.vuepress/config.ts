import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/docasaurus_test/",

  lang: "en-US",
  title: "mysync",
  description: "A mysync docs",

  theme,
});

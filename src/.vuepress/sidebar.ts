import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Installation",
      icon: "download",
      prefix: "installation/",
      children: "structure",
    },
    {
      text: "Usage",
      icon: "book",
      prefix: "usage/",
      children: "structure",
    },
    {
      text: "Docs",
      icon: "book",
      prefix: "docs/",
      children: "structure",
    },
  ],
});

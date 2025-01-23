import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Installation",
      icon: "book",
      prefix: "installation/",
      link: "installation/",
      children: "structure",
    },
    {
      text: "Usage",
      icon: "book",
      prefix: "usage/",
      link: "usage/",
      children: "structure",
    },
    {
      text: "Docs",
      icon: "book",
      prefix: "docs/",
      link: "docs/",
      children: "structure",
    },
  ],
});

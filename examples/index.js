const exampleList = document.querySelector(".exampleList");
const exampleFrame = document.querySelector(".exampleFrame");
const seeExampleButton = document.querySelector(".seeExample");

exampleList.addEventListener("click", (e) => {
  if (e.target instanceof HTMLAnchorElement) {
    e.preventDefault();
    const example = e.target.querySelector("link").getAttribute("href");
    const exampleName = e.target.getAttribute("data-example");
    exampleFrame.src = example;
    exampleFrame.classList.remove("unfade");
    exampleFrame.classList.add("fade");
    seeExampleButton.href = `https://github.com/tochibedford/custom-curses/tree/master/examples/${exampleName}`;
  }
});

exampleFrame.addEventListener("load", () => {
  exampleFrame.contentWindow.focus();
  exampleFrame.classList.add("unfade");
  exampleFrame.classList.remove("fade");
});

const exampleList = document.querySelector(".exampleList");
const exampleFrame = document.querySelector(".exampleFrame");
exampleList.addEventListener("click", (e) => {
  if (e.target instanceof HTMLAnchorElement) {
    e.preventDefault();
    const example = e.target.querySelector("link").getAttribute("href");
    exampleFrame.src = example;
    exampleFrame.classList.add("fade");
    setTimeout(() => {
      exampleFrame.classList.remove("fade");
    }, 200);
  }
});

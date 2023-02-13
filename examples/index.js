const exampleList = document.querySelector(".exampleList");
const exampleFrame = document.querySelector(".exampleFrame");
exampleList.addEventListener("click", (e) => {
  if (e.target instanceof HTMLAnchorElement) {
    e.preventDefault();
    const example = e.target.getAttribute("data-example");
    const examplePath = `./${example}/index.html`;
    exampleFrame.src = examplePath;
    exampleFrame.classList.add("fade");
    setTimeout(() => {
      exampleFrame.classList.remove("fade");
    }, 200);
  }
});

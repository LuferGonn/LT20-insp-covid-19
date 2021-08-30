const setOpt = (li) => {
  let opts = document.querySelector(".nav ul li[class=\"is-active\"]");

  if (li.getAttribute("opt") !== opts.getAttribute("opt")) {
    let option = ["arychart", "arychart2", "vis", "vis2"];
    let iframe = document.querySelector("#graphnw");

    option = option[parseInt(li.getAttribute("opt"))];
    option = "pages/" + option + ".html";
    opts.removeAttribute("class");
    li.setAttribute("class", "is-active");
    iframe.setAttribute("src", option);
  }
};

window.onload = () => {
  document.querySelectorAll(".nav ul li").forEach(li => {
    li.addEventListener("click", () => {
      setOpt(li);
    });
  });
};

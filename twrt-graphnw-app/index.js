const createChart = (container, data) => {
  container.removeChild(
    document.querySelector('.loading')
  );

  anychart.onDocumentReady(() => {
    let anyct = anychart.graph(data);
    anyct.interactivity().zoomOnMouseWheel(true);
    anyct.title('');
    anyct.container('graphnw');
    anyct.draw();
  });
};

const getData = async (data) => {
  let url = "https://nameless-shore-42970.herokuapp.com";

  url += "/retweets/" + data.type + "/" + data.value + "?level=" + data.level;
  if (document.querySelector("#ctexact").value !== "") url += "&ctexact=" + encodeURIComponent(document.querySelector("#ctexact").value);
  if (document.querySelector("#mention").value !== "") url += "&mention=" + document.querySelector("#mention").value;
  if (document.querySelector("#hashtag").value !== "") url += "&hashtag=" + document.querySelector("#hashtag").value;

  return await fetch(url).then(response => response.json());
}

const generateNw = () => {
  let container = document.querySelector("#graphnw");
  let type = document.querySelector("select[name=\"type\"]").value;
  let level = parseInt(document.querySelector("select[name=\"level\"]").value);
  let value = document.querySelector("#value").value;

  if (value !== "") {
    let v = document.querySelector("span[value]");

    if (v.getAttribute("value") === value && parseInt(v.getAttribute("level")) === level) return 0;
    
    container.innerHTML = "<div class=\"loading\"></div>";
    v.textContent = value;
    v.setAttribute("value", value);
    v.setAttribute("level", level);

    let data = {
      "level": level,
      "type": type,
      "value": value
    };

    getData(data).then(data => {
      if (data.log !== undefined) {
        data.log.replace(/\n/g, "<br/>");
        document.querySelector(".log").innerHTML = data.log;
      }

      if (data.arychart !== undefined) createChart(container, data.arychart);
      else container.textContent = "No data";
    });
  }
};

window.onload = () => {
    document.querySelector("#generate").onclick = () => generateNw();
    document.querySelector("#more-option").addEventListener('click', () => {
      let moreOpt = document.querySelector("#more-option span");

      if (moreOpt.getAttribute("active") === "0") {
        moreOpt.setAttribute("active", "1");
        moreOpt.textContent = "-";
        document.querySelector("#more-option-content").setAttribute("class", "");
      }else {
        moreOpt.setAttribute("active", "0");
        moreOpt.textContent = "+";
        document.querySelector("#more-option-content").setAttribute("class", "is-hidden");
      }
    });
};
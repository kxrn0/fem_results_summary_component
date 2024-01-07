import "reset-css";
import "./styles/style.scss";
import "./styles/base.scss";
import "./styles/summary.scss";
import "./styles/spinner.scss";
import get_data from "./javascripts/api";

const summary = document.querySelector(".summary")!;
const result: HTMLDivElement = summary.querySelector(".result")!;
const value: HTMLParagraphElement = result.querySelector(".value")!;
const message: HTMLParagraphElement = result.querySelector(".message")!;
const score: HTMLParagraphElement = result.querySelector(".orb .fs-h1")!;

async function get_result() {
  const res = await get_data();

  value.innerText = res.result.value;
  message.innerText = res.result.message;
  summary.classList.add("visible");

  // result.classList.add(res.result.value);
  result.classList.add("average");

  setTimeout(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count === res.score) return clearInterval(interval);

      score.innerText = `${count++}`.padStart(2, "0");
    }, 10);
  }, 330);
}

get_result();

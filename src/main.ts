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
const duration = 330;

async function get_summary() {
  const res = await get_data();

  value.innerText = res.result.value;
  message.innerText = res.result.message;
  summary.classList.add("visible");

  result.classList.add(res.result.value);

  const reaction: HTMLParagraphElement = summary.querySelector(
    ".category.reaction .score"
  )!;
  const memory: HTMLParagraphElement = summary.querySelector(
    ".category.memory .score"
  )!;
  const verbal: HTMLParagraphElement = summary.querySelector(
    ".category.verbal .score"
  )!;
  const visual: HTMLParagraphElement = summary.querySelector(
    ".category.visual .score"
  )!;
  const categories = [
    { name: "reaction", element: reaction },
    { name: "memory", element: memory },
    { name: "verbal", element: verbal },
    { name: "visual", element: visual },
  ];

  categories.forEach((cat) => {
    setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        if (count === (res.scores as any)[cat.name])
          return clearInterval(interval);

        cat.element.innerText = `${count++}`;
      }, duration / 20);
    }, 5 * duration);
  });

  setTimeout(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count === res.score) return clearInterval(interval);

      score.innerText = `${count++}`.padStart(2, "0");
    }, duration / 50);
  }, 3 * duration);
}

get_summary();

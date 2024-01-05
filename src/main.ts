import "reset-css";
import "./styles/style.scss";

async function fun() {
  const res = await fetch("/data.json");
  const json = await res.json();

  console.log(json);
}

fun();

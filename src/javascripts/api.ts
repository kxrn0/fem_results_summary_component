import random from "./random";

type ResponseType = {
  result: { value: string; message: string };
  score: number;
  scores: { reaction: number; memory: number; verbal: number; visual: number };
};

export default function get_data(): Promise<ResponseType> {
  return new Promise((resolve) => {
    const reaction = random(0, 100);
    const memory = random(0, 100);
    const verbal = random(0, 100);
    const visual = random(0, 100);
    const score = ~~((reaction + memory + verbal + visual) / 4);
    const result = { value: "", message: "" };

    if (score >= 75) {
      result.value = "great";
      result.message =
        "Your performance exceed 75% of the people conducting the test here!";
    } else if (score >= 50) {
      result.value = "average";
      result.message =
        "Your performance is average. You are likely a very boring person.";
    } else if (score >= 25) {
      result.value = "bad";
      result.message =
        "Your performance was below average. Please try harder next time!";
    } else {
      result.value = "terrible";
      result.message =
        "Your performance was terrible. You are a bad person and should feel bad.";
    }

    setTimeout(
      () =>
        resolve({
          result,
          score,
          scores: { reaction, memory, verbal, visual },
        }),
      random(1000, 1500)
    );
  });
}

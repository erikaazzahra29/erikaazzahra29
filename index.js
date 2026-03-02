document.addEventListener("DOMContentLoaded", () => {
  const text = "WELCOME";

  const delay = 200;
  const animateBy = "chars";
  const direction = "top";

  document.body.classList.add("welcome-active");

  const overlay = document.createElement("div");
  overlay.id = "welcome-overlay";

  const noise = document.createElement("div");
  noise.id = "welcome-noise";

  const sweep = document.createElement("div");
  sweep.id = "welcome-sweep";

  const flash = document.createElement("div");
  flash.id = "welcome-flash";

  const p = document.createElement("p");
  p.id = "welcome-text";

  overlay.appendChild(noise);
  overlay.appendChild(sweep);
  overlay.appendChild(flash);
  overlay.appendChild(p);
  document.body.appendChild(overlay);

  const parts = animateBy === "words" ? text.split(" ") : text.split("");

  parts.forEach((seg, i) => {
    const span = document.createElement("span");
    span.className = "seg";
    span.textContent = seg === " " ? "\u00A0" : seg;

    span.style.setProperty("--d", `${(i * delay) / 1000}s`);

    if (direction === "bottom") {
      span.style.transform = "translateY(50px)";
    }

    p.appendChild(span);

    if (animateBy === "words" && i < parts.length - 1) {
      const space = document.createElement("span");
      space.className = "seg";
      space.textContent = "\u00A0";
      space.style.setProperty("--d", `${((i + 0.25) * delay) / 1000}s`);
      p.appendChild(space);
    }
  });

  const enterMain = () => {
    document.body.classList.remove("welcome-active");
    document.body.classList.add("main-ready");

    const app = document.getElementById("app");
    if (app) app.setAttribute("aria-hidden", "false");

    startDynamicText();
  };

  const spans = Array.from(p.querySelectorAll(".seg"));
  const lastSpan = spans[spans.length - 1];

  if (lastSpan) {
    lastSpan.addEventListener("animationend", (e) => {
      if (e.animationName !== "blurTextIn") return;

      setTimeout(() => {
        overlay.classList.add("is-leaving");

        const removeAfter = () => {
          overlay.removeEventListener("transitionend", removeAfter);
          overlay.remove();
          enterMain();
        };

        overlay.addEventListener("transitionend", removeAfter);

        setTimeout(() => {
          if (document.getElementById("welcome-overlay")) {
            overlay.remove();
            enterMain();
          }
        }, 900);
      }, 450);
    });
  } else {
    enterMain();
  }
});

function startDynamicText() {
  const el = document.getElementById("dynamicText");
  if (!el) return;

  const texts = [
    "Erika Azzahra",
    "What's up?",
    "Welcome to my space",
    "Let’s work together."
  ];

  let idx = 0;
  el.textContent = texts[idx];

  setInterval(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(6px)";

    setTimeout(() => {
      idx = (idx + 1) % texts.length;
      el.textContent = texts[idx];
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 260);
  }, 3000);
}
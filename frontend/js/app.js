const searchInput = document.querySelector(".hero-search input");
const searchButton = document.querySelector(".hero-search button");
const categoryButtons = document.querySelectorAll(".categories button");
const vehicleCards = document.querySelectorAll(".vehicle-card");

function filterVehicles(keyword) {
  keyword = keyword.toLowerCase();

  vehicleCards.forEach(card => {
    const text = card.innerText.toLowerCase();

    if (text.includes(keyword)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchButton.addEventListener("click", () => {
  filterVehicles(searchInput.value);
});

searchInput.addEventListener("keyup", () => {
  filterVehicles(searchInput.value);
});

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.innerText.toLowerCase();

    vehicleCards.forEach(card => {
      const text = card.innerText.toLowerCase();

      if (
        text.includes(category) ||
        category === "ending today" ||
        category === "under $10k"
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

function startCountdown() {
  const timers = document.querySelectorAll(".timer");

  timers.forEach(timer => {
    let text = timer.innerText.replace("Ends in:", "").trim();
    let parts = text.split(":");

    let hours = parseInt(parts[0]);
    let minutes = parseInt(parts[1]);
    let seconds = parseInt(parts[2]);

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    setInterval(() => {
      if (totalSeconds <= 0) {
        timer.innerText = "Auction Ended";
        return;
      }

      totalSeconds--;

      let h = Math.floor(totalSeconds / 3600);
      let m = Math.floor((totalSeconds % 3600) / 60);
      let s = totalSeconds % 60;

      timer.innerText =
        "Ends in: " +
        String(h).padStart(2, "0") + ":" +
        String(m).padStart(2, "0") + ":" +
        String(s).padStart(2, "0");
    }, 1000);
  });
}

startCountdown();

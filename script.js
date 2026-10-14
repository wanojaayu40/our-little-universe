// OUR LITTLE UNIVERSE — interaksi website romantis
const envelopeButton = document.querySelector("#envelopeButton");
const loveLetter = document.querySelector("#loveLetter");
const closeLetter = document.querySelector("#closeLetter");
const giftButton = document.querySelector("#giftButton");
const surpriseMessage = document.querySelector("#surpriseMessage");
const heartBurst = document.querySelector("#heartBurst");
const confettiLayer = document.querySelector("#confettiLayer");
const toast = document.querySelector("#toast");
const musicButton = document.querySelector("#musicButton");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

envelopeButton.addEventListener("click", () => {
  const isOpen = !loveLetter.hidden;
  loveLetter.hidden = isOpen;
  envelopeButton.classList.toggle("open", !isOpen);
  envelopeButton.setAttribute("aria-expanded", String(!isOpen));
  envelopeButton.querySelector(".envelope-hint").textContent = isOpen ? "ketuk untuk membuka" : "surat dibuka ♡";
  if (!isOpen) {
    window.setTimeout(() => loveLetter.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
  }
});

closeLetter.addEventListener("click", () => {
  loveLetter.hidden = true;
  envelopeButton.classList.remove("open");
  envelopeButton.setAttribute("aria-expanded", "false");
  envelopeButton.querySelector(".envelope-hint").textContent = "ketuk untuk membuka";
  envelopeButton.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelectorAll(".reason-card").forEach((card) => {
  card.addEventListener("click", () => {
    const wasActive = card.classList.contains("active");
    document.querySelectorAll(".reason-card").forEach((other) => {
      other.classList.remove("active");
      other.setAttribute("aria-pressed", "false");
    });
    if (!wasActive) {
      card.classList.add("active");
      card.setAttribute("aria-pressed", "true");
    }
  });
});

giftButton.addEventListener("click", () => {
  const isOpen = !surpriseMessage.hidden;
  surpriseMessage.hidden = isOpen;
  giftButton.setAttribute("aria-expanded", String(!isOpen));
  giftButton.querySelector(".gift-box").textContent = isOpen ? "🎁" : "💝";
  giftButton.querySelector(".gift-label").textContent = isOpen ? "open me" : "surprise unlocked ♡";
  if (!isOpen) {
    createHeartBurst(24);
    window.setTimeout(() => surpriseMessage.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
  }
});

heartBurst.addEventListener("click", () => {
  createHeartBurst(42);
  showToast("Peluk virtual terkirim! Semoga kamu tersenyum hari ini ♡");
});

function createHeartBurst(amount) {
  const symbols = ["♡", "♥", "💗", "✦", "💕", "✨"];
  for (let i = 0; i < amount; i += 1) {
    const heart = document.createElement("span");
    heart.className = "confetti-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${2.5 + Math.random() * 3}s`;
    heart.style.animationDelay = `${Math.random() * 0.7}s`;
    heart.style.fontSize = `${14 + Math.random() * 22}px`;
    heart.style.color = ["#e9a9ca", "#b99bdc", "#d8a6ef", "#f2c9df"][Math.floor(Math.random() * 4)];
    confettiLayer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 6500);
  }
}

// Tombol musik tidak memutar audio otomatis. Pengunjung bisa memilih file musik sendiri
// jika ingin menambahkan audio pada proyek ini.

const backgroundMusic = document.querySelector("#backgroundMusic");

musicButton.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();

      musicButton.setAttribute("aria-pressed", "true");
      musicButton.querySelector("span").textContent = "Musik: menyala";
      showToast("Musik romantis diputar ♡");
    } catch (error) {
      showToast("Musik gagal diputar. Periksa file MP3 kamu.");
      console.error("Gagal memutar musik:", error);
    }
  } else {
    backgroundMusic.pause();

    musicButton.setAttribute("aria-pressed", "false");
    musicButton.querySelector("span").textContent = "Musik: mati";
    showToast("Musik dijeda ♡");
  }
});


// Efek muncul saat bagian halaman masuk ke layar.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

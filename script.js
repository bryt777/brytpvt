const profiles = {
  telegram: {
    title: "Telegram", eyebrow: "SOCIAL PROFILE", icon: "➤",
    description: "Open my Telegram profile and send me a message.",
    detail: "@xchup", url: "https://t.me/xchup", action: "Open Telegram",
    image: "https://cdn.simpleicons.org/telegram/76D9FF", glow: "rgba(80,190,255,.30)"
  },
  whatsapp: {
    title: "WhatsApp", eyebrow: "CONTACT", icon: "◉",
    description: "Message me directly on WhatsApp.",
    detail: "+62 838 7079 6188", url: "https://wa.me/6283870796188", action: "Message on WhatsApp",
    image: "https://cdn.simpleicons.org/whatsapp/5EE8A7", glow: "rgba(94,232,167,.28)"
  },
  instagram: {
    title: "Instagram", eyebrow: "SOCIAL PROFILE", icon: "◎",
    description: "Visit my Instagram profile.",
    detail: "@_.zbil", url: "https://instagram.com/_.zbil", action: "Open Instagram",
    image: "https://cdn.simpleicons.org/instagram/FF9BC9", glow: "rgba(255,110,190,.27)"
  },
  showcase: {
    title: "Showcase", eyebrow: "COMMUNITY", icon: "➤",
    description: "Visit my Telegram showcase and updates channel.",
    detail: "t.me/xchup", url: "https://t.me/xchup", action: "Open showcase",
    image: "https://cdn.simpleicons.org/telegram/5EE8C1", glow: "rgba(94,232,193,.28)"
  },
  bgmi: {
    title: "BGMI", eyebrow: "GAME PROFILE", icon: "B",
    description: "Use this player ID to find my BGMI profile.",
    detail: "Player ID: 552324971", url: "", action: "Copy player ID",
    image: "", glow: "rgba(95,145,255,.30)", fallback: "B"
  },
  freefire: {
    title: "Free Fire", eyebrow: "GAME PROFILE", icon: "✦",
    description: "My Free Fire in-game name and UID.",
    detail: "UID: 3280218628", url: "", action: "Copy game details",
    image: "", glow: "rgba(255,165,75,.28)", fallback: "✦"
  },
  clashofclans: {
    title: "Clash of Clans", eyebrow: "GAME PROFILE", icon: "CoC",
    description: "Use this player tag to find my Clash of Clans profile.",
    detail: "Player Tag: #GYCUVYCG8", url: "https://link.clashofclans.com/en?action=OpenPlayerProfile&tag=GYCUVYCG8", action: "Open game profile",
    image: "", glow: "rgba(255,190,90,.28)", fallback: "CoC"
  }
};

const modalBackdrop = document.getElementById("modalBackdrop");
const modalImage = document.getElementById("modalImage");
const modalImageFallback = document.getElementById("modalImageFallback");
const modalVisual = document.querySelector(".modal-visual");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalDetail = document.getElementById("modalDetail");
const modalOpen = document.getElementById("modalOpen");
const modalCopy = document.getElementById("modalCopy");
const modalClose = document.getElementById("modalClose");
const modalCloseInner = document.getElementById("modalCloseInner");
const toast = document.getElementById("toast");
let activeProfile = null;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1900);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard ✓");
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    showToast(ok ? "Copied to clipboard ✓" : "Copy unavailable — please copy manually");
  }
}

function openProfile(key) {
  const profile = profiles[key];
  if (!profile) return;
  activeProfile = profile;
  modalImage.onload = () => {
    modalImage.style.display = "block";
    modalImageFallback.style.display = "none";
  };
  modalImage.onerror = () => {
    modalImage.style.display = "none";
    modalImageFallback.style.display = "grid";
  };
  modalImage.alt = profile.title + " icon";
  modalImageFallback.innerHTML = "";
  const fallbackText = document.createElement("span");
  fallbackText.textContent = profile.fallback || profile.icon;
  modalImageFallback.appendChild(fallbackText);
  modalVisual.style.setProperty("--card-glow", profile.glow || "rgba(94,232,193,.25)");
  if (profile.image) {
    modalImage.src = profile.image;
    modalImage.style.display = "block";
    modalImageFallback.style.display = "none";
  } else {
    modalImage.removeAttribute("src");
    modalImage.style.display = "none";
    modalImageFallback.style.display = "grid";
  }
  modalEyebrow.textContent = profile.eyebrow;
  modalTitle.textContent = profile.title;
  modalDescription.textContent = profile.description;
  modalDetail.textContent = profile.detail;
  if (profile.url) {
    modalOpen.href = profile.url;
    modalOpen.textContent = profile.action + " ↗";
    modalOpen.classList.remove("disabled");
    modalOpen.setAttribute("aria-disabled", "false");
  } else {
    modalOpen.href = "#";
    modalOpen.textContent = profile.action;
    modalOpen.classList.add("disabled");
    modalOpen.setAttribute("aria-disabled", "true");
  }
  modalBackdrop.hidden = false;
  modalClose.focus();
}

document.querySelectorAll("[data-card]").forEach(button => {
  button.addEventListener("click", () => openProfile(button.dataset.card));
});
modalClose.addEventListener("click", () => { modalBackdrop.hidden = true; });
modalCloseInner.addEventListener("click", () => { modalBackdrop.hidden = true; });
modalBackdrop.addEventListener("click", event => {
  if (event.target === modalBackdrop) modalBackdrop.hidden = true;
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modalBackdrop.hidden) modalBackdrop.hidden = true;
});

modalCopy.addEventListener("click", () => {
  if (activeProfile) copyText(activeProfile.detail);
});

document.getElementById("copyPage").addEventListener("click", async () => {
  await copyText(window.location.href);
});

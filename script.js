// ===== KREATIVA NETWORK — interactions =====
// 0. Welcoming preloader
document.body.classList.add("gated");
const preloader = document.getElementById("preloader");
const preNum = document.getElementById("preNum");
let preDone = false;
(function countUp(){
  const t0 = performance.now(), dur = 1500;
  (function tick(t){
    const p = Math.min((t - t0) / dur, 1);
    if (preNum) preNum.textContent = Math.round(p * 100);
    if (p < 1 && !preDone) requestAnimationFrame(tick);
  })(t0);
})();
function hidePreloader(){
  if (preDone || !preloader) return;
  preDone = true;
  document.body.classList.add("loaded");
  preloader.classList.add("done");
  setTimeout(() => preloader.remove(), 700);
}
if (document.readyState === "complete") setTimeout(hidePreloader, 1700);
else window.addEventListener("load", () => setTimeout(hidePreloader, 1700));
setTimeout(hidePreloader, 5000); // pengaman bila event load tertunda

const WA_NUMBER = "62895637319465";
const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// 1. Tahun otomatis
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Navbar shadow + tombol ke atas
const navbar = document.getElementById("navbar");
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
  topBtn.classList.toggle("show", window.scrollY > 600);
}, { passive: true });
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// 3. Menu mobile
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => { navLinks.classList.remove("open"); hamburger.classList.remove("open"); })
);

// 4. Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// 5. Counter statistik
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.target;
    const t0 = performance.now(), dur = 1600;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll(".counter").forEach(el => counterIO.observe(el));

// 6. Tab layanan
document.querySelectorAll(".svc-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".svc-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".svc-panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("panel-" + tab.dataset.svc).classList.add("active");
  });
});

// 7. Tombol layanan → WhatsApp dengan pesan siap kirim
document.querySelectorAll("[data-wa]").forEach(btn => {
  btn.href = waLink(btn.dataset.wa + " Bisa info lebih lanjut?");
});

// 8. Filter portofolio
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    document.querySelectorAll(".work").forEach(w => {
      w.classList.toggle("hide", f !== "all" && w.dataset.cat !== f);
    });
  });
});

// 9. Slider testimoni (otomatis + dots)
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let cur = 0, timer;
function go(i) {
  slides[cur].classList.remove("active"); dots[cur].classList.remove("active");
  cur = i;
  slides[cur].classList.add("active"); dots[cur].classList.add("active");
  restart();
}
function restart() { clearInterval(timer); timer = setInterval(() => go((cur + 1) % slides.length), 5000); }
dots.forEach(d => d.addEventListener("click", () => go(+d.dataset.i)));
restart();

// 10. Form kontak → WhatsApp
const toast = document.getElementById("toast");
document.getElementById("waForm").addEventListener("submit", e => {
  e.preventDefault();
  const nama = document.getElementById("fNama").value.trim();
  const butuh = document.getElementById("fButuh").value;
  const msg = `Halo Kreativa Network! Saya ${nama}. Saya butuh: ${butuh}. Mohon info & penawarannya, terima kasih.`;
  toast.textContent = `Terima kasih ${nama}! Membuka WhatsApp…`;
  toast.classList.add("show");
  setTimeout(() => {
    window.open(waLink(msg), "_blank");
    toast.classList.remove("show");
  }, 900);
});

// 11. Kata berputar di headline hero
const rotWord = document.getElementById("rotWord");
if (rotWord && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const words = ["Mesin Penjualan", "Brand Premium", "Omzet Berlipat", "Bisnis Naik Kelas"];
  let wi = 0;
  setInterval(() => {
    rotWord.classList.add("out");
    setTimeout(() => {
      wi = (wi + 1) % words.length;
      rotWord.textContent = words[wi];
      rotWord.classList.remove("out");
      rotWord.classList.add("in");
      setTimeout(() => rotWord.classList.remove("in"), 480);
    }, 340);
  }, 3200);
}

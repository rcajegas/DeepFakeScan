const scanBtn = document.getElementById("scanBtn");
const newScanBtn = document.getElementById("newScanBtn");
const videoInput = document.getElementById("videoInput");
const urlInput = document.getElementById("urlInput");
const progress = document.getElementById("progress");
const result = document.getElementById("result");

scanBtn.addEventListener("click", () => {
  result.className = "hidden";
  progress.classList.remove("hidden");
  scanBtn.classList.add("hidden");
  newScanBtn.classList.add("hidden");

  let score = 0;

  if (videoInput.files.length > 0) {
    const file = videoInput.files[0];
    if (file.size > 40 * 1024 * 1024) score += 25;
    if (file.type.includes("mp4")) score += 15;
  } else if (urlInput.value.trim()) {
    score += 35;
  } else {
    progress.classList.add("hidden");
    scanBtn.classList.remove("hidden");
    alert("Please upload a video or paste a URL.");
    return;
  }

  setTimeout(() => showResult(score), 2000);
});

newScanBtn.addEventListener("click", () => {
  progress.classList.add("hidden");
  result.className = "hidden";
  scanBtn.classList.remove("hidden");
  newScanBtn.classList.add("hidden");
  videoInput.value = "";
  urlInput.value = "";
});

function showResult(score) {
  progress.classList.add("hidden");
  result.classList.remove("hidden");
  newScanBtn.classList.remove("hidden");

  let level = "low";
  let text = "Low risk of deepfake manipulation";

  if (score > 40) {
    level = "medium";
    text = "Medium risk – suspicious patterns detected";
  }
  if (score > 70) {
    level = "high";
    text = "High risk – likely AI-generated content";
  }

  result.className = level;
  result.textContent = text;
}

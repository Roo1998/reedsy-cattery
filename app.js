// Reedsy Cattery prototype, route "Talk through your options with the agent".
// Vue 3 (Reedsy Studio's framework), loaded from a CDN so there is no build step.
// All on-screen words come from content.js.

const { createApp, ref, reactive, computed, nextTick, onMounted, watch } = Vue;

// ---------- icons (Tabler, inline so they work offline) ----------

const ICONS = {
  "arrow-left": '<path d="M5 12h14M5 12l6 6M5 12l6-6"/>',
  "arrow-right": '<path d="M5 12h14M13 18l6-6M13 6l6 6"/>',
  check: '<path d="M5 12l5 5L20 7"/>',
  settings: '<path d="M10.3 4.3c.4-1.8 3-1.8 3.4 0a1.7 1.7 0 0 0 2.6 1.1c1.5-.9 3.3.8 2.4 2.4a1.7 1.7 0 0 0 1 2.5c1.8.4 1.8 3 0 3.4a1.7 1.7 0 0 0-1 2.6c.9 1.5-.9 3.3-2.4 2.4a1.7 1.7 0 0 0-2.6 1c-.4 1.8-3 1.8-3.4 0a1.7 1.7 0 0 0-2.5-1c-1.6.9-3.3-.9-2.4-2.4a1.7 1.7 0 0 0-1.1-2.6c-1.8-.4-1.8-3 0-3.4a1.7 1.7 0 0 0 1.1-2.5c-.9-1.6.9-3.3 2.4-2.4 1 .6 2.3.1 2.5-1.1z"/><circle cx="12" cy="12" r="3"/>',
  paw: '<path d="M14.7 13.5c-1.1-2-1.4-2.5-2.7-2.5s-1.6.5-2.7 2.5c-1.7 3.2-2 3.7-.9 4.6 1.5 1.2 2.4-.1 3.6-.1s2.1 1.3 3.6.1c1.1-.9.8-1.4-.9-4.6z"/><path d="M7.2 9.4c.7 1-.1 1.9-.9 2.1-1 .2-2.1-.6-2.2-1.7-.1-1 .7-1.8 1.5-1.8.6 0 1.2.6 1.6 1.4zM19.6 9.4c-.7 1 .1 1.9.9 2.1 1 .2 2.1-.6 2.2-1.7.1-1-.7-1.8-1.5-1.8-.6 0-1.2.6-1.6 1.4z" transform="translate(-1 0)"/><path d="M9.5 5c.2 1.3-.4 2.5-1.3 2.6S6.5 6.7 6.3 5.4 6.7 2.9 7.6 2.8 9.3 3.7 9.5 5zM14.5 5c-.2 1.3.4 2.5 1.3 2.6s1.7-.9 1.9-2.2-.4-2.5-1.3-2.6-1.7.9-1.9 2.2z"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  scissors: '<circle cx="6" cy="7" r="3"/><circle cx="6" cy="17" r="3"/><path d="M8.6 8.6L19 19M8.6 15.4L19 5"/>',
  brush: '<path d="M3 21v-4a4 4 0 1 1 4 4h-4"/><path d="M21 3a16 16 0 0 0-12.8 10.2"/><path d="M21 3a16 16 0 0 1-10.2 12.8"/><path d="M10.6 9a9 9 0 0 1 4.4 4.4"/>',
  comb: '<path d="M3 7h18v4H3z"/><path d="M5 11v6M8 11v6M11 11v6M14 11v6M17 11v6M20 11v6"/>',
  spray: '<path d="M4 10a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M6 8V5h4v3"/><path d="M14 4h.01M17 4h.01M20 4h.01M17 7h.01M20 7h.01M20 10h.01"/>',
  sparkles: '<path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2-2a2 2 0 0 1-2-2a2 2 0 0 1-2 2zM16 6a2 2 0 0 1 2 2a2 2 0 0 1 2-2a2 2 0 0 1-2-2a2 2 0 0 1-2 2zM9 18a6 6 0 0 1 6-6a6 6 0 0 1-6-6a6 6 0 0 1-6 6a6 6 0 0 1 6 6z"/>',
  "alert-circle": '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
  pencil: '<path d="M4 20h4L18.5 9.5a2.8 2.8 0 0 0-4-4L4 16v4"/><path d="M13.5 6.5l4 4"/>',
  crown: '<path d="M12 6l4 6l5-4l-2 10H5L3 8l5 4z"/>',
  upload: '<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M7 9l5-5 5 5"/><path d="M12 4v12"/>',
  "file-text": '<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 13h6M9 17h6"/>',
  "info-circle": '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/>',
};

const TIcon = {
  props: { name: String, size: { type: Number, default: 18 } },
  template: `<svg class="ti" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="paths"></svg>`,
  computed: { paths() { return ICONS[this.name] || ""; } },
};

// ---------- illustrations ----------

// Flat, outline-free shapes so they sit with the Recraft cats (two tones per colour, like Felix and Hettie)
const RosetteArt = {
  template: `<svg class="rosette" width="48" height="62" viewBox="0 0 56 72" aria-hidden="true">
    <path d="M17 38 L9 68 L21 61 L27 71 L31 41 Z" fill="#5e9fd1"/>
    <path d="M39 38 L47 68 L35 61 L29 71 L25 41 Z" fill="#4a86b8"/>
    <circle cx="28" cy="26" r="24" fill="#e8b33e"/>
    <path d="M28 2 A24 24 0 0 1 28 50 Z" fill="#d9a032"/>
    <circle cx="28" cy="26" r="15" fill="#fbe7b5"/>
    <path d="M21 27 L26 31.5 L35.5 21" fill="none" stroke="#c88307" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
};

// Recraft bowls: the full one fades in over the empty one when food goes in
const BowlArt = {
  props: { state: { type: String, default: "empty" } },
  template: `<span class="bowl" :class="'bowl-' + state" aria-hidden="true">
    <img src="img/bowl-empty.svg" alt="">
    <img class="bowl-food" src="img/bowl-full.svg" alt="">
  </span>`,
};

// ---------- UI components (styled after Reedsy's vui) ----------

const SpeechBubble = {
  props: { tail: { type: String, default: "bottom" } },
  template: `<div class="bubble" :class="'tail-' + tail"><slot /></div>`,
};

const RadioCard = {
  props: { name: String, value: [String, Number], modelValue: [String, Number], title: String, detail: String },
  emits: ["update:modelValue"],
  template: `<label class="radio-card" :class="{ selected: modelValue === value }">
    <input type="radio" :name="name" :value="value" :checked="modelValue === value"
      @change="$emit('update:modelValue', value)">
    <span class="radio-text">
      <span class="radio-title">{{ title }}</span>
      <span v-if="detail" class="detail">{{ detail }}</span>
      <slot />
    </span>
  </label>`,
};

const VSwitch = {
  props: { modelValue: Boolean, label: String },
  emits: ["update:modelValue"],
  template: `<button type="button" class="switch" :class="{ on: modelValue }" role="switch"
    :aria-checked="String(modelValue)" :aria-label="label" @click="$emit('update:modelValue', !modelValue)">
    <span class="knob"></span>
  </button>`,
};

// ---------- app ----------

// Cat illustrations generated in Recraft from a style built on Reedsy's own Felix and Hettie art
const PEN_CATS = [
  // furAll: these coats have no grey to swap, so the groomers recolor every mid-tone instead
  // eating / happy: Recraft poses (Basic plan) so picked cats eat and celebrate like Oscar
  // pen: what each cat is doing in its pen (the sitting src is used once adopted)
  // penFilled: the pen picture with its unpainted white fur filled in (PNG), so the pen bars stay behind the cat
  { src: "img/cat-brown-tabby.svg", alt: "Brown tabby cat", furAll: true, eating: "img/cat-brown-tabby-eating.svg", happy: "img/cat-brown-tabby-happy.svg", pen: "img/cat-brown-tabby-pen.svg", penFilled: "img/cat-brown-tabby-pen.png" },
  { src: "img/cat-siamese.svg", alt: "Siamese cat", furAll: true, eating: "img/cat-siamese-eating.svg", happy: "img/cat-siamese-happy.svg", pen: "img/cat-siamese-pen.svg", penFilled: "img/cat-siamese-pen.png" },
  { src: "img/cat-cream.svg", alt: "Cream long-haired cat", furAll: true, eating: "img/cat-cream-eating.svg", happy: "img/cat-cream-happy.svg", pen: "img/cat-cream-pen.svg", penFilled: "img/cat-cream-pen.png" },
  { src: "img/cat-calico.svg", alt: "Calico cat", furAll: true, eating: "img/cat-calico-eating.svg", happy: "img/cat-calico-happy.svg", pen: "img/cat-calico-pen.svg", penFilled: "img/cat-calico-pen.png" },
  { src: "img/cat-black-lying.svg", alt: "Black cat", sit: "img/cat-black-sitting.svg", eating: "img/cat-black-lying-eating.svg", happy: "img/cat-black-lying-happy.svg", penFilled: "img/cat-black-lying-pen.png" },
  { src: "img/cat-light-tabby.svg", alt: "Light gray tabby cat", eating: "img/cat-light-tabby-eating.svg", happy: "img/cat-light-tabby-happy.svg", pen: "img/cat-light-tabby-pen.svg", penFilled: "img/cat-light-tabby-pen.png" },
];

// ---------- groomers: recolour a cat's fur ----------
// Only the cat's grey fur tones change; the pale blob, transparent white chest and coloured details (nose, bowl) stay.
const FURS = [
  { id: "grey", label: "Gray tabby", swatch: "#6c717a" },
  { id: "ginger", label: "Ginger", swatch: "#d9874a", h: 24, s: 0.65, l: (L) => 0.08 + L * 0.95 },
  { id: "cream", label: "Cream", swatch: "#e8cfa4", h: 38, s: 0.55, l: (L) => 0.45 + L * 0.55 },
  { id: "chocolate", label: "Chocolate", swatch: "#6b4a37", h: 22, s: 0.38, l: (L) => L * 0.75 },
  { id: "black", label: "Black", swatch: "#2b2d33", h: 230, s: 0.06, l: (L) => L * 0.45 },
  { id: "blue", label: "Blue", swatch: "#7d8ea3", h: 212, s: 0.18, l: (L) => L },
];

function hslToHex(h, s, l) {
  const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))).toString(16).padStart(2, "0");
  return "#" + f(0) + f(8) + f(4);
}

// Flat fills and gradient stops both count (the eating pose paints some fur with gradients, in slightly warmer greys)
function recolourSvg(text, fur, all = false) {
  return text.replace(/(fill|stop-color)="(#[0-9a-fA-F]{6}|rgb\((\d+),(\d+),(\d+)\))"/g, (whole, attr, col, rr, gg, bb) => {
    const [r, g, b] = col.startsWith("#") ? [1, 3, 5].map((i) => parseInt(col.slice(i, i + 2), 16)) : [+rr, +gg, +bb];
    const L = (r + g + b) / 765, spread = Math.max(r, g, b) - Math.min(r, g, b);
    if ((!all && spread > 30) || L < 0.18 || L > 0.86) return whole;
    return attr + '="' + hslToHex(fur.h, fur.s, Math.min(0.97, Math.max(0.03, fur.l(L)))) + '"';
  });
}

// ---------- mobile bottom sheets: drag the handle down (or tap it) to close ----------
// Hidden on desktop, where each dialog keeps its close button
const SheetHandle = {
  props: { label: { type: String, default: "Close" } },
  emits: ["close"],
  template: `<button type="button" class="sheet-handle" :aria-label="label" @pointerdown="down" @click="tap"><span aria-hidden="true"></span></button>`,
  setup(props, { emit }) {
    let startY = 0, dragged = false, sheet = null;
    function move(e) {
      const dy = Math.max(0, e.clientY - startY);
      if (dy > 6) dragged = true;
      sheet.style.transition = "none"; sheet.style.transform = `translateY(${dy}px)`;
    }
    function up(e) {
      e.currentTarget.removeEventListener("pointermove", move);
      sheet.style.transition = ""; sheet.style.transform = "";
      if (e.clientY - startY > 80) emit("close");
    }
    function down(e) {
      sheet = e.currentTarget.closest(".sheet"); startY = e.clientY; dragged = false;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.addEventListener("pointermove", move);
      e.currentTarget.addEventListener("pointerup", up, { once: true });
      e.currentTarget.addEventListener("pointercancel", up, { once: true });
    }
    // A drag that falls short of 80px snaps back without closing; a plain tap or Enter closes
    const tap = () => { if (!dragged) emit("close"); dragged = false; };
    return { down, tap };
  },
};

createApp({
  components: { TIcon, RosetteArt, BowlArt, SpeechBubble, RadioCard, VSwitch, SheetHandle },

  setup() {
    const c = CONTENT;
    const screen = ref("centre");          // centre -> quiz -> certificate
    const route = ref(null);
    const step = ref(0);
    const answers = reactive({});           // question id -> answer index
    const catName = ref(c.defaultCatName);
    // Which cat was adopted: Oscar by default; option 3 lets the writer pick one of the pen cats
    const OSCAR = { src: "img/oscar.svg", alt: "Gray tabby cat", eating: "img/oscar-eating.svg", happy: "img/oscar-happy.svg" };
    const cat = ref(OSCAR);
    const pickedCat = ref(null);          // index into PEN_CATS on the choose screen

    // Groomers: the chosen fur applies to every picture of the adopted cat
    const fur = ref("grey");
    const groomOpen = ref(false);
    let furBefore = "grey";
    function openGroomers() { furBefore = fur.value; go("groomers"); }
    function cancelGroomers() { fur.value = furBefore; go("certificate"); }
    function saveGroomers() { go("certificate"); announce("Fur color saved"); }
    const furCache = reactive({});
    function furred(src) {
      if (!src || fur.value === "grey") return src;
      const key = src + "|" + fur.value;
      if (!(key in furCache)) {
        furCache[key] = src;
        const f = FURS.find((x) => x.id === fur.value);
        fetch(src).then((r) => r.text()).then((t) => {
          furCache[key] = URL.createObjectURL(new Blob([recolourSvg(t, f, PEN_CATS.some((p) => p.furAll && [p.src, p.eating, p.happy].includes(src)))], { type: "image/svg+xml" }));
        });
      }
      return furCache[key];
    }
    const toast = ref("");
    const heading = ref(null);

    const question = computed(() => c.questions[step.value]);
    const isLast = computed(() => step.value === c.questions.length - 1);
    const name = computed(() => catName.value.trim() || c.unnamedCat);
    const fill = (s) => s.replaceAll("{name}", name.value);

    // Move focus to the new screen's heading so keyboard and screen reader users follow the change
    function go(next) {
      screen.value = next;
      if (next === "certificate") adopted.value = true;
      nextTick(() => heading.value && heading.value.focus());
    }

    let toastTimer;
    function note(text) {
      toast.value = text;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => (toast.value = ""), 6000);
    }

    // Shown when Continue / Next is pressed before an option is chosen
    const hint = ref("");
    const needChoice = () => (hint.value = "Choose an option to continue.");

    function continueFromCentre() {
      if (!route.value) return needChoice();
      if (route.value === "agent") { step.value = 0; go("quiz"); }
      else if (route.value === "ai") { feedPermission.value = false; feedFile.value = ""; go("ai-read"); }
      else if (route.value === "self") { pickedCat.value = null; go("choose"); }
    }

    // Option 3: the writer picks a cat; it arrives with every AI feature off (feeding it later can change that)
    function adoptPicked() {
      if (pickedCat.value === null) return (hint.value = "Choose a cat to continue.");
      cat.value = PEN_CATS[pickedCat.value];
      Object.assign(answers, c.noAiSettings);
      go("certificate");
      announce(c.chooseRoute.chosenStatus);
    }

    // Option 1: the writer shares their latest work, the agent reads it, and the certificate arrives
    // with suggested settings (still editable, like every route)
    // AI Policy: its own screen inside the cattery; Back returns to wherever it was opened from
    let policyFrom = "centre";
    function openPolicy() { policyFrom = screen.value; go("policy"); }
    function closePolicy() { go(policyFrom); }

    const loadingLine = ref(0);
    const justFed = ref(false);
    // Settings the matchmaker picked (id -> value): each shows a "why" line until the writer changes it
    const matchPicks = reactive({});
    const showWhy = (id) => id in matchPicks && answers[id] === matchPicks[id] && c.aiRoute.reasons[id];
    function findMyCat() {
      if (!feedPermission.value) return (hint.value = "Tick the box to give your permission to continue.");
      loadingLine.value = 0;
      go("ai-matching");
      // One fun line every 2.4s, then the certificate (Skip goes straight there)
      const lines = c.aiRoute.loadingLines.length;
      matchTick = setInterval(() => (loadingLine.value = (loadingLine.value + 1) % lines), 2400);
      matchDone = setTimeout(finishMatching, 2400 * lines);
    }
    let matchTick, matchDone;
    function stopMatching() { clearInterval(matchTick); clearTimeout(matchDone); }
    function finishMatching() {
        stopMatching();
        Object.assign(answers, c.suggestedFromWork);
        Object.assign(matchPicks, c.suggestedFromWork);
        feedPermission.value = false; feedFile.value = "";
        justFed.value = true;   // the cat has just read the work, so no feeding prompt on the certificate
        go("certificate");
        announce(c.aiRoute.matchedStatus);
    }

    // The cat has no name until the writer gives it one; Finish asks for it
    const nameError = ref("");
    const nameInput = ref(null);
    const finishError = ref("");
    // Only once the cat has actually read the work (the matchmaker, or a meal) can it say why World dictionary would help
    const workRead = computed(() => Object.keys(matchPicks).length > 0 || feedState.value === "fed");
    // After a meal, each suggested change needs Accept or Keep Mine before the writer moves on
    function needsDecision(errorRef) {
      if (!Object.keys(suggested).length) return false;
      errorRef.value = c.feedSuggest.decideFirst;
      nextTick(() => document.querySelector(".suggestion .button")?.focus());
      return true;
    }
    const doneError = ref("");
    function doneFeeding() {
      if (feedState.value === "eating" || needsDecision(doneError)) return;
      doneError.value = ""; close();
    }
    function finish() {
      if (needsDecision(finishError)) return;
      if (editingId.value) {
        finishError.value = c.saveFirstError;
        nextTick(() => document.querySelector(".save-setting")?.focus());
        return;
      }
      if (!catName.value.trim()) { nameError.value = c.nameError; nameInput.value?.focus(); return; }
      close();
    }

    // The close button, Escape and the mobile drag handle: on the certificate they ask for the same
    // things as Finish (a name, no unsaved setting), so nobody leaves with a nameless cat by accident
    const requestClose = () => (screen.value === "certificate" ? finish() : close());

    // Questions swap inside a transition, so focus moves once the new one has entered
    const direction = ref("next");
    const focusHeading = () => { const h = document.getElementById("cattery-title"); if (h) h.focus(); };

    function next() {
      if (answers[question.value.id] === undefined) return needChoice();
      if (isLast.value) go("certificate");
      else { direction.value = "next"; step.value++; }
    }

    function back() {
      if (step.value > 0) { direction.value = "back"; step.value--; }
      else go("centre");
    }

    function restart() {
      route.value = null; step.value = 0; catName.value = c.defaultCatName; cat.value = OSCAR; fur.value = "grey"; groomOpen.value = false; editingId.value = null; premiumOpen.value = false; justFed.value = false; nameError.value = ""; editing.value = false; adopted.value = false; infoOpen.value = false;
      feedState.value = "hungry"; feedPermission.value = false; feedFile.value = ""; changed.clear(); Object.keys(suggested).forEach((k) => delete suggested[k]); Object.keys(matchPicks).forEach((k) => delete matchPicks[k]); settingsStatus.value = "";
      tipState.value = "none"; revisedIn.value = false; revising.value = false; typedParas.value = []; happy.value = false; studioView.value = "writing"; cardOpen.value = false;
      draft.splice(0, draft.length, ...c.manuscript.paragraphs); dismissedIssues.clear(); assistItem.value = null; handled = 0; assistStatus.value = "";
      autoOpened = 0; engaged = false; purrLog.splice(0); historyOpen.value = false;
      Object.keys(answers).forEach((k) => delete answers[k]);
      go("centre");
    }

    // Q2 is shown as a switch: answer 0 ("Yes") = on, answer 1 = off
    // A setting's one-line summary; writing support says when it can't work because the cat never reads
    function summaryOf(q) {
      const a = q.answers[answers[q.id]];
      return a.summaryNoReading && setting("reading", 2) === 2 ? a.summaryNoReading : a.summary;
    }
    const switchValue = (q) => answers[q.id] === 0;
    const setSwitch = (q, on) => (answers[q.id] = on ? 0 : 1);

    // Settings summary vs edit mode; focus follows the button that replaces the one pressed
    const editing = ref(false);
    const editButton = ref(null);
    const doneButton = ref(null);
    const settingsStatus = ref("");   // announced, e.g. "Settings saved"
    const plain = (s) => s.replace(/^\(|\)$/g, "");
    let statusTimer;
    // The settings status stays until something replaces it, so the writer can always see where the settings came from
    function announce(text) {
      settingsStatus.value = text;
    }
    function setEditing(on) {
      editing.value = on;
      if (on) changed.clear();
      else announce("Settings saved");
      nextTick(() => (on ? doneButton : editButton).value?.focus());
    }

    // One setting at a time opens in place; focus goes to its control, then back to its Change link
    const editingId = ref(null);
    const premiumOpen = ref(false);
    // Settings only change on Save: opening another setting's Change puts the one being edited back as it was
    let editBefore = null;
    function openSetting(id) {
      if (editingId.value && editingId.value !== id) answers[editingId.value] = editBefore;
      editBefore = answers[id];
      editingId.value = id; changed.delete(id);
      nextTick(() => (document.querySelector(".setting-options input:checked") || document.querySelector(".setting-options input"))?.focus());
    }
    function closeSetting(id) {
      editingId.value = null; finishError.value = "";
      announce("Settings saved");
      nextTick(() => document.querySelector('[data-change="' + id + '"]')?.focus());
    }

    // ---------- feeding: permission or upload -> bowl fills -> Oscar eats -> settings update ----------
    const feedPermission = ref(false);
    const feedFile = ref("");
    const feedState = ref("hungry");          // hungry -> eating -> fed
    const changed = reactive(new Set());      // settings the feed changed, flagged "Updated"
    const suggested = reactive({});           // after a meal: setting id -> suggested answer, waiting for Accept / Keep Mine
    function clearDecideErrors() {
      if (Object.keys(suggested).length) return;
      if (doneError.value) doneError.value = "";
      if (finishError.value === c.feedSuggest.decideFirst) finishError.value = "";
    }
    function feedStatus() {
      const n = Object.keys(suggested).length;
      return n ? fill((n === 1 ? c.feedSuggest.statusOne : c.feedSuggest.status).replace("{n}", n)) : changed.size ? "" : c.feedSuggest.none;
    }
    function suggestFromMeal() {
      changed.clear(); Object.keys(suggested).forEach((k) => delete suggested[k]);
      for (const [id, value] of Object.entries(c.suggestedAfterFeeding)) if (answers[id] !== value) suggested[id] = value;
    }
    function acceptSuggestion(id) {
      logMeal(id, "accepted");
      answers[id] = suggested[id]; delete suggested[id]; changed.add(id);
      announce(feedStatus() || "Settings updated");
      clearDecideErrors();
    }
    function keepMine(id) {
      logMeal(id, "keptMine");
      delete suggested[id];
      announce(feedStatus() || (changed.size ? "Settings updated" : "Kept your settings"));
      clearDecideErrors();
    }
    // Reading set to Regularly or When asked already covers the meal; Never needs a one-off tick (or an upload)
    const readingAllowed = computed(() => setting("reading", 2) !== 2);
    // After a meal the latest chapter has been eaten, so only an uploaded file can feed the cat again
    const canFeed = computed(() => !!feedFile.value || (feedState.value !== "fed" && (readingAllowed.value || feedPermission.value)));

    function openFeed() {
      feedFromStudioFlow.value = false;
      editing.value = false;
      go("feed");
    }

    function pickFile(e) {
      const f = e.target.files[0];
      feedFile.value = f ? f.name : "";
    }

    // Fed from Studio: the whole meal happens in its own modal, then Done goes back to Studio.
    // Fed from the certificate (agent route): the meal shows on the certificate, as before.
    const feedFromStudioFlow = ref(false);
    function startFeeding() {
      if (!canFeed.value) return (hint.value = feedState.value === "fed" ? c.feedNeedsUpload : "Tick the box or choose a file to feed your cat.");
      go(feedFromStudioFlow.value ? "feeding" : "certificate");
      feedState.value = "eating";
      // Prototype stand-in for the AI reading the work: after the meal, apply the suggested profile
      setTimeout(() => {
        suggestFromMeal();   // nothing changes until the writer accepts
        feedState.value = "fed";
        feedPermission.value = false; feedFile.value = "";
        announce(feedStatus());
      }, 3600);
    }

    // Any new choice clears the "choose an option" hint
    watch([route, step, screen, () => ({ ...answers }), feedPermission, feedFile, pickedCat], () => (hint.value = ""));

    // ---------- modal: close, Escape, reopen, focus trap ----------
    // Starts closed on Studio with the Adopt Now button; ?demo= links open straight into a screen
    const open = ref(!["", "studio", "learning"].includes(new URLSearchParams(location.search).get("demo") || ""));
    const adopted = ref(false);   // once the certificate is reached, Oscar lives in Studio
    const dialog = ref(null);
    const trigger = ref(null);
    const infoOpen = ref(false);
    const infoButton = ref(null);

    function close() {
      if (screen.value === "ai-matching") { stopMatching(); screen.value = "ai-read"; }   // closing mid-search cancels it
      open.value = false;
      infoOpen.value = false;
      nextTick(() => trigger.value && trigger.value.focus());
      if (adopted.value) startWriting();
    }

    // ---------- 7b: Oscar plays with your story, driven by the writer's settings ----------
    // Settings: loudness 0 constant / 1 purrs (waits for a typing pause) / 2 quiet (pet to see)
    //           reading 0 regularly / 1 only when asked / 2 never;  assistance 0 on / 1 off
    const studioView = ref("writing");     // writing | learning
    const tipState = ref("none");          // none | reading | ready | dismissed | learned | revised
    const cardOpen = ref(false);
    const petMenuOpen = ref(false);
    const oscarSays = ref("");             // short speech bubble beside Oscar
    const purring = ref(false);
    const happy = ref(false);
    const revisedIn = ref(false);
    const tipPara = ref(null);
    const rereading = ref(false);          // asked to read again after the revision
    let typingNoteShown = false;
    const typingNote = () => "Prototype note: start typing in the manuscript. " + name.value + " waits until you pause before speaking.";
    let lastTyped = 0, timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const setting = (id, fallback) => (answers[id] === undefined ? fallback : answers[id]);
    const showDot = computed(() => (tipState.value === "ready" || !!assistItem.value) && !cardOpen.value);

    // ---------- Writing support: the cat's spelling and grammar suggestions ----------
    // The editor's own text (the bad draft until the revision). Fix It writes here; typing stays in the DOM until synced,
    // so the caret never jumps while the writer types.
    const draft = reactive([...c.manuscript.paragraphs]);
    const dismissedIssues = reactive(new Set());   // Keep As Is: never raised again this session
    const acknowledged = new Set();               // Got It on an explain-only card: not raised again, but the underline stays
    const assistItem = ref(null);                  // the suggestion waiting for (or shown in) the card
    const assistStatus = ref("");                  // announced after Fix It / Keep As Is
    const shownKey = ref(null);                    // Show Me: the suggestion whose words are highlighted in the manuscript
    let handled = 0;
    const TIP_AFTER = Infinity;                    // the repeated-words tip comes after all the suggestions
    // The cat's suggestions need him to read the work, so "never reads" switches them off too (plain red spell-check lines stay)
    const assistOn = () => setting("assistance", 1) === 0 && setting("reading", 2) !== 2 && !revisedIn.value && !revising.value;
    const wordRe = (w, flags = "i") => new RegExp("\\b" + w + "\\b", flags);
    const matchCase = (from, to) => (from[0] === from[0].toUpperCase() ? to[0].toUpperCase() + to.slice(1) : to);
    const editorParas = () => document.querySelectorAll(".editor .editor-para:not(.typed)");
    function syncDraft() {
      if (revisedIn.value || revising.value) return;
      editorParas().forEach((el, i) => { if (i < draft.length && el.textContent !== draft[i]) draft[i] = el.textContent; });
    }
    // Every open issue in manuscript order, read from what is on screen now (so issues the writer fixed by hand drop out)
    function openIssues() {
      const els = editorParas(), seen = new Set(), out = [];
      draft.forEach((d, p) => {
        const t = els[p]?.textContent ?? d;
        for (const [wrong] of Object.entries(c.manuscript.misspelled)) {
          const m = t.match(wordRe(wrong));
          if (m && !dismissedIssues.has("spell:" + wrong) && !seen.has("spell:all")) { seen.add("spell:all"); out.push({ key: "spell:all", kind: "typos", p, at: m.index }); }
        }
        for (const g of c.assist.grammar) {
          const at = t.indexOf(g.original);
          if (at >= 0) out.push({ key: "grammar:" + g.id, kind: "grammar", original: g.original, suggestion: g.suggestion, explainOnly: !!g.explainOnly, message: g.message, p, at });
        }
      });
      return out.sort((a, b) => a.p - b.p || a.at - b.at)
        .filter((x) => !dismissedIssues.has(x.key) && !acknowledged.has(x.key) && (x.kind === "typos" || (!seen.has(x.key) && seen.add(x.key))));
    }
    // The typos still open (not fixed, not ignored), from the editor's text; one summary card covers them all
    const openTypos = computed(() => Object.entries(c.manuscript.misspelled)
      .filter(([wrong]) => !dismissedIssues.has("spell:" + wrong) && draft.some((t) => wordRe(wrong).test(t)))
      .map(([wrong, right]) => ({ wrong, right })));
    const cardMessage = computed(() => {
      const it = assistItem.value;
      if (!it) return "";
      if (it.kind !== "typos") return it.message;
      const t = openTypos.value;
      return t.length === 1 ? c.assist.spellMessage.replace("{wrong}", t[0].wrong).replace("{right}", t[0].right) : c.assist.typosMessage.replace("{n}", t.length);
    });
    function fixWords(words) {
      syncDraft();
      for (const { wrong, right } of words) draft.forEach((t, i) => (draft[i] = t.replace(wordRe(wrong, "gi"), (m) => matchCase(m, right))));
    }

    // Shows the next suggestion, delivered the same way as the tip (by the notification setting)
    function showIssue() {
      if (!assistOn() || cardOpen.value || assistItem.value || studioView.value !== "writing") return;
      const it = openIssues()[0];
      if (!it) { if (tipState.value === "held") tipReady(); return; }   // nothing left: the waiting tip goes next
      assistItem.value = it;
      deliver(() => assistItem.value?.key === it.key && !cardOpen.value, () => openCard(true));
    }
    // Fix It changes the manuscript itself; Keep As Is leaves it and never raises that issue again this session
    function resolveIssue(fix) {
      const it = assistItem.value;
      if (!it) return;
      const h = c.purr.history;
      logPurr(it.kind === "typos" ? h.typos.replace("{n}", openTypos.value.length) : it.message,
        fix === "got" ? "noted" : fix ? (it.kind === "typos" ? "fixedAll" : "fixed") : "kept",
        fix === true ? null : { type: "issue", key: it.key });
      if (fix === "got") acknowledged.add(it.key);
      else if (fix) {
        syncDraft();
        if (it.kind === "typos") fixWords(openTypos.value);
        else { const i = draft.findIndex((t) => t.includes(it.original)); if (i >= 0) draft[i] = draft[i].replace(it.original, it.suggestion); }
      } else dismissedIssues.add(it.key);
      assistStatus.value = fix === "got" ? "Noted" : it.kind === "typos" ? (fix ? "Typos fixed" : "Typos kept as they are") : fix ? "Fixed: " + it.suggestion : "Kept as is: " + it.original;
      handled++; assistItem.value = null; shownKey.value = null; cardOpen.value = false;
      trigger.value?.focus();
      later(() => {
        // A tip that arrived while this card was open goes next; so does a held one once its turn comes
        if (tipState.value === "ready" || (tipState.value === "held" && (handled >= TIP_AFTER || !openIssues().length))) tipReady();
        else showIssue();
      }, 900);
    }
    // Show Me: highlight the words in the manuscript and scroll to them; the card stays open with both choices
    function showInText() {
      if (!assistItem.value) return;
      shownKey.value = assistItem.value.key;
      if (assistItem.value.kind === "typos") return nextTick(() => { const el = typoEls()[0]; if (el) { walking = true; openPopFor(el); } });
      nextTick(() => document.querySelector(".editor .current")?.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
    }
    // Clicking a red line: a small popover with the suggested word, or Ignore (it stops being flagged this session)
    const spellPop = ref(null);
    const spellPopEl = ref(null);
    function onEditorClick(e) {
      const el = e.target.closest(".spell");
      if (!el) { spellPop.value = null; walking = false; return; }
      walking = false;
      openPopFor(el);
    }
    // Show Me on the typo card walks through the typos with the keyboard: the popover opens on each in turn
    let walking = false;
    function openPopFor(el) {
      const wrong = Object.keys(c.manuscript.misspelled).find((k) => k.toLowerCase() === el.textContent.toLowerCase());
      if (!wrong) return;
      const r = el.getBoundingClientRect();
      spellPop.value = { wrong, right: matchCase(el.textContent, c.manuscript.misspelled[wrong]), left: r.left, top: r.bottom + 6 };
      el.scrollIntoView({ block: "center", behavior: "auto" });
      const r2 = el.getBoundingClientRect();
      spellPop.value.left = r2.left; spellPop.value.top = r2.bottom + 6;
      nextTick(() => spellPopEl.value?.querySelector("button")?.focus());
    }
    const typoEls = () => [...document.querySelectorAll(".editor .spell")];
    function nextTypo() {
      const els = typoEls(), i = els.findIndex((e) => e.textContent.toLowerCase() === spellPop.value?.wrong.toLowerCase());
      if (els.length) { walking = true; openPopFor(els[(i + 1) % els.length]); }
    }
    function afterWordChange() {
      spellPop.value = null;
      if (walking) nextTick(() => { const el = typoEls()[0]; if (el) openPopFor(el); else walking = false; });
      // The summary card closes once there is nothing left in it
      if (assistItem.value?.kind === "typos" && !openTypos.value.length) { handled++; assistItem.value = null; cardOpen.value = false; later(showIssue, 900); }
    }
    function fixWord() {
      const w = spellPop.value;
      fixWords([{ wrong: w.wrong, right: c.manuscript.misspelled[w.wrong] }]);
      assistStatus.value = "Fixed: " + w.right;
      logPurr(c.purr.history.typo.replace("{wrong}", w.wrong), "fixed");
      afterWordChange();
    }
    function ignoreWord() {
      dismissedIssues.add("spell:" + spellPop.value.wrong);
      logPurr(c.purr.history.typo.replace("{wrong}", spellPop.value.wrong), "ignored", { type: "issue", key: "spell:" + spellPop.value.wrong });
      assistStatus.value = "Ignored: " + spellPop.value.wrong;
      afterWordChange();
    }
    const fixIssue = () => resolveIssue(true);
    const keepIssue = () => resolveIssue(false);
    const gotIt = () => resolveIssue("got");

    function startWriting() {
      timers.forEach(clearTimeout); timers = [];
      cardOpen.value = false; petMenuOpen.value = false; oscarSays.value = ""; assistItem.value = null; rereading.value = false;
      if (tipState.value === "learned" || tipState.value === "revised") return;
      if (assistOn()) later(showIssue, 5000);   // writing support: the cat's suggestions come first
      // Prototype note: gives the writer time to start typing and see the cat wait (the dot shows, the card holds back)
      // Once per visit, and only in Studio (opening a window clears it)
      if (setting("loudness", 1) === 1 && !typingNoteShown) { typingNoteShown = true; note(typingNote()); }
      // The tip is offered once: after Maybe Later it stays dismissed until the writer asks Oscar to read again.
      // A tip that was waiting when a window opened is offered again; a read cut short by the window starts over.
      const t = tipState.value;
      if (t === "dismissed") return;
      // ...unless reading is now set to never: then the tip is dropped with the setting
      if ((t === "ready" || t === "held") && setting("reading", 2) !== 2) return later(tipReady, 1500);
      tipState.value = "none";
      if (setting("reading", 2) === 0) { tipState.value = "reading"; later(tipReady, 4000); }   // reads on his own
    }

    function tipReady() {
      if (["learned", "revised"].includes(tipState.value) || revising.value) return;   // never interrupt the revision
      // With writing support on, the spelling and grammar suggestions come first; the tip waits for the first few
      if (assistOn() && handled < TIP_AFTER && openIssues().length) { tipState.value = "held"; return showIssue(); }
      tipState.value = "ready";
      deliver(() => tipState.value === "ready" && !cardOpen.value && !assistItem.value, () => openCard(true));
    }

    function deliver(stillWanted, open) {
      const loud = setting("loudness", 1);
      if (asked) { asked = false; return open(); }   // answering "Ask to read": no waiting, no dot
      if (engaged) return open();                    // the writer is working through them: the next one follows on
      if (loud === 2 || autoOpened >= AUTO_LIMIT) return;   // quiet, or two have popped up already: the dot is all                              // quiet: the dot on Oscar is all; the writer pets him to see it
      const wait = () => {                                 // constant (0): straight away, even mid-typing; purrs (1): once the writer stops typing
        if (!stillWanted()) return;
        if (petMenuOpen.value || (loud === 1 && Date.now() - lastTyped < 2500)) return later(wait, 500);   // never cover Oscar's menu
        autoOpened++;
        open();
      };
      wait();
    }

    function openCard(withPurr) {
      cardOpen.value = true; petMenuOpen.value = false; oscarSays.value = "";
      if (withPurr) { purring.value = true; later(() => (purring.value = false), 1600); }
    }

    let menuNext = false, asked = false;
    // Only the first two cards each session open on their own; the rest wait behind the dot and the menu
    const AUTO_LIMIT = 2;
    let autoOpened = 0, engaged = false;
    const waitingCount = ref(0);
    function countWaiting() { waitingCount.value = openIssues().length + (["held", "ready"].includes(tipState.value) ? 1 : 0); }
    function seeWaiting() { petMenuOpen.value = false; engaged = true; openCard(false); }
    function petOscar() {
      oscarSays.value = "";
      // Petting closes an open card first (it waits behind the dot); the next pet opens the menu, which offers it again.
      // With nothing open, a waiting suggestion or tip opens straight away (quiet cats are petted to see them).
      if (cardOpen.value) { cardOpen.value = false; menuNext = true; engaged = false; return; }
      if (!petMenuOpen.value && !menuNext && (assistItem.value || tipState.value === "ready")) { engaged = true; return openCard(false); }
      menuNext = false;
      if (!petMenuOpen.value) countWaiting();
      petMenuOpen.value = !petMenuOpen.value;
    }

    function askToRead() {
      petMenuOpen.value = false;
      if (setting("reading", 2) === 2) { oscarSays.value = c.purr.neverReads; later(() => (oscarSays.value = ""), 4500); return; }
      // After the revision there's nothing to flag: Oscar reads, then praises the writing
      if (tipState.value === "revised") {
        rereading.value = true;
        later(() => { rereading.value = false; oscarSays.value = c.purr.rereadLine; later(() => (oscarSays.value = ""), 4500); }, 2000);
        return;
      }
      tipState.value = "reading";
      // The writer asked, so the answer opens straight away whatever the notification setting
      later(() => {
        asked = true;
        if (assistItem.value && !cardOpen.value) { asked = false; tipState.value = "held"; return openCard(true); }
        tipReady();
      }, 2000);
    }

    // Feeding after adoption: straight to the feed screen; afterwards the certificate shows the meal and updated settings
    // Just for fun: a scratch makes the cat purr, with a few hearts
    const scratching = ref(false);
    // Clear the cat's memory: forgets what it learned from the work (meals, match reasons, kept suggestions).
    // The manuscript and the settings themselves don't change, unless the writer also stops the reading.
    const memoryOpen = ref(false);
    const memoryStop = ref(false);
    const memoryPanel = ref(null);
    function openMemory() {
      petMenuOpen.value = false; cardOpen.value = false; memoryStop.value = false; memoryOpen.value = true;
      nextTick(() => memoryPanel.value?.querySelector(".button.secondary")?.focus());   // focus the safe choice
    }
    function cancelMemory() { memoryOpen.value = false; trigger.value?.focus(); }
    function clearMemory() {
      Object.keys(matchPicks).forEach((k) => delete matchPicks[k]);
      Object.keys(suggested).forEach((k) => delete suggested[k]);
      changed.clear(); dismissedIssues.clear(); handled = 0; autoOpened = 0; engaged = false; purrLog.splice(0);
      feedState.value = "hungry"; justFed.value = false;
      if (tipState.value !== "revised") tipState.value = "none";
      if (memoryStop.value) answers.reading = 2;
      memoryOpen.value = false;
      startWriting();   // starts fresh with the current settings
      oscarSays.value = memoryStop.value ? c.purr.memory.doneStopped : c.purr.memory.done;
      later(() => (oscarSays.value = ""), 5000);
      trigger.value?.focus();
    }
    // Each scratch gets the next reaction: hearts, a purr line, then a slow blink (and round again)
    let scratchCount = 0, scratchTimer;
    const scratchHearts = ref(true);
    function scratch() {
      petMenuOpen.value = false; cardOpen.value = false;
      const r = scratchCount++ % 3;
      scratchHearts.value = r === 0;
      oscarSays.value = r === 0 ? "" : c.purr.scratchLines[r - 1];
      scratching.value = true; purring.value = r !== 2;
      clearTimeout(scratchTimer);   // a quick second scratch replaces the first, not cut short by it
      scratchTimer = setTimeout(() => { scratching.value = false; purring.value = false; if (c.purr.scratchLines.includes(oscarSays.value)) oscarSays.value = ""; }, r === 0 ? 2600 : 4000);
      trigger.value?.focus();
    }
    function feedFromStudio() {
      petMenuOpen.value = false; cardOpen.value = false;
      feedFromStudioFlow.value = true;
      feedPermission.value = false; feedFile.value = "";
      screen.value = "feed"; openCattery();
    }
    function openSettingsFromStudio() { petMenuOpen.value = false; cardOpen.value = false; screen.value = "certificate"; openCattery(); }
    function dismissTip() {
      cardOpen.value = false; tipState.value = "dismissed"; engaged = false; trigger.value?.focus(); later(showIssue, 900);
      logPurr(c.purr.history.tip, "later", { type: "tip" });
    }
    function goLearn() {
      cardOpen.value = false; tipState.value = "learned"; engaged = false; studioView.value = "learning"; nextTick(focusHeading);
      logPurr(c.purr.history.tip, "learning");
    }
    function backToManuscript() {
      studioView.value = "writing";
      nextTick(() => tipPara.value?.focus());
      later(showIssue, 1500);
      note("Prototype note: try rewording the highlighted words.");
    }

    // The repeated words count across the whole chapter; once the writer has cut them down to a few, Oscar is happy
    const REPEAT_TARGET = 3;
    function repeatCount() {
      const text = [...document.querySelectorAll(".editor-para")].map((p) => p.textContent).join(" ").toLowerCase();
      return c.manuscript.repeatedWords.reduce((n, w) => n + (text.match(new RegExp("\\b" + w + "\\b", "g")) || []).length, 0);
    }
    // The manuscript is one tab stop, like a real editor: Tab reaches the first paragraph, and the arrow keys
    // carry on into the next or previous paragraph from its last or first line
    function paraKey(e) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const para = e.currentTarget, down = e.key === "ArrowDown";
      const sel = getSelection();
      if (!sel.rangeCount) return;
      const caret = sel.getRangeAt(0).getClientRects()[0];
      const box = para.getBoundingClientRect(), line = parseFloat(getComputedStyle(para).lineHeight) || 26;
      if (caret && (down ? caret.bottom < box.bottom - line : caret.top > box.top + line)) return;
      let next = down ? para.nextElementSibling : para.previousElementSibling;
      while (next && !next.isContentEditable) next = down ? next.nextElementSibling : next.previousElementSibling;
      if (!next) return;
      e.preventDefault();
      next.focus();
      const range = document.createRange();
      range.selectNodeContents(next);
      range.collapse(down);
      sel.removeAllRanges(); sel.addRange(range);
    }

    function onType() {
      lastTyped = Date.now();
      if (tipState.value === "revised" || !c.manuscript.repeatedWords.length) return;
      if (!["learned", "dismissed", "ready"].includes(tipState.value)) return;
      if (repeatCount() <= REPEAT_TARGET) celebrate();
    }

    function useRevised() { revisedIn.value = true; celebrate(); }

    // Begin Course: a short "course complete" interlude, then the writer revises their own draft on screen.
    // The fixed draft types itself out paragraph by paragraph; the cat only reacts at the end.
    const revising = ref(false);
    const typedParas = ref([]);
    function beginCourse() { studioView.value = "course-done"; nextTick(focusHeading); }
    // Which lines of the fixed draft replace each paragraph of the bad draft (by where each group starts)
    const REVISION_STARTS = ["When I was a child", "I'd climb out of bed", "Far ahead rose", "The others were always waiting",
      "And then, almost every time", "Before anyone could react", "For a moment, nobody moved", "I followed them down",
      "I never remembered", "I would wake in my own bed"];
    function revisionGroups() {
      const fixed = c.manuscript.revisedParagraphs;
      const at = REVISION_STARTS.map((t) => fixed.findIndex((l) => l.startsWith(t)));
      syncDraft();
      return draft.map((bad, i) => ({ bad, lines: fixed.slice(at[i], i + 1 < at.length ? at[i + 1] : fixed.length) }));
    }

    // The writer edits the bad draft in place: each paragraph is selected, deleted, then rewritten as the fixed version
    function returnAndRevise() {
      timers.forEach(clearTimeout); timers = [];
      studioView.value = "writing"; tipState.value = "learned"; cardOpen.value = false; petMenuOpen.value = false; assistItem.value = null;
      const groups = revisionGroups();
      revising.value = true;
      typedParas.value = groups.map((g) => ({ state: "bad", text: g.bad, lines: [] }));
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finish = () => {
        revising.value = false; revisedIn.value = true;
        document.querySelector(".editor")?.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        celebrate();
      };
      if (reduce) { typedParas.value.forEach((b, i) => { b.state = "done"; b.lines = groups[i].lines.slice(); }); return later(finish, 1200); }
      const scrollTo = (i) => document.querySelectorAll(".rev-block")[i]?.scrollIntoView({ block: "center", behavior: "smooth" });
      let g = 0;
      // The writer steps through: each paragraph waits (selected) for Rewrite Next Paragraph, unless Write All was pressed
      const pause = () => {
        if (g >= groups.length) { revisePaused.value = false; return later(finish, 700); }
        if (writeAll) return later(editGroup, 140);
        typedParas.value[g].state = "selected"; scrollTo(g);
        revisePaused.value = true; reviseNext = editGroup;
      };
      const editGroup = () => {
        const block = typedParas.value[g];
        scrollTo(g);
        block.state = "selected";                                   // 1. select the old paragraph
        later(() => {
          block.state = "deleting";                                 // 2. delete it, backspace-style
          const del = () => {
            block.text = block.text.slice(0, Math.max(0, block.text.length - 45));
            if (block.text.length) return later(del, 12);
            block.state = "typing";                                 // 3. type the new version
            const lines = groups[g].lines;
            let li = 0, ch = 0;
            const type = () => {
              if (li >= lines.length) { block.state = "done"; g++; return pause(); }
              if (ch === 0) block.lines.push("");
              ch = Math.min(lines[li].length, ch + (g < 3 ? 12 : 45));   // the first few type slowly enough to read; the rest speed up
              block.lines[block.lines.length - 1] = lines[li].slice(0, ch);
              if (ch >= lines[li].length) { li++; ch = 0; return later(type, 15); }
              later(type, 14);
            };
            later(type, 80);
          };
          del();
        }, 220);
      };
      writeAll = false;
      later(pause, 300);
      nextTick(() => document.querySelector(".revise-next")?.focus());
    }
    const revisePaused = ref(false);
    let reviseNext = null, writeAll = false;
    function nextParagraph() { if (!revisePaused.value) return; revisePaused.value = false; reviseNext?.(); }
    function writeAllNow() { writeAll = true; nextParagraph(); }

    // ---------- Notification history ("See Oscar's previous purrs") ----------
    const purrLog = reactive([]);
    const historyOpen = ref(false);
    const historyPanel = ref(null);
    let logId = 0;
    function logPurr(text, outcome, reopen = null) { purrLog.unshift({ id: ++logId, text, outcome, reopen, available: false }); }
    function logMeal(id, outcome) {
      const q = c.questions.find((x) => x.id === id);
      logPurr(c.purr.history.meal.replace("{setting}", q.answers[suggested[id]].summary[0] + ": " + q.answers[suggested[id]].summary[1]), outcome);
    }
    // Is a kept issue still in the text, so it can be shown again?
    function stillThere(key) {
      syncDraft();
      if (key === "spell:all") return Object.keys(c.manuscript.misspelled).some((w) => draft.some((t) => wordRe(w).test(t)));
      if (key.startsWith("spell:")) return draft.some((t) => wordRe(key.slice(6)).test(t));
      const g = c.assist.grammar.find((x) => "grammar:" + x.id === key);
      return !!g && draft.some((t) => t.includes(g.original));
    }
    function openHistory() {
      petMenuOpen.value = false; cardOpen.value = false;
      purrLog.forEach((e) => (e.available = !!e.reopen && (e.reopen.type === "tip" ? !["learned", "revised"].includes(tipState.value) : stillThere(e.reopen.key))));
      historyOpen.value = true;
      nextTick(() => historyPanel.value?.querySelector("button")?.focus());
    }
    function closeHistory() { historyOpen.value = false; trigger.value?.focus(); }
    function showAgain(e) {
      const r = e.reopen;
      historyOpen.value = false; e.reopen = null; e.available = false;
      if (r.type === "tip") { assistItem.value = null; tipState.value = "ready"; engaged = true; return openCard(false); }
      dismissedIssues.delete(r.key); acknowledged.delete(r.key);
      const it = openIssues().find((x) => x.key === r.key || (r.key.startsWith("spell:") && x.kind === "typos"));
      if (!it) return trigger.value?.focus();
      assistItem.value = it; engaged = true; openCard(false);
    }

    function celebrate() {
      tipState.value = "revised"; cardOpen.value = false; happy.value = true; oscarSays.value = c.purr.happyLine;
      later(() => { happy.value = false; oscarSays.value = ""; }, 7000);
    }

    // Manuscript HTML: repeated words marked, red spell-check lines always; grammar lines only when writing support is on
    const escHtml = (s) => s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
    // Before the course the editor shows the 'bad draft'; after the revision, the whole fixed draft
    // First paragraph using one of the repeated words: where focus lands after Reedsy Learning
    const firstRepeat = computed(() => c.manuscript.paragraphs.findIndex((p) =>
      c.manuscript.repeatedWords.some((w) => new RegExp("\\b" + w + "\\b", "i").test(p))));
    const shownParagraphs = computed(() => (revisedIn.value ? c.manuscript.revisedParagraphs : draft));
    function paraHtml(i) {
      const m = c.manuscript;
      let html = escHtml(shownParagraphs.value[i]);
      const support = setting("assistance", 1) === 0 && setting("reading", 2) !== 2 && !revisedIn.value;   // writing support: the cat's grammar lines and suggestions
      const cur = cardOpen.value && shownKey.value === assistItem.value?.key ? shownKey.value : null;   // highlighted after Show Me
      if (support)
        for (const g of c.assist.grammar)
          if (!dismissedIssues.has("grammar:" + g.id))
            html = html.replace(escHtml(g.original), '<span class="grammar' + (cur === "grammar:" + g.id ? " current" : "") + '">$&</span>');
      if (!revisedIn.value)
        for (const w of m.repeatedWords) html = html.replace(new RegExp("\\b(" + w + ")\\b", "gi"), '<mark class="repeat">$1</mark>');
      if (!revisedIn.value)   // the ordinary red spell-check lines show whatever the cat's settings
        for (const [wrong, right] of Object.entries(m.misspelled))
          if (!dismissedIssues.has("spell:" + wrong))
            html = html.replace(new RegExp("\\b(" + wrong + ")\\b", "gi"), '<span class="spell' + (cur === "spell:all" ? " current" : "") + '" title="Did you mean ' + right + '?">$1</span>');
      return html;
    }

    function openCattery() {
      open.value = true;
      if (toast.value === typingNote()) toast.value = "";
      nextTick(focusHeading);
    }

    const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Listens on the window so Escape and Tab still work if focus has dropped to the page
    function onDialogKey(e) {
      // In Studio, Escape closes Oscar's tip card or menu
      if (!open.value) {
        if (e.key === "Escape" && spellPop.value) { spellPop.value = null; walking = false; return; }
        if (e.key === "Escape" && historyOpen.value) { closeHistory(); return; }
        if (e.key === "Escape" && memoryOpen.value) { cancelMemory(); return; }
        if (e.key === "Escape" && (cardOpen.value || petMenuOpen.value)) { cardOpen.value = false; petMenuOpen.value = false; engaged = false; trigger.value?.focus(); }
        return;
      }
      if (!dialog.value) return;
      // Escape closes the info tip first, then the cattery
      if (e.key === "Escape" && infoOpen.value) { e.preventDefault(); infoOpen.value = false; infoButton.value?.focus(); return; }
      if (e.key === "Escape") { e.preventDefault(); requestClose(); return; }
      if (e.key !== "Tab") return;
      // Keep Tab inside the dialog. Radios in one group count once, so use what the browser can actually reach.
      // The Restart Prototype link sits outside the dialog but joins the loop, so keyboard reviewers can always start over.
      const restartLink = document.querySelector(".restart-proto");
      const items = [restartLink, ...dialog.value.querySelectorAll(FOCUSABLE)]
        .filter((el) => el && (el === restartLink || el.offsetParent !== null) && !(el.type === "radio" && !el.checked && dialog.value.querySelector(`input[name="${el.name}"]:checked`)));
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || (!dialog.value.contains(active) && active !== restartLink) || active.tabIndex === -1)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === restartLink && items.length > 1) { e.preventDefault(); items[1].focus(); }
      else if (!e.shiftKey && (active === last || (!dialog.value.contains(active) && active !== restartLink))) { e.preventDefault(); first.focus(); }
    }
    // ?demo=quiz | certificate | feed | eating | fed opens a screen directly (for screenshots and reviews)
    const demo = new URLSearchParams(location.search).get("demo");
    if (demo) {
      route.value = "agent";
      Object.assign(answers, { loudness: 0, assistance: 1, reading: 2 });
      catName.value = "Oscar";   // demo links only, so screenshots show a named cat
      adopted.value = demo !== "quiz";
      if (demo === "quiz") { delete answers.loudness; screen.value = "quiz"; }
      else screen.value = demo === "feed" ? "feed" : "certificate";
      if (demo === "feed") feedPermission.value = true;
      if (demo === "eating") feedState.value = "eating";
      if (demo === "studio" || demo === "learning") { Object.assign(answers, { loudness: 1, assistance: 0, reading: 0 }); nextTick(startWriting); }
      // ?demo=studio&l=0..2&a=0..1&r=0..2 picks the notification, writing support and reading settings (for testing every combination)
      for (const [k, id] of [["l", "loudness"], ["a", "assistance"], ["r", "reading"]]) {
        const v = new URLSearchParams(location.search).get(k);
        if (demo === "studio" && v !== null) answers[id] = +v;
      }
      if (demo === "learning") studioView.value = "learning";
      if (demo === "fed") {
        suggestFromMeal();
        feedState.value = "fed";
      }
    }

    onMounted(() => {
      window.addEventListener("keydown", onDialogKey);
      document.addEventListener("click", (e) => {   // click outside closes the popovers
        infoOpen.value = false;
        if (!e.target.closest?.(".spell, .spell-pop")) spellPop.value = null;
      });
    });

    return { c, screen, route, step, answers, catName, toast, heading, question, isLast, name, fill, direction, focusHeading,
      PEN_CATS, FURS, fur, groomOpen, furred, openGroomers, cancelGroomers, saveGroomers, continueFromCentre, showWhy, findMyCat, finishMatching, finishError, workRead, doneError, doneFeeding, editingId, premiumOpen, openSetting, closeSetting, justFed, openPolicy, closePolicy, loadingLine, nameError, nameInput, finish, requestClose, adoptPicked, cat, pickedCat, next, back, restart, note, summaryOf, switchValue, setSwitch,
      open, adopted, dialog, trigger, infoOpen, infoButton, close, openCattery, hint, editing, editButton, doneButton, plain, setEditing,
      go, paraKey, settingsStatus, feedPermission, feedFile, feedState, readingAllowed, changed, suggested, acceptSuggestion, keepMine, canFeed, openFeed, pickFile, startFeeding,
      studioView, tipState, cardOpen, shownParagraphs, firstRepeat, revisedIn, petMenuOpen, oscarSays, purring, happy, tipPara, showDot, setting,
      petOscar, askToRead, openSettingsFromStudio, beginCourse, returnAndRevise, revising, typedParas, feedFromStudio, feedFromStudioFlow, scratch, scratching, scratchHearts, memoryOpen, memoryStop, memoryPanel, openMemory, cancelMemory, clearMemory, waitingCount, revisePaused, nextParagraph, writeAllNow, nextTypo, purrLog, historyOpen, historyPanel, openHistory, closeHistory, showAgain, dismissTip, goLearn, backToManuscript, onType, useRevised, paraHtml, assistItem, assistStatus, fixIssue, keepIssue, gotIt, seeWaiting, rereading, showInText, shownKey, cardMessage, openTypos, spellPop, spellPopEl, onEditorClick, fixWord, ignoreWord };
  },

  template: `
  <div v-if="open" class="overlay">
    <section ref="dialog" class="cattery sheet" role="dialog" aria-modal="true" aria-labelledby="cattery-title">
      <sheet-handle @close="requestClose" />

      <!-- ===== Screen 2: Adoption Center ===== -->
      <template v-if="screen === 'centre'">
        <header class="cattery-head">
          <span class="badge"><t-icon name="paw" :size="16" /> Reedsy Cattery</span>
          <h1 id="cattery-title" ref="heading" tabindex="-1">{{ c.centreName }}</h1>
        </header>

        <!-- Read as one image, not six: the individual cats aren't interactive yet -->
        <div class="pens" role="img" aria-label="Six cats waiting for a home">
          <div v-for="cat in PEN_CATS" :key="cat.src" class="pen"><img class="cat" :src="cat.penFilled" alt=""></div>
        </div>

        <div class="centre-body">
          <form class="stack" @submit.prevent="continueFromCentre">
            <fieldset class="stack">
              <legend class="sr-only">How would you like to find your cat?</legend>
              <!-- The AI Policy link sits outside the label: a link inside a radio's label is nested interactive content -->
              <div v-for="r in c.routes" :key="r.id" class="route">
                <radio-card name="route" :value="r.id" v-model="route" :title="r.title" :detail="r.detail"
                  :class="{ 'has-policy': r.showPolicy }" />
                <a v-if="r.showPolicy" href="#" class="link small policy" @click.prevent="openPolicy">
                  <t-icon name="info-circle" :size="14" /> {{ c.aiPolicyLabel }}
                </a>
              </div>
            </fieldset>
            <p class="course-done-note proto-tip"><t-icon name="info-circle" :size="16" /> {{ c.prototypeTip }}</p>
            <!-- aria-disabled, not disabled: the button stays in the Tab order and explains itself -->
            <div class="actions">
              <span v-if="hint" class="hint" role="status">{{ hint }}</span>
              <button type="submit" class="button primary" :aria-disabled="String(!route)">
                Continue <t-icon name="arrow-right" :size="16" />
              </button>
            </div>
          </form>

          <aside class="agent-wrap">
            <speech-bubble>{{ c.agentGreeting }}</speech-bubble>
            <img class="agent" src="img/agent.svg" alt="Adoption agent">
          </aside>
        </div>
      </template>

      <!-- ===== Screens 2a-2c: the agent asks one question at a time ===== -->
      <form v-else-if="screen === 'quiz'" class="quiz" @submit.prevent="next">
        <div class="agent-close"><img src="img/agent.svg" alt="Adoption agent"></div>

        <div class="quiz-main">
          <span class="eyebrow"><t-icon name="paw" :size="14" /> {{ c.centreName }}</span>
          <!-- Each question slides in; direction follows Next / Back -->
          <transition :name="'slide-' + direction" mode="out-in" @after-enter="focusHeading">
            <div :key="question.id" class="stack">
              <speech-bubble tail="left">
                <h1 id="cattery-title" ref="heading" tabindex="-1" class="question">{{ question.title }}</h1>
                <p class="detail">{{ question.description }}</p>
              </speech-bubble>

              <fieldset class="stack" aria-labelledby="cattery-title">
                <radio-card v-for="(a, i) in question.answers" :key="question.id + i" :name="question.id" :value="i"
                  v-model="answers[question.id]" :title="a.title" :detail="a.detail" />
              </fieldset>
            </div>
          </transition>

          <div class="actions">
            <span class="progress">
              Question {{ step + 1 }} of {{ c.questions.length }}
              <span class="dots" aria-hidden="true"><i v-for="(q, i) in c.questions" :key="i" :class="{ on: i <= step }"></i></span>
            </span>
            <button type="button" class="button secondary" @click="back"><t-icon name="arrow-left" :size="16" /> Back</button>
            <span v-if="hint" class="hint" role="status">{{ hint }}</span>
            <button type="submit" class="button primary" :aria-disabled="String(answers[question.id] === undefined)">
              {{ isLast ? 'Finish' : 'Next' }} <t-icon :name="isLast ? 'check' : 'arrow-right'" :size="16" />
            </button>
          </div>
        </div>
      </form>

      <!-- ===== Screen 3: adoption certificate + settings ===== -->
      <div v-else-if="screen === 'certificate'" class="certificate">
        <section class="cert-left">
          <div class="cert-card">
            <h1 id="cattery-title" ref="heading" tabindex="-1" class="cert-title">Adoption Certificate</h1>
            <div class="name-row">
              <label for="cat-name">Name:</label>
              <input id="cat-name" ref="nameInput" v-model="catName" maxlength="20" autocomplete="off" placeholder="Name your cat"
                :aria-invalid="String(!!nameError)" :aria-describedby="nameError ? 'name-error' : null" @input="nameError = ''">
              <rosette-art />
            </div>
            <p v-if="nameError" id="name-error" class="field-error name-error" role="alert"><t-icon name="alert-circle" :size="16" /> {{ nameError }}</p>
          </div>
          <!-- While eating, Oscar swaps to his eating pose (which has its own bowl), so the bowl below steps aside -->
          <div class="oscar" :class="{ eating: feedState === 'eating' }">
            <img v-if="feedState === 'eating'" :src="furred(cat.eating || cat.src)" :alt="name + ' eating'">
            <img v-else :src="furred(cat.src)" :alt="name + ', ' + cat.alt.toLowerCase()">
          </div>

          <!-- Groomers: opens its own screen -->
          <button type="button" class="button secondary groom-open" @click="openGroomers">
            <t-icon name="scissors" :size="16" /> {{ c.groomButton }}
          </button>
          <div v-if="!justFed && route !== 'agent'" class="feed">
            <bowl-art state="empty" :class="{ away: feedState === 'eating' }" />
            <div class="feed-line">
              <p class="detail">{{ fill(c.feedLine) }}</p>
              <!-- Toggletip: the button opens a small popover; Escape or clicking elsewhere closes it -->
              <span class="info-wrap">
                <button ref="infoButton" type="button" class="info" :aria-expanded="String(infoOpen)" aria-controls="feed-info"
                  aria-label="What does feeding your cat do?" @click.stop="infoOpen = !infoOpen">
                  <t-icon name="info-circle" :size="18" />
                </button>
                <span v-show="infoOpen" id="feed-info" class="popover" role="status" @click.stop>{{ c.feedInfo }}</span>
              </span>
            </div>
            <button type="button" class="button primary large" :aria-disabled="String(feedState === 'eating')"
              @click="feedState !== 'eating' && openFeed()">
              {{ fill(c.feedButton) }}
            </button>
          </div>
        </section>

        <section class="cert-right" aria-labelledby="settings-title">
          <h2 id="settings-title"><t-icon name="settings" :size="20" /> Settings</h2>
          <p class="settings-status" role="status">{{ settingsStatus }}</p>

          <!-- While Oscar eats, the settings are being worked out -->
          <div v-if="feedState === 'eating'" class="updating">
            <span class="spinner" aria-hidden="true"></span>
            <span>Updating settings…</span>
          </div>

          <!-- Summary in plain terms; each setting opens its own control in place via "Change" -->
          <ul v-else class="summary">
            <li v-for="q in c.questions" :key="q.id" :class="{ changed: changed.has(q.id), open: editingId === q.id }">
              <t-icon name="check" :size="16" />
              <div class="summary-body">
                <span><strong>{{ summaryOf(q)[0] }}:</strong> {{ summaryOf(q)[1] }}
                  <span v-if="changed.has(q.id)" class="tag">Updated</span></span>
                <span v-if="showWhy(q.id) && !(q.id in suggested)" class="match-why">{{ fill(c.aiRoute.reasons[q.id]) }}</span>
                  <div v-if="q.id in suggested" class="suggestion">
                    <span><span class="suggest-label">{{ c.feedSuggest.label }}:</span> {{ q.answers[suggested[q.id]].summary[1] }}</span>
                    <span v-if="c.feedSuggest.reasons[q.id]" class="suggest-why">{{ fill(c.feedSuggest.reasons[q.id]) }}</span>
                    <span class="suggest-actions">
                      <button type="button" class="button primary small-button" :aria-label="c.feedSuggest.accept + ': ' + q.answers[suggested[q.id]].summary[1]" @click="acceptSuggestion(q.id)">{{ c.feedSuggest.accept }}</button>
                      <button type="button" class="button secondary small-button" :aria-label="c.feedSuggest.keep + ': ' + summaryOf(q)[1]" @click="keepMine(q.id)">{{ c.feedSuggest.keep }}</button>
                    </span>
                  </div>
                <button v-if="editingId !== q.id" v-show="!(q.id in suggested)" type="button" class="link small change-link" :data-change="q.id"
                  :aria-label="'Change ' + summaryOf(q)[0]" @click="openSetting(q.id)">Change</button>

                <div v-else class="setting-edit">
                  <!-- Every option shows what it does before it's chosen -->
                  <fieldset class="stack setting-options" :aria-labelledby="'edit-' + q.id">
                    <span :id="'edit-' + q.id" class="setting-title">{{ q.title }}</span>
                    <div v-if="q.toggle" class="switch-row">
                      <v-switch :model-value="switchValue(q)" :label="q.title" @update:model-value="(on) => setSwitch(q, on)" />
                      <span><strong>{{ switchValue(q) ? 'On' : 'Off' }}:</strong> {{ plain(q.answers[answers[q.id]].detail) }}</span>
                    </div>
                    <template v-else>
                    <radio-card v-for="(o, i) in q.answers" :key="i" :name="'set-' + q.id" :value="i" v-model="answers[q.id]"
                      :title="o.summary[1]" :detail="plain(o.detail)" />
                    </template>
                  </fieldset>
                  <button type="button" class="button primary small-button save-setting" @click="closeSetting(q.id)">Save</button>
                </div>
              </div>
            </li>

            <!-- Premium: a feature for Reedsy's paid plans, shown but locked -->
            <li class="premium-row">
              <t-icon name="crown" :size="16" />
              <div class="summary-body">
                <span><strong>{{ c.premium.feature }}:</strong> {{ c.premium.description }}
                  <span class="tag premium-tag">{{ c.premium.badge }}</span></span>
                <span v-if="workRead" class="match-why">{{ c.premium.why }}</span>
                <!-- In the real product this goes to reedsy.com/studio/pricing; the prototype stays put and says so -->
                <button type="button" class="link small change-link" @click="note('Prototype note: ' + c.premium.upgradeNote + '.')">
                  {{ c.premium.unlockLabel }}
                </button>
              </div>
            </li>
          </ul>

        </section>

        <!-- One filled button per view: Feed Your Cat is the main action, Finish just closes -->
        <div class="actions cert-actions">
          <button type="button" class="link" @click="restart">Start Again</button>
          <span v-if="finishError" class="field-error" role="alert"><t-icon name="alert-circle" :size="16" /> {{ finishError }}</span>
          <button type="button" class="button primary" @click="finish">{{ c.finishButton }}</button>
        </div>
      </div>

      <!-- ===== Groomers: the cat on the grooming table, with a new fur colour ===== -->
      <div v-else-if="screen === 'groomers'" class="groomers-screen">
        <span class="eyebrow"><t-icon name="paw" :size="14" /> {{ c.centreName }}</span>
        <h1 id="cattery-title" ref="heading" tabindex="-1">{{ c.groomButton }}</h1>

        <div class="groom-scene" aria-hidden="true">
          <span class="tool t1"><t-icon name="scissors" :size="34" /></span>
          <span class="tool t2"><t-icon name="comb" :size="34" /></span>
          <span class="tool t3"><t-icon name="brush" :size="34" /></span>
          <span class="tool t4"><t-icon name="spray" :size="34" /></span>
          <span class="tool t5"><t-icon name="sparkles" :size="28" /></span>
          <img class="groom-cat" :src="furred(cat.src)" alt="">
          <div class="groom-table"><span class="leg l"></span><span class="leg r"></span></div>
        </div>

        <fieldset class="groom-panel">
          <legend class="setting-title">{{ c.groomLegend }}</legend>
          <div class="swatches">
            <label v-for="f in FURS" :key="f.id" class="swatch" :class="{ selected: fur === f.id }">
              <input type="radio" name="fur" :value="f.id" v-model="fur">
              <span class="swatch-dot" :style="{ background: f.swatch }" aria-hidden="true"></span>
              <span class="swatch-label">{{ f.label }}</span>
            </label>
          </div>
        </fieldset>

        <div class="actions">
          <button type="button" class="button secondary" @click="cancelGroomers">Cancel</button>
          <button type="button" class="button primary" @click="saveGroomers">Save</button>
        </div>
      </div>

      <!-- ===== Option 3: let me choose myself ===== -->
      <form v-else-if="screen === 'choose'" class="choose-screen" @submit.prevent="adoptPicked">
        <span class="eyebrow"><t-icon name="paw" :size="14" /> {{ c.centreName }}</span>
        <h1 id="cattery-title" ref="heading" tabindex="-1">{{ c.chooseRoute.title }}</h1>
        <p class="lead">{{ c.chooseRoute.intro }}</p>
        <fieldset class="cat-picker" aria-labelledby="cattery-title">
          <label v-for="(p, i) in PEN_CATS" :key="p.src" class="cat-option" :class="{ selected: pickedCat === i }">
            <input type="radio" name="picked-cat" :value="i" v-model="pickedCat">
            <img :src="p.pen || p.src" alt="">
            <span class="cat-option-name">{{ p.alt }}</span>
          </label>
        </fieldset>
        <div class="actions">
          <button type="button" class="button secondary" @click="go('centre')"><t-icon name="arrow-left" :size="16" /> Back</button>
          <span v-if="hint" class="hint" role="status">{{ hint }}</span>
          <button type="submit" class="button primary" :aria-disabled="String(pickedCat === null)">{{ c.chooseRoute.adoptButton }}</button>
        </div>
      </form>

      <!-- ===== AI Policy ===== -->
      <article v-else-if="screen === 'policy'" class="policy-page">
        <span class="eyebrow"><t-icon name="paw" :size="14" /> {{ c.centreName }}</span>
        <h1 id="cattery-title" ref="heading" tabindex="-1">{{ c.aiPolicy.title }}</h1>
        <p class="lead">{{ c.aiPolicy.intro }}</p>
        <section v-for="(sec, i) in c.aiPolicy.sections" :key="i" class="policy-section">
          <h2>{{ sec.heading }}</h2>
          <p>{{ sec.body }}</p>
        </section>
        <div class="actions">
          <button type="button" class="button secondary" @click="closePolicy"><t-icon name="arrow-left" :size="16" /> Back</button>
        </div>
      </article>

      <!-- ===== Option 1: let Reedsy look at your latest work ===== -->
      <form v-else-if="screen === 'ai-read'" class="feed-screen" @submit.prevent="findMyCat">
        <span class="eyebrow"><t-icon name="paw" :size="14" /> {{ c.centreName }}</span>
        <h1 id="cattery-title" ref="heading" tabindex="-1">{{ c.aiRoute.title }}</h1>
        <p class="lead">{{ c.aiRoute.subtitle }}</p>

        <p class="how-it-works">{{ c.aiRoute.howItWorks }}</p>

        <div class="consent">
          <label class="check-card" :class="{ selected: feedPermission }">
            <input type="checkbox" v-model="feedPermission" aria-describedby="ai-policy-line">
            <span>{{ c.aiRoute.permission }}</span>
          </label>
          <!-- The policy link sits outside the label so it can't tick the box by accident -->
          <p id="ai-policy-line" class="detail consent-policy">
            {{ c.aiRoute.policyLead }}
            <a href="#" class="link" @click.prevent="openPolicy">{{ c.aiRoute.policyLink }}</a>.
          </p>
        </div>

        <div class="actions">
          <button type="button" class="button secondary" @click="go('centre')"><t-icon name="arrow-left" :size="16" /> Back</button>
          <button type="submit" class="button primary" :aria-describedby="hint ? 'ai-error' : null">{{ c.aiRoute.findButton }}</button>
        </div>
        <p v-if="hint" id="ai-error" class="field-error cta-error" role="alert"><t-icon name="alert-circle" :size="16" /> {{ hint }}</p>
      </form>

      <!-- ===== Option 1: searching, with an indeterminate bar and rotating lines ===== -->
      <div v-else-if="screen === 'ai-matching'" class="searching">
        <img class="searching-agent" src="img/agent.svg" alt="">
        <h1 id="cattery-title" ref="heading" tabindex="-1" class="sr-only">{{ c.aiRoute.findButton }}</h1>
        <transition name="fade" mode="out-in">
          <p :key="loadingLine" class="searching-line" aria-live="polite">{{ c.aiRoute.loadingLines[loadingLine] }}</p>
        </transition>
        <div class="indeterminate" role="progressbar" aria-label="Finding your match"><span></span></div>
        <button type="button" class="link small skip-match" @click="finishMatching">{{ c.aiRoute.skipLabel }}</button>
      </div>

      <!-- ===== Feeding from Studio: the meal and the settings update, in one modal ===== -->
      <div v-else-if="screen === 'feeding'" class="feeding-screen">
        <span class="eyebrow"><t-icon name="paw" :size="14" /> {{ feedFromStudioFlow ? fill(c.feedEyebrow) : c.centreName }}</span>
        <h1 id="cattery-title" ref="heading" tabindex="-1">{{ fill(c.feedButton) }}</h1>
        <div class="feeding-body">
          <div class="feeding-cat">
            <img v-if="feedState === 'eating'" :src="furred(cat.eating || cat.src)" :alt="name + ' eating'">
            <img v-else :src="furred(cat.happy || cat.src)" :alt="name + ', full and happy'">
          </div>
          <div class="feeding-settings">
            <h2><t-icon name="settings" :size="20" /> Settings</h2>
            <div v-if="feedState === 'eating'" class="updating" role="status">
              <span class="spinner" aria-hidden="true"></span><span>Updating settings…</span>
            </div>
            <template v-else>
              <p class="settings-status" role="status">{{ settingsStatus }}</p>
              <ul class="summary">
                <li v-for="q in c.questions" :key="q.id" :class="{ changed: changed.has(q.id) }">
                  <t-icon name="check" :size="16" />
                  <div class="summary-body">
                  <span><strong>{{ summaryOf(q)[0] }}:</strong> {{ summaryOf(q)[1] }}
                    <span v-if="changed.has(q.id)" class="tag">Updated</span></span>
                  <div v-if="q.id in suggested" class="suggestion">
                    <span><span class="suggest-label">{{ c.feedSuggest.label }}:</span> {{ q.answers[suggested[q.id]].summary[1] }}</span>
                    <span v-if="c.feedSuggest.reasons[q.id]" class="suggest-why">{{ fill(c.feedSuggest.reasons[q.id]) }}</span>
                    <span class="suggest-actions">
                      <button type="button" class="button primary small-button" :aria-label="c.feedSuggest.accept + ': ' + q.answers[suggested[q.id]].summary[1]" @click="acceptSuggestion(q.id)">{{ c.feedSuggest.accept }}</button>
                      <button type="button" class="button secondary small-button" :aria-label="c.feedSuggest.keep + ': ' + summaryOf(q)[1]" @click="keepMine(q.id)">{{ c.feedSuggest.keep }}</button>
                    </span>
                  </div>
                  </div>
                </li>
              </ul>
            </template>
          </div>
        </div>
        <div class="actions">
          <button type="button" class="button primary" :aria-disabled="String(feedState === 'eating')" :aria-describedby="doneError ? 'done-error' : null" @click="doneFeeding">Done</button>
        </div>
        <p v-if="doneError" id="done-error" class="field-error cta-error" role="alert"><t-icon name="alert-circle" :size="16" /> {{ doneError }}</p>
      </div>

      <!-- ===== Feed: give permission or upload work ===== -->
      <form v-else-if="screen === 'feed'" class="feed-screen" @submit.prevent="startFeeding">
        <span class="eyebrow"><t-icon name="paw" :size="14" /> {{ feedFromStudioFlow ? fill(c.feedEyebrow) : c.centreName }}</span>
        <h1 id="cattery-title" ref="heading" tabindex="-1">{{ fill(c.feedButton) }}</h1>
        <!-- The consent explanation is visible here, not tucked behind an info button -->
        <p class="lead">{{ c.feedInfo }}</p>
        <!-- The bowl fills as soon as there's something to eat -->
        <bowl-art class="feed-bowl" :state="canFeed ? 'full' : 'empty'" />

        <p v-if="feedState === 'fed'" class="fed-recently"><t-icon name="info-circle" :size="18" /> {{ fill(c.feedFedRecently) }}</p>
        <!-- A repeat meal is upload only: the latest chapter has been eaten, so no permission note, tick box or "or" -->
        <template v-if="feedState !== 'fed'">
          <p v-if="readingAllowed" class="permission-note"><t-icon name="check" :size="18" /> {{ fill(c.feedAlreadyAllowed) }}</p>
          <template v-else>
            <label class="check-card" :class="{ selected: feedPermission }">
              <input type="checkbox" v-model="feedPermission" aria-describedby="feed-never-note">
              <span>{{ fill(c.feedPermission) }}</span>
            </label>
            <p id="feed-never-note" class="detail feed-never-note">{{ fill(c.feedNeverNote) }}</p>
          </template>

          <div class="or" aria-hidden="true"><span>or</span></div>
        </template>

        <label class="dropzone" :class="{ selected: feedFile }">
          <input type="file" class="file-input" accept=".doc,.docx,.txt,.rtf,.pdf,.md" @change="pickFile">
          <t-icon :name="feedFile ? 'file-text' : 'upload'" :size="28" />
          <strong>{{ c.feedUpload }}</strong>
          <span class="detail">{{ feedFile || c.feedUploadHint }}</span>
        </label>

        <div class="actions">
          <button type="button" class="button secondary" @click="feedFromStudioFlow ? close() : go('certificate')"><t-icon name="arrow-left" :size="16" /> Back</button>
          <button type="submit" class="button primary" :aria-describedby="hint ? 'feed-error' : null">{{ fill(c.feedButton) }}</button>
        </div>
        <p v-if="hint" id="feed-error" class="field-error cta-error" role="alert"><t-icon name="alert-circle" :size="16" /> {{ hint }}</p>
      </form>

      <button type="button" class="close" aria-label="Close" @click="requestClose"><t-icon name="x" :size="20" /></button>
    </section>
  </div>

  <!-- ===== Studio: the manuscript (before adoption too), with Oscar beside it once adopted ===== -->
  <template v-if="!open">
    <section v-if="studioView === 'writing'" class="editor" :class="{ 'show-repeats': !revising && ((cardOpen && !assistItem) || tipState === 'learned') }" aria-label="Manuscript editor" @click="onEditorClick" @scroll="spellPop = null">
      <!-- While the revision plays, a banner makes clear the writer is doing the editing -->
      <div v-if="revising" class="revising-banner">
        <span class="revising-text" role="status"><t-icon name="pencil" :size="16" /> {{ c.learning.revisingNote }}</span>
        <span class="revise-controls">
          <button type="button" class="button primary small-button revise-next" :aria-disabled="String(!revisePaused)" @click="nextParagraph">{{ c.learning.reviseNext }}</button>
          <button type="button" class="button secondary small-button" @click="writeAllNow">{{ c.learning.reviseAll }}</button>
        </span>
      </div>
      <p class="editor-book">{{ c.manuscript.book }}</p>
      <h1 class="editor-chapter">{{ c.manuscript.chapter }}</h1>
      <template v-if="revising">
        <div v-for="(b, i) in typedParas" :key="'rb' + i" class="rev-block">
          <p v-if="b.state === 'bad' || b.state === 'selected' || b.state === 'deleting'" class="editor-para typed"
            :class="{ selected: b.state === 'selected', caret: b.state === 'deleting' }">{{ b.text }}</p>
          <p v-for="(l, j) in b.lines" v-else :key="j" class="editor-para typed"
            :class="{ caret: b.state === 'typing' && j === b.lines.length - 1 }">{{ l }}</p>
        </div>
      </template>
      <template v-else>
        <p v-for="(p, i) in shownParagraphs" :key="(revisedIn ? 'r' : 'b') + i" class="editor-para"
          :ref="(el) => { if (i === firstRepeat && !revisedIn) tipPara = el }"
          contenteditable="true" spellcheck="false" :tabindex="i === 0 ? 0 : -1" @input="onType" @keydown="paraKey" v-html="paraHtml(i)"></p>
      </template>
    </section>

    <!-- After the course: a short prototype interlude before the writer revises -->
    <section v-else-if="studioView === 'course-done'" class="learning" aria-labelledby="cattery-title">
      <p class="eyebrow">{{ c.learning.doneEyebrow }}</p>
      <h1 id="cattery-title" tabindex="-1">{{ c.learning.doneTitle }}</h1>
      <p class="course-done-body">{{ c.learning.doneBody }}</p>
      <p class="course-done-note"><t-icon name="pencil" :size="16" /> {{ c.learning.doneNote }}</p>
      <div class="learning-actions">
        <button type="button" class="button primary large" @click="returnAndRevise">{{ c.learning.continueButton }}</button>
      </div>
    </section>

    <!-- Reedsy Learning: where the tip leads -->
    <section v-else class="learning" aria-labelledby="cattery-title">
      <p class="eyebrow">{{ c.learning.label }}</p>
      <h1 id="cattery-title" tabindex="-1">{{ c.learning.title }}</h1>
      <div class="learning-actions">
        <button type="button" class="button primary large" @click="beginCourse">{{ c.learning.beginButton }}</button>
        <button type="button" class="link" @click="backToManuscript">Back to manuscript</button>
      </div>
    </section>

    <!-- Oscar's tip card -->
    <section v-if="cardOpen && assistItem" :key="assistItem.key" class="tip-card" role="region" :aria-label="'Writing suggestion from ' + name" aria-live="polite">
      <p>{{ cardMessage }}</p>
      <dl v-if="assistItem.kind === 'grammar'" class="assist-diff">
        <div><dt>{{ c.assist.beforeLabel }}</dt><dd><del>{{ assistItem.original }}</del></dd></div>
        <div v-if="assistItem.suggestion"><dt>{{ c.assist.afterLabel }}</dt><dd><ins>{{ assistItem.suggestion }}</ins></dd></div>
      </dl>
      <div class="tip-actions">
        <button v-if="assistItem.explainOnly" type="button" class="button primary" @click="gotIt">{{ c.assist.gotItButton }}</button>
        <button v-if="!assistItem.explainOnly" type="button" class="button primary" @click="fixIssue">{{ assistItem.kind === 'typos' && openTypos.length > 1 ? c.assist.fixAllButton : c.assist.fixButton }}</button>
        <button v-if="!assistItem.explainOnly" type="button" class="button secondary" @click="keepIssue">{{ c.assist.keepButton }}</button>
        <button type="button" class="button secondary" :aria-pressed="String(shownKey === assistItem.key)" @click="showInText">{{ c.assist.showButton }}</button>
      </div>
    </section>
    <section v-else-if="cardOpen" class="tip-card" role="region" aria-label="Writing tip from your cat" aria-live="polite">
      <p>{{ c.purr.tip }}</p>
      <div class="tip-actions">
        <button type="button" class="button primary" @click="goLearn">{{ c.purr.learnButton }}</button>
        <button type="button" class="button secondary" @click="dismissTip">{{ c.purr.dismissLabel }}</button>
      </div>
    </section>
    <p class="sr-only" role="status">{{ assistStatus }}</p>

    <!-- Clicking a red line -->
    <div v-if="spellPop" ref="spellPopEl" class="spell-pop" role="group" :aria-label="'Spelling suggestion for ' + spellPop.wrong" :style="{ left: spellPop.left + 'px', top: spellPop.top + 'px' }">
      <button type="button" class="button primary" @click="fixWord">{{ spellPop.right }}</button>
      <button type="button" class="button secondary" @click="ignoreWord">{{ c.assist.ignoreButton }}</button>
      <button v-if="openTypos.length > 1" type="button" class="button secondary" @click="nextTypo">{{ c.assist.nextTypo }}</button>
    </div>

    <!-- Petting Oscar: ask him to read, or open his settings -->
    <div v-if="petMenuOpen" class="pet-menu" role="menu" :aria-label="name + ' menu'">
      <button v-if="assistItem || tipState === 'ready'" type="button" role="menuitem" class="has-dot" @click="seeWaiting">{{ waitingCount > 1 ? fill(c.purr.menu.seeMany).replace("{n}", waitingCount) : fill(assistItem ? c.purr.menu.seeSuggestion : c.purr.menu.seeTip) }}<span class="menu-sub">{{ waitingCount > 1 ? c.purr.menu.seeManyNote : assistItem ? c.purr.menu.seeSuggestionNote : c.purr.menu.seeTipNote }}</span><span class="menu-dot" aria-hidden="true"></span></button>
      <button v-if="tipState !== 'reading' && !rereading" type="button" role="menuitem" @click="askToRead">{{ fill(c.purr.menu.play) }}<span class="menu-sub">{{ c.purr.menu.playNote }}</span></button>
      <button type="button" role="menuitem" @click="scratch">{{ fill(c.purr.menu.scratch) }}<span class="menu-sub">{{ c.purr.menu.scratchNote }}</span></button>
      <button type="button" role="menuitem" @click="feedFromStudio">{{ fill(c.purr.menu.feed) }}{{ feedState === 'fed' ? ' ' + c.purr.menu.fedLabel : '' }}<span class="menu-sub">{{ c.purr.menu.feedNote }}</span></button>
      <button type="button" role="menuitem" @click="openHistory">{{ fill(c.purr.history.menuItem) }}<span class="menu-sub">{{ fill(c.purr.history.menuNote) }}</span></button>
      <button type="button" role="menuitem" @click="openSettingsFromStudio">{{ fill(c.purr.menu.settings) }}<span class="menu-sub">{{ c.purr.menu.settingsNote }}</span></button>
      <button type="button" role="menuitem" @click="openMemory">{{ fill(c.purr.memory.menuItem) }}<span class="menu-sub">{{ c.purr.menu.memoryNote }}</span></button>
    </div>

    <section v-if="historyOpen" ref="historyPanel" class="tip-card history-card sheet" role="dialog" aria-labelledby="history-title">
      <sheet-handle :label="c.purr.history.close" @close="closeHistory" />
      <div class="history-head">
        <h2 id="history-title" class="memory-title">{{ fill(c.purr.history.title) }}</h2>
        <button type="button" class="close history-close" :aria-label="c.purr.history.close" @click="closeHistory"><t-icon name="x" :size="18" /></button>
      </div>
      <p v-if="!purrLog.length" class="detail">{{ c.purr.history.empty }}</p>
      <ol v-else class="history-list">
        <li v-for="e in purrLog" :key="e.id">
          <span class="history-text">{{ e.text }}</span>
          <span class="history-meta"><span class="tag">{{ c.purr.history.outcomes[e.outcome] }}</span>
            <button v-if="e.available" type="button" class="link small" @click="showAgain(e)">{{ c.purr.history.showAgain }}</button></span>
        </li>
      </ol>
    </section>

    <section v-if="memoryOpen" ref="memoryPanel" class="tip-card memory-card sheet" role="dialog" aria-labelledby="memory-title" aria-describedby="memory-body">
      <sheet-handle @close="cancelMemory" />
      <h2 id="memory-title" class="memory-title">{{ fill(c.purr.memory.title) }}</h2>
      <p id="memory-body">{{ fill(c.purr.memory.body) }}</p>
      <label class="memory-stop"><input type="checkbox" v-model="memoryStop"> {{ fill(c.purr.memory.stopReading) }}</label>
      <div class="tip-actions">
        <button type="button" class="button primary" @click="clearMemory">{{ c.purr.memory.confirm }}</button>
        <button type="button" class="button secondary" @click="cancelMemory">{{ c.purr.memory.cancel }}</button>
      </div>
    </section>

    <p v-if="oscarSays" class="oscar-says speech" role="status">{{ oscarSays }}</p>
    <p v-if="scratching && scratchHearts" class="sr-only" role="status">{{ name }} purrs</p>
    <p v-if="(tipState === 'reading' || rereading) && !cardOpen" class="oscar-says reading" role="status">{{ name }} is reading<span class="dots" aria-hidden="true"><span></span><span></span><span></span></span></p>

    <button v-if="adopted" ref="trigger" type="button" class="studio-cat" :class="{ purring }" @click="petOscar"
      :aria-label="'Pet ' + name + (showDot ? (assistItem ? ', has a writing suggestion' : ', has a writing tip') : '')" :aria-expanded="String(petMenuOpen || cardOpen)">
      <!-- In Studio the cat always just sits (scratches and praise show hearts and speech, not a new pose) -->
      <img :src="furred(cat.sit || cat.src)" alt="">
      <span v-if="scratching && scratchHearts" class="hearts" aria-hidden="true"><i>&#9829;</i><i>&#9829;</i><i>&#9829;</i></span>
      <span v-if="showDot" class="tip-dot" aria-hidden="true"></span>
      <span v-if="catName.trim()" class="name-tag" aria-hidden="true">{{ catName }}</span>
    </button>
  </template>

  <!-- Closed, before adoption: the Studio trigger from the storyboard reopens the cattery -->
  <!-- The cattery house sits on top of a standard Reedsy primary button; the whole thing is one click target -->
  <button v-if="!adopted && !open" ref="trigger" type="button" class="adopt-trigger" aria-label="Adopt Now: Reedsy Cattery" @click="openCattery">
    <img src="img/cattery-v2.svg" alt="">
    <span class="button primary">Adopt Now</span>
  </button>

  <div class="toast" :class="{ show: toast }" role="status">{{ toast }}</div>`,
}).mount("#app");

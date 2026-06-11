/*
 * era-radio.ts
 * The TV's audio. One global engine, attached conceptually to the TIME
 * MACHINE remote: each era channel has its own station, zapping
 * channels switches the sound like a real TV, and the remote carries
 * the master sound toggle. Stages are costumes, so every stage still
 * brings its own tuner UI; those tuners are views over this single
 * engine (one Audio element, never two streams at once).
 *
 * Sound is ON by default but browsers block cold autoplay, so the
 * engine starts on the visitor's first gesture and fades in slowly to
 * a modest volume. The choice persists in localStorage; a visitor who
 * previously hit Geocities' STOP DA MUSIC defaults to off.
 *
 * The Geocities stage keeps its own richer 1996 radio (visualizer,
 * Plaza now-playing, STOP DA MUSIC): when that widget is present the
 * engine goes silent on the geocities channel and defers to it. On
 * sub-pages (no stage widgets) the engine covers geocities too.
 *
 * All stations are free, listener-supported streams (SomaFM, Kohina,
 * laut.fm, Nightride).
 */

export interface EraRadioStation {
  id: string;
  label: string;
  url: string;
}

/* First entry per era is its default station. */
export const ERA_STATIONS: Record<string, EraRadioStation[]> = {
  terminal: [
    { id: 'defcon',         label: 'DEF CON',         url: 'https://ice1.somafm.com/defcon-128-mp3' },
    { id: 'deepspaceone',   label: 'DEEP SPACE ONE',  url: 'https://ice1.somafm.com/deepspaceone-128-mp3' },
    { id: 'missioncontrol', label: 'MISSION CONTROL', url: 'https://ice1.somafm.com/missioncontrol-128-mp3' },
  ],
  win95: [
    { id: 'kohina', label: 'KOHINA',          url: 'https://kohina.brona.dk/icecast/stream.ogg' },
    { id: 'u80s',   label: 'UNDERGROUND 80s', url: 'https://ice1.somafm.com/u80s-128-mp3' },
  ],
  /* Only used where the 1996 stage's own radio is absent (sub-pages). */
  geocities: [
    { id: 'spacesynth', label: 'SPACESYNTH', url: 'https://stream.nightride.fm/spacesynth.mp3' },
  ],
  aero: [
    { id: 'groovesalad', label: 'Groove Salad', url: 'https://ice1.somafm.com/groovesalad-128-mp3' },
    { id: 'lush',        label: 'Lush',         url: 'https://ice1.somafm.com/lush-128-mp3' },
    { id: 'beatblender', label: 'Beat Blender', url: 'https://ice1.somafm.com/beatblender-128-mp3' },
  ],
  fugazi: [
    { id: 'lofi',  label: 'Lofi',  url: 'https://stream.laut.fm/lofi' },
    { id: 'fluid', label: 'Fluid', url: 'https://ice1.somafm.com/fluid-128-mp3' },
  ],
  grimoire: [
    { id: 'doomed',    label: 'Doomed',        url: 'https://ice1.somafm.com/doomed-128-mp3' },
    { id: 'dronezone', label: 'Drone Zone',    url: 'https://ice1.somafm.com/dronezone-128-mp3' },
    { id: 'darkzone',  label: 'The Dark Zone', url: 'https://ice1.somafm.com/darkzone-128-mp3' },
  ],
};

/* Not too loud: the music is set dressing, not the show. */
const VOLUME = 0.35;
const FADE_IN_FIRST = 4000;
const FADE_IN_ZAP = 2500;
const FADE_IN_TUNE = 1200;
const FADE_OUT = 250;
const SOUND_KEY = 'grimoire.sound';

export type RadioStatus = 'off' | 'blocked' | 'playing' | 'silent' | 'error';

export interface RadioState {
  on: boolean;
  status: RadioStatus;
  era: string;
  /** Era whose station is actually streaming (null unless playing). */
  playingEra: string | null;
  /** True when the 1996 stage's own radio owns the geocities channel. */
  geoExternal: boolean;
}

let inited = false;
let audio: HTMLAudioElement | null = null;
let prefOn = true;
let status: RadioStatus = 'off';
let currentEra = 'geocities';
let playingEra: string | null = null;
let geoExternal = false;
let gestureArmed = false;
let fadeRaf = 0;
const chosen = new Map<string, EraRadioStation>();
const listeners = new Set<(s: RadioState) => void>();

export function stationFor(era: string): EraRadioStation {
  return chosen.get(era) ?? ERA_STATIONS[era]?.[0] ?? ERA_STATIONS.geocities[0];
}

export function getState(): RadioState {
  return { on: prefOn, status, era: currentEra, playingEra, geoExternal };
}

export function subscribe(fn: (s: RadioState) => void): void {
  listeners.add(fn);
}

function paint() {
  const s = getState();
  listeners.forEach((fn) => fn(s));
}

function fadeTo(target: number, ms: number, then?: () => void) {
  if (!audio) return;
  cancelAnimationFrame(fadeRaf);
  const from = audio.volume;
  const t0 = performance.now();
  const step = (t: number) => {
    if (!audio) return;
    const k = Math.min(1, (t - t0) / ms);
    audio.volume = from + (target - from) * k;
    if (k < 1) fadeRaf = requestAnimationFrame(step);
    else then?.();
  };
  fadeRaf = requestAnimationFrame(step);
}

function detach() {
  if (!audio) return;
  audio.pause();
  /* Fully detach so the browser stops buffering the live stream. */
  audio.removeAttribute('src');
  audio.load();
}

function fadeStop(next: RadioStatus) {
  playingEra = null;
  status = next;
  if (audio && !audio.paused) fadeTo(0, FADE_OUT, detach);
  else detach();
  paint();
}

function geoOwnsChannel(era: string): boolean {
  return geoExternal && era === 'geocities';
}

function startFor(era: string, fadeMs: number) {
  if (!audio) return;
  const st = stationFor(era);
  if (!audio.src || !audio.src.startsWith(st.url)) audio.src = st.url;
  cancelAnimationFrame(fadeRaf);
  audio.volume = 0;
  audio
    .play()
    .then(() => {
      status = 'playing';
      playingEra = era;
      paint();
      fadeTo(VOLUME, fadeMs);
    })
    .catch((err) => {
      playingEra = null;
      if (err && err.name === 'NotAllowedError') {
        /* Autoplay gate: wake on the first real gesture. */
        status = 'blocked';
        armGesture();
      } else {
        console.warn('[era-radio] play() failed', err);
        status = 'error';
      }
      paint();
    });
}

function tryStart(fadeMs: number) {
  if (!prefOn) return;
  if (geoOwnsChannel(currentEra)) {
    status = 'silent';
    paint();
    return;
  }
  startFor(currentEra, fadeMs);
}

function armGesture() {
  if (gestureArmed) return;
  gestureArmed = true;
  const fire = () => {
    gestureArmed = false;
    if (prefOn && status === 'blocked') tryStart(FADE_IN_FIRST);
  };
  const opts = { once: true, passive: true } as AddEventListenerOptions;
  window.addEventListener('pointerdown', fire, opts);
  window.addEventListener('keydown', fire, opts);
  window.addEventListener('touchstart', fire, opts);
  window.addEventListener('scroll', fire, opts);
}

export function setSound(on: boolean): void {
  prefOn = on;
  try {
    localStorage.setItem(SOUND_KEY, on ? '1' : '0');
  } catch {}
  if (on) tryStart(FADE_IN_FIRST);
  else fadeStop('off');
  paint();
}

export function toggleSound(): void {
  setSound(!prefOn);
}

export function selectStation(era: string, id: string): void {
  const st = ERA_STATIONS[era]?.find((s) => s.id === id);
  if (!st) return;
  chosen.set(era, st);
  if (status === 'playing' && playingEra === era) startFor(era, FADE_IN_TUNE);
  else paint();
}

export function initRadioEngine(): void {
  if (inited || typeof window === 'undefined') return;
  inited = true;

  audio = new Audio();
  audio.preload = 'none';
  audio.volume = 0;
  audio.addEventListener('error', () => {
    if (!audio?.getAttribute('src')) return;
    playingEra = null;
    status = 'error';
    paint();
  });

  let saved: string | null = null;
  try {
    saved = localStorage.getItem(SOUND_KEY);
    /* A visitor who hit STOP DA MUSIC in 1996 has spoken: stay quiet
       everywhere until they explicitly opt back in. */
    if (saved === null && localStorage.getItem('geo-muted') === '1') saved = '0';
  } catch {}
  prefOn = saved !== '0';

  geoExternal = document.querySelector('.stage-geocities [data-radio]') !== null;
  currentEra = document.documentElement.dataset.era ?? 'geocities';
  status = prefOn ? 'blocked' : 'off';

  document.addEventListener('era:change', (ev) => {
    const era = (ev as CustomEvent<{ era?: string }>).detail?.era;
    if (!era || era === currentEra) return;
    currentEra = era;
    if (!prefOn) {
      paint();
      return;
    }
    if (geoOwnsChannel(era)) {
      fadeStop('silent');
      return;
    }
    if (status === 'playing') {
      fadeTo(0, 200, () => startFor(era, FADE_IN_ZAP));
      paint();
    } else {
      /* The zap click is itself a gesture, so a blocked engine can
         usually start right here. */
      startFor(era, FADE_IN_ZAP);
    }
  });

  if (prefOn) {
    /* Optimistic cold start (usually rejected), then the gesture path. */
    tryStart(FADE_IN_FIRST);
  }
  paint();
}

/*
 * Bind a stage's themed tuner widget to the engine. The widget is a
 * pure view: play toggles the global sound, station buttons retune
 * this era's channel. Status strings stay in each era's voice;
 * "{st}" is replaced with the current station label.
 */
export function bindEraRadioTuner(opts: {
  era: string;
  widget: HTMLElement | null;
  text: { idle: string; waiting: string; live: string; error: string };
}): void {
  const { era, widget, text } = opts;
  if (!widget) return;
  const playBtn = widget.querySelector<HTMLButtonElement>('[data-radio-play]');
  if (!playBtn) return;
  const statusEls = Array.from(widget.querySelectorAll<HTMLElement>('[data-radio-status]'));
  const trackEls = Array.from(widget.querySelectorAll<HTMLElement>('[data-radio-track]'));
  const tabs = Array.from(widget.querySelectorAll<HTMLButtonElement>('[data-radio-station]'));

  const repaint = (s: RadioState) => {
    const st = stationFor(era);
    const playing = s.status === 'playing' && s.playingEra === era;
    widget.classList.toggle('is-playing', playing);
    playBtn.setAttribute('aria-pressed', String(playing));
    const label = playing ? playBtn.dataset.labelPause : playBtn.dataset.labelPlay;
    if (label) playBtn.textContent = label;
    trackEls.forEach((el) => { el.textContent = st.label; });
    tabs.forEach((t) => {
      const on = t.dataset.radioStation === st.id;
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-pressed', String(on));
    });
    let msg: string;
    if (playing) msg = text.live;
    else if (!s.on) msg = text.idle;
    else if (s.status === 'error' && s.era === era) msg = text.error;
    else if (s.status === 'blocked') msg = text.waiting;
    else msg = text.idle;
    const filled = msg.replaceAll('{st}', st.label);
    statusEls.forEach((el) => { el.textContent = filled; });
  };

  playBtn.addEventListener('click', () => {
    const s = getState();
    setSound(!(s.status === 'playing' && s.playingEra === era));
  });
  tabs.forEach((t) =>
    t.addEventListener('click', () => {
      const id = t.dataset.radioStation;
      if (id) selectStation(era, id);
    }),
  );

  subscribe(repaint);
  repaint(getState());
}

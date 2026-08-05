#!/usr/bin/env python3
"""Builds docs.html: the Grimoire player guide as a period pamphlet in the
Broadsheet visual system. All 28 markdown guides are pre-rendered and hash-
routed client-side so the artifact stays one self-contained file."""
import re, html, datetime
from pathlib import Path

import markdown

DOCS = Path(__file__).resolve().parents[2] / 'src/content/docs'
OUT = Path(__file__).parent / 'docs.html'
FONTS = (Path(__file__).parent / 'fonts/embedded.css').read_text().splitlines()
LANDING_URL = './landing.html'

def brand_icon(svg_file):
    d = re.search(r'<path d="([^"]+)"', (Path(__file__).parent / svg_file).read_text()).group(1)
    return f'<svg class="bicon" viewBox="0 0 24 24" aria-hidden="true"><path d="{d}"/></svg>'


ICON_GH = brand_icon('icon-github.svg')
ICON_DC = brand_icon('icon-discord.svg')

WANTED_FONTS = ['Ultra 400', 'Yellowtail 400', 'Oswald 400', 'Oswald 500', 'Jost 400', 'Jost 500']
faces = {}
for face in FONTS:
    fam = re.search(r"font-family:'([^']+)'", face).group(1)
    weight = re.search(r'font-weight:(\d+)', face).group(1)
    faces[f'{fam} {weight}'] = face
font_css = '\n'.join(faces[w] for w in WANTED_FONTS)

# Mirrors grimoire-site/src/pages/docs/index.astro SECTIONS (the guide README's
# own grouping). Slugs must stay in this order for prev/next to read naturally.
SECTIONS = [
    ('The Basics', ['first-run', 'installing-mods', 'load-order', 'conflicts', 'launching', 'troubleshooting']),
    ('The Locker', ['locker', 'locker-skins', 'locker-cards', 'locker-sounds', 'locker-effects', 'locker-global', 'locker-glb-tutorial', 'locker-overrides']),
    ('Profiles', ['profiles', 'profiles-sharing', 'snapshots']),
    ('Tuning and Customizing', ['crosshair', 'autoexec', 'performance-presets', 'appearance']),
    ('Optional Features', ['experimental-features', 'stats', 'discover', 'servers', 'door-stuck-sounds']),
    ('Trust', ['privacy']),
]


def parse(path):
    text = path.read_text()
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', text, re.S)
    fm = dict(re.findall(r'^(\w+):\s*(.+)$', m.group(1), re.M))
    return fm, m.group(2)


docs = {}
for f in DOCS.glob('*.md'):
    fm, body = parse(f)
    body = re.sub(r'^\s*# .+?\n', '', body, count=1)  # frontmatter title is the H1
    rendered = markdown.markdown(body, extensions=['fenced_code', 'tables'])
    rendered = rendered.replace('href="/docs/', 'href="#/')
    updated = datetime.date.fromisoformat(fm['updated']).strftime('%B %-d, %Y')
    docs[fm['slug']] = {'title': fm['title'], 'desc': fm['description'], 'updated': updated, 'html': rendered}

flat = [s for _, slugs in SECTIONS for s in slugs]
missing = [s for s in flat if s not in docs]
extra = [s for s in docs if s not in flat]
assert not missing, f'missing: {missing}'
if extra:
    SECTIONS.append(('Everything Else', sorted(extra)))
    flat += sorted(extra)

section_of = {slug: title for title, slugs in SECTIONS for slug in slugs}

contents = []
for title, slugs in SECTIONS:
    rows = ''.join(
        f'''<li class="toc-row">
          <a class="toc-link" href="#/{s}"><span class="toc-title">{html.escape(docs[s]['title'])}</span>
          <span class="toc-dots"></span><span class="toc-date">{docs[s]['updated']}</span></a>
          <p class="toc-desc">{html.escape(docs[s]['desc'])}</p>
        </li>''' for s in slugs)
    contents.append(f'''<section class="toc-dept">
      <h2 class="dept-head"><span class="dept-orn">❧</span> {html.escape(title)}</h2>
      <ul class="toc-list">{rows}</ul>
    </section>''')

articles = []
for i, slug in enumerate(flat):
    d = docs[slug]
    prev_slug, next_slug = (flat[i - 1] if i else None), (flat[i + 1] if i + 1 < len(flat) else None)
    nav = '<nav class="art-nav">'
    nav += (f'<a class="art-prev" href="#/{prev_slug}">&larr; {html.escape(docs[prev_slug]["title"])}</a>' if prev_slug else '<span></span>')
    nav += (f'<a class="art-next" href="#/{next_slug}">{html.escape(docs[next_slug]["title"])} &rarr;</a>' if next_slug else '<span></span>')
    nav += '</nav>'
    articles.append(f'''<article class="article" id="doc-{slug}" hidden>
      <p class="byline">Filed under {html.escape(section_of[slug])} · Revised {d['updated']}</p>
      <h1 class="art-title" tabindex="-1">{html.escape(d['title'])}</h1>
      <p class="art-desc">{html.escape(d['desc'])}</p>
      <div class="art-body">{d['html']}</div>
      <div class="art-foot">
        {nav}
        <p class="art-return"><a href="#/">&#10087; Return to the Table of Contents &#10086;</a></p>
      </div>
    </article>''')

page = f'''<title>Grimoire · The Reader's Companion</title>
<style>
{font_css}
</style>
<style>
  :root {{
    --paper: #ece1c8; --paper-warm: #e4d5b4; --ink: #2b241c; --brick: #9e3d2b;
    --brick-deep: #7e2f21; --plum: #4a4160; --mustard: #c9932b; --cream-text: #f0e6cd;
  }}
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html {{ scroll-behavior: smooth; }}
  @media (prefers-reduced-motion: reduce) {{ html {{ scroll-behavior: auto; }} }}
  body {{
    background: var(--paper); color: var(--ink);
    font-family: 'Jost', system-ui, sans-serif; font-size: 17px; line-height: 1.6;
    overflow-x: hidden;
  }}
  body::after {{
    content: ''; position: fixed; inset: 0; pointer-events: none; opacity: 0.07; z-index: 5;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
  }}
  a {{ color: var(--brick); }}
  a:focus-visible {{ outline: 3px solid var(--mustard); outline-offset: 3px; }}

  .topstrip {{ background: var(--ink); display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; padding: 12px 20px; }}
  .topstrip a {{
    font-family: 'Oswald', sans-serif; font-size: 12px; letter-spacing: 0.26em;
    text-transform: uppercase; text-decoration: none; color: var(--mustard); transition: color 0.2s;
  }}
  .topstrip a:hover {{ color: var(--paper); }}
  .bicon {{ width: 15px; height: 15px; fill: currentColor; vertical-align: -2px; margin-right: 7px; }}
  .powered {{ margin-bottom: 16px; }}
  .powered a {{
    display: inline-block;
    font-family: 'Oswald', sans-serif;
    font-size: 12px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--mustard);
    border: 1.5px solid var(--mustard);
    padding: 8px 18px;
    transition: background 0.2s, color 0.2s;
  }}
  .powered a:hover {{ color: var(--ink); background: var(--mustard); }}

  header.mast {{
    background: var(--plum); color: var(--cream-text); text-align: center;
    padding: 52px 24px 46px; border-bottom: 3px solid rgba(43, 36, 28, 0.35);
  }}
  .mast .tab {{
    font-family: 'Oswald', sans-serif; font-weight: 500; font-size: 13px;
    letter-spacing: 0.32em; text-transform: uppercase; color: var(--mustard);
  }}
  .mast .mast-grimoire {{
    font-family: 'Ultra', serif; font-size: clamp(26px, 4vw, 40px); text-transform: uppercase;
    color: var(--paper); text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.35); margin-top: 14px;
  }}
  .mast .mast-grimoire a {{ color: inherit; text-decoration: none; }}
  .mast .companion {{
    font-family: 'Yellowtail', cursive; font-size: clamp(40px, 7vw, 76px); line-height: 1.1;
    color: var(--cream-text); text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3); margin-top: 2px;
  }}
  .mast .count {{
    display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 18px;
    font-family: 'Oswald', sans-serif; font-size: 13px; letter-spacing: 0.4em; text-transform: uppercase;
  }}
  .mast .count::before, .mast .count::after {{ content: ''; width: 64px; border-top: 1px solid var(--mustard); }}

  main {{ max-width: 780px; margin: 0 auto; padding: 48px 24px 80px; }}

  /* Contents */
  .dept-head {{
    display: flex; align-items: center; gap: 14px;
    font-family: 'Oswald', sans-serif; font-weight: 500; font-size: 19px;
    letter-spacing: 0.26em; text-transform: uppercase; color: var(--brick);
    margin: 44px 0 18px;
  }}
  .toc-dept:first-child .dept-head {{ margin-top: 0; }}
  .dept-head::after {{ content: ''; flex: 1; border-top: 2px solid rgba(43, 36, 28, 0.35); }}
  .dept-orn {{ color: var(--mustard); font-size: 22px; }}
  .toc-list {{ list-style: none; }}
  .toc-row {{ padding: 10px 0; }}
  .toc-link {{ display: flex; align-items: baseline; gap: 10px; text-decoration: none; }}
  .toc-title {{
    font-family: 'Oswald', sans-serif; font-weight: 400; font-size: 17px;
    letter-spacing: 0.06em; color: var(--ink);
  }}
  .toc-link:hover .toc-title {{ color: var(--brick); }}
  .toc-dots {{ flex: 1; border-bottom: 2px dotted rgba(43, 36, 28, 0.4); transform: translateY(-4px); min-width: 24px; }}
  .toc-date {{
    font-family: 'Oswald', sans-serif; font-size: 12.5px; letter-spacing: 0.08em;
    color: rgba(43, 36, 28, 0.6); white-space: nowrap; font-variant-numeric: tabular-nums;
  }}
  .toc-desc {{ font-size: 14.5px; color: rgba(43, 36, 28, 0.72); max-width: 56ch; margin-top: 2px; }}

  /* Articles */
  .byline {{
    font-family: 'Oswald', sans-serif; font-size: 12.5px; letter-spacing: 0.24em;
    text-transform: uppercase; color: var(--brick); margin-bottom: 14px;
  }}
  .art-title {{
    font-family: 'Ultra', serif; font-weight: 400; font-size: clamp(26px, 4.6vw, 40px);
    line-height: 1.15; text-wrap: balance; outline: none;
  }}
  .art-desc {{ margin: 12px 0 8px; font-size: 18px; color: rgba(43, 36, 28, 0.8); font-style: italic; max-width: 60ch; }}
  .art-body {{ max-width: 66ch; }}
  .art-body > p:first-of-type::first-letter {{
    font-family: 'Ultra', serif; font-size: 3.1em; line-height: 0.85;
    float: left; padding: 6px 10px 0 0; color: var(--brick);
  }}
  .art-body h2 {{
    display: flex; align-items: center; gap: 14px;
    font-family: 'Oswald', sans-serif; font-weight: 500; font-size: 19px;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink);
    margin: 38px 0 14px;
  }}
  .art-body h2::after {{ content: ''; flex: 1; border-top: 1px solid rgba(43, 36, 28, 0.35); }}
  .art-body h3 {{
    font-family: 'Oswald', sans-serif; font-weight: 500; font-size: 16px;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--brick); margin: 26px 0 10px;
  }}
  .art-body p {{ margin: 14px 0; }}
  .art-body ul, .art-body ol {{ margin: 14px 0 14px 26px; }}
  .art-body li {{ margin: 7px 0; }}
  .art-body li::marker {{ color: var(--brick); }}
  .art-body strong {{ font-weight: 600; }}
  .art-body code {{
    font-family: ui-monospace, monospace; font-size: 14px;
    background: rgba(43, 36, 28, 0.09); padding: 1px 6px; border-radius: 2px;
  }}
  .art-body pre {{
    background: #efe7d0; border: 1.5px solid rgba(43, 36, 28, 0.5);
    box-shadow: 4px 4px 0 rgba(43, 36, 28, 0.18);
    padding: 16px 18px; margin: 18px 0; overflow-x: auto;
  }}
  .art-body pre code {{ background: none; padding: 0; font-size: 13.5px; }}
  .art-body table {{ border-collapse: collapse; margin: 18px 0; width: 100%; }}
  .art-body th {{
    font-family: 'Oswald', sans-serif; font-weight: 500; font-size: 13px;
    letter-spacing: 0.14em; text-transform: uppercase; text-align: left;
    border-bottom: 2px solid var(--ink); padding: 8px 14px 8px 0;
  }}
  .art-body td {{ border-bottom: 1px solid rgba(43, 36, 28, 0.25); padding: 9px 14px 9px 0; font-size: 15.5px; }}
  .art-body .table-wrap {{ overflow-x: auto; }}
  .art-body blockquote {{
    border-left: 3px solid var(--mustard); padding: 2px 0 2px 18px;
    margin: 16px 0; color: rgba(43, 36, 28, 0.8); font-style: italic;
  }}

  .art-foot {{ margin-top: 52px; border-top: 3px double rgba(43, 36, 28, 0.5); padding-top: 22px; }}
  .art-nav {{ display: flex; justify-content: space-between; gap: 18px; flex-wrap: wrap; }}
  .art-nav a {{
    font-family: 'Oswald', sans-serif; font-size: 13.5px; letter-spacing: 0.1em;
    text-transform: uppercase; text-decoration: none; color: var(--brick);
  }}
  .art-nav a:hover {{ color: var(--ink); }}
  .art-return {{ text-align: center; margin-top: 26px; }}
  .art-return a {{
    font-family: 'Oswald', sans-serif; font-size: 13px; letter-spacing: 0.26em;
    text-transform: uppercase; text-decoration: none; color: rgba(43, 36, 28, 0.65);
  }}
  .art-return a:hover {{ color: var(--brick); }}

  footer {{
    background: var(--ink); color: var(--paper); text-align: center;
    padding: 34px 20px; font-size: 13px;
  }}
  footer .colophon {{ color: rgba(236, 225, 200, 0.55); letter-spacing: 0.06em; }}
</style>

<nav class="topstrip" aria-label="Primary">
  <a href="{LANDING_URL}">Home</a>
  <a href="#/">Contents</a>
  <a href="https://github.com/Slush97/grimoire">{ICON_GH}GitHub</a>
  <a href="https://discord.gg/KgYGHEMq2P">{ICON_DC}Discord</a>
</nav>

<header class="mast">
  <p class="tab">Complete instructions in plain speech</p>
  <p class="mast-grimoire"><a href="{LANDING_URL}">Grimoire</a></p>
  <p class="companion">The Reader's Companion</p>
  <p class="count">{len(flat)} entries · revised regularly</p>
</header>

<main>
  <div id="view-contents">
    {''.join(contents)}
  </div>
  {''.join(articles)}
</main>

<footer>
  <p class="powered"><a href="https://github.com/Slush97/vpkmerge">Powered by vpkmerge</a></p>
  <p class="colophon">This companion is published by Slush &amp; Co. · grimoiremods.com · MMXXVI</p>
</footer>

<script>
  (function () {{
    var contentsView = document.getElementById('view-contents');
    var articles = document.querySelectorAll('.article');
    function route() {{
      var slug = location.hash.replace(/^#\\/?/, '');
      var target = slug && document.getElementById('doc-' + slug);
      contentsView.hidden = !!target;
      articles.forEach(function (a) {{ a.hidden = true; }});
      if (target) {{
        target.hidden = false;
        document.title = target.querySelector('.art-title').textContent + " · Grimoire Reader's Companion";
        window.scrollTo(0, 0);
        target.querySelector('.art-title').focus({{ preventScroll: true }});
      }} else {{
        document.title = "Grimoire · The Reader's Companion";
        window.scrollTo(0, 0);
      }}
    }}
    window.addEventListener('hashchange', route);
    route();
  }})();
</script>
'''

# Tables need their own scroll container so the page never scrolls sideways
page = page.replace('<table>', '<div class="table-wrap"><table>').replace('</table>', '</table></div>')

OUT.write_text(page)
print(f'{len(flat)} docs, {len(page) // 1024} KB')

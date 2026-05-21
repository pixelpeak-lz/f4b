# Fun4Brain — strona internetowa

Nowoczesny redesign strony Fun4Brain Escape Room Poznań.

## Struktura

- `index.html` — strona główna (hero, pokoje, dla kogo, opinie, blog, vouchery, mapa)
- `faq.html` — pełne FAQ z wyszukiwarką
- `voucher.html` — voucher na konkretny pokój
- `karta-podarunkowa.html` — karta podarunkowa o dowolnej wartości
- `components.jsx`, `faq.jsx`, `modal.jsx` — wspólne komponenty React
- `app.jsx`, `faq-app.jsx`, `voucher-app.jsx`, `karta-app.jsx` — entry point dla każdej podstrony
- `styles.css` — wszystkie style
- `image-slot.js` — komponent drop-zone na zdjęcia (możesz przeciągnąć własne)
- `hero-bg.jpg` — zdjęcie tła w hero

## Deployment na GitHub Pages

1. Utwórz repo na GitHubie (np. `fun4brain-site`)
2. Wrzuć całą zawartość folderu do roota repo
3. W ustawieniach repo → Pages → wybierz branch `main` i folder `/`
4. Po 1-2 minutach strona dostępna pod `https://<user>.github.io/fun4brain-site/`

## Edycja treści

- **Teksty pokoi** — `components.jsx`, stała `ROOMS` (linijka ~480)
- **Treść bloga** — `components.jsx`, stała `BLOG_POSTS`
- **Opinie** — `components.jsx`, stała `TESTIMONIALS`
- **FAQ** — `faq.jsx`, stała `FAQ_ITEMS`

## Podmiana zdjęć

Każdy obrazek na stronie używa komponentu `<image-slot>` — przeciągnij plik na slot, zostanie zapisany lokalnie (tylko dla testów). Dla produkcji podmień URL-e w komponentach React (`photo:` w `ROOMS`, `cover:` w `BLOG_POSTS`, `src=` w hero).

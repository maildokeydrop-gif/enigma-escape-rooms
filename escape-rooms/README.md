# ENIGMA — Komnaty Zagadek

Immersyjna platforma escape room w przeglądarce.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

## Struktura projektu

```
src/
  pages/       — strony aplikacji (Home, Rooms, Game, Victory)
  components/  — współdzielone komponenty (Nav, Stars)
  rooms/       — dane każdego escape roomu
  hooks/       — logika (postęp gracza, localStorage)
```

## Dodawanie nowego escape roomu

1. Stwórz plik `src/rooms/nazwaRoom.js` wg wzoru `dreamRoom.js`
2. Dodaj room do listy w `RoomsPage.jsx`
3. Dodaj import i mapowanie w `GamePage.jsx`

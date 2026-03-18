export const dreamRoom = {
  id: 'komnata-snow',
  title: 'Komnata Zapomnianych Snów',
  subtitle: 'Poziom: Tajemniczy · Czas: ~30 minut',
  difficulty: 2,
  theme: 'dream',
  colors: {
    primary: '#7b4fa6',
    accent: '#c9a84c',
    bg: '#08061a',
    surface: '#110d2a',
  },
  intro: `Budzisz się w miejscu, którego nie pamiętasz.
Powietrze pachnie starym pergaminem i dymem świec.
Na ścianie drżą cienie rzeczy, których tutaj nie ma.
Drzwi są zamknięte. Klucz jest ukryty w twoich snach.

Musisz rozwiązać trzy zagadki, by odzyskać wspomnienie i wydostać się.`,

  puzzles: [
    {
      id: 'p1',
      title: 'Zegar bez Wskazówek',
      scene: `Przed tobą stoi stary zegar z kryształowej tarczy.
Zamiast cyfr widnieją symbole: ☽ ✦ ⬡ ✧ ☿ ⟁ ⬟ ✦ ☽ ⬡ ⟁ ✧
Wskazówki leżą na podłodze — złamane.
Na postumencie wyryty jest napis:

"Idę bez nóg, mówię bez ust,
słyszę cię, gdy śpisz.
Nie jestem twoim wrogiem —
jestem tym, czego nigdy nie cofniesz."`,
      hint1: 'Zagadka mówi o czymś, co płynie nieustannie i czego nie można zatrzymać...',
      hint2: 'To jest coś, co mijasz każdego dnia, co zużywa się bez powrotu. Co to?',
      answer: 'czas',
      successText: 'Zegar budzi się do życia. Wskazówki pojawiają się z nikąd i zatrzymują na godzinie dwunastej. Skrytka w postumencie otwiera się — w środku jest złożony pergamin.',
    },
    {
      id: 'p2',
      title: 'Pergamin Cieni',
      scene: `Rozwijasz pergamin. Widnieją na nim słowa, lecz większość wyblakła.
Pozostały jedynie fragmenty:

"_ _ _ Ł _ _ _   jest matką wszystkich kłamstw,
lecz tylko ona zna prawdziwe oblicze nocy.
Szukaj jej tam, gdzie oczy są zamknięte,
a umysł wędruje swobodnie."

Poniżej rysunek: ludzka postać leżąca, oczy zamknięte, z głowy wyrastają obłoki.`,
      hint1: 'Ludzka postać z zamkniętymi oczami i obłokami z głowy... Co robimy z zamkniętymi oczami?',
      hint2: 'To słowo na "S" — stan, w którym jesteś każdej nocy. W nim wszystko jest możliwe.',
      answer: 'sen',
      successText: 'Litery na pergaminie zaczynają świecić. Tekst uzupełnia się sam: "WYOBRAŹNIA jest matką wszystkich kłamstw". Pod pergaminem odkrywasz klucz — ale do czego?',
    },
    {
      id: 'p3',
      title: 'Lustro Prawdy',
      scene: `Na ścianie wisi ogromne lustro w złotej ramie.
Twoje odbicie nie naśladuje twoich ruchów.
Patrzy wprost na ciebie i wskazuje na napis wyrytą w ramie:

"Jestem zawsze przed tobą,
choć nigdy cię nie wyprzedzam.
Widzisz mnie każdego ranka,
lecz nigdy mnie nie dotkniesz.

Powiedz moje imię, a drzwi się otworzą."

Odbicie w lustrze uśmiecha się powoli.`,
      hint1: 'Jesteś "przed tobą", widzisz to każdego ranka, ale nigdy tego nie dotykasz...',
      hint2: 'To coś, co widzisz patrząc w lustro. Każdego ranka się z tym spotykasz. To twoja twarz — ale też... co odbija lustro?',
      answer: 'odbicie',
      successText: null,
    },
  ],
}

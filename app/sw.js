/*
  Сервис-воркер BASYS — то, чем веб-версия работает в зале.

  ⚠ **Это заготовка. Список предзагрузки и версию подставляет сборка**
  (`scripts/build-web.mjs`) после `expo export`, потому что имя бандла содержит
  хеш и меняется каждым заходом. Файл в репозитории лежит с пустым списком
  намеренно: так видно, что он не работает сам по себе, а не притворяется
  рабочим с устаревшим перечнем.

  Зачем предзагрузка целиком, а не «закэшируется при первом обращении».
  В зале сети нет. Ленивый кэш означает, что человек откроет экран, на который
  дома не заходил, и получит пустоту — посреди занятия, без объяснений
  и без возможности что-то сделать. Список поэтому собирается из вывода
  сборки и обязан быть полным.
*/

/** Подставляется сборкой: отпечаток содержимого вывода. */
const VERSION = "0.4.4+basys-64f04f415b27e20a";

/** Подставляется сборкой: всё, что должно работать без сети. */
const PRECACHE = [
  "/basys_open/app/(tabs)/food/",
  "/basys_open/app/(tabs)/gym/",
  "/basys_open/app/(tabs)/",
  "/basys_open/app/(tabs)/system/appearance",
  "/basys_open/app/(tabs)/system/data",
  "/basys_open/app/(tabs)/system/",
  "/basys_open/app/(tabs)/system/rules",
  "/basys_open/app/(tabs)/system/session",
  "/basys_open/app/(tabs)/system/summary",
  "/basys_open/app/(tabs)/system/tickets",
  "/basys_open/app/+not-found",
  "/basys_open/app/_expo/.routes.json",
  "/basys_open/app/_expo/static/js/web/entry-6fc8c8e98fa7b8e0ac3a8afc8d369e57.js",
  "/basys_open/app/_sitemap",
  "/basys_open/app/apple-touch-icon.png",
  "/basys_open/app/assets/__node_modules/@expo-google-fonts/ibm-plex-mono/400Regular/IBMPlexMono_400Regular.b112f77f65b1766764ee122703ebdcd0.ttf",
  "/basys_open/app/assets/__node_modules/@expo-google-fonts/ibm-plex-mono/500Medium/IBMPlexMono_500Medium.eddb5e5647bc7910fd2417321769f58d.ttf",
  "/basys_open/app/assets/__node_modules/@expo-google-fonts/ibm-plex-sans/400Regular/IBMPlexSans_400Regular.f7c4c8c20e7d7fc722d9b99ff968f80c.ttf",
  "/basys_open/app/assets/__node_modules/@expo-google-fonts/ibm-plex-sans/500Medium/IBMPlexSans_500Medium.d68c561bec0bcba82f4077af34396997.ttf",
  "/basys_open/app/assets/__node_modules/@expo-google-fonts/ibm-plex-sans/600SemiBold/IBMPlexSans_600SemiBold.fe6e832454c49a59775ee4efb3867543.ttf",
  "/basys_open/app/assets/__node_modules/expo-router/assets/arrow_down.017bc6ba3fc25503e5eb5e53826d48a8.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/error.d1ea1496f9057eb392d5bbf3732a61b7.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/file.19eeb73b9593a38f8e9f418337fc7d10.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/forward.d8b800c443b8972542883e0b9de2bdc6.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/pkg.ab19f4cbc543357183a20571f68380a3.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/react-navigation/elements/back-icon-mask.0a328cd9c1afd0afe8e3b1ec5165b1b4.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/react-navigation/elements/back-icon.35ba0eaec5a4f5ed12ca16fabeae451d.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55@2x.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55@3x.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55@4x.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7@2x.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7@3x.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7@4x.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/react-navigation/elements/search-icon.286d67d3f74808a60a78d3ebf1a5fb57.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/sitemap.412dd9275b6b48ad28f5e3d81bb1f626.png",
  "/basys_open/app/assets/__node_modules/expo-router/assets/unmatched.20e71bdf79e3a97bf55fd9e164041578.png",
  "/basys_open/app/build/day",
  "/basys_open/app/build/exset",
  "/basys_open/app/build/",
  "/basys_open/app/catalog",
  "/basys_open/app/exercise",
  "/basys_open/app/exercises",
  "/basys_open/app/favicon.ico",
  "/basys_open/app/food/",
  "/basys_open/app/gym/",
  "/basys_open/app/history",
  "/basys_open/app/icon-192.png",
  "/basys_open/app/icon-512.png",
  "/basys_open/app/icon-maskable-512.png",
  "/basys_open/app/",
  "/basys_open/app/manifest.webmanifest",
  "/basys_open/app/program/description",
  "/basys_open/app/program/",
  "/basys_open/app/program/one",
  "/basys_open/app/program/priorities",
  "/basys_open/app/program/switch",
  "/basys_open/app/response/analysis",
  "/basys_open/app/response/",
  "/basys_open/app/response/measure",
  "/basys_open/app/response/recorded",
  "/basys_open/app/response/repeat",
  "/basys_open/app/response/select",
  "/basys_open/app/response/sessions",
  "/basys_open/app/response/sites",
  "/basys_open/app/session/",
  "/basys_open/app/session/run",
  "/basys_open/app/session/summary",
  "/basys_open/app/sql-wasm-browser.wasm",
  "/basys_open/app/system/appearance",
  "/basys_open/app/system/data",
  "/basys_open/app/system/",
  "/basys_open/app/system/rules",
  "/basys_open/app/system/session",
  "/basys_open/app/system/summary",
  "/basys_open/app/system/tickets"
];

/** Куда откатываться, когда запрошенной страницы нет ни в кэше, ни в сети. */
const SHELL = new URL('./', self.registration.scope).pathname;

self.addEventListener('install', (event) => {
  /*
    `addAll`, а не поштучно, и это осознанно: он атомарен. Не доедет один файл —
    не установится ничего, и приложение честно останется без офлайна вместо
    того, чтобы получить его наполовину. Половина здесь хуже отсутствия:
    она обнаруживается в зале.

    ⚠ **`skipWaiting()` отсюда не зовётся, и это по-прежнему решение.** Воркер
    умеет заменить себя немедленно — и тогда новая версия приезжает посреди
    работы. Правило «обновление не прилетает посреди подхода» действует и здесь.

    ⚠ **Но и ждать закрытия вкладок он больше не обязан, и вот почему.**
    До 31 августа новая версия вставала, только когда закроются **все** клиенты.
    Перезагрузка страницы клиентом быть не перестаёт: на компьютере надо закрыть
    вкладку, на iPhone — смахнуть приложение из переключателя. Никто этого
    не делает, и знать о таком человек не обязан. Отказ выглядел как исправно
    работающее приложение со старыми экранами — и именно так он и выглядел
    у заказчика.

    Правило поэтому уточнено, а не отменено: **никогда автоматически, только
    по нажатию человека.** Разрешение приходит сообщением от страницы — см.
    обработчик `message` ниже и `src/updates/offer.web.ts`.
  */
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(PRECACHE)));
});

/**
 * Разрешение встать, пришедшее от страницы.
 *
 * ⚠ **Единственное место, где зовётся `skipWaiting()`, и это проверяется
 * прогоном** (`scripts/sw.spec.ts`). Позови его из `install` — и обновление
 * снова начнёт приезжать посреди подхода, а разница между «человек нажал»
 * и «браузер решил» не видна ни в одном отчёте.
 *
 * Тип сообщения сверяется, а не подразумевается: в область воркера сообщения
 * шлёт не только наш код, и «что угодно от кого угодно» — не то условие,
 * по которому меняют версию приложения посреди занятия.
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'skip-waiting') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((name) => name !== VERSION).map((name) => caches.delete(name))),
      )
      // Взять под управление уже открытую страницу. Достижимо только при первой
      // установке: когда новый воркер ждёт, до `activate` дело не доходит.
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Чужие адреса и всё, кроме чтения, идут мимо: кэшировать их нечего,
  // а перехватывать — значит отвечать за то, чем мы не управляем.
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached !== undefined) return cached;

      /*
        Каталог кэширован со слешем (`/gym/`), а перейти на него могут без
        (`/gym`): сервер в этом случае отвечает 301, и в кэше такого адреса
        нет. В сети это незаметно, офлайн — это лишний перезапуск приложения
        из оболочки. Одна попытка со слешем избавляет от него.
      */
      const withSlash =
        request.mode === 'navigate' && !request.url.endsWith('/')
          ? caches.match(`${request.url}/`)
          : Promise.resolve(undefined);

      return withSlash.then((slashed) => {
        if (slashed !== undefined) return slashed;

        return fetch(request).catch(() => {
          /*
            Сети нет, и в кэше этого адреса тоже. Для перехода по странице
            отдаём оболочку: маршрутизатор разберёт адрес сам, уже на клиенте,
            и человек увидит нужный экран вместо страницы браузера об ошибке.

            Для всего прочего — честный отказ. Подсунуть вместо картинки или
            шрифта HTML значило бы сломать разбор в месте, далёком от причины.
          */
          if (request.mode === 'navigate') return caches.match(SHELL);
          return Response.error();
        });
      });
    }),
  );
});

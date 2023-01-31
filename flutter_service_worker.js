'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "cf7787dcad0f23d5ad945c656feef81a",
"index.html": "5ef6394d8508b53f61531266af1f9b3e",
"/": "5ef6394d8508b53f61531266af1f9b3e",
"main.dart.js": "dcd78344cc3bf5a84260e82eb961ee64",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "f4098b555f453a3699bfb886aa7ced2f",
"assets/AssetManifest.json": "2b50f814b7a4fbe8d8e090ea214d735c",
"assets/NOTICES": "d9d434b46b9e98923e094e739f7a143c",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/packages/easy_localization/i18n/ar-DZ.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/packages/easy_localization/i18n/en.json": "5f5fda8715e8bf5116f77f469c5cf493",
"assets/packages/easy_localization/i18n/en-US.json": "5f5fda8715e8bf5116f77f469c5cf493",
"assets/packages/easy_localization/i18n/ar.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/shaders/ink_sparkle.frag": "f5a18b4ba42e9a3c059b376d2dc6fd4e",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/image_idea.jpeg": "cd43984ebf346a9294a36e0313788fca",
"assets/assets/images/image_3.webp": "c0f72d72e3b1f9f4a2318da8b3415bde",
"assets/assets/images/image_other.webp": "1045abbc36b15844796ca1275f58f9b8",
"assets/assets/images/image_2.webp": "72369f92bbe4f0c06c619a78ea155b90",
"assets/assets/images/risk_profile_QA30.png": "a4a5905716cc7701890d31761af75a5c",
"assets/assets/images/risk_profile_QA31.png": "12c31ae544f5527d97bd4ada269d3bcf",
"assets/assets/images/risk_profile_QA33.png": "07c9e1f792c70391d9ec79531bb06086",
"assets/assets/images/risk_profile_QA32.png": "69363158f7573163bc5c4718b5dffc8a",
"assets/assets/images/image_4.webp": "2ab20c225e0c53f93e8d75b1ab390ace",
"assets/assets/images/image_6.webp": "238475185fa75e2ec1533abd025a186e",
"assets/assets/images/image_1.webp": "e5739765f44ae5cddc72e7947c6f1ffd",
"assets/assets/images/image_art.webp": "645810092bca821e34cf56e4d01b5e4d",
"assets/assets/images/image_4.jpeg": "d832d66e601d62c19dee82bee3b4be38",
"assets/assets/images/image_5.jpeg": "9b2ee8040b9df2fe6390e49aed21f45a",
"assets/assets/rive/radio_button.riv": "1b9f950163f627a023b3aa92b34f25e5",
"assets/assets/rive/graph.riv": "b2e61d684fb73e15b7a077455eb42037",
"assets/assets/rive/splash.riv": "b935511cdfd7477ca90ed3ef515da433",
"assets/assets/svgs/groupone.svg": "ff5de18d9976645f4d1f6d69158f58cb",
"assets/assets/svgs/vector.svg": "a73c1952830d876244e29a6d669436c9",
"assets/assets/svgs/help-chat.svg": "ae61b3cb35b66cf862ff91ba0d243439",
"assets/assets/svgs/Vector%252034.svg": "c7c62a62840a0831790f4a8aebf01c17",
"assets/assets/svgs/Vector1.svg": "82cefd7c3778cb6ec1cbd0d7a1163e6a",
"assets/assets/svgs/icon_check_circle.svg": "336f4f9549dff52c62b88e353b533f3e",
"assets/assets/svgs/back-button.svg": "931fdfc9617c426aa1e2173cd284aede",
"assets/assets/svgs/icon_navigate_next.svg": "ed87aa781b7048809d7825a64ec88df3",
"assets/assets/svgs/grouptwo.svg": "bf71b21302b29155b4e6489e82908bae",
"assets/assets/envs/prod.env": "a9a3ddb316ceb533f06d7e7ad5fc47cd",
"assets/assets/envs/uat.env": "4980a5f87cd133b6f114e7450266bfd8",
"assets/assets/translations/en.json": "364916a05f5de8f7f99c7e872a2dfe8d"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

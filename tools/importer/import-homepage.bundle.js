/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    const cells = [];
    cells.push(["Carousel"]);
    const panels = element.querySelectorAll(".s-carousel__slides__panel");
    panels.forEach((panel) => {
      const img = panel.querySelector("img.s-carousel__slides__panel__img") || panel.querySelector("picture img") || panel.querySelector('img[src*="media.kingston"]');
      const title = panel.querySelector(".c-headerClip__title");
      const desc = panel.querySelector(".c-headerClip__desc");
      const cta = panel.querySelector(".c-headerClip__cta__link");
      const contentParts = [];
      if (title) {
        const h2 = document.createElement("h2");
        h2.textContent = title.textContent.trim();
        contentParts.push(h2);
      }
      if (desc && desc.textContent.trim()) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        contentParts.push(p);
      }
      if (cta) {
        const a = document.createElement("a");
        a.href = cta.href;
        a.textContent = cta.textContent.trim().replace(/\s+/g, " ");
        const p = document.createElement("p");
        p.append(a);
        contentParts.push(p);
      }
      const contentCell = document.createElement("div");
      contentParts.forEach((part) => contentCell.append(part));
      if (img) {
        const imgEl = document.createElement("img");
        imgEl.src = img.src;
        imgEl.alt = img.alt || "";
        cells.push([imgEl, contentCell]);
      } else {
        cells.push([contentCell]);
      }
    });
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/columns-search.js
  function parse2(element, { document }) {
    const cells = [];
    cells.push(["Columns"]);
    const searchCards = element.querySelectorAll(".c-searchCard");
    const row = [];
    searchCards.forEach((card) => {
      const heading = card.querySelector(".c-searchCard__heading");
      const desc = card.querySelector(".c-searchCard__body p");
      const contentCell = document.createElement("div");
      if (heading) {
        const h3 = document.createElement("h3");
        h3.textContent = heading.textContent.trim();
        contentCell.append(h3);
      }
      if (desc) {
        const p2 = document.createElement("p");
        p2.textContent = desc.textContent.trim();
        contentCell.append(p2);
      }
      const a = document.createElement("a");
      a.href = "https://www.kingston.com/en/memory/search";
      a.textContent = "Search";
      const p = document.createElement("p");
      p.append(a);
      contentCell.append(p);
      row.push(contentCell);
    });
    if (row.length) {
      cells.push(row);
    }
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/cards-banner.js
  function parse3(element, { document }) {
    const cells = [];
    cells.push(["Cards"]);
    const cards = element.querySelectorAll(".s-banners-card, li");
    cards.forEach((card) => {
      const link = card.querySelector("a");
      const img = card.querySelector(".c-card__img img") || card.querySelector("img");
      const title = card.querySelector(".c-card__details h3") || card.querySelector("h3");
      const imgEl = document.createElement("img");
      if (img) {
        imgEl.src = img.src;
        imgEl.alt = img.alt || "";
      }
      const contentCell = document.createElement("div");
      if (title) {
        const a = document.createElement("a");
        a.href = link ? link.href : "#";
        a.textContent = title.textContent.trim();
        const p = document.createElement("p");
        p.append(a);
        contentCell.append(p);
      }
      cells.push([imgEl, contentCell]);
    });
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }

  // tools/importer/transformers/cleanup.js
  function transform(hookName, element, payload) {
    if (hookName === "beforeTransform") {
      const { document } = payload;
      const selectorsToRemove = [
        ".osano-cm-window",
        ".osano-cm-widget",
        ".osano-cm-info-dialog",
        ".grecaptcha-badge",
        ".grecaptcha-policy",
        '[class*="google-tag"]',
        "noscript",
        ".nav-height-fix",
        ".s-notification",
        ".c-dialog",
        '[id*="recaptcha"]',
        '[class*="recaptcha"]',
        'iframe[src*="recaptcha"]',
        'iframe[src*="googletagmanager"]',
        "[data-osano]"
      ];
      selectorsToRemove.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => el.remove());
      });
      document.querySelectorAll("div:empty").forEach((el) => {
        if (!el.id && !el.className) el.remove();
      });
      document.querySelectorAll('img[src^="data:image/svg+xml"]').forEach((img) => {
        const parent = img.closest("button, .s-carousel__indicators, .s-footer__list__section__indicator");
        if (parent) img.remove();
      });
    }
  }

  // tools/importer/transformers/sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const { document } = payload;
      const header = document.querySelector("header.zone-navigation");
      if (header) header.remove();
      const footer = document.querySelector("section.s-footer");
      if (footer) footer.remove();
      const footNote = document.querySelector("#FootNote");
      if (footNote) footNote.remove();
      document.querySelectorAll(".zone-after-main, .zone-sandbox").forEach((el) => el.remove());
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-hero": parse,
    "columns-search": parse2,
    "cards-banner": parse3
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Kingston homepage with hero banner, product categories, featured products, and promotional content",
    urls: ["https://www.kingston.com/en"],
    blocks: [
      {
        name: "carousel-hero",
        instances: ["section.s-carousel"]
      },
      {
        name: "columns-search",
        instances: [".s-searchConfigurator__body"]
      },
      {
        name: "cards-banner",
        instances: ["section.s-banners .l-gridFlex"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Carousel",
        selector: "section.s-carousel",
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Product Finder",
        selector: "section.s-searchConfigurator",
        style: "stone",
        blocks: ["columns-search"],
        defaultContent: [".c-heading h2", ".c-heading p"]
      },
      {
        id: "section-3",
        name: "Banner Cards",
        selector: "section.s-banners",
        style: null,
        blocks: ["cards-banner"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();

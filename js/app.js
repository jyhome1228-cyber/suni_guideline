/* =========================================================
   GENERIC BRAND GUIDELINES
   Application / Page Renderer

   brand-data.js의 데이터를 읽어
   A4 가로형 브랜드 가이드라인을 자동 생성합니다.
========================================================= */

(() => {
  "use strict";


  /* =======================================================
     01. INITIAL ELEMENTS
  ======================================================= */

  const data = window.BRAND_DATA;

  const documentRoot =
    document.getElementById("guideline");

  const navigationRoot =
    document.getElementById("screenNavigation");

  const toolbarBrandName =
    document.getElementById("toolbarBrandName");

  const toolbarGuidelineTitle =
    document.getElementById("toolbarGuidelineTitle");

  const pageIndicator =
    document.getElementById("pageIndicator");

  const previousButton =
    document.getElementById("previousPageButton");

  const nextButton =
    document.getElementById("nextPageButton");

  const printButton =
    document.getElementById("printButton");


  if (!data || !documentRoot) {
    console.error(
      "BRAND_DATA 또는 #guideline 요소를 찾을 수 없습니다."
    );

    return;
  }


  /* =======================================================
     02. BASIC UTILITIES
  ======================================================= */

  function escapeHTML(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  function lineBreaks(value = "") {
    return escapeHTML(value)
      .replace(/\n/g, "<br>");
  }


  function classNames(...names) {
    return names
      .filter(Boolean)
      .join(" ");
  }


  function formatPageNumber(value) {
    return String(value)
      .padStart(2, "0");
  }


  function hasText(value) {
    return Boolean(
      String(value || "").trim()
    );
  }


  /* =======================================================
     03. PAGE NORMALIZATION

     enabled가 false인 페이지는 제외합니다.

     페이지 번호와 ID는 현재 배열 순서를 기준으로
     자동으로 생성합니다.
  ======================================================= */

  const activePages = (
    Array.isArray(data.pages)
      ? data.pages
      : []
  )
    .filter((page) => page.enabled !== false)
    .map((page, index) => {
      const pageNumber = index + 1;

      return {
        ...page,

        number:
          formatPageNumber(pageNumber),

        numericNumber:
          pageNumber,

        id:
          `page-${formatPageNumber(pageNumber)}`
      };
    });


  function getPageByNumber(pageNumber) {
    return activePages.find(
      (page) =>
        page.numericNumber ===
        Number(pageNumber)
    );
  }


  function getPageByKey(pageKey) {
    return activePages.find(
      (page) =>
        page.key === pageKey
    );
  }


  function getPageLabel(page) {
    if (!page) {
      return "";
    }

    if (!hasText(page.subtitle)) {
      return page.title || "";
    }

    return `${page.title} ${page.subtitle}`;
  }


  function getRenderedPages() {
    return Array.from(
      document.querySelectorAll(
        ".guideline-page"
      )
    );
  }


  /* =======================================================
     04. IMAGE RENDERER
  ======================================================= */

  function renderImage({
    src = "",
    alt = "",
    placeholder = "IMAGE PLACEHOLDER",
    className = ""
  } = {}) {
    if (!hasText(src)) {
      return `
        <div
          class="${classNames(
            "empty-image",
            className
          )}"
        >
          <span>
            ${escapeHTML(placeholder)}
          </span>
        </div>
      `;
    }

    return `
      <img
        class="${escapeHTML(className)}"
        src="${escapeHTML(src)}"
        alt="${escapeHTML(alt)}"
        loading="lazy"
      >
    `;
  }


  /* =======================================================
     05. LOGO FALLBACK

     SVG가 아직 없을 때 가이드라인의 구조를
     확인할 수 있도록 임시 로고를 표시합니다.
  ======================================================= */

  function createLogoFallback(label = "LOGO") {
    const safeLabel =
      escapeHTML(label || "LOGO");

    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 260"
        role="img"
        aria-label="${safeLabel}"
      >
        <rect
          x="2"
          y="2"
          width="396"
          height="256"
          rx="12"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-dasharray="12 10"
          opacity="0.42"
        />

        <text
          x="200"
          y="138"
          fill="currentColor"
          font-family="Arial, sans-serif"
          font-size="38"
          font-weight="700"
          letter-spacing="5"
          text-anchor="middle"
          opacity="0.64"
        >
          ${safeLabel}
        </text>
      </svg>
    `;
  }


  /* =======================================================
     06. LOGO RENDERER

     logoType:
     primary / alternate

     color:
     primary / white / black
  ======================================================= */

  function renderLogo({
    color = "primary",
    size = "",
    className = "",
    logoType = "primary"
  } = {}) {
    const alternateEnabled =
      data.logo?.alternate?.enabled === true;

    const actualLogoType =
      logoType === "alternate" &&
      alternateEnabled
        ? "alternate"
        : "primary";


    const logoData =
      actualLogoType === "alternate"
        ? data.logo?.alternate
        : data.logo?.primary;


    const logoName =
      logoData?.name ||
      data.logo?.name ||
      "Brand Logo";


    const svgMarkup =
      hasText(logoData?.svg)
        ? logoData.svg
        : createLogoFallback(
            actualLogoType === "alternate"
              ? "ALT LOGO"
              : "LOGO"
          );


    const colorClass = {
      primary: "is-primary",
      white: "is-white",
      black: "is-black"
    }[color] || "is-primary";


    const sizeClass = {
      small: "brand-logo-small",
      medium: "brand-logo-medium",
      large: "brand-logo-large"
    }[size] || "";


    return `
      <div
        class="${classNames(
          "brand-logo",
          colorClass,
          sizeClass,
          actualLogoType === "alternate" &&
            "brand-logo-alternate",
          className
        )}"
        data-logo-type="${escapeHTML(
          actualLogoType
        )}"
        aria-label="${escapeHTML(
          logoName
        )}"
      >
        ${svgMarkup}
      </div>
    `;
  }


  /* =======================================================
     07. PAGE HEADER
  ======================================================= */

  function renderPageHeader({
    title = "",
    subtitle = "",
    description = "",
    wideDescription = false
  } = {}) {
    return `
      <header class="page-header">

        <div class="page-heading">

          <h2 class="page-section-title">
            ${escapeHTML(title)}
          </h2>

          ${
            hasText(subtitle)
              ? `
                <div class="page-section-subtitle">
                  ${escapeHTML(subtitle)}
                </div>
              `
              : ""
          }

        </div>


        <div
          class="${classNames(
            "page-description",
            wideDescription && "is-wide"
          )}"
        >
          ${escapeHTML(description)}
        </div>

      </header>

      <div class="page-rule"></div>
    `;
  }


  /* =======================================================
     08. PAGE FOOTER
  ======================================================= */

  function renderPageFooter(
    sectionName = ""
  ) {
    return `
      <footer class="page-footer">

        <div class="page-footer-grid">

          <div class="page-footer-brand">
            ${escapeHTML(
              data.brand?.nameEn ||
              "BRAND NAME"
            )}
          </div>

          <div class="page-footer-section">
            ${escapeHTML(sectionName)}
          </div>

          <div class="page-footer-guide">
            ${escapeHTML(
              data.brand?.nameEn ||
              "BRAND NAME"
            )}
            ${escapeHTML(
              data.brand?.guidelineTitle ||
              "Brand Guidelines"
            )}
          </div>

        </div>

      </footer>
    `;
  }


  /* =======================================================
     09. STANDARD PAGE
  ======================================================= */

  function createStandardPage({
    page,
    pageClass = "",
    description = "",
    content = "",
    footerSection = "",
    wideDescription = false
  }) {
    return `
      <section
        class="${classNames(
          "guideline-page",
          pageClass
        )}"
        id="${escapeHTML(page.id)}"
        data-page="${page.numericNumber}"
        data-page-key="${escapeHTML(
          page.key
        )}"
        aria-label="${escapeHTML(
          `${page.number} ${getPageLabel(page)}`
        )}"
      >

        <div class="page-inner">

          ${renderPageHeader({
            title:
              page.title,

            subtitle:
              page.subtitle,

            description,

            wideDescription
          })}

          <div class="page-content">
            ${content}
          </div>

        </div>

        ${renderPageFooter(
          footerSection ||
          page.title
        )}

      </section>
    `;
  }


  /* =======================================================
     10. APPLY THEME
  ======================================================= */

  function applyTheme() {
    const root =
      document.documentElement;


    const variables = {
      "--brand-primary":
        data.theme?.primary,

      "--brand-primary-light":
        data.theme?.primaryLight,

      "--brand-secondary":
        data.theme?.secondary,

      "--brand-accent":
        data.theme?.accent,

      "--color-black":
        data.theme?.black,

      "--color-dark":
        data.theme?.dark,

      "--color-paper":
        data.theme?.paper,

      "--color-white":
        data.theme?.white
    };


    Object.entries(variables)
      .forEach(([name, value]) => {
        if (hasText(value)) {
          root.style.setProperty(
            name,
            value
          );
        }
      });


    if (
      hasText(
        data.typography
          ?.family
          ?.cssFamily
      )
    ) {
      root.style.setProperty(
        "--font-primary",
        data.typography.family.cssFamily
      );
    }


    document.title =
      data.brand?.guidelineTitleKo ||
      data.brand?.guidelineTitle ||
      "Brand Guidelines";


    if (toolbarBrandName) {
      toolbarBrandName.textContent =
        data.brand?.nameEn ||
        "BRAND NAME";
    }


    if (toolbarGuidelineTitle) {
      toolbarGuidelineTitle.textContent =
        data.brand?.guidelineTitle ||
        "Brand Guidelines";
    }
  }


  /* =======================================================
     11. AUTOMATIC NAVIGATION
  ======================================================= */

  function renderNavigation() {
    if (!navigationRoot) {
      return;
    }


    navigationRoot.innerHTML =
      activePages
        .map((page) => {
          return `
            <a
              href="#${escapeHTML(page.id)}"
              data-page="${page.numericNumber}"
            >
              <span>
                ${escapeHTML(page.number)}
              </span>

              <div>
                ${escapeHTML(
                  getPageLabel(page)
                )}
              </div>
            </a>
          `;
        })
        .join("");
  }


  /* =======================================================
     12. COVER PAGE
  ======================================================= */

  function renderCoverPage(page) {
    const cover =
      data.cover || {};

    return `
      <section
        class="guideline-page page-cover"
        id="${escapeHTML(page.id)}"
        data-page="${page.numericNumber}"
        data-page-key="${escapeHTML(
          page.key
        )}"
        aria-label="${escapeHTML(
          `${page.number} Cover`
        )}"
      >

        <div class="page-inner">

          <div class="cover-top">

            <div class="cover-year">
              ${escapeHTML(
                data.meta?.year ||
                ""
              )}
            </div>

            <div class="cover-version">
              ${escapeHTML(
                cover.versionText ||
                ""
              )}
              <br>
              ${escapeHTML(
                cover.updatedText ||
                ""
              )}
            </div>

          </div>


          <div class="cover-center">

            ${renderLogo({
              color: "white",
              logoType: "primary",
              className: "cover-logo"
            })}

            <h1 class="cover-title">
              ${escapeHTML(
                cover.title ||
                "Brand Guidelines"
              )}
            </h1>

            <div class="cover-subtitle">
              ${escapeHTML(
                cover.subtitle ||
                ""
              )}
            </div>

          </div>


          <div class="cover-bottom">

            <div class="cover-bottom-left">
              ${lineBreaks(
                cover.bottomLeft ||
                ""
              )}
            </div>

            <div class="cover-bottom-right">
              ${lineBreaks(
                cover.bottomRight ||
                ""
              )}
            </div>

          </div>

        </div>

      </section>
    `;
  }


  /* =======================================================
     13. FULL IMAGE PAGE
  ======================================================= */

  function renderFullImagePage(page) {
    const sourceKey =
      page.source || "front";

    const mockup =
      data.mockups?.[sourceKey] || {};


    const content =
      hasText(mockup.src)
        ? `
          <div class="full-image-stage">
            <img
              src="${escapeHTML(
                mockup.src
              )}"
              alt="${escapeHTML(
                mockup.alt ||
                mockup.label ||
                "Brand Mockup"
              )}"
            >
          </div>
        `
        : `
          <div
            class="full-image-placeholder"
            style="
              --mockup-background:
              ${escapeHTML(
                mockup.backgroundColor ||
                data.theme?.secondary ||
                "#D8D8D8"
              )};
            "
          >
            <div
              class="full-image-placeholder-inner"
            >
              <span>
                ${escapeHTML(
                  mockup.placeholder ||
                  mockup.label ||
                  "BRAND MOCKUP"
                )}
              </span>
            </div>
          </div>
        `;


    return `
      <section
        class="guideline-page page-full-image"
        id="${escapeHTML(page.id)}"
        data-page="${page.numericNumber}"
        data-page-key="${escapeHTML(
          page.key
        )}"
        aria-label="${escapeHTML(
          `${page.number} ${getPageLabel(page)}`
        )}"
      >
        ${content}
      </section>
    `;
  }


  /* =======================================================
     14. INTRODUCTION PAGE
  ======================================================= */

  function renderIntroductionPage(page) {
    const introduction =
      data.introduction || {};


    const paragraphs =
      Array.isArray(
        introduction.paragraphs
      )
        ? introduction.paragraphs
            .map((paragraph) => {
              return `
                <p>
                  ${escapeHTML(paragraph)}
                </p>
              `;
            })
            .join("")
        : "";


    const content = `
      <div class="introduction-layout">

        <div class="introduction-copy">

          <div class="introduction-eyebrow">
            ${escapeHTML(
              introduction.eyebrow ||
              "Brand Introduction"
            )}
          </div>

          <h2 class="introduction-title">
            ${escapeHTML(
              introduction.title ||
              ""
            )}
          </h2>

          <div class="introduction-body">
            ${paragraphs}
          </div>

        </div>


        <figure
          class="introduction-image image-frame"
        >
          ${renderImage({
            src:
              introduction.image?.src,

            alt:
              introduction.image?.alt,

            placeholder:
              introduction.image
                ?.placeholder ||
              "BRAND INTRODUCTION IMAGE"
          })}
        </figure>

      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        "page-brand-introduction",

      description:
        introduction.description ||
        "",

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     15. KEYWORDS PAGE
  ======================================================= */

  function getKeywordGrid(itemsCount) {
    if (itemsCount <= 3) {
      return {
        columns: Math.max(
          itemsCount,
          1
        ),
        rows: 1
      };
    }

    if (itemsCount === 4) {
      return {
        columns: 2,
        rows: 2
      };
    }

    if (itemsCount <= 6) {
      return {
        columns: 3,
        rows: 2
      };
    }

    return {
      columns: 4,
      rows: Math.ceil(
        itemsCount / 4
      )
    };
  }


  function renderKeywordsPage(page) {
    const keywords =
      data.keywords || {};

    const items =
      Array.isArray(keywords.items)
        ? keywords.items
        : [];


    const grid =
      getKeywordGrid(items.length);


    const cards =
      items
        .map((item, index) => {
          return `
            <article class="keyword-card">

              <div class="keyword-number">
                ${formatPageNumber(
                  index + 1
                )}
              </div>

              <div>

                <h3 class="keyword-word">
                  ${escapeHTML(
                    item.wordEn ||
                    ""
                  )}
                </h3>

                <div class="text-small">
                  ${escapeHTML(
                    item.wordKo ||
                    ""
                  )}
                </div>

              </div>

              <p class="keyword-description">
                ${escapeHTML(
                  item.description ||
                  ""
                )}
              </p>

            </article>
          `;
        })
        .join("");


    const content = `
      <div
        class="keyword-grid"
        style="
          grid-template-columns:
          repeat(
            ${grid.columns},
            minmax(0, 1fr)
          );

          grid-template-rows:
          repeat(
            ${grid.rows},
            minmax(0, 1fr)
          );
        "
      >
        ${cards}
      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        "page-brand-keywords",

      description:
        keywords.description ||
        "",

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     16. SLOGAN PAGE
  ======================================================= */

  function renderSloganPage(page) {
    const slogan =
      data.slogan || {};


    const alternatives =
      Array.isArray(
        slogan.alternatives
      )
        ? slogan.alternatives
            .map((item, index) => {
              return `
                <article class="slogan-option">

                  <div
                    class="slogan-option-number"
                  >
                    Alternative
                    ${formatPageNumber(
                      index + 1
                    )}
                  </div>

                  <div
                    class="slogan-option-text text-en"
                  >
                    ${escapeHTML(
                      item.text ||
                      ""
                    )}
                  </div>

                </article>
              `;
            })
            .join("")
        : "";


    const content = `
      <div class="slogan-layout">

        <div class="slogan-main">

          <div class="slogan-label">
            ${escapeHTML(
              slogan.label ||
              "Main Slogan"
            )}
          </div>

          <h2 class="slogan-title">
            ${escapeHTML(
              slogan.main ||
              ""
            )}
          </h2>

          <p class="slogan-description">
            ${escapeHTML(
              slogan.description ||
              ""
            )}
          </p>

        </div>


        <div class="slogan-side">
          ${alternatives}
        </div>

      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        "page-brand-slogan",

      description:
        slogan.pageDescription ||
        "",

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     17. BRAND MESSAGE PAGE
  ======================================================= */

  function renderMessagePage(page) {
    const message =
      data.message || {};


    return `
      <section
        class="guideline-page page-brand-message"
        id="${escapeHTML(page.id)}"
        data-page="${page.numericNumber}"
        data-page-key="${escapeHTML(
          page.key
        )}"
        aria-label="${escapeHTML(
          `${page.number} ${getPageLabel(page)}`
        )}"
      >

        <div class="message-visual">

          ${renderImage({
            src:
              message.image?.src,

            alt:
              message.image?.alt,

            placeholder:
              message.image
                ?.placeholder ||
              "BRAND MESSAGE IMAGE"
          })}

        </div>


        <div class="message-overlay"></div>


        <div class="message-copy">

          <div class="message-copy-label">
            ${escapeHTML(
              message.label ||
              "Brand Message"
            )}
          </div>

          <h2 class="message-copy-title">
            ${escapeHTML(
              message.title ||
              ""
            )}
          </h2>

          <p class="message-copy-body">
            ${escapeHTML(
              message.body ||
              ""
            )}
          </p>

        </div>

      </section>
    `;
  }


  /* =======================================================
     18. LOGO CONCEPT PAGE
  ======================================================= */

  function renderLogoConceptPage(page) {
    const logo =
      data.logo || {};


    const points =
      Array.isArray(
        logo.conceptPoints
      )
        ? logo.conceptPoints
            .map((point) => {
              return `
                <article
                  class="logo-concept-point"
                >
                  <strong>
                    ${escapeHTML(
                      point.title ||
                      ""
                    )}
                  </strong>

                  <span>
                    ${escapeHTML(
                      point.description ||
                      ""
                    )}
                  </span>
                </article>
              `;
            })
            .join("")
        : "";


    const content = `
      <div class="logo-concept-layout">

        <div class="logo-concept-logo">

          ${renderLogo({
            color: "primary",
            size: "large",
            logoType: "primary"
          })}

        </div>


        <div class="logo-concept-copy">

          <h2 class="logo-concept-title">
            ${escapeHTML(
              logo.conceptTitle ||
              ""
            )}
          </h2>

          <p class="logo-concept-body">
            ${escapeHTML(
              logo.conceptBody ||
              ""
            )}
          </p>

          <div class="logo-concept-points">
            ${points}
          </div>

        </div>

      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        "page-logo-concept",

      description:
        logo.conceptDescription ||
        "",

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     19. PRIMARY LOGO PAGE
  ======================================================= */

  function renderPrimaryLogoPage(page) {
    const logo =
      data.logo || {};

    const primary =
      logo.primary || {};

    const alternate =
      logo.alternate || {};

    const alternateEnabled =
      alternate.enabled === true;


    const description =
      alternateEnabled
        ? `${primary.description || ""} ${
            alternate.description || ""
          }`
        : primary.description || "";


    const primaryCard = `
      <article class="primary-logo-version">

        <div class="primary-logo-stage-box">

          ${renderLogo({
            color: "primary",
            logoType: "primary",
            className:
              "primary-logo-symbol"
          })}

        </div>

        <div class="primary-logo-information">

          <strong>
            ${escapeHTML(
              primary.name ||
              "Primary Logo"
            )}
          </strong>

          <span>
            ${escapeHTML(
              primary.label ||
              ""
            )}
          </span>

        </div>

      </article>
    `;


    const alternateCard =
      alternateEnabled
        ? `
          <article class="primary-logo-version">

            <div class="primary-logo-stage-box">

              ${renderLogo({
                color: "primary",
                logoType: "alternate",
                className:
                  "primary-logo-full"
              })}

            </div>

            <div class="primary-logo-information">

              <strong>
                ${escapeHTML(
                  alternate.name ||
                  "Alternate Logo"
                )}
              </strong>

              <span>
                ${escapeHTML(
                  alternate.label ||
                  ""
                )}
              </span>

            </div>

          </article>
        `
        : "";


    const content = `
      <div
        class="primary-logo-versions"
        ${
          alternateEnabled
            ? ""
            : 'style="grid-template-columns: 1fr;"'
        }
      >
        ${primaryCard}
        ${alternateCard}
      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        classNames(
          "page-primary-logo",
          !alternateEnabled &&
          "is-single-logo"
        ),

      description,

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     20. LOGO CONSTRUCTION PAGE
  ======================================================= */

  function renderLogoConstructionPage(page) {
    const logo =
      data.logo || {};

    const construction =
      logo.construction || {};


    const content = `
      <div class="construction-stage">

        <div class="construction-grid">

          ${renderLogo({
            color: "primary",
            size: "large",
            logoType: "primary"
          })}


          <span
            class="measure-line horizontal"
            style="
              width: 49mm;
              left: 50%;
              top: calc(50% + 34mm);
              transform: translateX(-50%);
            "
          ></span>


          <span
            class="measure-line vertical"
            style="
              height: 61mm;
              left: calc(50% - 31mm);
              top: 50%;
              transform: translateY(-50%);
            "
          ></span>


          <span
            class="measure-label"
            style="
              left: 50%;
              top: calc(50% + 35mm);
              transform: translateX(-50%);
            "
          >
            ${escapeHTML(
              construction
                .horizontalValue ||
              "4X"
            )}
          </span>


          <span
            class="measure-label"
            style="
              left: calc(50% - 34mm);
              top: 50%;
              transform: translateY(-50%);
            "
          >
            ${escapeHTML(
              construction
                .verticalValue ||
              "X"
            )}
          </span>

        </div>

      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        "page-logo-construction",

      description:
        logo.constructionDescription ||
        "",

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     21. CLEAR SPACE PAGE
  ======================================================= */

  function renderClearSpacePage(page) {
    const logo =
      data.logo || {};


    const minimumSizes =
      Array.isArray(
        logo.minimumSizes
      )
        ? logo.minimumSizes
            .map((item) => {
              return `
                <article
                  class="minimum-size-item"
                >

                  <div>

                    ${renderLogo({
                      color: "primary",
                      size: "small",
                      logoType: "primary"
                    })}

                  </div>


                  <div>

                    <div
                      class="minimum-size-value"
                    >
                      ${escapeHTML(
                        item.type ||
                        ""
                      )}
                      ·
                      ${escapeHTML(
                        item.value ||
                        ""
                      )}
                    </div>

                    <div
                      class="minimum-size-caption"
                    >
                      ${escapeHTML(
                        item.caption ||
                        ""
                      )}
                    </div>

                  </div>

                </article>
              `;
            })
            .join("")
        : "";


    const content = `
      <div class="clear-space-layout">

        <div class="clear-space-stage">

          <div class="clear-space-box">

            ${renderLogo({
              color: "primary",
              size: "medium",
              logoType: "primary"
            })}

          </div>

        </div>


        <aside class="minimum-size-panel">

          <h3 class="minimum-size-title">
            Minimum Size
          </h3>

          <div class="minimum-size-items">
            ${minimumSizes}
          </div>

        </aside>

      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        "page-clear-space",

      description:
        logo.clearSpaceDescription ||
        "",

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     22. LOGO USAGE PAGE
  ======================================================= */

  function renderLogoUsagePage(page) {
    const logo =
      data.logo || {};


    const usageItems =
      Array.isArray(
        logo.usageItems
      )
        ? logo.usageItems
        : [];


    const cards =
      usageItems
        .map((item) => {
          return `
            <article
              class="logo-usage-card"
              data-background="${escapeHTML(
                item.background ||
                "white"
              )}"
              data-logo-type="${escapeHTML(
                item.logoType ||
                "primary"
              )}"
            >

              <div class="logo-usage-label">
                ${escapeHTML(
                  item.label ||
                  ""
                )}
              </div>

              ${renderLogo({
                color:
                  item.logoColor ||
                  "primary",

                size:
                  "medium",

                logoType:
                  item.logoType ||
                  "primary"
              })}

            </article>
          `;
        })
        .join("");


    const rows =
      Math.max(
        Math.ceil(
          usageItems.length / 2
        ),
        1
      );


    const content = `
      <div
        class="logo-usage-grid"
        style="
          grid-template-rows:
          repeat(
            ${rows},
            minmax(0, 1fr)
          );
        "
      >
        ${cards}
      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        "page-logo-usage",

      description:
        logo.usageDescription ||
        "",

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     23. BRAND COLOR PAGE
  ======================================================= */

  function getColorColumnCount(
    itemCount
  ) {
    if (itemCount <= 2) {
      return 2;
    }

    if (itemCount === 3) {
      return 3;
    }

    return 4;
  }


  function renderBrandColorPage(page) {
    const colors =
      data.colors || {};


    const items =
      Array.isArray(colors.items)
        ? colors.items
        : [];


    const columnCount =
      getColorColumnCount(
        items.length
      );


    const cards =
      items
        .map((color) => {
          return `
            <article class="color-card">

              <div
                class="color-swatch"
                style="
                  background-color:
                  ${escapeHTML(
                    color.hex ||
                    "#CCCCCC"
                  )};
                "
              >

                <div
                  class="${classNames(
                    "color-role",
                    color.textColor ===
                      "light" &&
                    "is-light"
                  )}"
                >
                  ${escapeHTML(
                    color.role ||
                    ""
                  )}
                </div>

              </div>


              <div class="color-information">

                <h3 class="color-name">
                  ${escapeHTML(
                    color.name ||
                    ""
                  )}
                </h3>

                <dl>

                  <div class="color-value-row">
                    <dt>HEX</dt>
                    <dd>
                      ${escapeHTML(
                        color.hex ||
                        ""
                      )}
                    </dd>
                  </div>

                  <div class="color-value-row">
                    <dt>RGB</dt>
                    <dd>
                      ${escapeHTML(
                        color.rgb ||
                        ""
                      )}
                    </dd>
                  </div>

                  <div class="color-value-row">
                    <dt>CMYK</dt>
                    <dd>
                      ${escapeHTML(
                        color.cmyk ||
                        ""
                      )}
                    </dd>
                  </div>

                </dl>

              </div>

            </article>
          `;
        })
        .join("");


    const content = `
      <div
        class="brand-color-grid"
        data-columns="${columnCount}"
      >
        ${cards}
      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        "page-brand-color",

      description:
        colors.description ||
        "",

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     24. TYPOGRAPHY PAGE
  ======================================================= */

  function renderTypographyPage(page) {
    const typography =
      data.typography || {};


    const weights =
      Array.isArray(
        typography.weights
      )
        ? typography.weights
        : [];


    const weightSample =
      typography.weightSample ||
      "브랜드 메시지 샘플 문장";


    const weightLines =
      weights
        .map((weight) => {
          return `
            <div
              class="font-weight-line"
              style="
                font-weight:
                ${Number(
                  weight.value ||
                  400
                )};
              "
            >
              ${escapeHTML(
                weight.name ||
                ""
              )}
              ·
              ${escapeHTML(
                weightSample
              )}
            </div>
          `;
        })
        .join("");


    const typeScale =
      Array.isArray(
        typography.scale
      )
        ? typography.scale
            .map((item) => {
              return `
                <article
                  class="type-scale-item"
                  data-level="${escapeHTML(
                    item.level ||
                    "body"
                  )}"
                >

                  <div class="type-scale-label">
                    ${escapeHTML(
                      item.label ||
                      ""
                    )}
                  </div>

                  <div class="type-scale-sample">
                    ${escapeHTML(
                      item.sample ||
                      ""
                    )}
                  </div>

                </article>
              `;
            })
            .join("")
        : "";


    const characters =
      typography.characters || {};


    const content = `
      <div class="typography-layout">

        <div class="font-specimen">

          <div class="font-family-label">
            ${escapeHTML(
              typography.family
                ?.label ||
              "Primary Typeface"
            )}
          </div>

          <h2 class="font-family-name">
            ${escapeHTML(
              typography.family
                ?.name ||
              "Typeface"
            )}
          </h2>

          <div class="font-weights">
            ${weightLines}
          </div>

          <div class="font-characters">

            <div>
              ${escapeHTML(
                characters.english ||
                ""
              )}
            </div>

            <div>
              ${escapeHTML(
                characters.korean ||
                ""
              )}
            </div>

            <div>
              ${escapeHTML(
                characters.number ||
                ""
              )}
            </div>

            <div>
              ${escapeHTML(
                characters.symbol ||
                ""
              )}
            </div>

          </div>

        </div>


        <div class="type-scale">
          ${typeScale}
        </div>

      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        "page-typography",

      description:
        typography.description ||
        "",

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     25. APPLICATION PAGE
  ======================================================= */

  function renderApplicationPage(page) {
    const application =
      data.application || {};


    const items =
      Array.isArray(
        application.items
      )
        ? application.items
        : [];


    const customLayout =
      items.length !== 3;


    const gridStyle =
      items.length === 1
        ? `
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
        `
        : items.length === 2
          ? `
            grid-template-columns:
            repeat(2, minmax(0, 1fr));

            grid-template-rows: 1fr;
          `
          : items.length === 4
            ? `
              grid-template-columns:
              repeat(2, minmax(0, 1fr));

              grid-template-rows:
              repeat(2, minmax(0, 1fr));
            `
            : "";


    const figures =
      items
        .map((item) => {
          return `
            <figure
              class="application-item"
              ${
                customLayout
                  ? 'style="grid-row: auto;"'
                  : ""
              }
            >

              ${renderImage({
                src:
                  item.src,

                alt:
                  item.alt,

                placeholder:
                  item.placeholder ||
                  item.label ||
                  "APPLICATION IMAGE"
              })}

              <figcaption
                class="application-label"
              >
                ${escapeHTML(
                  item.label ||
                  ""
                )}
              </figcaption>

            </figure>
          `;
        })
        .join("");


    const content = `
      <div
        class="application-grid"
        ${
          gridStyle
            ? `style="${gridStyle}"`
            : ""
        }
      >
        ${figures}
      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        "page-application",

      description:
        application.description ||
        "",

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     26. CLOSING PAGE
  ======================================================= */

  function renderClosingPage(page) {
    const closing =
      data.closing || {};


    return `
      <section
        class="guideline-page page-closing"
        id="${escapeHTML(page.id)}"
        data-page="${page.numericNumber}"
        data-page-key="${escapeHTML(
          page.key
        )}"
        aria-label="${escapeHTML(
          `${page.number} Closing`
        )}"
      >

        <div class="page-inner">

          ${renderLogo({
            color: "white",
            logoType: "primary",
            className: "closing-logo"
          })}

          <h2 class="closing-slogan">
            ${escapeHTML(
              closing.slogan ||
              ""
            )}
          </h2>

          <p
            class="closing-description text-en"
          >
            ${escapeHTML(
              closing.description ||
              ""
            )}
          </p>


          <div class="closing-meta">

            <div>
              ${escapeHTML(
                closing.bottomLeft ||
                ""
              )}
            </div>

            <div>
              ${escapeHTML(
                closing.bottomRight ||
                ""
              )}
            </div>

          </div>

        </div>

      </section>
    `;
  }


  /* =======================================================
     27. UNKNOWN PAGE FALLBACK
  ======================================================= */

  function renderUnknownPage(page) {
    const content = `
      <div
        class="empty-image"
        style="
          height: 100%;
        "
      >
        <span>
          UNKNOWN PAGE TYPE:
          ${escapeHTML(
            page.type ||
            ""
          )}
        </span>
      </div>
    `;


    return createStandardPage({
      page,

      pageClass:
        "page-unknown",

      description:
        "지원하지 않는 페이지 유형입니다.",

      content,

      footerSection:
        page.title
    });
  }


  /* =======================================================
     28. PAGE TYPE RENDERER
  ======================================================= */

  function renderPage(page) {
    const renderers = {
      cover:
        renderCoverPage,

      fullImage:
        renderFullImagePage,

      introduction:
        renderIntroductionPage,

      keywords:
        renderKeywordsPage,

      slogan:
        renderSloganPage,

      message:
        renderMessagePage,

      logoConcept:
        renderLogoConceptPage,

      primaryLogo:
        renderPrimaryLogoPage,

      logoConstruction:
        renderLogoConstructionPage,

      clearSpace:
        renderClearSpacePage,

      logoUsage:
        renderLogoUsagePage,

      brandColor:
        renderBrandColorPage,

      typography:
        renderTypographyPage,

      application:
        renderApplicationPage,

      closing:
        renderClosingPage
    };


    const renderer =
      renderers[page.type] ||
      renderUnknownPage;


    return renderer(page);
  }


  /* =======================================================
     29. RENDER DOCUMENT
  ======================================================= */

  function renderGuideline() {
    documentRoot.innerHTML =
      activePages
        .map((page) => {
          return renderPage(page);
        })
        .join("");
  }


  /* =======================================================
     30. PAGE STATE
  ======================================================= */

  let currentPage = 1;


  function updatePageIndicator(
    pageNumber
  ) {
    const totalPages =
      activePages.length;


    currentPage = Math.min(
      Math.max(
        Number(pageNumber),
        1
      ),
      totalPages
    );


    if (pageIndicator) {
      pageIndicator.textContent =
        `${formatPageNumber(currentPage)} / ` +
        `${formatPageNumber(totalPages)}`;
    }


    document
      .querySelectorAll(
        ".screen-navigation a"
      )
      .forEach((link) => {
        const linkPage =
          Number(link.dataset.page);

        link.classList.toggle(
          "is-active",
          linkPage === currentPage
        );
      });


    if (previousButton) {
      previousButton.disabled =
        currentPage <= 1;

      previousButton.style.opacity =
        currentPage <= 1
          ? "0.42"
          : "1";
    }


    if (nextButton) {
      nextButton.disabled =
        currentPage >= totalPages;

      nextButton.style.opacity =
        currentPage >= totalPages
          ? "0.42"
          : "1";
    }
  }


  /* =======================================================
     31. GO TO PAGE
  ======================================================= */

  function goToPage(
    pageNumber,
    {
      updateHash = true,
      smooth = true
    } = {}
  ) {
    if (!activePages.length) {
      return;
    }


    const safePageNumber =
      Math.min(
        Math.max(
          Number(pageNumber),
          1
        ),
        activePages.length
      );


    const page =
      getPageByNumber(
        safePageNumber
      );


    if (!page) {
      return;
    }


    const target =
      document.getElementById(
        page.id
      );


    if (!target) {
      return;
    }


    target.scrollIntoView({
      behavior:
        smooth
          ? "smooth"
          : "auto",

      block:
        "start"
    });


    updatePageIndicator(
      safePageNumber
    );


    if (
      updateHash &&
      history.replaceState
    ) {
      history.replaceState(
        null,
        "",
        `#${page.id}`
      );
    }
  }


  /* =======================================================
     32. TOOLBAR EVENTS
  ======================================================= */

  function setupToolbarEvents() {
    previousButton?.addEventListener(
      "click",
      () => {
        goToPage(
          currentPage - 1
        );
      }
    );


    nextButton?.addEventListener(
      "click",
      () => {
        goToPage(
          currentPage + 1
        );
      }
    );


    printButton?.addEventListener(
      "click",
      () => {
        window.print();
      }
    );
  }


  /* =======================================================
     33. NAVIGATION EVENTS
  ======================================================= */

  function setupNavigationEvents() {
    document
      .querySelectorAll(
        ".screen-navigation a"
      )
      .forEach((link) => {
        link.addEventListener(
          "click",
          (event) => {
            event.preventDefault();

            goToPage(
              Number(
                link.dataset.page
              )
            );
          }
        );
      });
  }


  /* =======================================================
     34. ACTIVE PAGE OBSERVER
  ======================================================= */

  function setupPageObserver() {
    const renderedPages =
      getRenderedPages();


    if (
      !(
        "IntersectionObserver"
        in window
      )
    ) {
      updatePageIndicator(1);
      return;
    }


    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              );


          if (!visibleEntries.length) {
            return;
          }


          const pageNumber =
            Number(
              visibleEntries[0]
                .target
                .dataset
                .page
            );


          updatePageIndicator(
            pageNumber
          );
        },
        {
          root: null,

          rootMargin:
            "-20% 0px -35% 0px",

          threshold: [
            0.1,
            0.25,
            0.45,
            0.65
          ]
        }
      );


    renderedPages.forEach(
      (page) => {
        observer.observe(page);
      }
    );
  }


  /* =======================================================
     35. KEYBOARD EVENTS
  ======================================================= */

  function setupKeyboardEvents() {
    window.addEventListener(
      "keydown",
      (event) => {
        const tagName =
          document
            .activeElement
            ?.tagName
            ?.toLowerCase();


        const isFormElement =
          [
            "input",
            "textarea",
            "select"
          ].includes(tagName);


        if (isFormElement) {
          return;
        }


        if (
          event.key ===
            "ArrowRight" ||
          event.key ===
            "PageDown"
        ) {
          event.preventDefault();

          goToPage(
            currentPage + 1
          );
        }


        if (
          event.key ===
            "ArrowLeft" ||
          event.key ===
            "PageUp"
        ) {
          event.preventDefault();

          goToPage(
            currentPage - 1
          );
        }


        if (event.key === "Home") {
          event.preventDefault();

          goToPage(1);
        }


        if (event.key === "End") {
          event.preventDefault();

          goToPage(
            activePages.length
          );
        }
      }
    );
  }


  /* =======================================================
     36. URL HASH
  ======================================================= */

  function openPageFromHash() {
    const hash =
      window.location.hash
        .replace("#", "");


    if (!hash) {
      updatePageIndicator(1);
      return;
    }


    const page =
      activePages.find(
        (item) =>
          item.id === hash
      );


    if (!page) {
      updatePageIndicator(1);
      return;
    }


    requestAnimationFrame(() => {
      goToPage(
        page.numericNumber,
        {
          updateHash: false,
          smooth: false
        }
      );
    });
  }


  function setupHashChangeEvent() {
    window.addEventListener(
      "hashchange",
      () => {
        openPageFromHash();
      }
    );
  }


  /* =======================================================
     37. IMAGE ERROR FALLBACK
  ======================================================= */

  function setupImageFallback() {
    document
      .querySelectorAll("img")
      .forEach((image) => {
        image.addEventListener(
          "error",
          () => {
            const fallback =
              document.createElement(
                "div"
              );


            fallback.className =
              "empty-image";


            fallback.innerHTML = `
              <span>
                IMAGE COULD NOT BE LOADED
              </span>
            `;


            image.replaceWith(
              fallback
            );
          }
        );
      });
  }


  /* =======================================================
     38. INITIALIZE
  ======================================================= */

  function initializeGuideline() {
    applyTheme();

    renderNavigation();

    renderGuideline();

    setupToolbarEvents();

    setupNavigationEvents();

    setupPageObserver();

    setupKeyboardEvents();

    setupHashChangeEvent();

    setupImageFallback();

    openPageFromHash();

    updatePageIndicator(1);
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializeGuideline
    );
  } else {
    initializeGuideline();
  }

})();

/* =======================================================
   06. LOGO RENDERER

   외부 SVG 파일을 우선 사용합니다.

   logoType:
   primary / alternate

   color:
   primary / white / black
======================================================= */

function getLogoFile({
  logoType = "primary",
  color = "primary"
} = {}) {
  const files =
    data.logo?.files || {};


  if (logoType === "alternate") {
    if (color === "white") {
      return (
        files.alternateWhite ||
        files.alternate ||
        ""
      );
    }

    if (color === "black") {
      return (
        files.alternateBlack ||
        files.alternate ||
        ""
      );
    }

    return (
      files.alternate ||
      ""
    );
  }


  if (color === "white") {
    return (
      files.primaryWhite ||
      files.primary ||
      ""
    );
  }


  if (color === "black") {
    return (
      files.primaryBlack ||
      files.primary ||
      ""
    );
  }


  return (
    files.primary ||
    ""
  );
}


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


  const logoFile =
    getLogoFile({
      logoType: actualLogoType,
      color
    });


  const inlineSvg =
    hasText(logoData?.svg)
      ? logoData.svg
      : "";


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


  let logoMarkup = "";


  /*
    1순위: 외부 SVG 파일
    2순위: brand-data.js에 입력된 인라인 SVG
    3순위: 임시 LOGO 표시
  */

  if (hasText(logoFile)) {
    logoMarkup = `
      <img
        src="${escapeHTML(logoFile)}"
        alt="${escapeHTML(logoName)}"
        loading="eager"
      >
    `;
  } else if (hasText(inlineSvg)) {
    logoMarkup = inlineSvg;
  } else {
    logoMarkup = createLogoFallback(
      actualLogoType === "alternate"
        ? "ALT LOGO"
        : "LOGO"
    );
  }


  return `
    <div
      class="${classNames(
        "brand-logo",
        colorClass,
        sizeClass,
        actualLogoType === "alternate" &&
          "brand-logo-alternate",
        hasText(logoFile) &&
          "is-external-logo",
        className
      )}"
      data-logo-type="${escapeHTML(
        actualLogoType
      )}"
      aria-label="${escapeHTML(
        logoName
      )}"
    >
      ${logoMarkup}
    </div>
  `;
}

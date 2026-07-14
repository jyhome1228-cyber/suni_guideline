/* =========================================================
   GENERIC BRAND GUIDELINES
   Brand Data

   브랜드명, 소개, 키워드, 슬로건, 로고,
   컬러, 서체, 이미지 정보를 이 파일에서 관리합니다.

   페이지 순서와 개수도 pages 배열에서 관리합니다.
========================================================= */

window.BRAND_DATA = {

  /* =======================================================
     01. DOCUMENT META
  ======================================================= */

  meta: {
    year: "2026",
    version: "2026-V1",
    updated: "July 2026",

    author: "NINEWORKS",
    country: "Republic of Korea",

    copyright:
      "© 2026 NINEWORKS. Proprietary and Confidential information. All rights reserved."
  },


  /* =======================================================
     02. BRAND INFORMATION
  ======================================================= */

  brand: {
    nameKo: "브랜드명",
    nameEn: "BRAND NAME",

    guidelineTitle: "Brand Guidelines",
    guidelineTitleKo: "브랜드 가이드라인",

    description:
      "Brand Identity and Visual Guidelines"
  },


  /* =======================================================
     03. BRAND THEME

     아래 색상은 가이드라인 화면 전체에 적용됩니다.

     primary:
     표지, 마지막 장, 선택된 메뉴, 주요 강조색

     paper:
     일반 가이드라인 페이지 배경색
  ======================================================= */

  theme: {
    primary: "#222222",
    primaryLight: "#666666",
    secondary: "#D8D8D8",
    accent: "#F0F0F0",

    black: "#171717",
    dark: "#2B2B2B",
    paper: "#F6F6F6",
    white: "#FFFFFF"
  },


  /* =======================================================
     04. PAGE STRUCTURE

     페이지 번호와 ID는 app.js에서 자동 생성합니다.

     순서를 바꾸려면 배열 순서만 변경합니다.
     페이지를 숨기려면 enabled를 false로 변경합니다.

     예시:
     enabled: false
  ======================================================= */

  pages: [
    {
      key: "cover",
      type: "cover",

      title: "Cover",
      subtitle: "",

      enabled: true
    },

    {
      key: "frontMockup",
      type: "fullImage",
      source: "front",

      title: "Brand",
      subtitle: "Front Mockup",

      enabled: true
    },

    {
      key: "introduction",
      type: "introduction",

      title: "Brand",
      subtitle: "Introduction",

      enabled: true
    },

    {
      key: "keywords",
      type: "keywords",

      title: "Brand",
      subtitle: "Keywords",

      enabled: true
    },

    {
      key: "slogan",
      type: "slogan",

      title: "Brand",
      subtitle: "Slogan",

      enabled: true
    },

    {
      key: "message",
      type: "message",

      title: "Brand",
      subtitle: "Message",

      enabled: true
    },

    {
      key: "logoConcept",
      type: "logoConcept",

      title: "Logo",
      subtitle: "Concept",

      enabled: true
    },

    {
      key: "primaryLogo",
      type: "primaryLogo",

      title: "Logo",
      subtitle: "Primary Logo",

      enabled: true
    },

    {
      key: "logoConstruction",
      type: "logoConstruction",

      title: "Logo",
      subtitle: "Construction",

      enabled: true
    },

    {
      key: "clearSpace",
      type: "clearSpace",

      title: "Logo",
      subtitle: "Clear Space",

      enabled: true
    },

    {
      key: "logoUsage",
      type: "logoUsage",

      title: "Logo",
      subtitle: "Usage",

      enabled: true
    },

    {
      key: "brandColor",
      type: "brandColor",

      title: "Color",
      subtitle: "Brand Color",

      enabled: true
    },

    {
      key: "typography",
      type: "typography",

      title: "Typography",
      subtitle: "Type System",

      enabled: true
    },

    {
      key: "application",
      type: "application",

      title: "Application",
      subtitle: "Visual System",

      enabled: true
    },

    {
      key: "backMockup",
      type: "fullImage",
      source: "back",

      title: "Brand",
      subtitle: "Back Mockup",

      enabled: true
    },

    {
      key: "closing",
      type: "closing",

      title: "Closing",
      subtitle: "",

      enabled: true
    }
  ],


  /* =======================================================
     05. COVER
  ======================================================= */

  cover: {
    title:
      "Brand Guidelines",

    subtitle:
      "브랜드 가이드라인",

    versionText:
      "Ver: 2026-V1",

    updatedText:
      "Updated: July 2026",

    bottomLeft:
      "© 2026 NINEWORKS\nProprietary and Confidential information.\nAll rights reserved.",

    bottomRight:
      "BRAND NAME\nBrand Identity System"
  },


  /* =======================================================
     06. FULL IMAGE MOCKUPS

     이미지가 없는 동안에는 블랭크 페이지가 표시됩니다.

     이미지 적용 예시:

     src: "./assets/images/mockup-front.jpg"
     src: "./assets/images/mockup-back.jpg"
  ======================================================= */

  mockups: {
    front: {
      label:
        "Front Brand Mockup",

      src:
        "",

      alt:
        "브랜드 전면 목업 이미지",

      placeholder:
        "FRONT BRAND MOCKUP",

      backgroundColor:
        "#E8E8E8"
    },

    back: {
      label:
        "Back Brand Mockup",

      src:
        "",

      alt:
        "브랜드 후면 목업 이미지",

      placeholder:
        "BACK BRAND MOCKUP",

      backgroundColor:
        "#D8D8D8"
    }
  },


  /* =======================================================
     07. BRAND INTRODUCTION
  ======================================================= */

  introduction: {
    eyebrow:
      "Brand Introduction",

    title:
      "브랜드를 설명하는 핵심 소개 문장을 입력하세요.",

    paragraphs: [
      "브랜드가 어떤 배경에서 시작되었는지 설명하는 내용을 입력합니다.",

      "브랜드가 고객에게 제공하는 가치와 차별점을 구체적으로 작성합니다.",

      "브랜드가 앞으로 지향하는 방향과 장기적인 목표를 작성합니다."
    ],

    description:
      "브랜드의 배경과 지향점, 고객에게 전달하고자 하는 핵심 가치를 정의합니다.",

    image: {
      src:
        "",

      alt:
        "브랜드 소개 이미지",

      placeholder:
        "BRAND INTRODUCTION IMAGE"
    }
  },


  /* =======================================================
     08. BRAND KEYWORDS

     기본 구성은 6개입니다.

     키워드 개수를 변경하면 app.js가
     가능한 범위에서 자동으로 배열합니다.
  ======================================================= */

  keywords: {
    description:
      "브랜드 키워드는 브랜드가 지향하는 태도와 시각적 방향을 정의합니다. 각 키워드는 로고, 컬러, 서체, 이미지와 커뮤니케이션 전반에 일관되게 반영됩니다.",

    items: [
      {
        wordEn:
          "Keyword 01",

        wordKo:
          "키워드 01",

        description:
          "첫 번째 브랜드 키워드의 의미와 적용 방향을 입력합니다."
      },

      {
        wordEn:
          "Keyword 02",

        wordKo:
          "키워드 02",

        description:
          "두 번째 브랜드 키워드의 의미와 적용 방향을 입력합니다."
      },

      {
        wordEn:
          "Keyword 03",

        wordKo:
          "키워드 03",

        description:
          "세 번째 브랜드 키워드의 의미와 적용 방향을 입력합니다."
      },

      {
        wordEn:
          "Keyword 04",

        wordKo:
          "키워드 04",

        description:
          "네 번째 브랜드 키워드의 의미와 적용 방향을 입력합니다."
      },

      {
        wordEn:
          "Keyword 05",

        wordKo:
          "키워드 05",

        description:
          "다섯 번째 브랜드 키워드의 의미와 적용 방향을 입력합니다."
      },

      {
        wordEn:
          "Keyword 06",

        wordKo:
          "키워드 06",

        description:
          "여섯 번째 브랜드 키워드의 의미와 적용 방향을 입력합니다."
      }
    ]
  },


  /* =======================================================
     09. BRAND SLOGAN
  ======================================================= */

  slogan: {
    label:
      "Main Slogan",

    main:
      "브랜드의 메인 슬로건을 입력하세요.",

    description:
      "메인 슬로건이 브랜드의 철학과 방향을 어떻게 표현하는지 설명하는 내용을 입력합니다.",

    pageDescription:
      "브랜드가 전달하고자 하는 핵심 가치와 태도를 짧고 명확한 문장으로 표현합니다.",

    alternatives: [
      {
        text:
          "Alternative Slogan 01"
      },

      {
        text:
          "Alternative Slogan 02"
      },

      {
        text:
          "Alternative Slogan 03"
      }
    ]
  },


  /* =======================================================
     10. BRAND MESSAGE
  ======================================================= */

  message: {
    label:
      "Brand Message",

    title:
      "브랜드가 전달하고자 하는 핵심 메시지를 입력하세요.",

    body:
      "브랜드 철학과 가치, 고객에게 제공하고자 하는 경험을 하나의 문단으로 작성합니다. 브랜드가 어떤 태도로 세상과 관계를 맺는지 명확하게 설명합니다.",

    image: {
      src:
        "",

      alt:
        "브랜드 메시지 이미지",

      placeholder:
        "BRAND MESSAGE IMAGE"
    }
  },


  /* =======================================================
     11. LOGO SYSTEM

     SVG 파일을 직접 붙여 넣을 때는
     fill 값을 currentColor로 바꾸는 것이 좋습니다.

     예시:
     fill="#000000"
     ↓
     fill="currentColor"
  ======================================================= */

  logo: {
    name:
      "Brand Logo System",


    /* -------------------------------------------------------
       LOGO FILE PATH

       파일 다운로드나 외부 적용에 사용할 경로입니다.
       아직 파일이 없다면 빈 값으로 둡니다.
    ------------------------------------------------------- */

    files: {
      primary:
        "",

      primaryWhite:
        "",

      primaryBlack:
        "",

      alternate:
        ""
    },


    /* -------------------------------------------------------
       LOGO CONCEPT
    ------------------------------------------------------- */

    conceptTitle:
      "로고의 디자인 콘셉트와 핵심 의미를 입력하세요.",

    conceptBody:
      "로고의 형태가 어떤 의미를 담고 있는지 설명합니다. 심볼, 워드마크, 선, 면, 여백, 비례 등 주요 조형 요소가 브랜드의 가치와 어떻게 연결되는지 작성합니다.",

    conceptDescription:
      "로고의 형태적 특징과 브랜드 키워드가 시각적으로 구현된 원리를 설명합니다.",

    conceptPoints: [
      {
        title:
          "Concept 01",

        description:
          "첫 번째 로고 조형 요소의 의미를 입력합니다."
      },

      {
        title:
          "Concept 02",

        description:
          "두 번째 로고 조형 요소의 의미를 입력합니다."
      },

      {
        title:
          "Concept 03",

        description:
          "세 번째 로고 조형 요소의 의미를 입력합니다."
      }
    ],


    /* -------------------------------------------------------
       PRIMARY LOGO
    ------------------------------------------------------- */

    primary: {
      name:
        "Primary Logo",

      label:
        "Primary Logo",

      description:
        "기본 로고는 브랜드의 가장 대표적인 시각 자산입니다. 모든 공식 매체에서 우선적으로 사용하며, 형태와 비율을 임의로 변경하거나 재구성해서는 안 됩니다.",

      svg:
        ""
    },


    /* -------------------------------------------------------
       ALTERNATE LOGO

       보조 로고가 없다면 enabled를 false로 둡니다.
       app.js가 기본 로고만 중앙에 표시합니다.
    ------------------------------------------------------- */

    alternate: {
      enabled:
        false,

      name:
        "Alternate Logo",

      label:
        "Alternate Logo",

      description:
        "보조 로고는 기본 로고를 보완하는 확장형 자산입니다. 정해진 환경과 매체에서만 제한적으로 사용합니다.",

      svg:
        ""
    },


    /* -------------------------------------------------------
       LOGO CONSTRUCTION
    ------------------------------------------------------- */

    constructionDescription:
      "로고는 일정한 비례와 그리드 시스템을 기반으로 제작되었습니다. 로고를 재제작하거나 편집할 경우 원본 SVG 파일을 우선 사용하고 형태의 비율과 내부 간격을 임의로 변경하지 않아야 합니다.",

    construction: {
      horizontalValue:
        "4X",

      verticalValue:
        "X"
    },


    /* -------------------------------------------------------
       CLEAR SPACE
    ------------------------------------------------------- */

    clearSpaceDescription:
      "클리어 스페이스는 로고가 다른 그래픽 요소와 간섭되지 않고 독립적으로 인식되기 위해 확보해야 하는 최소 보호 영역입니다.",

    clearSpaceUnit:
      "X",


    /* -------------------------------------------------------
       MINIMUM SIZE
    ------------------------------------------------------- */

    minimumSizes: [
      {
        type:
          "Print",

        value:
          "8mm",

        caption:
          "인쇄물 최소 사용 크기"
      },

      {
        type:
          "Digital",

        value:
          "30px",

        caption:
          "디지털 환경 최소 사용 크기"
      }
    ],


    /* -------------------------------------------------------
       LOGO USAGE
    ------------------------------------------------------- */

    usageDescription:
      "로고 사용 규정은 다양한 배경과 매체 환경에서 브랜드의 시각적 일관성을 유지하기 위한 기준입니다. 배경의 명도와 색상에 따라 적절한 로고 버전을 선택합니다.",

    usageItems: [
      {
        label:
          "Primary Logo / White Background",

        background:
          "white",

        logoColor:
          "primary",

        logoType:
          "primary"
      },

      {
        label:
          "White Logo / Primary Background",

        background:
          "primary",

        logoColor:
          "white",

        logoType:
          "primary"
      },

      {
        label:
          "Black Logo / White Background",

        background:
          "white",

        logoColor:
          "black",

        logoType:
          "primary"
      },

      {
        label:
          "White Logo / Black Background",

        background:
          "black",

        logoColor:
          "white",

        logoType:
          "primary"
      },

      {
        label:
          "Primary Logo / Secondary Background",

        background:
          "secondary",

        logoColor:
          "primary",

        logoType:
          "primary"
      },

      {
        label:
          "White Logo / Primary Light Background",

        background:
          "primary-light",

        logoColor:
          "white",

        logoType:
          "primary"
      }
    ]
  },


  /* =======================================================
     12. BRAND COLOR

     컬러 개수에 따라 자동으로 배열됩니다.

     2개: 2열
     3개: 3열
     4개 이상: 4열
  ======================================================= */

  colors: {
    description:
      "브랜드 컬러는 브랜드의 정체성을 직접적으로 전달하는 시각 언어입니다. 모든 인쇄물과 디지털 환경에서 지정된 컬러 값을 일관되게 사용합니다.",

    items: [
      {
        role:
          "Primary Color",

        name:
          "Primary",

        hex:
          "#222222",

        rgb:
          "R34 G34 B34",

        cmyk:
          "C0 M0 Y0 K87",

        textColor:
          "light"
      },

      {
        role:
          "Secondary Color",

        name:
          "Secondary",

        hex:
          "#666666",

        rgb:
          "R102 G102 B102",

        cmyk:
          "C0 M0 Y0 K60",

        textColor:
          "light"
      },

      {
        role:
          "Accent Color",

        name:
          "Accent",

        hex:
          "#D8D8D8",

        rgb:
          "R216 G216 B216",

        cmyk:
          "C0 M0 Y0 K15",

        textColor:
          "dark"
      },

      {
        role:
          "Neutral Color",

        name:
          "Neutral",

        hex:
          "#F0F0F0",

        rgb:
          "R240 G240 B240",

        cmyk:
          "C0 M0 Y0 K6",

        textColor:
          "dark"
      }
    ]
  },


  /* =======================================================
     13. TYPOGRAPHY
  ======================================================= */

  typography: {
    description:
      "타이포그래피는 브랜드의 메시지를 명확하고 일관되게 전달하기 위한 기준입니다. 지정된 서체와 굵기, 크기 위계를 사용합니다.",

    family: {
      label:
        "Primary Typeface",

      name:
        "Pretendard",

      cssFamily:
        "'Pretendard Variable', Pretendard, sans-serif"
    },

    weights: [
      {
        name:
          "Bold",

        value:
          700
      },

      {
        name:
          "SemiBold",

        value:
          600
      },

      {
        name:
          "Medium",

        value:
          500
      },

      {
        name:
          "Regular",

        value:
          400
      },

      {
        name:
          "Light",

        value:
          300
      }
    ],

    characters: {
      english:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz",

      korean:
        "가나다라마바사아자차카타파하",

      number:
        "0123456789",

      symbol:
        "# & $ + - % @ : ; / > ( [ ? ! ] ) , ."
    },

    weightSample:
      "브랜드 메시지 샘플 문장",

    scale: [
      {
        level:
          "display",

        label:
          "Display Title",

        sample:
          "브랜드 메인 메시지"
      },

      {
        level:
          "heading",

        label:
          "Section Title",

        sample:
          "BRAND NAME Brand Guidelines"
      },

      {
        level:
          "subheading",

        label:
          "Sub Title",

        sample:
          "Brand Identity System"
      },

      {
        level:
          "body",

        label:
          "Body Text",

        sample:
          "브랜드의 가치와 메시지를 명확하고 편안하게 전달합니다."
      },

      {
        level:
          "caption",

        label:
          "Caption",

        sample:
          "Ver. 2026-V1 / Updated July 2026"
      }
    ]
  },


  /* =======================================================
     14. VISUAL APPLICATION

     이미지 경로 예시:

     src: "./assets/images/application-01.jpg"
  ======================================================= */

  application: {
    description:
      "비주얼 애플리케이션은 로고, 컬러, 서체와 그래픽 요소가 실제 매체에서 일관되게 적용되는 방식을 보여줍니다.",

    items: [
      {
        label:
          "Main Brand Application",

        src:
          "",

        alt:
          "메인 브랜드 애플리케이션",

        placeholder:
          "MAIN BRAND APPLICATION"
      },

      {
        label:
          "Stationery System",

        src:
          "",

        alt:
          "스테이셔너리 시스템",

        placeholder:
          "STATIONERY SYSTEM"
      },

      {
        label:
          "Digital Application",

        src:
          "",

        alt:
          "디지털 애플리케이션",

        placeholder:
          "DIGITAL APPLICATION"
      }
    ]
  },


  /* =======================================================
     15. CLOSING
  ======================================================= */

  closing: {
    slogan:
      "브랜드의 최종 슬로건을 입력하세요.",

    description:
      "Enter the closing brand message or English slogan here.",

    bottomLeft:
      "BRAND NAME Brand Guidelines",

    bottomRight:
      "© 2026 NINEWORKS"
  }

};

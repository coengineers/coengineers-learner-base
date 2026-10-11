// Change this file to give an independent learner copy its own identity.
// First step after copying the template: set name, appLabel and topBarLabel below.
// Assets are owned by the copy under apps/web/public/brand.
export const brand = {
  name: "Your app",
  appLabel: "Your app",
  topBarLabel: "Your app",
  navHome: "Overview",
  navFiles: "My files",
  navAccount: "My account",
  navGuide: "Getting started",
  wordmarkAccent: "",
  logoUrl: null as string | null,
  // true when the logo image already spells the name (a wordmark), so the name is not repeated as text.
  logoIncludesName: false,
  illustrationUrl: "/brand/workbench.webp",
  signInHeading: "Build something useful.",
  signInDescription:
    "Your starting point for a business app. A place to try, learn and build with confidence.",
  footer: "A starting point for your business.",
  homeDescription:
    "A little structure. Plenty of possibility. This is where your business app begins.",
  homePill: "READY TO MAKE YOUR OWN",
  homePanelFirst: "A strong foundation.",
  homePanelSecond: "An open canvas.",
  homePanelDescription:
    "Your account, private files and a space to build are already here. Start with the essentials, then shape the experience around the people you want to help.",
  homePanelLink: "Find your first step",
  homeCardsHeading: "Make yourself at home",
  homeCardsDescription: "Three simple places to start",
  accountCardHeading: "Add a familiar name",
  accountCardDescription:
    "Make this space feel like yours. Start with the name you’d like to use.",
  accountCardLink: "Set up your account",
  filesCardHeading: "Bring something with you",
  filesCardDescription:
    "Keep a document or image in your own private space, ready when you need it.",
  filesCardLink: "Explore your files",
  guideCardHeading: "See what comes next",
  guideCardDescription:
    "Understand what’s included and how this becomes an app for your business.",
  guideCardLink: "Read the short guide",
  homeBannerHeading: "Yours from the beginning.",
  homeBannerDescription:
    "Your account is private. Your business decides what gets built next.",
  homeBannerTag: "THE ESSENTIALS, IN PLACE",
  homeEyebrow: "YOUR STARTING POINT",
  homeGreeting: "Welcome, ",
  homeHeading: "Welcome to your next chapter.",
  signInEyebrow: "EVERY BUSINESS STARTS SOMEWHERE",
  workspaceLabel: "YOUR WORKSPACE",
  signInFormHeading: "Welcome back.",
  signInFormDescription: "Sign in and pick up where you left off.",
  signInPrivacyNote: "Your account and files are private to you.",
  signUpHeading: "A fresh start.",
  signUpDescription: "Create an account to try your new starting point.",
  sidebarHeading: "Small start. Your direction.",
  sidebarDescription:
    "The essentials are here. Build the rest around your business.",
  sidebarLink: "Explore your starting point",
  sidebarEdition: "Base app",
  mainFooter: "Your starting point. Made to become your own.",
  guideDescription:
    "You don’t need to understand the code to understand your starting point.",
  guideIntroHeading: "A foundation for your business app",
  guideIntroDescription:
    "This is the starting structure you’ll build on with Claude during Ship. It gives you a working account, a private place for files and space for your first useful customer experience.",
  guideBannerHeading: "The same starting point. Different businesses.",
  guideBannerDescription:
    "Your own business can begin here. Product features come later, when your product brief calls for them.",
  guideSupportHeading: "Something not working?",
  guideSupportDescription:
    "Try the action again. If it still fails, tell Claude what you expected, what happened and any error shown. Keep passwords and private information out of screenshots.",
  guideSupportContact:
    "If you’re still stuck, use your private course support route with John or Ed.",
  guideEyebrow: "GETTING STARTED",
  guideHeading: "Start small. Make it yours.",
  guideSteps: [
    [
      "01",
      "Try the essentials",
      "Add your name in My account. Upload a practice file, download it, then sign out and back in. Your saved work should still be here.",
    ],
    [
      "02",
      "Decide who you’re helping",
      "Bring your reviewed product brief into Ship. Describe the person, the problem and the one useful thing they should be able to do.",
    ],
    [
      "03",
      "Build one useful journey with Claude",
      "Ask Claude to plan a small change, explain which parts it touches and show you how to check it. Review the working result before sharing it.",
    ],
  ] as [string, string, string][],
  accountDescription: "A few essentials to help you feel at home.",
  accountNameHint: "This is how we’ll greet you in your workspace.",
  accountHelpHeading: "Only the essentials.",
  accountHelpDescription:
    "You don’t need a finished business plan to begin. A name is enough for now.",
  accountEyebrow: "MY ACCOUNT",
  accountPrivacyNote: "Your account details are private to you.",
  accountHeading: "A space that feels like you.",
  filesDescription:
    "A private place for the documents and images you want to keep.",
  filesEmptyHeading: "A little space for what matters.",
  filesEyebrow: "MY FILES",
  filesHeading: "Keep useful things close.",
  notFoundDescription: "That page isn’t part of your workspace.",
  notFoundEyebrow: "PAGE NOT FOUND",
  notFoundHeading: "Let’s get you back on track.",
  theme: {
    canvas: "#fbfaf8",
    surface: "#ffffff",
    chrome: "#f2efe8",
    text: "#232421",
    muted: "#696961",
    accent: "#f7931a",
    accentText: "#101014",
    accentHover: "#ed8811",
    accentInk: "#8b4b07",
    focus: "#a35809",
    line: "#e9e7e1",
    inputBorder: "#8c8980",
    displayFont: '"Space Grotesk", system-ui, sans-serif',
    bodyFont: '"Inter", system-ui, sans-serif',
    monoFont: '"JetBrains Mono", ui-monospace, monospace',
  },
};
export function applyBrand() {
  for (const [key, value] of Object.entries(brand.theme)) {
    const cssName = key.replace(
      /[A-Z]/g,
      (letter) => "-" + letter.toLowerCase(),
    );
    document.documentElement.style.setProperty("--" + cssName, value);
  }
  document.title =
    brand.appLabel === brand.name
      ? brand.name
      : brand.appLabel + " · " + brand.name;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", brand.theme.canvas);
}

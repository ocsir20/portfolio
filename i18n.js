(function () {
  var KEY = "portfolio-lang";
  var strings = {
    en: {
      "home.pageTitle": "Octavia Sirbu | Senior Product Designer",
      "work.pageTitle": "Projects | Octavia Sirbu",
      "nav.home": "Home",
      "nav.cv": "CV",
      "nav.projects": "Projects",
      "nav.blog": "Blog",
      "nav.contact": "Contact",
      "nav.privacy": "Privacy",
      "nav.linkedin": "My LinkedIn",
      "nav.lang": "Language",
      "footer.tagline": "Turning complexity into clear experiences",
      "footer.role": "Senior Product Designer",
      "footer.navLabel": "Main pages",
      "theme.dark": "Switch to dark mode",
      "theme.light": "Switch to light mode",
      "theme.title": "Light or dark mode",
      "top.label": "Back to top",
      "more.title": "View more projects",
      "more.prev": "Previous projects",
      "more.next": "Next projects",
      "copy.ok": "Email copied to clipboard.",
      "copy.fail": "Could not copy email. Please copy it manually.",
      "contact.copy": "Copy email",
      "contact.connect": "Let's connect",
      "contact.cv": "Download CV",
      "work.title": "Projects",
      "work.intro": "Product design case studies and websites I designed and built, grouped by the kind of work.",
      "work.product": "Product Design (UX/UI) Projects",
      "work.web": "Design & Web Development",
      "work.saas.title": "Leading Product UX for a SaaS",
      "work.saas.desc": "Interactive prototype for selecting multiple laundry machines and paying in one bundled transaction.",
      "work.onboarding.title": "Designing Onboardings that Convert - Nabogo ApS",
      "work.onboarding.desc": "Improving onboarding for Nabogo's app and raising the activation rate by 5%.",
      "work.ds.title": "AI-powered Design System for Nabogo ApS",
      "work.ds.desc": "Tokens, components, and Storybook documentation for a consistent product surface across teams.",
      "work.sdu.title": "University Intranet Re-design based on UX Insights",
      "work.sdu.desc": "Research-led intranet redesign for a large university. Clearer structure, navigation, and interfaces shaped by staff and student needs.",
      "work.marina.title": "Designing and Building a Website and Webshop for French Teacher",
      "work.marina.desc": "Website, webshop, calendar, and back office for a French teacher. Designed in Figma, then built with Figma MCP and Cursor.",
      "work.rotoy.title": "Designing a Website and Webshop for EdTech Startup Rotoy ApS",
      "work.rotoy.desc": "Marketing site and webshop experience for an EdTech startup. Clear storytelling, product discovery, and a purchase flow parents can trust.",
      "work.makerspace.title": "O'town Garage Makerspace Website Design",
      "work.makerspace.desc": "Website design for a community makerspace. Tools, membership, and events presented with a clear, welcoming brand and responsive UI.",
      "home.tag": "SENIOR PRODUCT DESIGNER",
      "home.hello": "Hi! It's Octavia",
      "home.intro": "I'm a Senior Product Designer who turns Complexity into Clear Experiences",
      "home.cta.cv": "See full CV",
      "home.cta.work": "See projects",
      "home.years": "years of work experience",
      "home.certified": "Certified",
      "home.projectsCount": "completed projects",
      "home.seeProjects": "See projects",
      "home.grad": "Graduated a MSc in IT Product Design at the University of Southern Denmark",
      "home.seeCv": "See CV",
      "home.collage.title": "Scandi-educated Senior Product Designer with a flair for Development",
      "home.collage.p1": "A snapshot of how I partner with teams: gathering feedback from users, defining problems, shaping flows and components, and polishing interfaces so products feel clear, consistent and easy to navigate.",
      "home.collage.p2": "I'm using AI as a partner but I keep the human touch in products to ensure they are not just technically sound but also fixing new problems for real users.",
      "home.featured": "Highlighted Projects",
      "home.allProjects": "See all projects",
      "cta.label": "Next project",
      "cta.title": "Have a website in mind?",
      "cta.body": "I take work from visual identity to a live site: pages, copy, and the path to book or pay. Write to me and we can talk about yours.",
      "cta.button": "Write to octaviasirbu@gmail.com",
      "marina.pageTitle": "Designing and Building a Website and Webshop for French Teacher | Octavia Sirbu",
      "marina.h1": "Designing and Building a Website and Webshop for French Teacher",
      "privacy.pageTitle": "Privacy | Octavia Sirbu",
      "privacy.h1": "Privacy",
      "privacy.intro": "This page explains what happens with your data when you use octaviasirbu.com.",
      "privacy.updated": "Last updated: 9 November 2026",
      "privacy.h.who": "Who is responsible",
      "privacy.p.who": "This website is published by Octavia Sirbu, Senior Product Designer, based in Paris, France. For questions about privacy, write to <a href=\"mailto:octaviasirbu@gmail.com\">octaviasirbu@gmail.com</a>.",
      "privacy.h.what": "What this site is",
      "privacy.p.what": "octaviasirbu.com is a personal portfolio. It presents my CV, projects, and writing. It does not have user accounts, a newsletter, a shop, or a contact form that stores messages on this site.",
      "privacy.h.data": "Data I receive from you",
      "privacy.p.data1": "I only receive personal data if you choose to contact me, for example by email or through LinkedIn. That typically includes your name, email address, and whatever you write. I use that information to reply and, if relevant, to continue a professional conversation. I do not sell it or use it for advertising.",
      "privacy.p.data2": "I keep correspondence as long as it is useful for that conversation, then delete it when it is no longer needed, unless I have a legal reason to keep it longer.",
      "privacy.h.browser": "What stays in your browser",
      "privacy.p.browser1": "The light and dark theme preference is saved in your browser with localStorage, under the key <code>portfolio-theme</code>. Language preference uses <code>portfolio-lang</code>. That stays on your device. I cannot read it. You can clear it by deleting site data in your browser settings.",
      "privacy.p.browser2": "This site does not set marketing cookies and does not use analytics tools such as Google Analytics, Hotjar, or Meta Pixel.",
      "privacy.h.host": "Hosting and technical data",
      "privacy.p.host": "The site is hosted on GitHub Pages. When you load a page, GitHub may process technical data such as IP address, browser type, and the pages requested, in order to deliver the site and keep it secure. That processing is done by GitHub as a service provider. See <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement\" target=\"_blank\" rel=\"noopener noreferrer\">GitHub's privacy statement</a>.",
      "privacy.h.fonts": "Fonts and other services",
      "privacy.p.fonts1": "Type is loaded from Google Fonts. Your browser may request those files from Google, which can involve your IP address. If you follow a link to LinkedIn or another external site, that site has its own privacy policy.",
      "privacy.p.fonts2": "Videos and images on this portfolio are hosted with the site. Playing a film does not send your data to a third-party video platform.",
      "privacy.h.rights": "Your rights",
      "privacy.p.rights1": "If I hold personal data about you, you can ask to access it, correct it, delete it, restrict how it is used, or object to the use. You can also ask for a copy of data you provided. Write to <a href=\"mailto:octaviasirbu@gmail.com\">octaviasirbu@gmail.com</a>.",
      "privacy.p.rights2": "If you are in the EU or EEA and you think your data has not been handled correctly, you can lodge a complaint with your local data protection authority. In France that is the <a href=\"https://www.cnil.fr\" target=\"_blank\" rel=\"noopener noreferrer\">CNIL</a>.",
      "privacy.h.changes": "Changes",
      "privacy.p.changes": "If this notice changes, I will update the date at the top of this page.",
      "home.services": "What I can do for you",
      "home.s1.title": "UI Design and Design Systems",
      "home.s1.body": "Designing modern interfaces, reusable components, and documentation so products stay consistent as teams and features scale.",
      "home.s2.title": "UX Research and Web Copy Writing",
      "home.s2.body": "Combining interviews, usability testing, and clear writing so journeys feel obvious, trustworthy, and grounded in real user behavior.",
      "home.s3.title": "Web Development and AI Automations",
      "home.s3.body": "Building and shipping interfaces in code, and using AI tools to move faster on exploration, documentation, and delivery without dropping quality.",
      "home.s4.title": "Project Management and Metrics",
      "home.s4.body": "Keeping design and delivery aligned through planning, stakeholder workshops, and a lean process so the work has measurable impact and teams know what shipped and why.",
      "home.s5.title": "Branding and Graphic Design",
      "home.s5.body": "Building visual identities, social assets, and marketing graphics that strengthen brand recognition across channels.",
      "home.s6.title": "Customer Touch Points and Email Automations",
      "home.s6.body": "Setting up welcome sequences, newsletters, and lifecycle emails with clear copy and timing so people hear from you at the right moment, not all at once.",
      "home.testimonials": "Testimonials",
      "blog.title": "Blog",
      "blog.intro": "Thoughts on UX strategy, interface design, and creating better digital experiences."
    },
    fr: {
      "home.pageTitle": "Octavia Sirbu | Product designer senior",
      "work.pageTitle": "Projets | Octavia Sirbu",
      "nav.home": "Accueil",
      "nav.cv": "CV",
      "nav.projects": "Projets",
      "nav.blog": "Blog",
      "nav.contact": "Contact",
      "nav.privacy": "Confidentialité",
      "nav.linkedin": "Mon LinkedIn",
      "nav.lang": "Langue",
      "footer.tagline": "Transformer la complexité en expériences claires",
      "footer.role": "Product designer senior",
      "footer.navLabel": "Pages principales",
      "theme.dark": "Passer en mode sombre",
      "theme.light": "Passer en mode clair",
      "theme.title": "Mode clair ou sombre",
      "top.label": "Retour en haut",
      "more.title": "Voir d'autres projets",
      "more.prev": "Projets précédents",
      "more.next": "Projets suivants",
      "copy.ok": "E-mail copié dans le presse-papiers.",
      "copy.fail": "Impossible de copier l'e-mail. Merci de le copier manuellement.",
      "contact.copy": "Copier l'e-mail",
      "contact.connect": "Restons en contact",
      "contact.cv": "Télécharger le CV",
      "work.title": "Projets",
      "work.intro": "Études de cas produit et sites que j'ai conçus et développés, regroupés par type de travail.",
      "work.product": "Projets de design produit (UX/UI)",
      "work.web": "Design et développement web",
      "work.saas.title": "UX produit pour un SaaS",
      "work.saas.desc": "Prototype interactif pour sélectionner plusieurs machines à laver et payer en une seule transaction.",
      "work.onboarding.title": "Concevoir des onboardings qui convertissent - Nabogo ApS",
      "work.onboarding.desc": "Amélioration de l'onboarding de l'app Nabogo et hausse du taux d'activation de 5 %.",
      "work.ds.title": "Design system assisté par l'IA pour Nabogo ApS",
      "work.ds.desc": "Tokens, composants et documentation Storybook pour une interface produit cohérente entre les équipes.",
      "work.sdu.title": "Refonte d'intranet universitaire fondée sur la recherche UX",
      "work.sdu.desc": "Refonte d'intranet menée par la recherche pour une grande université. Structure, navigation et interfaces plus claires, à partir des besoins du personnel et des étudiants.",
      "work.marina.title": "Concevoir et développer un site et une boutique pour une professeure de français",
      "work.marina.desc": "Site, boutique, calendrier et back-office pour une professeure de français. Conçu dans Figma, puis développé avec Figma MCP et Cursor.",
      "work.rotoy.title": "Concevoir un site et une boutique pour la startup EdTech Rotoy ApS",
      "work.rotoy.desc": "Site marketing et parcours d'achat pour une startup EdTech. Récit clair, découverte du produit, et un flux d'achat auquel les parents peuvent se fier.",
      "work.makerspace.title": "Design du site O'town Garage Makerspace",
      "work.makerspace.desc": "Design de site pour un makerspace associatif. Outils, adhésion et événements présentés avec une identité claire, accueillante et responsive.",
      "home.tag": "PRODUCT DESIGNER SENIOR",
      "home.hello": "Bonjour ! C'est Octavia",
      "home.intro": "Je suis product designer senior. Je transforme la complexité en expériences claires",
      "home.cta.cv": "Voir le CV",
      "home.cta.work": "Voir les projets",
      "home.years": "années d'expérience",
      "home.certified": "Certifiée",
      "home.projectsCount": "projets réalisés",
      "home.seeProjects": "Voir les projets",
      "home.grad": "Diplômée d'un MSc in IT Product Design à l'University of Southern Denmark",
      "home.seeCv": "Voir le CV",
      "home.collage.title": "Product designer senior formée en Scandinavie, avec un goût pour le développement",
      "home.collage.p1": "Comment je travaille avec les équipes : recueillir le retour des utilisateurs, poser le problème, façonner les parcours et les composants, puis peaufiner les interfaces pour que le produit soit clair, cohérent et simple à utiliser.",
      "home.collage.p2": "Je m'appuie sur l'IA comme partenaire, tout en gardant le regard humain, pour que les produits soient solides techniquement et répondent à de vrais problèmes.",
      "home.featured": "Projets mis en avant",
      "home.allProjects": "Tous les projets",
      "cta.label": "Prochain projet",
      "cta.title": "Vous avez un site en tête ?",
      "cta.body": "Je mène le travail de l'identité visuelle jusqu'au site en ligne : pages, textes, et le chemin pour réserver ou payer. Écrivez-moi, on en parle.",
      "cta.button": "Écrire à octaviasirbu@gmail.com",
      "marina.pageTitle": "Concevoir et développer un site et une boutique pour une professeure de français | Octavia Sirbu",
      "marina.h1": "Concevoir et développer un site et une boutique pour une professeure de français",
      "privacy.pageTitle": "Confidentialité | Octavia Sirbu",
      "privacy.h1": "Confidentialité",
      "privacy.intro": "Cette page explique ce qui se passe avec vos données lorsque vous utilisez octaviasirbu.com.",
      "privacy.updated": "Dernière mise à jour : 9 novembre 2026",
      "privacy.h.who": "Qui est responsable",
      "privacy.p.who": "Ce site est publié par Octavia Sirbu, product designer senior, basée à Paris, France. Pour toute question sur la confidentialité, écrivez à <a href=\"mailto:octaviasirbu@gmail.com\">octaviasirbu@gmail.com</a>.",
      "privacy.h.what": "Ce qu'est ce site",
      "privacy.p.what": "octaviasirbu.com est un portfolio personnel. Il présente mon CV, mes projets et mes textes. Il n'a pas de comptes utilisateurs, de newsletter, de boutique, ni de formulaire de contact qui stocke des messages sur ce site.",
      "privacy.h.data": "Données que je reçois de vous",
      "privacy.p.data1": "Je ne reçois des données personnelles que si vous choisissez de me contacter, par e-mail ou via LinkedIn par exemple. Cela inclut en général votre nom, votre adresse e-mail et ce que vous écrivez. Je m'en sers pour répondre et, le cas échéant, poursuivre un échange professionnel. Je ne les vends pas et je ne les utilise pas pour de la publicité.",
      "privacy.p.data2": "Je conserve la correspondance tant qu'elle est utile à cet échange, puis je la supprime lorsqu'elle n'est plus nécessaire, sauf obligation légale de la garder plus longtemps.",
      "privacy.h.browser": "Ce qui reste dans votre navigateur",
      "privacy.p.browser1": "La préférence de thème clair ou sombre est enregistrée dans votre navigateur avec localStorage, sous la clé <code>portfolio-theme</code>. La langue utilise <code>portfolio-lang</code>. Cela reste sur votre appareil. Je ne peux pas le lire. Vous pouvez l'effacer en supprimant les données du site dans les réglages du navigateur.",
      "privacy.p.browser2": "Ce site ne dépose pas de cookies marketing et n'utilise pas d'outils d'analytics tels que Google Analytics, Hotjar ou Meta Pixel.",
      "privacy.h.host": "Hébergement et données techniques",
      "privacy.p.host": "Le site est hébergé sur GitHub Pages. Lorsque vous chargez une page, GitHub peut traiter des données techniques telles que l'adresse IP, le type de navigateur et les pages demandées, afin de servir le site et d'en assurer la sécurité. Ce traitement est effectué par GitHub en tant que prestataire. Voir la <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement\" target=\"_blank\" rel=\"noopener noreferrer\">déclaration de confidentialité de GitHub</a>.",
      "privacy.h.fonts": "Polices et autres services",
      "privacy.p.fonts1": "Les polices sont chargées depuis Google Fonts. Votre navigateur peut demander ces fichiers à Google, ce qui peut impliquer votre adresse IP. Si vous suivez un lien vers LinkedIn ou un autre site externe, ce site a sa propre politique de confidentialité.",
      "privacy.p.fonts2": "Les vidéos et images de ce portfolio sont hébergées avec le site. Lire un film n'envoie pas vos données vers une plateforme vidéo tierce.",
      "privacy.h.rights": "Vos droits",
      "privacy.p.rights1": "Si je détiens des données personnelles vous concernant, vous pouvez demander à y accéder, les corriger, les supprimer, en limiter l'usage, ou vous y opposer. Vous pouvez aussi demander une copie des données que vous avez fournies. Écrivez à <a href=\"mailto:octaviasirbu@gmail.com\">octaviasirbu@gmail.com</a>.",
      "privacy.p.rights2": "Si vous êtes dans l'UE ou l'EEE et que vous estimez que vos données n'ont pas été traitées correctement, vous pouvez déposer une réclamation auprès de votre autorité de protection des données. En France, il s'agit de la <a href=\"https://www.cnil.fr\" target=\"_blank\" rel=\"noopener noreferrer\">CNIL</a>.",
      "privacy.h.changes": "Modifications",
      "privacy.p.changes": "Si cette notice change, je mettrai à jour la date en haut de cette page.",
      "home.services": "Ce que je peux faire pour vous",
      "home.s1.title": "Design UI et design systems",
      "home.s1.body": "Concevoir des interfaces modernes, des composants réutilisables et de la documentation pour que les produits restent cohérents quand les équipes et les fonctionnalités grandissent.",
      "home.s2.title": "Recherche UX et rédaction web",
      "home.s2.body": "Allier entretiens, tests d'utilisabilité et écriture claire pour que les parcours soient évidents, fiables, et ancrés dans le comportement réel des utilisateurs.",
      "home.s3.title": "Développement web et automatisations IA",
      "home.s3.body": "Construire et livrer des interfaces en code, et utiliser l'IA pour aller plus vite sur l'exploration, la documentation et la livraison, sans baisser la qualité.",
      "home.s4.title": "Gestion de projet et métriques",
      "home.s4.body": "Aligner design et livraison par la planification, les ateliers parties prenantes, et un process léger, pour un impact mesurable et des équipes qui savent ce qui est sorti et pourquoi.",
      "home.s5.title": "Identité visuelle et graphisme",
      "home.s5.body": "Créer des identités visuelles, des visuels pour les réseaux et des graphiques marketing qui renforcent la reconnaissance de la marque sur tous les canaux.",
      "home.s6.title": "Points de contact client et e-mails automatisés",
      "home.s6.body": "Mettre en place des séquences de bienvenue, des newsletters et des e-mails de cycle de vie, avec un texte et un timing clairs, pour que les gens vous entendent au bon moment, pas tous en même temps.",
      "home.testimonials": "Témoignages",
      "blog.title": "Blog",
      "blog.intro": "Réflexions sur la stratégie UX, le design d'interface, et la création de meilleures expériences numériques."
    }
  };

  function getLang() {
    var attr = document.documentElement.getAttribute("data-lang");
    if (attr === "fr" || attr === "en") return attr;
    return "en";
  }

  function t(key) {
    var lang = getLang();
    var pack = strings[lang] || strings.en;
    if (pack[key] != null) return pack[key];
    if (strings.en[key] != null) return strings.en[key];
    return "";
  }

  function apply() {
    var lang = getLang();
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = t(key);
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      var value = t(key);
      if (value) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      var value = t(key);
      if (value) el.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      var value = t(key);
      if (value) el.setAttribute("title", value);
    });

    var pageTitle = document.querySelector("[data-i18n-page-title]");
    if (pageTitle) {
      var titleValue = t(pageTitle.getAttribute("data-i18n-page-title"));
      if (titleValue) document.title = titleValue;
    }

    var themeBtn = document.querySelector("#themeToggle");
    if (themeBtn) {
      var isDark = document.documentElement.getAttribute("data-theme") === "dark";
      themeBtn.setAttribute("aria-label", t(isDark ? "theme.light" : "theme.dark"));
      themeBtn.setAttribute("title", t("theme.title"));
    }

    var topBtn = document.querySelector(".back-to-top");
    if (topBtn) topBtn.setAttribute("aria-label", t("top.label"));

    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      var on = btn.getAttribute("data-lang-set") === lang;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("is-active", on);
    });
  }

  function setLang(lang) {
    if (lang !== "fr" && lang !== "en") return;
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      /* ignore */
    }
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
    apply();
    document.dispatchEvent(new CustomEvent("portfolio-lang"));
  }

  document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang-set"));
    });
  });

  function addStrings(pack) {
    if (!pack) return;
    ["en", "fr"].forEach(function (lang) {
      if (pack[lang]) Object.assign(strings[lang], pack[lang]);
    });
  }

  window.portfolioI18n = {
    t: t,
    apply: apply,
    getLang: getLang,
    setLang: setLang,
    addStrings: addStrings
  };
  apply();
})();

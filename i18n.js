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
      "contact.pageTitle": "Contact | Octavia Sirbu",
      "contact.h1": "Contact",
      "contact.intro": "Write to me about a website, a product, or a collaboration. I read every message and reply by email.",
      "contact.form.name": "Name",
      "contact.form.email": "Email",
      "contact.form.reason": "Reason for inquiry",
      "contact.form.reason.placeholder": "Choose a reason",
      "contact.form.reason.project": "A website or product project",
      "contact.form.reason.collab": "A collaboration",
      "contact.form.reason.job": "A job opportunity",
      "contact.form.reason.event": "Event",
      "contact.form.reason.other": "Something else",
      "contact.form.message": "Message",
      "contact.form.submit": "Send message",
      "contact.thanks": "Thank you. I will reply as soon as I can.",
      "contact.error": "The message could not be sent. Please try again, or email me directly.",
      "contact.direct": "Or reach me here",
      "contact.email": "Email",
      "contact.phone": "Phone",
      "contact.linkedin": "LinkedIn",
      "work.title": "Projects",
      "work.intro": "Product design case studies and websites I designed and built, grouped by the kind of work.",
      "work.product": "Product Design (UX/UI) Projects",
      "work.web": "Design & Web Development",
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
      "work.makerspace.desc": "Website design and web development for a community makerspace. Tools, membership, and events presented with a clear, welcoming brand and responsive UI.",
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
      "privacy.updated": "Last updated: 12 November 2026",
      "privacy.h.who": "Who is responsible",
      "privacy.p.who": "This website is published by Octavia Sirbu, Senior Product Designer, based in Paris, France. For questions about privacy, write to <a href=\"mailto:octaviasirbu@gmail.com\">octaviasirbu@gmail.com</a>.",
      "privacy.h.what": "What this site is",
      "privacy.p.what": "octaviasirbu.com is a personal portfolio. It presents my CV, projects, and writing. It does not have user accounts, a newsletter, or a shop. The contact form sends your message to my email. It does not store messages on this site.",
      "privacy.h.data": "Data I receive from you",
      "privacy.p.data1": "I only receive personal data if you choose to contact me, for example through the contact form, by email, or through LinkedIn. That typically includes your name, email address, the reason for your message, and whatever you write. I use that information to reply and, if relevant, to continue a professional conversation. I do not sell it or use it for advertising.",
      "privacy.p.data2": "I keep correspondence as long as it is useful for that conversation, then delete it when it is no longer needed, unless I have a legal reason to keep it longer.",
      "privacy.h.browser": "What stays in your browser",
      "privacy.p.browser1": "The light and dark theme preference is saved in your browser with localStorage, under the key <code>portfolio-theme</code>. The language follows the address: English has no prefix, French uses <code>/fr</code>, Danish uses <code>/dk</code>, and Romanian uses <code>/ro</code>. A language hint also uses <code>portfolio-lang</code>. That stays on your device. I cannot read it. You can clear it by deleting site data in your browser settings.",
      "privacy.p.browser2": "This site does not set marketing cookies and does not use analytics tools such as Google Analytics, Hotjar, or Meta Pixel.",
      "privacy.h.host": "Hosting and technical data",
      "privacy.p.host": "The site is hosted on GitHub Pages. When you load a page, GitHub may process technical data such as IP address, browser type, and the pages requested, in order to deliver the site and keep it secure. That processing is done by GitHub as a service provider. See <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement\" target=\"_blank\" rel=\"noopener noreferrer\">GitHub's privacy statement</a>.",
      "privacy.h.fonts": "Fonts and other services",
      "privacy.p.fonts1": "Type is loaded from Google Fonts. Your browser may request those files from Google, which can involve your IP address. The contact form is sent through FormSubmit, which delivers the message to my inbox and may process technical data such as IP address to send the email. If you follow a link to LinkedIn or another external site, that site has its own privacy policy.",
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
      "blog.intro": "I write about UX/UI design, using AI in product work, building for the web, and European culture. The blog is only available in English at the moment.",
      "blog.filters.label": "Filter posts",
      "blog.cat.all": "All",
      "blog.cat.ux": "UX/UI Design",
      "blog.cat.ai": "AI for Product",
      "blog.cat.web": "Web Dev",
      "blog.cat.culture": "European Culture"
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
      "contact.pageTitle": "Contact | Octavia Sirbu",
      "contact.h1": "Contact",
      "contact.intro": "Écrivez-moi pour un site, un produit ou une collaboration. Je lis chaque message et je réponds par e-mail.",
      "contact.form.name": "Nom",
      "contact.form.email": "E-mail",
      "contact.form.reason": "Motif de la demande",
      "contact.form.reason.placeholder": "Choisir un motif",
      "contact.form.reason.project": "Un site ou un projet produit",
      "contact.form.reason.collab": "Une collaboration",
      "contact.form.reason.job": "Une opportunité de poste",
      "contact.form.reason.event": "Événement",
      "contact.form.reason.other": "Autre chose",
      "contact.form.message": "Message",
      "contact.form.submit": "Envoyer le message",
      "contact.thanks": "Merci. Je vous réponds dès que je peux.",
      "contact.error": "Le message n'a pas pu être envoyé. Réessayez, ou écrivez-moi par e-mail.",
      "contact.direct": "Ou contactez-moi ici",
      "contact.email": "E-mail",
      "contact.phone": "Téléphone",
      "contact.linkedin": "LinkedIn",
      "work.title": "Projets",
      "work.intro": "Études de cas produit et sites que j'ai conçus et développés, regroupés par type de travail.",
      "work.product": "Projets de design produit (UX/UI)",
      "work.web": "Design et développement web",
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
      "work.makerspace.desc": "Design et développement web pour un makerspace associatif. Outils, adhésion et événements présentés avec une identité claire, accueillante et responsive.",
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
      "privacy.updated": "Dernière mise à jour : 12 novembre 2026",
      "privacy.h.who": "Qui est responsable",
      "privacy.p.who": "Ce site est publié par Octavia Sirbu, product designer senior, basée à Paris, France. Pour toute question sur la confidentialité, écrivez à <a href=\"mailto:octaviasirbu@gmail.com\">octaviasirbu@gmail.com</a>.",
      "privacy.h.what": "Ce qu'est ce site",
      "privacy.p.what": "octaviasirbu.com est un portfolio personnel. Il présente mon CV, mes projets et mes textes. Il n'a pas de comptes utilisateurs, de newsletter ni de boutique. Le formulaire de contact envoie votre message sur mon e-mail. Il ne stocke pas de messages sur ce site.",
      "privacy.h.data": "Données que je reçois de vous",
      "privacy.p.data1": "Je ne reçois des données personnelles que si vous choisissez de me contacter, par le formulaire, par e-mail ou via LinkedIn par exemple. Cela inclut en général votre nom, votre adresse e-mail, le motif du message et ce que vous écrivez. Je m'en sers pour répondre et, le cas échéant, poursuivre un échange professionnel. Je ne les vends pas et je ne les utilise pas pour de la publicité.",
      "privacy.p.data2": "Je conserve la correspondance tant qu'elle est utile à cet échange, puis je la supprime lorsqu'elle n'est plus nécessaire, sauf obligation légale de la garder plus longtemps.",
      "privacy.h.browser": "Ce qui reste dans votre navigateur",
      "privacy.p.browser1": "La préférence de thème clair ou sombre est enregistrée dans votre navigateur avec localStorage, sous la clé <code>portfolio-theme</code>. La langue suit l'adresse : l'anglais n'a pas de préfixe, le français utilise <code>/fr</code>, le danois <code>/dk</code> et le roumain <code>/ro</code>. Un indice de langue utilise aussi <code>portfolio-lang</code>. Cela reste sur votre appareil. Je ne peux pas le lire. Vous pouvez l'effacer en supprimant les données du site dans les réglages du navigateur.",
      "privacy.p.browser2": "Ce site ne dépose pas de cookies marketing et n'utilise pas d'outils d'analytics tels que Google Analytics, Hotjar ou Meta Pixel.",
      "privacy.h.host": "Hébergement et données techniques",
      "privacy.p.host": "Le site est hébergé sur GitHub Pages. Lorsque vous chargez une page, GitHub peut traiter des données techniques telles que l'adresse IP, le type de navigateur et les pages demandées, afin de servir le site et d'en assurer la sécurité. Ce traitement est effectué par GitHub en tant que prestataire. Voir la <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement\" target=\"_blank\" rel=\"noopener noreferrer\">déclaration de confidentialité de GitHub</a>.",
      "privacy.h.fonts": "Polices et autres services",
      "privacy.p.fonts1": "Les polices sont chargées depuis Google Fonts. Votre navigateur peut demander ces fichiers à Google, ce qui peut impliquer votre adresse IP. Le formulaire de contact passe par FormSubmit, qui livre le message dans ma boîte et peut traiter des données techniques telles que l'adresse IP pour l'envoi. Si vous suivez un lien vers LinkedIn ou un autre site externe, ce site a sa propre politique de confidentialité.",
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
      "blog.intro": "J'écris sur le design UX/UI, l'IA dans le travail produit, le développement web et la culture européenne. Le blog n'est disponible qu'en anglais pour le moment.",
      "blog.filters.label": "Filtrer les articles",
      "blog.cat.all": "Tous",
      "blog.cat.ux": "Design UX/UI",
      "blog.cat.ai": "IA pour le produit",
      "blog.cat.web": "Dev web",
      "blog.cat.culture": "Culture européenne"
    },
    da: {
      "home.pageTitle": "Octavia Sirbu | Senior produktdesigner",
      "work.pageTitle": "Projekter | Octavia Sirbu",
      "nav.home": "Hjem",
      "nav.cv": "CV",
      "nav.projects": "Projekter",
      "nav.blog": "Blog",
      "nav.contact": "Kontakt",
      "nav.privacy": "Privatliv",
      "nav.linkedin": "Mit LinkedIn",
      "nav.lang": "Sprog",
      "footer.tagline": "Jeg omsætter kompleksitet til klare oplevelser",
      "footer.role": "Senior produktdesigner",
      "footer.navLabel": "Hovedsider",
      "theme.dark": "Skift til mørk tilstand",
      "theme.light": "Skift til lys tilstand",
      "theme.title": "Lys eller mørk tilstand",
      "top.label": "Tilbage til toppen",
      "more.title": "Se flere projekter",
      "more.prev": "Forrige projekter",
      "more.next": "Næste projekter",
      "copy.ok": "E-mail kopieret til udklipsholderen.",
      "copy.fail": "E-mailen kunne ikke kopieres. Kopiér den venligst manuelt.",
      "contact.copy": "Kopiér e-mail",
      "contact.connect": "Lad os tage en snak",
      "contact.cv": "Download CV",
      "contact.pageTitle": "Kontakt | Octavia Sirbu",
      "contact.h1": "Kontakt",
      "contact.intro": "Skriv til mig om et website, et produkt eller et samarbejde. Jeg læser hver besked og svarer på e-mail.",
      "contact.form.name": "Navn",
      "contact.form.email": "E-mail",
      "contact.form.reason": "Årsag til henvendelse",
      "contact.form.reason.placeholder": "Vælg en årsag",
      "contact.form.reason.project": "Et website eller et produktprojekt",
      "contact.form.reason.collab": "Et samarbejde",
      "contact.form.reason.job": "En jobmulighed",
      "contact.form.reason.event": "Event",
      "contact.form.reason.other": "Noget andet",
      "contact.form.message": "Besked",
      "contact.form.submit": "Send besked",
      "contact.thanks": "Tak. Jeg svarer, så snart jeg kan.",
      "contact.error": "Beskeden kunne ikke sendes. Prøv igen, eller skriv til mig på e-mail.",
      "contact.direct": "Eller kontakt mig her",
      "contact.email": "E-mail",
      "contact.phone": "Telefon",
      "contact.linkedin": "LinkedIn",
      "work.title": "Projekter",
      "work.intro": "Produktdesign-cases og websites, jeg har designet og bygget, grupperet efter type arbejde.",
      "work.product": "Produktdesign (UX/UI)",
      "work.web": "Design og webudvikling",
      "work.onboarding.title": "Onboardings der konverterer - Nabogo ApS",
      "work.onboarding.desc": "Forbedring af onboardingen i Nabogos app og en stigning i aktiveringsraten på 5 %.",
      "work.ds.title": "AI-drevet design system til Nabogo ApS",
      "work.ds.desc": "Tokens, komponenter og Storybook-dokumentation, så produktfladen er ens på tværs af teams.",
      "work.sdu.title": "Redesign af universitetsintranet baseret på UX-indsigter",
      "work.sdu.desc": "Forskningsdrevet intranet-redesign for et stort universitet. Klarere struktur, navigation og interfaces formet af medarbejderes og studerendes behov.",
      "work.marina.title": "Design og udvikling af website og webshop til en fransklærer",
      "work.marina.desc": "Website, webshop, kalender og backoffice til en fransklærer. Designet i Figma og bygget med Figma MCP og Cursor.",
      "work.rotoy.title": "Design af website og webshop til EdTech-startuppen Rotoy ApS",
      "work.rotoy.desc": "Marketingsite og købsflow til en EdTech-startup. Klar fortælling, produktdiscovery og et købsflow, forældre kan stole på.",
      "work.makerspace.title": "Website-design til O'town Garage Makerspace",
      "work.makerspace.desc": "Website-design og webudvikling til et community-makerspace. Værktøjer, medlemskab og events med et klart, imødekommende brand og responsivt UI.",
      "home.tag": "SENIOR PRODUKTDESIGNER",
      "home.hello": "Hej! Det er Octavia",
      "home.intro": "Jeg er senior produktdesigner og omsætter kompleksitet til klare oplevelser",
      "home.cta.cv": "Se hele CV'et",
      "home.cta.work": "Se projekter",
      "home.years": "års erfaring",
      "home.certified": "Certificeret",
      "home.projectsCount": "gennemførte projekter",
      "home.seeProjects": "Se projekter",
      "home.grad": "Uddannet med en MSc in IT Product Design fra University of Southern Denmark",
      "home.seeCv": "Se CV",
      "home.collage.title": "Skandinaviskuddannet senior produktdesigner med flair for udvikling",
      "home.collage.p1": "Et øjebliksbillede af, hvordan jeg arbejder med teams: indsamler feedback fra brugere, definerer problemer, former flows og komponenter og finpudser interfaces, så produkter føles klare, konsistente og nemme at finde rundt i.",
      "home.collage.p2": "Jeg bruger AI som partner, men bevarer det menneskelige i produkterne, så de ikke kun er teknisk sunde, men også løser rigtige problemer for rigtige brugere.",
      "home.featured": "Udvalgte projekter",
      "home.allProjects": "Se alle projekter",
      "cta.label": "Næste projekt",
      "cta.title": "Har du et website i tankerne?",
      "cta.body": "Jeg tager arbejdet fra visuel identitet til et live site: sider, tekster og vejen til at booke eller betale. Skriv til mig, så taler vi om dit.",
      "cta.button": "Skriv til octaviasirbu@gmail.com",
      "marina.pageTitle": "Design og udvikling af website og webshop til en fransklærer | Octavia Sirbu",
      "marina.h1": "Design og udvikling af website og webshop til en fransklærer",
      "privacy.pageTitle": "Privatliv | Octavia Sirbu",
      "privacy.h1": "Privatliv",
      "privacy.intro": "Denne side forklarer, hvad der sker med dine data, når du bruger octaviasirbu.com.",
      "privacy.updated": "Sidst opdateret: 12. november 2026",
      "privacy.h.who": "Hvem er ansvarlig",
      "privacy.p.who": "Dette website udgives af Octavia Sirbu, senior produktdesigner, bosat i Paris, Frankrig. Spørgsmål om privatliv sendes til <a href=\"mailto:octaviasirbu@gmail.com\">octaviasirbu@gmail.com</a>.",
      "privacy.h.what": "Hvad dette site er",
      "privacy.p.what": "octaviasirbu.com er et personligt portfolio. Det viser mit CV, mine projekter og mine tekster. Der er ingen brugerkonti, nyhedsbrev eller shop. Kontaktformularen sender din besked til min e-mail. Den gemmer ikke beskeder på dette site.",
      "privacy.h.data": "Data jeg modtager fra dig",
      "privacy.p.data1": "Jeg modtager kun persondata, hvis du selv vælger at kontakte mig, for eksempel via formularen, e-mail eller LinkedIn. Det er typisk dit navn, din e-mailadresse, årsagen til henvendelsen og det, du skriver. Jeg bruger det til at svare og, hvis det er relevant, fortsætte en faglig samtale. Jeg sælger det ikke og bruger det ikke til annoncering.",
      "privacy.p.data2": "Jeg gemmer korrespondance, så længe den er nyttig for den samtale, og sletter den bagefter, medmindre jeg har en juridisk grund til at gemme den længere.",
      "privacy.h.browser": "Hvad der bliver i din browser",
      "privacy.p.browser1": "Valget mellem lys og mørk tilstand gemmes i din browser med localStorage under nøglen <code>portfolio-theme</code>. Sproget følger adressen: engelsk har intet præfiks, fransk bruger <code>/fr</code>, dansk <code>/dk</code> og rumænsk <code>/ro</code>. Et sproghint bruger også <code>portfolio-lang</code>. Det bliver på din enhed. Jeg kan ikke læse det. Du kan slette det ved at fjerne sitedata i browserens indstillinger.",
      "privacy.p.browser2": "Dette site sætter ikke marketingcookies og bruger ikke analytics-værktøjer som Google Analytics, Hotjar eller Meta Pixel.",
      "privacy.h.host": "Hosting og tekniske data",
      "privacy.p.host": "Sitet hostes på GitHub Pages. Når du indlæser en side, kan GitHub behandle tekniske data som IP-adresse, browsertype og de sider, der bliver bedt om, for at levere sitet og holde det sikkert. Den behandling sker hos GitHub som leverandør. Se <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement\" target=\"_blank\" rel=\"noopener noreferrer\">GitHubs privatlivserklæring</a>.",
      "privacy.h.fonts": "Fonte og andre tjenester",
      "privacy.p.fonts1": "Fonte indlæses fra Google Fonts. Din browser kan hente filerne hos Google, hvilket kan involvere din IP-adresse. Kontaktformularen sendes via FormSubmit, som leverer beskeden til min indbakke og kan behandle tekniske data som IP-adresse for at sende e-mailen. Følger du et link til LinkedIn eller et andet eksternt site, har det site sin egen privatlivspolitik.",
      "privacy.p.fonts2": "Videoer og billeder på dette portfolio hostes sammen med sitet. At afspille en film sender ikke dine data til en tredjeparts videoplatform.",
      "privacy.h.rights": "Dine rettigheder",
      "privacy.p.rights1": "Hvis jeg har persondata om dig, kan du bede om indsigt, rettelse, sletning, begrænsning eller indsigelse. Du kan også bede om en kopi af data, du har givet. Skriv til <a href=\"mailto:octaviasirbu@gmail.com\">octaviasirbu@gmail.com</a>.",
      "privacy.p.rights2": "Hvis du er i EU eller EØS og mener, at dine data ikke er behandlet korrekt, kan du klage til din lokale databeskyttelsesmyndighed. I Frankrig er det <a href=\"https://www.cnil.fr\" target=\"_blank\" rel=\"noopener noreferrer\">CNIL</a>. I Danmark er det <a href=\"https://www.datatilsynet.dk\" target=\"_blank\" rel=\"noopener noreferrer\">Datatilsynet</a>.",
      "privacy.h.changes": "Ændringer",
      "privacy.p.changes": "Hvis denne meddelelse ændres, opdaterer jeg datoen øverst på siden.",
      "home.services": "Hvad jeg kan hjælpe med",
      "home.s1.title": "UI-design og design systems",
      "home.s1.body": "Designe moderne interfaces, genbrugelige komponenter og dokumentation, så produkter forbliver konsistente, når teams og features vokser.",
      "home.s2.title": "UX-research og webtekst",
      "home.s2.body": "Kombinere interviews, usability-tests og klar tekst, så rejser føles indlysende, troværdige og forankret i rigtig brugeradfærd.",
      "home.s3.title": "Webudvikling og AI-automatisering",
      "home.s3.body": "Bygge og sende interfaces i kode og bruge AI til at komme hurtigere igennem udforskning, dokumentation og levering uden at gå på kompromis med kvaliteten.",
      "home.s4.title": "Projektledelse og metrics",
      "home.s4.body": "Holde design og levering samlet gennem planlægning, stakeholder-workshops og en slank proces, så arbejdet har målbar effekt, og teams ved, hvad der er shipped, og hvorfor.",
      "home.s5.title": "Branding og grafisk design",
      "home.s5.body": "Bygge visuelle identiteter, sociale assets og marketinggrafik, der styrker genkendelsen på tværs af kanaler.",
      "home.s6.title": "Kundekontaktpunkter og e-mailautomatisering",
      "home.s6.body": "Sætte velkomstforløb, nyhedsbreve og lifecycle-mails op med klar tekst og timing, så folk hører fra dig på det rigtige tidspunkt, ikke det hele på én gang.",
      "home.testimonials": "Anbefalinger",
      "blog.title": "Blog",
      "blog.intro": "Jeg skriver om UX/UI-design, AI i produktarbejde, webudvikling og europæisk kultur. Bloggen er kun på engelsk i øjeblikket.",
      "blog.filters.label": "Filtrer indlæg",
      "blog.cat.all": "Alle",
      "blog.cat.ux": "UX/UI-design",
      "blog.cat.ai": "AI til produkt",
      "blog.cat.web": "Webudvikling",
      "blog.cat.culture": "Europæisk kultur"
    },
    ro: {
      "home.pageTitle": "Octavia Sirbu | Product designer senior",
      "work.pageTitle": "Proiecte | Octavia Sirbu",
      "nav.home": "Acasă",
      "nav.cv": "CV",
      "nav.projects": "Proiecte",
      "nav.blog": "Blog",
      "nav.contact": "Contact",
      "nav.privacy": "Confidențialitate",
      "nav.linkedin": "LinkedIn-ul meu",
      "nav.lang": "Limbă",
      "footer.tagline": "Transform complexitatea în experiențe clare",
      "footer.role": "Product designer senior",
      "footer.navLabel": "Pagini principale",
      "theme.dark": "Treci pe modul întunecat",
      "theme.light": "Treci pe modul luminos",
      "theme.title": "Mod luminos sau întunecat",
      "top.label": "Înapoi sus",
      "more.title": "Vezi mai multe proiecte",
      "more.prev": "Proiecte anterioare",
      "more.next": "Proiecte următoare",
      "copy.ok": "E-mail copiat în clipboard.",
      "copy.fail": "E-mailul nu a putut fi copiat. Copiază-l manual, te rog.",
      "contact.copy": "Copiază e-mailul",
      "contact.connect": "Hai să vorbim",
      "contact.cv": "Descarcă CV-ul",
      "contact.pageTitle": "Contact | Octavia Sirbu",
      "contact.h1": "Contact",
      "contact.intro": "Scrie-mi despre un website, un produs sau o colaborare. Citesc fiecare mesaj și răspund pe e-mail.",
      "contact.form.name": "Nume",
      "contact.form.email": "E-mail",
      "contact.form.reason": "Motivul mesajului",
      "contact.form.reason.placeholder": "Alege un motiv",
      "contact.form.reason.project": "Un website sau un proiect de produs",
      "contact.form.reason.collab": "O colaborare",
      "contact.form.reason.job": "O oportunitate de job",
      "contact.form.reason.event": "Eveniment",
      "contact.form.reason.other": "Altceva",
      "contact.form.message": "Mesaj",
      "contact.form.submit": "Trimite mesajul",
      "contact.thanks": "Mulțumesc. Îți răspund cât de curând pot.",
      "contact.error": "Mesajul nu a putut fi trimis. Încearcă din nou sau scrie-mi pe e-mail.",
      "contact.direct": "Sau scrie-mi aici",
      "contact.email": "E-mail",
      "contact.phone": "Telefon",
      "contact.linkedin": "LinkedIn",
      "work.title": "Proiecte",
      "work.intro": "Studii de caz de product design și site-uri pe care le-am conceput și construit, grupate după tipul de lucru.",
      "work.product": "Product design (UX/UI)",
      "work.web": "Design și dezvoltare web",
      "work.onboarding.title": "Onboarding-uri care convertesc - Nabogo ApS",
      "work.onboarding.desc": "Îmbunătățirea onboarding-ului din app-ul Nabogo și o creștere de 5 % a ratei de activare.",
      "work.ds.title": "Design system asistat de IA pentru Nabogo ApS",
      "work.ds.desc": "Token-uri, componente și documentație Storybook, ca interfața de produs să rămână consecventă între echipe.",
      "work.sdu.title": "Redesign de intranet universitar bazat pe insight-uri UX",
      "work.sdu.desc": "Redesign de intranet condus de cercetare pentru o universitate mare. Structură, navigare și interfețe mai clare, pornind de la nevoile personalului și ale studenților.",
      "work.marina.title": "Design și dezvoltare de website și magazin pentru o profesoară de franceză",
      "work.marina.desc": "Website, magazin, calendar și back-office pentru o profesoară de franceză. Conceput în Figma, apoi construit cu Figma MCP și Cursor.",
      "work.rotoy.title": "Design de website și magazin pentru startup-ul EdTech Rotoy ApS",
      "work.rotoy.desc": "Site de marketing și flux de cumpărare pentru un startup EdTech. Poveste clară, descoperirea produsului și un checkout în care părinții pot avea încredere.",
      "work.makerspace.title": "Design de website pentru O'town Garage Makerspace",
      "work.makerspace.desc": "Design și dezvoltare web pentru un makerspace comunitar. Unelte, membership și evenimente, cu un brand clar, primitor și un UI responsive.",
      "home.tag": "PRODUCT DESIGNER SENIOR",
      "home.hello": "Salut! Sunt Octavia",
      "home.intro": "Sunt product designer senior și transform complexitatea în experiențe clare",
      "home.cta.cv": "Vezi tot CV-ul",
      "home.cta.work": "Vezi proiectele",
      "home.years": "ani de experiență",
      "home.certified": "Certificată",
      "home.projectsCount": "proiecte finalizate",
      "home.seeProjects": "Vezi proiectele",
      "home.grad": "Absolventă a unui MSc in IT Product Design la University of Southern Denmark",
      "home.seeCv": "Vezi CV-ul",
      "home.collage.title": "Product designer senior cu educație scandinavă și flair pentru dezvoltare",
      "home.collage.p1": "Un instantaneu al felului în care lucrez cu echipele: strâng feedback de la utilizatori, definesc problema, dau formă fluxurilor și componentelor, apoi șlefuiesc interfețele ca produsele să fie clare, consecvente și ușor de folosit.",
      "home.collage.p2": "Folosesc IA ca partener, dar păstrez atingerea umană, ca produsele să fie solide tehnic și să rezolve probleme reale pentru oameni reali.",
      "home.featured": "Proiecte evidențiate",
      "home.allProjects": "Vezi toate proiectele",
      "cta.label": "Următorul proiect",
      "cta.title": "Ai un website în minte?",
      "cta.body": "Duc munca de la identitate vizuală până la un site live: pagini, texte și drumul spre rezervare sau plată. Scrie-mi și vorbim despre al tău.",
      "cta.button": "Scrie la octaviasirbu@gmail.com",
      "marina.pageTitle": "Design și dezvoltare de website și magazin pentru o profesoară de franceză | Octavia Sirbu",
      "marina.h1": "Design și dezvoltare de website și magazin pentru o profesoară de franceză",
      "privacy.pageTitle": "Confidențialitate | Octavia Sirbu",
      "privacy.h1": "Confidențialitate",
      "privacy.intro": "Această pagină explică ce se întâmplă cu datele tale când folosești octaviasirbu.com.",
      "privacy.updated": "Ultima actualizare: 12 noiembrie 2026",
      "privacy.h.who": "Cine este responsabil",
      "privacy.p.who": "Acest website este publicat de Octavia Sirbu, product designer senior, cu sediul în Paris, Franța. Pentru întrebări despre confidențialitate, scrie la <a href=\"mailto:octaviasirbu@gmail.com\">octaviasirbu@gmail.com</a>.",
      "privacy.h.what": "Ce este acest site",
      "privacy.p.what": "octaviasirbu.com este un portofoliu personal. Prezintă CV-ul, proiectele și textele mele. Nu are conturi de utilizator, newsletter sau magazin. Formularul de contact trimite mesajul pe e-mailul meu. Nu stochează mesaje pe acest site.",
      "privacy.h.data": "Date pe care le primesc de la tine",
      "privacy.p.data1": "Primesc date personale doar dacă alegi să mă contactezi, de exemplu prin formular, e-mail sau LinkedIn. De obicei includ numele, adresa de e-mail, motivul mesajului și ce scrii. Le folosesc ca să răspund și, dacă e relevant, să continuăm o conversație profesională. Nu le vând și nu le folosesc pentru publicitate.",
      "privacy.p.data2": "Păstrez corespondența cât e utilă acelei conversații, apoi o șterg când nu mai e nevoie, exceptând cazul în care am un motiv legal să o păstrez mai mult.",
      "privacy.h.browser": "Ce rămâne în browser",
      "privacy.p.browser1": "Preferința de temă luminoasă sau întunecată e salvată în browser cu localStorage, sub cheia <code>portfolio-theme</code>. Limba urmează adresa: engleza n-are prefix, franceza folosește <code>/fr</code>, daneza <code>/dk</code> și româna <code>/ro</code>. Un indiciu de limbă folosește și <code>portfolio-lang</code>. Rămâne pe dispozitivul tău. Eu nu o pot citi. Poți să o ștergi din setările browserului, la datele site-ului.",
      "privacy.p.browser2": "Acest site nu pune cookie-uri de marketing și nu folosește instrumente de analytics precum Google Analytics, Hotjar sau Meta Pixel.",
      "privacy.h.host": "Hosting și date tehnice",
      "privacy.p.host": "Site-ul e găzduit pe GitHub Pages. Când încarci o pagină, GitHub poate prelucra date tehnice precum adresa IP, tipul de browser și paginile cerute, ca să livreze site-ul și să-l țină în siguranță. Prelucrarea e făcută de GitHub ca furnizor. Vezi <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement\" target=\"_blank\" rel=\"noopener noreferrer\">declarația de confidențialitate GitHub</a>.",
      "privacy.h.fonts": "Fonturi și alte servicii",
      "privacy.p.fonts1": "Fonturile se încarcă de la Google Fonts. Browserul tău poate cere acele fișiere de la Google, ceea ce poate implica adresa IP. Formularul de contact trece prin FormSubmit, care livrează mesajul în inbox și poate prelucra date tehnice precum adresa IP ca să trimită e-mailul. Dacă urmezi un link către LinkedIn sau alt site extern, acel site are propria politică de confidențialitate.",
      "privacy.p.fonts2": "Video-urile și imaginile din acest portofoliu sunt găzduite odată cu site-ul. Redarea unui film nu trimite datele tale către o platformă video terță.",
      "privacy.h.rights": "Drepturile tale",
      "privacy.p.rights1": "Dacă dețin date personale despre tine, poți cere acces, corectare, ștergere, restricționare sau opoziție. Poți cere și o copie a datelor pe care le-ai furnizat. Scrie la <a href=\"mailto:octaviasirbu@gmail.com\">octaviasirbu@gmail.com</a>.",
      "privacy.p.rights2": "Dacă ești în UE sau SEE și consideri că datele nu au fost prelucrate corect, poți depune o plângere la autoritatea locală de protecție a datelor. În Franța este <a href=\"https://www.cnil.fr\" target=\"_blank\" rel=\"noopener noreferrer\">CNIL</a>. În România este <a href=\"https://www.dataprotection.ro\" target=\"_blank\" rel=\"noopener noreferrer\">ANSPDCP</a>.",
      "privacy.h.changes": "Modificări",
      "privacy.p.changes": "Dacă această notă se schimbă, actualizez data din capul paginii.",
      "home.services": "Cu ce te pot ajuta",
      "home.s1.title": "UI design și design systems",
      "home.s1.body": "Concep interfețe moderne, componente reutilizabile și documentație, ca produsele să rămână consecvente când echipele și funcționalitățile cresc.",
      "home.s2.title": "Cercetare UX și copywriting web",
      "home.s2.body": "Combin interviuri, teste de uzabilitate și text clar, ca parcursurile să fie evidente, de încredere și ancorate în comportamentul real al utilizatorilor.",
      "home.s3.title": "Dezvoltare web și automatizări IA",
      "home.s3.body": "Construiesc și lansez interfețe în cod și folosesc IA ca să merg mai rapid pe explorare, documentație și livrare, fără să scad calitatea.",
      "home.s4.title": "Management de proiect și metrici",
      "home.s4.body": "Țin designul și livrarea aliniate prin planificare, workshop-uri cu stakeholderi și un proces lean, ca munca să aibă impact măsurabil, iar echipele să știe ce a ieșit și de ce.",
      "home.s5.title": "Branding și design grafic",
      "home.s5.body": "Construiesc identități vizuale, materiale pentru social și grafică de marketing care întăresc recunoașterea brandului pe canale.",
      "home.s6.title": "Puncte de contact cu clienții și automatizări de e-mail",
      "home.s6.body": "Pun la punct secvențe de bun venit, newsletter-e și e-mailuri de lifecycle, cu text și timing clare, ca oamenii să audă de tine la momentul potrivit, nu pe toate odată.",
      "home.testimonials": "Recomandări",
      "blog.title": "Blog",
      "blog.intro": "Scriu despre design UX/UI, AI pentru produs, dezvoltare web și cultură europeană. Blogul e disponibil doar în engleză deocamdată.",
      "blog.filters.label": "Filtrează articolele",
      "blog.cat.all": "Toate",
      "blog.cat.ux": "Design UX/UI",
      "blog.cat.ai": "AI pentru produs",
      "blog.cat.web": "Web Dev",
      "blog.cat.culture": "Cultură europeană"
    }
  };

  var LANG_META = {
    en: { code: "EN", flag: "🇬🇧" },
    fr: { code: "FR", flag: "🇫🇷" },
    da: { code: "DA", flag: "🇩🇰" },
    ro: { code: "RO", flag: "🇷🇴" }
  };

  function isLang(lang) {
    return lang === "en" || lang === "fr" || lang === "da" || lang === "ro";
  }

  function getLang() {
    var attr = document.documentElement.getAttribute("data-lang");
    if (isLang(attr)) return attr;
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

    var meta = LANG_META[lang] || LANG_META.en;
    document.querySelectorAll("[data-lang-flag]").forEach(function (el) {
      el.textContent = meta.flag;
    });
    document.querySelectorAll("[data-lang-code]").forEach(function (el) {
      el.textContent = meta.code;
    });

    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      var on = btn.getAttribute("data-lang-set") === lang;
      btn.setAttribute("aria-selected", on ? "true" : "false");
      btn.classList.toggle("is-active", on);
    });

    var nextField = document.querySelector(".contact-form input[name='_next']");
    if (nextField) {
      nextField.value = location.origin + withCurrentLangPrefix("/contact.html", "?sent=1", "");
    }

    rewriteInternalLinks();
  }

  function withCurrentLangPrefix(pathname, search, hash) {
    var helpers = window.portfolioLangPath;
    if (!helpers) return pathname + (search || "") + (hash || "");
    return helpers.withLangPrefix(getLang(), pathname, search, hash);
  }

  function localizeHref(href) {
    if (!href) return href;
    var attr = String(href);
    if (attr.charAt(0) === "#") return href;
    if (/^(mailto:|tel:|javascript:)/i.test(attr)) return href;
    var url;
    try {
      url = new URL(href, location.href);
    } catch (e) {
      return href;
    }
    if (url.origin !== location.origin) return href;
    if (url.pathname.indexOf("/assets/") !== -1) return href;
    if (/\.(pdf|png|jpe?g|webp|svg|gif|mp4|css|js)$/i.test(url.pathname)) return href;
    var isPage =
      /\.html$/i.test(url.pathname) ||
      /\/$/.test(url.pathname) ||
      url.pathname === "/" ||
      /^\/(fr|ro|dk)$/.test(url.pathname);
    if (!isPage) return href;
    return withCurrentLangPrefix(url.pathname, url.search, url.hash);
  }

  function rewriteInternalLinks() {
    document.querySelectorAll("a[href]").forEach(function (anchor) {
      var raw = anchor.getAttribute("href");
      if (!raw || raw.charAt(0) === "#") return;
      var next = localizeHref(anchor.href || raw);
      if (next) anchor.setAttribute("href", next);
    });
  }

  function closeLangMenus() {
    document.querySelectorAll(".lang-toggle").forEach(function (wrap) {
      wrap.classList.remove("is-open");
      var trigger = wrap.querySelector(".lang-toggle__trigger");
      var menu = wrap.querySelector(".lang-toggle__menu");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      if (menu) menu.hidden = true;
    });
  }

  function setLang(lang) {
    if (!isLang(lang)) return;
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      /* ignore */
    }
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
    var helpers = window.portfolioLangPath;
    if (helpers && window.history && history.pushState) {
      var nextUrl = helpers.withLangPrefix(lang, location.pathname, location.search, location.hash);
      if (nextUrl !== location.pathname + location.search + location.hash) {
        history.pushState({ lang: lang }, "", nextUrl);
      }
    }
    apply();
    document.dispatchEvent(new CustomEvent("portfolio-lang"));
  }

  document.querySelectorAll(".lang-toggle").forEach(function (wrap) {
    var trigger = wrap.querySelector(".lang-toggle__trigger");
    var menu = wrap.querySelector(".lang-toggle__menu");
    if (!trigger || !menu) return;
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = wrap.classList.contains("is-open");
      closeLangMenus();
      if (!open) {
        wrap.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        menu.hidden = false;
      }
    });
  });

  document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setLang(btn.getAttribute("data-lang-set"));
      closeLangMenus();
    });
  });

  document.addEventListener("click", closeLangMenus);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLangMenus();
  });

  function addStrings(pack) {
    if (!pack) return;
    Object.keys(pack).forEach(function (lang) {
      if (!strings[lang]) strings[lang] = {};
      Object.assign(strings[lang], pack[lang]);
    });
  }

  window.addEventListener("popstate", function () {
    var helpers = window.portfolioLangPath;
    var lang = helpers ? helpers.langFromPath(location.pathname) : "en";
    if (!isLang(lang)) lang = "en";
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      /* ignore */
    }
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
    apply();
    document.dispatchEvent(new CustomEvent("portfolio-lang"));
  });

  window.portfolioI18n = {
    t: t,
    apply: apply,
    getLang: getLang,
    setLang: setLang,
    addStrings: addStrings,
    localizeHref: localizeHref
  };
  apply();
})();

import type { HomeContent } from "@/lib/cms-types";

export const defaultHomeContent: HomeContent = {
  site: {
    logoText: "luumo",
    logoAccent: "x",
    phone: "+1-2345-2234",
    email: "sales@goodlayers.co",
    socialLinks: [
      { label: "Facebook", href: "#", icon: "facebook" },
      { label: "Twitter", href: "#", icon: "twitter" },
      { label: "LinkedIn", href: "#", icon: "linkedin" },
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Pinterest", href: "#", icon: "pinterest" },
    ],
  },
  copy: {
    aboutTitle:
      "Founded in 2008 by professional photographer, John Smith. We product visual content service creative to post production.",
    aboutBodyLeft:
      "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia, There Live The Blind Texts. Separated They Live In Bookmarksgrove Right At The Coast Of The Semantics, <strong>A Large Language Ocean.</strong> A Small River Named Duden Flows By Their Place And Supplies It With The Necessary Regelialia. It Is A Paradisematic Country, In Which Roasted Parts Of Sentences Fly Into Your Mouthes It With The Necessary Regelialia.",
    aboutBodyRight:
      "Lorem Ipsum Decided To Leave For The Far World Of Grammar. The Big Oxmox Advised Her Not To Do So, Because There Were Thousands Of Bad Commas, Wild Question Marks And Devious Semikoli, But The Little Blind Text Didnt Listen. She Packed Her Seven Versalia, Put Her Initial Into The Belt And Made.",
    aboutCtaText: "Read more",
    aboutCtaHref: "#services",
    servicesSideLabel: "Our services",
    serviceCtaText: "Learn more",
    serviceCtaHref: "#about",
    worksTitle: "Our works",
    worksBody:
      "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia, There Live The Blind Texts. Separated They Live In Bookmarksgrove Right At The Coast Of Theocean.",
    worksCtaText: "View all works",
    worksCtaHref: "#",
    worksLoadMoreText: "Load more",
    photographersTitle: "Meet photographers",
    photographersSubtitle: "We are a team of super professional photographers",
    facilitiesTitle: "Facilities",
    facilitiesSubtitle: "We only use top tier equipments",
    blogTitle: "Blog",
    blogSubtitle: "Article, news, tips",
    blogCtaText: "Read the blog",
    blogCtaHref: "#",
    contactTitle: "Contact us",
    contactAddress: "456 Main Street, Buckingham Av. Xv34 London",
    contactPhone: "+1-2345-2234",
    contactEmail: "sales@goodlayers.co",
    contactCtaText: "Contact form",
    contactCtaHref: "/book",
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-0.384%2C51.389%2C-0.213%2C51.447&layer=mapnik&marker=51.412%2C-0.300",
    footerCopyright: "Copyright 2018, GoodLayers. All right reserved",
  },
  heroSlides: [
    {
      eyebrow: "Best studio wordpress theme",
      title: "Luumox",
      body: "Founded in 2008 by professional photographer, John Smith. We product visual content full-service creative to post production.",
      cta: "View our works",
      href: "#services",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90",
    },
    {
      eyebrow: "Production. fashion. editorial",
      title: "Studio",
      body: "We shape campaigns, portraits, product stories, and full-service visual systems for brands that need sharp direction from shoot to delivery.",
      cta: "Meet photographers",
      href: "#photographers",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=90",
    },
  ],
  services: [
    {
      id: "photoshoot",
      tone: "yellow",
      title: "Photoshoot services",
      ghost: "Photoshoot",
      sub: "Modeling & personal shootings",
      body: "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia.",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2200&q=90",
    },
    {
      id: "production",
      tone: "dark",
      title: "Production services",
      ghost: "Production",
      sub: "Advertise. filming. you name it",
      body:
        "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=2200&q=90",
    },
    {
      id: "post-production",
      tone: "yellow",
      title: "Post production",
      ghost: "Production",
      sub: "Products. watches. bags",
      body:
        "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia.",
      image:
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=2200&q=90",
    },
  ],
  photographers: [
    {
      name: "John Smithy",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=90",
    },
    {
      name: "Peter Sandler",
      image:
        "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=900&q=90",
    },
    {
      name: "Ricardo Gomez",
      image:
        "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=900&q=90",
    },
    {
      name: "James Smith",
      image:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=90",
    },
  ],
  works: [
    { image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=900&q=90", imageAlt: "Fashion portfolio photo", title: "Fashion set", href: "/portfolio" },
    { image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=90", imageAlt: "Interior portfolio photo", title: "Interior shoot", href: "/portfolio" },
    { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=90", imageAlt: "Model campaign photo", title: "Campaign", href: "/portfolio" },
    { image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=90", imageAlt: "Architecture portfolio photo", title: "Architecture", href: "/portfolio" },
    { image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=90", imageAlt: "City editorial photo", title: "Editorial", href: "/portfolio" },
    { image: "https://images.unsplash.com/photo-1532460734809-e7f8475ca917?auto=format&fit=crop&w=900&q=90", imageAlt: "Studio production photo", title: "Production", href: "/portfolio" },
  ],
  facilities: [
    {
      title: "Professional in-house assistants",
      body:
        "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia, There Live The Blind Texts. Separated.",
      image:
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=90",
    },
    {
      title: "Top standard studio",
      body:
        "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia, There Live The Blind Texts. Separated.",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=90",
    },
    {
      title: "High technology equipments",
      body:
        "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia, There Live The Blind Texts. Separated.",
      image:
        "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=900&q=90",
    },
  ],
  posts: [
    {
      title: "Sigma 16mm f/1.4 for micro four-thirds captures the artistic view of the world",
      comments: "2 comments",
      date: "June 6, 2016",
      href: "#",
      image:
        "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=900&q=90",
    },
    {
      title: "4 reasons why you should consider getting an office out from your home",
      comments: "One comment",
      date: "June 6, 2016",
      href: "#",
      image:
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=90",
    },
    {
      title: "Hasselblad 1.21 firmware update for X1D and H6D cameras",
      comments: "3 comments",
      date: "June 6, 2016",
      href: "#",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=90",
    },
  ],
};

import type { HomeContent } from "@/lib/cms-types";

export const defaultHomeContent: HomeContent = {
  site: {
    logoText: "Lumos ",
    logoAccent: "Visuals",
    phone: "Phone",
    email: "Email",
    socialLinks: [
      { label: "Facebook", href: "#", icon: "facebook" },
      { label: "Twitter", href: "#", icon: "twitter" },
      { label: "LinkedIn", href: "#", icon: "linkedin" },
      { label: "Instagram", href: "#", icon: "instagram" },
      { label: "Pinterest", href: "#", icon: "pinterest" },
    ],
  },
  copy: {
    aboutTitle: "Visual Production Beyond Photography",
    aboutBodyLeft:
      "Lumos Visuals is a commercial visual production studio specializing in photography, videography, immersive virtual experiences, and creative post-production.",
    aboutBodyRight:
      "We work with brands, businesses, hotels, architects, developers, agencies, and event organizers to create visual content that communicates value, strengthens brand identity, and supports marketing objectives. From concept development and production to editing, retouching, design, and final delivery, we provide a complete visual workflow under one roof.",
    aboutCtaText: "Request a Quote",
    aboutCtaHref: "/book",
    servicesSideLabel: "Services",
    serviceCtaText: "View service",
    serviceCtaHref: "/services",
    worksTitle: "Portfolio",
    worksBody:
      "Visual content for brands, events, hospitality, architecture, real estate, editorial projects, and commercial spaces.",
    worksCtaText: "View portfolio",
    worksCtaHref: "/portfolio",
    worksLoadMoreText: "Explore more work",
    photographersTitle: "Production Team",
    photographersSubtitle: "Complete visual production from planning to final delivery",
    facilitiesTitle: "Why work with us",
    facilitiesSubtitle: "A complete visual production partner",
    blogTitle: "Clients",
    blogSubtitle: "Trusted by brands, businesses, and organizations",
    blogCtaText: "Request a quote",
    blogCtaHref: "/book",
    contactTitle: "Contact",
    contactAddress:
      "Whether you are planning an event, promoting a property, launching a campaign, or building a stronger brand presence, we are here to help.",
    contactPhone: "Phone",
    contactEmail: "Email",
    contactCtaText: "Request a Quote",
    contactCtaHref: "/book",
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-0.384%2C51.389%2C-0.213%2C51.447&layer=mapnik&marker=51.412%2C-0.300",
    footerCopyright: "Lumos Visuals - Corporate & Commercial Visual Production",
  },
  heroSlides: [
    {
      eyebrow: "Corporate & Commercial Visual Production",
      title: "Lumos Visuals",
      body:
        "Premium visual content for brands, events, and spaces. Photography, video production, 360-degree virtual tours, and creative post-production for businesses, hospitality, architecture, and commercial spaces.",
      cta: "View Portfolio",
      href: "/portfolio",
      image: "/uploads/site-images/event-lobby.jpg",
    },
    {
      eyebrow: "Photography. Video. Virtual Tours.",
      title: "Visual Production",
      body:
        "From conferences and corporate events to hotels, restaurants, real estate, and editorial projects, we deliver complete visual solutions designed to elevate brands, engage audiences, and support business growth.",
      cta: "Request a Quote",
      href: "/book",
      image: "/uploads/site-images/conference-room.jpg",
    },
  ],
  services: [
    {
      id: "conferences",
      tone: "yellow",
      title: "Conferences & Exhibitions",
      ghost: "Events",
      sub: "Summits. trade shows. exhibitions.",
      body:
        "Professional photography and video coverage for conferences, exhibitions, trade shows, summits, and networking events.",
      image: "/uploads/site-images/conference-room.jpg",
    },
    {
      id: "corporate-events",
      tone: "dark",
      title: "Corporate Events",
      ghost: "Corporate",
      sub: "Launches. ceremonies. celebrations.",
      body:
        "Visual coverage for corporate gatherings, launch events, ceremonies, and company celebrations, creating valuable marketing assets for future communication.",
      image: "/uploads/site-images/event-lobby.jpg",
    },
    {
      id: "commercial-studio",
      tone: "yellow",
      title: "Commercial & Studio Photography",
      ghost: "Studio",
      sub: "Portraits. products. campaigns.",
      body:
        "Professional imagery for businesses, brands, products, and marketing campaigns, from executive portraits to branded content.",
      image: "/uploads/site-images/team-portrait.jpg",
    },
  ],
  itServices: {
    title: "exclusive IT Services",
    items: [
      {
        title: "Database Security",
        body:
          "Marketing repurpose success in professions whereas in services sapien maximus design.",
        image:
          "/uploads/site-images/conference-panel.jpg",
        imageAlt: "Database security service",
      },
      {
        title: "Digital Marketing",
        body:
          "Marketing repurpose success in professions whereas in services sapien maximus design.",
        image:
          "/uploads/site-images/team-portrait.jpg",
        imageAlt: "Digital marketing service",
      },
      {
        title: "App Development",
        body:
          "Marketing repurpose success in professions whereas in services sapien maximus design.",
        image:
          "/uploads/site-images/event-lobby.jpg",
        imageAlt: "App development service",
      },
      {
        title: "App Development",
        body:
          "Marketing repurpose success in professions whereas in services sapien maximus design.",
        image:
          "/uploads/site-images/conference-room.jpg",
        imageAlt: "IT service team",
      },
      {
        title: "App Development",
        body:
          "Marketing repurpose success in professions whereas in services sapien maximus design.",
        image:
          "/uploads/site-images/property-aerial.jpg",
        imageAlt: "Application planning service",
      },
      {
        title: "App Development",
        body:
          "Marketing repurpose success in professions whereas in services sapien maximus design.",
        image:
          "/uploads/site-images/food-detail.jpg",
        imageAlt: "Business technology service",
      },
    ],
  },
  photographers: [
    {
      name: "Strategic Thinking",
      image:
        "/uploads/site-images/team-portrait.jpg",
    },
    {
      name: "Consistent Quality",
      image:
        "/uploads/site-images/conference-panel.jpg",
    },
    {
      name: "Commercial Focus",
      image:
        "/uploads/site-images/event-lobby.jpg",
    },
    {
      name: "End-to-End Production",
      image:
        "/uploads/site-images/conference-room.jpg",
    },
  ],
  works: [
    { image: "/uploads/site-images/conference-room.jpg", imageAlt: "Conference room prepared for event photography", title: "Conferences & Exhibitions", href: "/portfolio" },
    { image: "/uploads/site-images/event-lobby.jpg", imageAlt: "Corporate event networking coverage", title: "Corporate Events", href: "/portfolio" },
    { image: "/uploads/site-images/team-portrait.jpg", imageAlt: "Corporate team portrait production", title: "Commercial Photography", href: "/portfolio" },
    { image: "/uploads/site-images/food-detail.jpg", imageAlt: "Food and hospitality photography detail", title: "Food & Hospitality", href: "/portfolio" },
    { image: "/uploads/site-images/conference-panel.jpg", imageAlt: "Panel discussion photography", title: "Architecture & Interior", href: "/portfolio" },
    { image: "/uploads/site-images/property-aerial.jpg", imageAlt: "Aerial property and hospitality marketing image", title: "Property Marketing", href: "/portfolio" },
  ],
  facilities: [
    {
      title: "Strategic Thinking",
      body: "Every project begins with understanding your objectives and audience.",
      image:
        "/uploads/site-images/event-lobby.jpg",
    },
    {
      title: "Consistent Quality",
      body:
        "A unified workflow ensures consistency across photography, video, virtual tours, and design.",
      image:
        "/uploads/site-images/conference-panel.jpg",
    },
    {
      title: "Commercial Focus",
      body: "Our work is designed to support marketing, communication, sales, and brand growth.",
      image:
        "/uploads/site-images/team-portrait.jpg",
    },
  ],
  posts: [
    {
      title: "Trusted By Brands, Businesses & Organizations",
      comments: "Clients",
      date: "",
      href: "/book",
      image:
        "/uploads/site-images/team-portrait.jpg",
    },
    {
      title: "Let's Create Something Exceptional",
      comments: "Contact",
      date: "",
      href: "/book",
      image:
        "/uploads/site-images/conference-room.jpg",
    },
    {
      title: "Complete Visual Production Partner",
      comments: "Production",
      date: "",
      href: "/services",
      image:
        "/uploads/site-images/event-lobby.jpg",
    },
  ],
};

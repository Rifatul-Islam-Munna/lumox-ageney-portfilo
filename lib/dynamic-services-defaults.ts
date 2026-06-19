import type { DynamicServiceContent } from "@/lib/cms-types";

export const defaultDynamicServicesContent: DynamicServiceContent = {
  services: [
    {
      slug: "app-development",
      title: "App Development",
      navLabel: "App Development",
      excerpt:
        "Professional app development services for brands that need a reliable digital product, clean user experience, and scalable technical foundation.",
      heroImage: "/uploads/site-images/conference-panel.jpg",
      mainImage: "/uploads/site-images/event-lobby.jpg",
      mainImageAlt: "Professional technology event and app development consultation",
      body:
        "<p>We plan, design, and build app experiences that support business goals and long-term growth. From product discovery and interface planning to production-ready delivery, each stage is structured around clarity, performance, and measurable outcomes.</p><p>Our process helps teams move from idea to launch with a practical roadmap, polished visuals, and dependable implementation support.</p>",
      sidebarTitle: "Main Services",
      chooseTitle: "Why Choose Us",
      chooseBody:
        "A focused production workflow helps transform product ideas into clear, usable, and commercially valuable digital experiences.",
      bullets: ["Product strategy", "Interface planning", "Scalable delivery"],
      featureTitle: "Empowering Your Success",
      featureBody:
        "We combine creative direction, technical planning, and professional execution to build products users can trust.",
      downloads: [
        { label: "Service Report", url: "#" },
        { label: "Download Lists", url: "#" },
      ],
      faqs: [
        {
          question: "How can I get started with your services?",
          answer:
            "Share your goals, target audience, timeline, and required features. We will recommend the best production path for your app.",
        },
        {
          question: "How do you approach new projects?",
          answer:
            "We begin with discovery, define requirements, shape user flows, then move into design, production, review, and launch support.",
        },
        {
          question: "What makes your company different?",
          answer:
            "Every service page, content block, download, and FAQ can be managed from the CMS, keeping your site flexible as services grow.",
        },
      ],
      contactTitle: "Call Us Anytime",
      contactPhone: "+1 234 567 890",
      contactEmail: "hello@lumosvisuals.com",
      contactCtaText: "Contact Us",
      contactCtaHref: "/book",
      sectionVisibility: {
        overview: true,
        valueCards: true,
        process: true,
        downloads: true,
        faqs: true,
        contact: true,
      },
      processSteps: [
        { title: "Discover", body: "We define goals, users, content needs, and business requirements." },
        { title: "Design", body: "We shape interface structure, service flow, visual direction, and page content." },
        { title: "Deliver", body: "We prepare polished assets, reusable content blocks, downloads, and launch-ready support." },
      ],
      extraSections: [
        {
          enabled: true,
          eyebrow: "Managed content",
          title: "Flexible service storytelling",
          body:
            "<p>Add focused sections for strategy, deliverables, timelines, proof points, or any topic your service page needs.</p>",
          image: "/uploads/site-images/conference-room.jpg",
          imageAlt: "Service planning session",
          imagePosition: "right",
        },
      ],
      published: true,
    },
  ],
};

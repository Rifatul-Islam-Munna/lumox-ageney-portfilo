import type { AboutContent } from "@/lib/cms-types";

export const defaultAboutContent: AboutContent = {
  hero: {
    title: "About Lumos Visuals",
    sub: "Visual Production Beyond Photography",
    body: "",
    image:
      "/uploads/site-images/conference-room.jpg",
  },
  intro: {
    image:
      "/uploads/site-images/event-lobby.jpg",
    title: "Commercial visual production for brands, businesses, hospitality, architecture, and events.",
    badge: "Photography - Video Production - 360-degree Virtual Tours - Creative Post-Production",
    body:
      "Lumos Visuals is a commercial visual production studio specializing in photography, videography, immersive virtual experiences, and creative post-production. We create visual content that communicates value, strengthens brand identity, and supports marketing objectives.",
  },
  story: {
    image:
      "/uploads/site-images/team-portrait.jpg",
    title:
      "From concept development and production to editing, retouching, design, and final delivery, we provide a complete visual workflow under one roof.",
    badge: "A complete visual production partner",
    points: [
      "Strategic Thinking",
      "Consistent Quality",
      "Commercial Focus",
      "End-to-End Production",
    ],
  },
  stats: [
    { value: "360", label: "Virtual Tours" },
    { value: "10+", label: "Service Areas" },
    { value: "100%", label: "Commercial Focus" },
    { value: "1", label: "Production Partner" },
  ],
  testimonial: {
    quote:
      "Our clients trust us to create content that enhances their image and strengthens their market presence.",
    name: "Lumos Visuals",
    company: "Corporate & Commercial Visual Production",
    image:
      "/uploads/site-images/conference-panel.jpg",
  },
  features: [
    {
      title: "Strategic Thinking",
      body: "Every project begins with understanding your objectives and audience.",
    },
    {
      title: "Consistent Quality",
      body:
        "A unified workflow ensures consistency across photography, video, virtual tours, and design.",
    },
    {
      title: "Commercial Focus",
      body: "Our work is designed to support marketing, communication, sales, and brand growth.",
    },
  ],
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
};

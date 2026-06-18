import type { AboutContent } from "@/lib/cms-types";

export const defaultAboutContent: AboutContent = {
  hero: {
    title: "About us",
    sub: "Know Us Better",
    body: "",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2200&q=90",
  },
  intro: {
    image:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=1200&q=90",
    title:
      "Founded in 2008 by professional photographer, John Smith. We product visual content service creative to post production.",
    badge: "We are a team of professional photographers",
    body:
      "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia, There Live The Blind Texts. Separated They Live In Bookmarksgrove Right At The Coast Of The Semantics, A Large Language Ocean.",
  },
  story: {
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=90",
    title:
      "I have photographed wedding, street, events throughout the United Kingdom as well as Europe, Asia.",
    badge: "We are a team of professional photographers",
    points: [
      "Professional in-house assistants",
      "Top standard studio",
      "High technology equipments",
      "Best location",
    ],
  },
  stats: [
    { value: "240000+", label: "Photos Taken" },
    { value: "1700+", label: "Happy Clients" },
    { value: "10000+", label: "Working Hours" },
    { value: "15+", label: "Current Projects" },
  ],
  testimonial: {
    quote:
      "Luumox provide the best photo studio service I have ever used. Our client was really happy with the outcome and we will definitely come back again!",
    name: "Michael Smith",
    company: "Apple Co.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=90",
  },
  features: [
    {
      title: "Professional in-house assistants",
      body:
        "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia.",
    },
    {
      title: "Top standard studio",
      body:
        "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia.",
    },
    {
      title: "High technology equipments",
      body:
        "Far Far Away, Behind The Word Mountains, Far From The Countries Vokalia And Consonantia.",
    },
  ],
  photographers: [
    {
      name: "Alan Cooper",
      image:
        "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=900&q=90",
    },
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
  ],
};

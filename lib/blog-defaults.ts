import type { BlogContent } from "@/lib/cms-types";

export const defaultBlogContent: BlogContent = {
  hero: {
    title: "Clients & Insights",
    sub: "Trusted by brands, businesses, and organizations",
    image: "/uploads/site-images/team-portrait.jpg",
  },
  posts: [
    {
      title: "Trusted By Brands, Businesses & Organizations",
      category: "Clients",
      comments: "0",
      date: "",
      author: "Lumos Visuals",
      excerpt:
        "We collaborate with companies, hotels, restaurants, architects, developers, agencies, event organizers, institutions, and entrepreneurs who value professional visual communication.",
      href: "/blog/trusted-by-brands-businesses-organizations",
      slug: "trusted-by-brands-businesses-organizations",
      body:
        "We collaborate with companies, hotels, restaurants, architects, developers, agencies, event organizers, institutions, and entrepreneurs who value professional visual communication. Our clients trust us to create content that enhances their image and strengthens their market presence.",
      image: "/uploads/site-images/team-portrait.jpg",
      imageAlt: "Business clients meeting",
    },
    {
      title: "A Complete Visual Production Partner",
      category: "Production",
      comments: "0",
      date: "",
      author: "Lumos Visuals",
      excerpt:
        "Businesses benefit from working with a single creative partner capable of managing every stage of visual production.",
      href: "/blog/complete-visual-production-partner",
      slug: "complete-visual-production-partner",
      body:
        "Every project begins with understanding objectives and audience. A unified workflow ensures consistency across photography, video, virtual tours, and design, while every deliverable supports marketing, communication, sales, and brand growth.",
      image: "/uploads/site-images/conference-room.jpg",
      imageAlt: "Visual production planning",
    },
    {
      title: "Let's Create Something Exceptional",
      category: "Contact",
      comments: "0",
      date: "",
      author: "Lumos Visuals",
      excerpt:
        "Whether you are planning an event, promoting a property, launching a campaign, or building a stronger brand presence, we are here to help.",
      href: "/blog/lets-create-something-exceptional",
      slug: "lets-create-something-exceptional",
      body:
        "Tell us about your project and we will recommend the most effective visual solution for your goals.",
      image: "/uploads/site-images/conference-panel.jpg",
      imageAlt: "Creative production studio",
    },
  ],
};

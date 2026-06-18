import type { PortfolioContent } from "@/lib/cms-types";

export const defaultPortfolioContent: PortfolioContent = {
  hero: {
    title: "Portfolio 2 columns",
    sub: "No Excerpt, With Space",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2200&q=90",
  },
  tabs: ["All", "Architecture", "Highrise", "Housing"],
  projects: [
    {
      title: "Black & White Fashion Set",
      category: "Black&White",
      filter: "All",
      href: "/portfolio",
      imageAlt: "Black and white fashion photography portfolio project",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "Product Advertising",
      category: "Advertising",
      filter: "Housing",
      href: "/portfolio",
      imageAlt: "Product advertising photography portfolio project",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "Paris Fashion Week 2018",
      category: "Beauty",
      filter: "Highrise",
      href: "/portfolio",
      imageAlt: "Paris fashion week portfolio project",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "Architect Company Gallery",
      category: "Architecture",
      filter: "Architecture",
      href: "/portfolio",
      imageAlt: "Architecture company gallery portfolio project",
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "StreetFoto Festival",
      category: "Beauty",
      filter: "Highrise",
      href: "/portfolio",
      imageAlt: "Street photography festival portfolio project",
      image:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "Michael Korr Photoshoot",
      category: "Natural",
      filter: "Housing",
      href: "/portfolio",
      imageAlt: "Michael Korr photoshoot portfolio project",
      image:
        "https://images.unsplash.com/photo-1532460734809-e7f8475ca917?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "The Skin Institute",
      category: "Beauty",
      filter: "All",
      href: "/portfolio",
      imageAlt: "Beauty photography portfolio project",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=90",
    },
    {
      title: "Sport Event Photography",
      category: "Sport",
      filter: "Highrise",
      href: "/portfolio",
      imageAlt: "Sport event photography portfolio project",
      image:
        "https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1000&q=90",
    },
  ],
};

import { createFileRoute } from "@tanstack/react-router";
import { EnsoCafeLanding } from "@/components/enso-cafe-landing";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Enso cafe — Where Taste Meets Elegance" },
      { name: "description", content: "Discover Enso cafe, a cinematic fine-dining experience shaped by world-class chefs, seasonal ingredients, and unforgettable hospitality." },
      { property: "og:title", content: "Enso cafe — Where Taste Meets Elegance" },
      { property: "og:description", content: "A refined New York dining experience where exceptional flavor meets timeless elegance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EnsoCafeLanding,
});

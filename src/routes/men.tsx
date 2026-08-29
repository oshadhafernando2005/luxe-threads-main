import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: "Men's T-Shirt Collection | Lumen Studio" },
      {
        name: "description",
        content: "Shop Lumen's men's t-shirts: heavyweight oversized cuts, essentials and vivid pigment dyes.",
      },
      { property: "og:title", content: "Men's T-Shirt Collection | Lumen Studio" },
      {
        property: "og:description",
        content: "Heavyweight oversized cuts, everyday essentials and vivid pigment dyes for men.",
      },
    ],
  }),
  component: MenPage,
});

function MenPage() {
  return (
    <CollectionView
      gender="men"
      title="Men's Collection"
      blurb="Structured cuts and saturated colour, in heavyweight cotton built to last."
    />
  );
}

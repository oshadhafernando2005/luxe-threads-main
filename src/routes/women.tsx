import { createFileRoute } from "@tanstack/react-router";
import { CollectionView } from "@/components/CollectionView";

export const Route = createFileRoute("/women")({
  head: () => ({
    meta: [
      { title: "Women's T-Shirt Collection | West Core" },
      {
        name: "description",
        content:
          "Shop West Core's women's t-shirts: cropped, fitted and oversized silhouettes in premium cotton.",
      },
      { property: "og:title", content: "Women's T-Shirt Collection | West Core" },
      {
        property: "og:description",
        content: "Cropped, fitted and oversized silhouettes in premium long-staple cotton.",
      },
    ],
  }),
  component: WomenPage,
});

function WomenPage() {
  return (
    <CollectionView
      gender="women"
      title="Women's Collection"
      blurb="Soft-hand jerseys, considered proportions and colour worth building a look around."
    />
  );
}

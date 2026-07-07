import { createFileRoute } from "@tanstack/react-router";
import { PingStorePage } from "@/components/PingStorePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ping! — The Functional Blueprint Grid" },
      {
        name: "description",
        content:
          "Ping! by Ping Ring Inc. is an NFC identity ring for portfolios, links, and real-world connection.",
      },
      { property: "og:title", content: "Ping! — The Functional Blueprint Grid" },
      {
        property: "og:description",
        content:
          "A grid-driven technical product page for the Ping! NFC identity ring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <PingStorePage variant="blueprint" />;
}

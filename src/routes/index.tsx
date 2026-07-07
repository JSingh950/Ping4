import { createFileRoute } from "@tanstack/react-router";
import { PingStorePage } from "@/components/PingStorePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ping! — Identity Hardware" },
      {
        name: "description",
        content:
          "Ping! by Ping Ring Inc. is a 2.5g titanium NFC identity ring presented with a cinematic video hero and dimensional product models.",
      },
      { property: "og:title", content: "Ping! — Identity Hardware" },
      {
        property: "og:description",
        content:
          "A black, white, and red industrial product page with a video-backed hero and dimensional Ping! ring models.",
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

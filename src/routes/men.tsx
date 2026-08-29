import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/men")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});

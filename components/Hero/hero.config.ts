import type { RegisteredComponent } from "@builder.io/sdk-react";
import Hero from "./Hero";

export const heroConfig: RegisteredComponent = {
  component: Hero,
  name: "Hero",
  inputs: [
    { name: "title", type: "text", defaultValue: "Hello from Builder" },
    {
      name: "subtitle",
      type: "text",
      defaultValue: "Edit me in the Visual Editor",
    },
  ],
};

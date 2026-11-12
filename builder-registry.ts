"use client";

import type { RegisteredComponent } from "@builder.io/sdk-react";
import { heroConfig } from "./components/Hero/hero.config";
import { accordionConfig } from "./components/Accordion/accordion.config";

// Register custom components here so they appear in the Builder Visual Editor.
export const customComponents: RegisteredComponent[] = [
  heroConfig,
  accordionConfig,
];

"use client";

import type { RegisteredComponent } from "@builder.io/sdk-react";
import { heroConfig } from "./components/Hero/hero.config";

// Register custom components here so they appear in the Builder Visual Editor.
export const customComponents: RegisteredComponent[] = [heroConfig];

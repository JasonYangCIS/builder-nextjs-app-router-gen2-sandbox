"use client";

import { Content, type BuilderContent as BuilderContentType } from "@builder.io/sdk-react";
import { customComponents } from "../builder-registry";

export const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_KEY!;

export default function BuilderContent({
  content,
  model = "page",
}: {
  content: BuilderContentType | null;
  model?: string;
}) {
  return (
    <Content
      content={content}
      model={model}
      apiKey={BUILDER_API_KEY}
      customComponents={customComponents}
    />
  );
}

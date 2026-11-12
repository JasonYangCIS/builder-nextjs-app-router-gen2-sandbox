import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchOneEntry, getBuilderSearchParams, isPreviewing } from "@builder.io/sdk-react";
import BuilderContent from "../../components/BuilderContent";

const apiKey = process.env.NEXT_PUBLIC_BUILDER_KEY!;

async function BuilderPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const raw = await searchParams;
  const query = new URLSearchParams();
  for (const [k, v] of Object.entries(raw)) {
    for (const val of Array.isArray(v) ? v : v === undefined ? [] : [v]) {
      query.append(k, val);
    }
  }
  const urlPath = "/" + (slug?.join("/") ?? "");

  const content = await fetchOneEntry({
    model: "page",
    apiKey,
    options: getBuilderSearchParams(query),
    userAttributes: { urlPath },
  });

  if (!content && !isPreviewing(query)) notFound();

  return <BuilderContent content={content} model="page" />;
}

export default function Page(props: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={null}>
      <BuilderPage params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

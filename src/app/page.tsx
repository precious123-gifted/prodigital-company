import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { StateProvider } from "@/StateManager";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home"); 

  return <StateProvider> <SliceZone  slices={page.data.slices} components={components} /></StateProvider>;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
import Link from "next/link";
import { SiteShell, PageIntro } from "@/components/site-shell";

export default function NotFound() { return <SiteShell><PageIntro number="404 / Missing page" title="This part is still missing.">Return to the collection or open the documentation to find your way.</PageIntro><Link href="/illustrations" className="inline-flex min-h-11 underline underline-offset-4">Explore the illustrations →</Link></SiteShell>; }

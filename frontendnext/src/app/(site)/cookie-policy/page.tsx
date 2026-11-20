import LegalArticle from "@/components/legal/LegalArticle";
import { COOKIE_POLICY } from "@/constants/legal";
import { ROUTES } from "@/constants/site";
import { buildMetadata } from "@/utils/seo";

export const metadata = buildMetadata({ title: COOKIE_POLICY.title, description: COOKIE_POLICY.description, path: ROUTES.cookies });

export default function CookiePolicyPage() {
  return <LegalArticle doc={COOKIE_POLICY} path={ROUTES.cookies} />;
}

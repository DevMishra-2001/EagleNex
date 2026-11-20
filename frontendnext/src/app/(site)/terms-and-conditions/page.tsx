import LegalArticle from "@/components/legal/LegalArticle";
import { TERMS } from "@/constants/legal";
import { ROUTES } from "@/constants/site";
import { buildMetadata } from "@/utils/seo";

export const metadata = buildMetadata({ title: TERMS.title, description: TERMS.description, path: ROUTES.terms });

export default function TermsPage() {
  return <LegalArticle doc={TERMS} path={ROUTES.terms} />;
}

import LegalArticle from "@/components/legal/LegalArticle";
import { PRIVACY_POLICY } from "@/constants/legal";
import { ROUTES } from "@/constants/site";
import { buildMetadata } from "@/utils/seo";

export const metadata = buildMetadata({ title: PRIVACY_POLICY.title, description: PRIVACY_POLICY.description, path: ROUTES.privacy });

export default function PrivacyPolicyPage() {
  return <LegalArticle doc={PRIVACY_POLICY} path={ROUTES.privacy} />;
}

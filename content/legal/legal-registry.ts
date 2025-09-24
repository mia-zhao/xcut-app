import { LegalDocument } from "@/types/legal";

export const legalDocuments: Record<string, LegalDocument> = {
  "privacy-policy": {
    slug: "privacy-policy",
    translations: {
      en: () => import("./en/privacy-policy.mdx"),
    },
  },
  "terms-of-service": {
    slug: "terms-of-service",
    translations: {
      en: () => import("./en/terms-of-service.mdx"),
    },
  },
};

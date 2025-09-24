export interface LegalDocument {
  slug: string;
  translations: Record<string, () => Promise<any>>;
}

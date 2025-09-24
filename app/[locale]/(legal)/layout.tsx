import "./legal.css";

export const dynamicParams = false;

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="legal">{children}</main>;
}

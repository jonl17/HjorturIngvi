import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { getContact } from "@/sanity/fetch";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const contact = await getContact();
  if (!contact) return <EmptyState />;
  return (
    <>
      <div className="contact-row">
        <p>Email</p>
        <h1 className="bold">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </h1>
      </div>
      <div className="contact-row">
        <p>Telephone</p>
        <h1 className="bold">{contact.telephone}</h1>
      </div>
    </>
  );
}

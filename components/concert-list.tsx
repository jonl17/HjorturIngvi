import { LangText } from "@/components/lang-text";
import { formatDisplayDate } from "@/lib/format";
import type { ConcertItem } from "@/sanity/types";

export function ConcertList({ concerts }: { concerts: ConcertItem[] }) {
  return (
    <>
      {concerts.map((concert) => {
        const body = (
          <>
            <h1 className="bold">
              <LangText is={concert.title} en={concert.titleEn} />
            </h1>
            {concert.venue ? (
              <p>
                <LangText is={concert.venue} en={concert.venue} />
              </p>
            ) : null}
            <p className="date bold">{formatDisplayDate(concert.date)}</p>
          </>
        );
        return (
          <article className="concert" key={concert.slug}>
            {concert.eventLink ? (
              <a className="concert-main" href={concert.eventLink} target="_blank" rel="noreferrer">
                {body}
              </a>
            ) : (
              <div className="concert-main">{body}</div>
            )}
            {concert.ticketsRequired ? (
              concert.buyTicketLink ? (
                <a className="ticket bold" href={concert.buyTicketLink} target="_blank" rel="noreferrer">
                  <LangText is="Miða krafist" en="Tickets required" />
                </a>
              ) : (
                <p className="ticket bold">
                  <LangText is="Miða krafist" en="Tickets required" />
                </p>
              )
            ) : null}
          </article>
        );
      })}
    </>
  );
}

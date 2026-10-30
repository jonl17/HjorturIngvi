import Image from "next/image";
import type { ServiceLink } from "@/lib/fallback-content";

const icons = new Set(["spotify", "youtube", "facebook", "soundcloud", "instagram", "twitter"]);

export function SocialLinks({ services }: { services: ServiceLink[] }) {
  return (
    <>
      {services.map((service) => {
        const icon = service.serviceName.toLowerCase();
        return (
          <a key={`${service.serviceName}-${service.serviceUrl}`} className="social-link" href={service.serviceUrl} target="_blank" rel="noreferrer">
            {icons.has(icon) ? <Image src={`/icons/${icon}.png`} alt="" width={24} height={24} /> : null}
            <span className="bold social-label">{service.serviceName}</span>
          </a>
        );
      })}
    </>
  );
}

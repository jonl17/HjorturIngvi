export interface ServiceLink {
  serviceName: string;
  serviceUrl: string;
}

export const fallbackSongTitle = "24. pictures: Cascade";

export const fallbackPortrait = "/portraits/front.jpg";
export const fallbackSecondPortrait = "/portraits/second.jpg";

/**
 * Layout stand-ins from the previous site, used only when Sanity has no document yet.
 * A published siteLinks document replaces this list.
 */
export const fallbackServices: ServiceLink[] = [
  {
    serviceName: "Spotify",
    serviceUrl:
      "https://open.spotify.com/artist/1jEUvN71dj3L8dQ6pSDslX?si=4sI34ig5Qfu4mLGE97Zc0w",
  },
  {
    serviceName: "Facebook",
    serviceUrl:
      "https://www.facebook.com/hjorturi/?__tn__=%2CdK-R-R&eid=ARCKnJukgw4WIv5MUFmnKkC7dVP6erRlhtvbugRpmAGDMHC0yUXw-Xpi9etVBg-a-d9JbVQ9_B0J93j2&fref=mentions",
  },
  {
    serviceName: "Youtube",
    serviceUrl:
      "https://www.youtube.com/watch?v=t0yupSTohbc&list=PLSX4WSOL-O4ALdMz8Gg-mxWk6Ml-TeEBY",
  },
  {
    serviceName: "Soundcloud",
    serviceUrl: "https://soundcloud.com/user-373345777-954802685",
  },
];

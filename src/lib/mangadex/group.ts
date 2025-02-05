import { Group } from "@/types/types";

export function GroupParser(data: any): Group {
  const id = data.id;
  const attributes = data.attributes;
  const name = attributes.name;
  const description = attributes.description;
  const website = attributes.website;
  const discord = attributes.discord;
  const email = attributes.contactEmail;
  const twitter = attributes.twitter;
  const leader = attributes.relationships
    ? data.relationships.find((item: any) => item.type === "leader")
    : null;

  const group: Group = {
    id,
    name,
    description,
    website,
    discord,
    email,
    twitter,
    leader: leader
      ? { id: leader.id, username: leader.attributes.username }
      : null,
  };
  return group;
}

import { Group, GroupStats } from "@/types/types";
import axiosInstance from "../axios";

export function GroupParser(data: any): Group {
  const id = data.id;
  const attributes = data.attributes;
  const name = attributes.name;
  const description = attributes.description;
  const website = attributes.website;
  const discord = attributes.discord;
  const email = attributes.contactEmail;
  const twitter = attributes.twitter;
  const leader = data.relationships
    ? data.relationships.find((item: any) => item.type === "leader")
    : null;
  const language = attributes.focusedLanguages;

  const group: Group = {
    id,
    name,
    description,
    website,
    discord,
    email,
    twitter,
    language,
    leader: leader
      ? { id: leader.id, username: leader.attributes.username }
      : null,
  };
  return group;
}

export async function getGroup(id: string): Promise<Group> {
  const { data } = await axiosInstance.get(`/group/${id}?`, {
    params: {
      includes: ["leader"],
    },
  });
  return GroupParser(data.data);
}

export async function getGroupStats(id: string): Promise<GroupStats> {
  try {
    const [statsResponse, uploadedResponse] = await Promise.all([
      axiosInstance.get(`/statistics/group/${id}`),
      axiosInstance.get(`/chapter?`, {
        params: {
          limit: 0,
          groups: [id],
          contentRating: ["safe", "suggestive", "erotica", "pornographic"],
        },
      })
    ]);
    
    const totalReplied = statsResponse.data?.statistics?.[id]?.comments?.repliesCount || 0;
    const totalUploaded = uploadedResponse.data?.total || 0;

    return { repliesCount: totalReplied, totalUploaded };
  } catch (error) {
    console.error('Error fetching group stats:', error);
    return { repliesCount: 0, totalUploaded: 0 };
  }
}

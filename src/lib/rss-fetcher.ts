const RSS_API_URL = "https://mdrss.tijlvdb.me/feed";
import Parser from 'rss-parser';

export async function fetchRssFeed(ids:string[]) {
    if (ids.length === 0) return null;

    const params = ids.map(id => `q=manga:${id},tl:vi`).join("&");
    const url = `${RSS_API_URL}?${params}`;
    console.log("url", url);

    const parser = new Parser();
    const feed = await parser.parseURL(url);
    console.log("feed", feed.items);
}
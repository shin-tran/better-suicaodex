"use client";

import TopFollowed from "./TopFollowed";
import TopRated from "./TopRated";

export default function LeaderBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TopFollowed />
      <TopRated />
    </div>
  );
}

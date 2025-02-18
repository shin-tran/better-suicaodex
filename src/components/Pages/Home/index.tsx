"use client";

import LatestUpdate from "./LatestUpdate";
import LeaderBoard from "./LeaderBoard";
import TopFollowed from "./LeaderBoard/TopFollowed";
import RecentlyAdded from "./Recently";
import PopularSwiper from "./Swiper";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="h-[324px] md:h-[400px]">
        <PopularSwiper />
      </section>

      <section className="-mt-4 md:-mt-8 lg:-mt-3">
        <LatestUpdate />
      </section>

      <section className="mt-9">
        <RecentlyAdded />
      </section>

      <section className="mt-9">
        <LeaderBoard />
      </section>
    </div>
  );
}

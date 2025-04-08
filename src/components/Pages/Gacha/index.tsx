"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import PKMTCGP from "#/images/gacha/pkmtcg.svg";
import HSR from "#/images/gacha/hsr.webp";
import BA from "#/images/gacha/ba.png";
import Link from "next/link";

export default function Gacha() {
  return (
    <div className="flex flex-col space-y-10 py-3">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent uppercase">Còn thở là còn gỡ!!</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Chọn gamge để thỏa mãn cơn nghiện gacha nào!</p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Pokemon TCG Pocket Card */}
        <div className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-yellow-200 dark:border-yellow-800">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
          
          <div className="h-64 w-full flex items-center justify-center p-6 overflow-hidden bg-white/30 dark:bg-black/30">
            <Image
              className="transition-all duration-500 group-hover:scale-110 object-contain max-h-full"
              src={PKMTCGP}
              alt="Pokemon TCG Pocket"
              priority
            />
          </div>
          
          <div className="p-5 space-y-3">
            <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">Pokémon TCG Pocket</h3>
            {/* <p className="text-sm text-gray-600 dark:text-gray-300">Collect digital cards and build your ultimate Pokémon deck!</p> */}
            <Link href="/gacha/pkm-tcgp" className="block">
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">Mở pack ngay</Button>
            </Link>
          </div>
        </div>

        {/* Honkai Star Rail Card */}
        <div className="group relative bg-gradient-to-br from-blue-50 to-purple-100 dark:from-blue-950 dark:to-purple-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-blue-200 dark:border-blue-800">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
          
          <div className="h-64 w-full flex items-center justify-center p-6 overflow-hidden bg-white/30 dark:bg-black/30">
            <Image
              className="transition-all duration-500 group-hover:scale-110 object-contain max-h-full"
              src={HSR}
              alt="Honkai Star Rail"
              priority
            />
          </div>
          
          <div className="p-5 space-y-3">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">Honkai Star Rail</h3>
            {/* <p className="text-sm text-gray-600 dark:text-gray-300">Embark on an interstellar adventure with powerful characters!</p> */}
            <Link href="/gacha/hsr" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">100 roll free (riu 100%)</Button>
            </Link>
          </div>
        </div>

        {/* Blue Archive Card */}
        <div className="group relative bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-sky-950 dark:to-indigo-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-sky-200 dark:border-sky-800">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
          
          <div className="h-64 w-full flex items-center justify-center p-6 overflow-hidden bg-white/30 dark:bg-black/30">
            <Image
              className="transition-all duration-500 group-hover:scale-110 object-contain max-h-full"
              src={BA}
              alt="Blue Archive"
              priority
            />
          </div>
          
          <div className="p-5 space-y-3">
            <h3 className="text-xl font-bold text-sky-800 dark:text-sky-300">Blue Archive</h3>
            {/* <p className="text-sm text-gray-600 dark:text-gray-300">Recruit students and form the ultimate tactical team!</p> */}
            <Link href="/gacha/ba" className="block">
              <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">Uhhoohhh!!! 🦀🦀😭😭😭</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

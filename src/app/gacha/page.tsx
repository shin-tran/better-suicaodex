import Gacha from "@/components/Pages/Gacha";

export default function Page() {
  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        <h1 className="text-2xl font-black uppercase">Gacha</h1>
      </div>

      <div className="mt-4">
        <Gacha/>
      </div>
    </>
  );
}

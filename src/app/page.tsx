import MangaSlide from "@/components/Manga/Swiper/manga-slide";
import { fetchMangaDetail } from "@/lib/mangadex/manga";
import RandomMangaSlide from "@/components/Manga/Swiper/random-manga-slide";

export default async function Home() {
  const manga = await fetchMangaDetail("35c70727-7b57-4091-ad96-9034af5c5e98");
  console.log(manga);
  const list = [
    {
      id: "35c70727-7b57-4091-ad96-9034af5c5e98",
      title:
        "Tsuihou sareta Renkinjutsushi, Adaruto Guzzu de Sekai wo Sukuu ~ Donna Monsutaa mo Zettai ni Ikaseru Otoko ~",
      language: ["en"],
      altTitle:
        "The Exiled Alchemist Saves the World with Adult Toys – A Man Who Can Make Any Monster Orgasm Without Fail",
      tags: [
        { id: "4d32cc48-9f00-4cca-9b5a-a839f0764984", name: "Comedy" },
        { id: "cdc58593-87dd-415e-bbc0-2ec27bf404cc", name: "Fantasy" },
      ],
      cover: "ffe854b6-5f52-42e3-9cbb-14d0662f71e3.jpg",
      author: [
        {
          id: "4a090e4a-3bdf-4290-bd3a-3051f3fbd424",
          name: "Ueda Yuuri (上田勇李)",
        },
      ],
      artist: [
        {
          id: "4a090e4a-3bdf-4290-bd3a-3051f3fbd424",
          name: "Ueda Yuuri (上田勇李)",
        },
      ],
      description: {
        language: "en",
        content:
          "**You’ve been making... nothing but adult toys?!**\n" +
          "\n" +
          "Oruga Zumu, a man whose alchemy always turns everything into adult toys, is expelled from his party for **lowering the status.** However, the female knight Kuu Korosse, who appears before him, recognizes Oruga’s true power.\n" +
          "\n" +
          "Thus begins the ¨**Sex War of The End,** where Oruga sets out to slay lustful monsters and save the world.",
      },
      contentRating: "erotica",
      status: "ongoing",
      raw: "https://yanmaga.jp/comics/追放された錬金術師、アダルトグッズで世界を救う_どんなモンスターも絶対にイカせる男",
      finalChapter: null,
    },
    {
      id: "e1e38166-20e4-4468-9370-187f985c550e",
      title: "Nô lệ của đội tinh nhuệ Ma đô",
      language: [
        "ru",
        "id",
        "zh-hk",
        "pt-br",
        "en",
        "vi",
        "es-la",
        "pl",
        "tr",
        "fr",
        "uk",
      ],
      altTitle: "Mato Seihei no Slave",
      tags: [
        { id: "256c8bd9-4904-4360-bf4f-508a76d67183", name: "Sci-Fi" },
        { id: "36fd93ea-e8b8-445e-b836-358f02b3d33d", name: "Monsters" },
        { id: "391b0423-d847-456f-aff0-8b0cfc03066b", name: "Action" },
        { id: "39730448-9a5f-48a2-85b0-a70db87b1233", name: "Demons" },
        { id: "423e2eae-a7a2-4a8b-ac03-a8351462d71d", name: "Romance" },
        { id: "4d32cc48-9f00-4cca-9b5a-a839f0764984", name: "Comedy" },
        { id: "87cc87cd-a395-47af-b27a-93258283bbc6", name: "Adventure" },
        { id: "a1f53773-c69a-4ce5-8cab-fffcd90b1565", name: "Magic" },
        { id: "aafb99c1-7f60-43fa-b75f-fc9502ce29c7", name: "Harem" },
        { id: "ac72833b-c4e9-4878-b9db-6c8a4a99444a", name: "Military" },
        { id: "b9af3a63-f058-46de-a9a0-e0c13906197a", name: "Drama" },
        {
          id: "dd1f77c5-dea9-4e2b-97ae-224af09caf99",
          name: "Monster Girls",
        },
        {
          id: "eabc5b4c-6aff-42f3-b657-3e90cbd00b75",
          name: "Supernatural",
        },
      ],
      cover: "78d0c2a9-08fb-4d3c-904a-d9dae23debc7.jpg",
      author: [
        { id: "2fb2f997-e449-4368-aff5-a78b8f04b2fd", name: "Takahiro" },
      ],
      artist: [
        {
          id: "453efeec-2aa7-4ebd-925f-d72dcbe5211b",
          name: "Takemura Youhei",
        },
      ],
      description: {
        language: "vi",
        content:
          'Chiều không gian đầy quỷ dữ được gọi là "Ma đô" đã mở ra đe dọa đối với loài người. Tại đó, có một loài  "đào" ban cho kẻ ăn sức mạnh đặc biệt, giúp nhân loại có cơ hội chiến đấu, tuy nhiên, chỉ có nữ giới mới có thể sử dụng thứ sức mạnh "trái đào" ấy. Bởi vậy mà phụ nữ trở thành những người bảo vệ loài người, địa vị xã hội tăng cao, trong khi nam giới bị giáng xuống tầng lớp công dân hạng hai, giành giật nhau những công việc cơ bản và sự thừa nhận.\n' +
          "\n" +
          'Nhân vật chính Yuuki Wakura, một nam sinh chăm chỉ yêu nội trợ, chị gái cậu đã bị bắt trong một sự kiện của Ma đô 5 năm về trước. Khi đang than thở về những khó khăn gặp phải, cậu đã bị lũ quỷ tấn công. Nhờ được đội trưởng Kyouka của Đội chống Quỷ kịp thời ứng cứu, cậu chấp nhận trở thành "nô lệ" của cô để có thể sở hữu sức mạnh tiêu diệt bầy quỷ.\n' +
          "\n" +
          'Bất ngờ thay, việc làm "nô lệ" đòi hỏi một cái giá tương xứng...và người phải trả giá lại không phải là cậu.',
      },
      contentRating: "erotica",
      status: "ongoing",
      raw: "https://shonenjumpplus.com/episode/10834108156641784254",
      finalChapter: null,
    },
    {
      id: "b6b89f54-81c1-4e7e-ae80-b4dccdd63ada",
      title:
        "Hyouketsu Reijou-sama wo Follow Shitara, Mechamecha Dekiai Sareteshimatta Ken",
      language: ["en", "pt-br", "vi", "th"],
      altTitle:
        "The Case Where I Followed the Freezing Lady and She Doted on Me Like Crazy",
      tags: [
        { id: "423e2eae-a7a2-4a8b-ac03-a8351462d71d", name: "Romance" },
        { id: "4d32cc48-9f00-4cca-9b5a-a839f0764984", name: "Comedy" },
        { id: "cdc58593-87dd-415e-bbc0-2ec27bf404cc", name: "Fantasy" },
        { id: "d14322ac-4d6f-4e9b-afd9-629d5f4d8a41", name: "Villainess" },
        { id: "f4122d1c-3b44-44d0-9936-ff7502c39ad3", name: "Adaptation" },
      ],
      cover: "b9e9586c-c7a2-4e08-bf17-789e4ba8124c.png",
      author: [
        {
          id: "808ae494-3b4f-474e-8aab-d027ccd4c79a",
          name: "Aisaka Takato",
        },
      ],
      artist: [
        {
          id: "90de9ef0-9662-4e4d-b25e-b6081a886bba",
          name: "Harenochiame",
        },
        { id: "de5b624a-1058-4654-bff6-adc06d1c15dc", name: "Bcoca" },
      ],
      description: {
        language: "en",
        content:
          "『The Overwhelming Adoration of the Sweethearted Lady!』 \n" +
          "\n" +
          "Alicia Ozrind, known in noble circles as the Frost Duchess, is feared for her cold and unyielding demeanor, earning her the reputation of a villainess among the aristocracy. But beneath her icy exterior lies a girl who simply struggles to express her true feelings. There is, however, one person who has melted her frozen heart—a young servant named Gray, who works as a cleaner in her grand estate. \n" +
          "\n" +
          '"You’re the only one who truly understands me!" \n' +
          "\n" +
          "Completely smitten and vulnerable around Gray, Alicia showers him with unrestrained affection. Whether it’s during meals, in the bath, or even before bedtime, her overwhelming sweetness knows no bounds! But their relationship isn’t without its hurdles—Alicia is a noble lady, and Gray a mere commoner.\n" +
          "\n" +
          "Will Gray manage to endure the relentless love of this endearing aristocrat? This is a sugary-sweet, heart-melting romantic comedy set in a fantasy world!",
      },
      contentRating: "suggestive",
      status: "ongoing",
      raw: "https://televikun-super-hero-comics.com/rensai/hyoketsu/",
      finalChapter: null,
    },
    {
      id: "11495b6d-cec6-425e-b628-9b21317412ee",
      title:
        "Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?",
      language: ["vi", "pt-br", "fr", "en", "ru"],
      altTitle:
        "What Do You Do at the End of the World? Are You Busy? Will You Save Us?",
      tags: [
        { id: "423e2eae-a7a2-4a8b-ac03-a8351462d71d", name: "Romance" },
        { id: "b9af3a63-f058-46de-a9a0-e0c13906197a", name: "Drama" },
        { id: "cdc58593-87dd-415e-bbc0-2ec27bf404cc", name: "Fantasy" },
        {
          id: "e5301a23-ebd9-49dd-a0cb-2add944c7fe9",
          name: "Slice of Life",
        },
        { id: "f4122d1c-3b44-44d0-9936-ff7502c39ad3", name: "Adaptation" },
        { id: "f8f62932-27da-4fe4-8ee1-6779a8c5edba", name: "Tragedy" },
      ],
      cover: "05ef29da-2f30-4690-b4bc-85533741acdf.jpg",
      author: [
        {
          id: "e8598540-efc7-4dc3-8ae8-794fbc23a721",
          name: "Kareno Akira",
        },
      ],
      artist: [
        { id: "2e346c7c-7620-4bbf-9b95-60a7a4dfa165", name: "Seu Kaname" },
      ],
      description: {
        language: "en",
        content:
          "Five hundred years have passed since the humans went extinct at the hands of the fearsome and mysterious ‘Beasts’. The surviving races now make their homes up on floating islands in the sky, out of reach of all but the most mobile of Beasts. However, this new safe haven Regul Aire has a dark secret behind it.  \n" +
          "Only a small group of young girls, the Leprechauns, can wield the ancient weapons needed to fend off invasions from these creatures. Into the girls’ unstable and fleeting lives, where a call to certain death could come at any moment, enters an unlikely character: a young man who lost everything five hundred years ago, the last living human awakened from a long, icy slumber. As he struggles to come to terms with his accursed fate and find his place in this hostile new world, he becomes the father that the girls never had. Together, through their everyday interactions in the ‘orphanage’, they gradually come to understand what family means and what is truly worth protecting.",
      },
      contentRating: "safe",
      status: "completed",
      raw: null,
      finalChapter: "19",
    },
  ];
  return (
    <>
      <div className="absolute">
        <hr className="w-9 h-1 bg-primary dark:border-none" />
        <h1 className="text-2xl font-black uppercase">Tiêu điểm</h1>
      </div>

      <RandomMangaSlide mangaList={list} />
    </>
  );
}

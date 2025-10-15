import HomePage from "@/components/Pages/Home";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "SuicaoDex",
        url: "https://suicaodex.com",
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://suicaodex.com/advanced-search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "SuicaoDex",
        url: "https://suicaodex.com",
        logo: "https://suicaodex.com/logo.png",
        sameAs: [
          "https://discord.gg/dongmoe",
          "https://github.com/TNTKien/better-suicaodex",
          "https://facebook.com/suicaodex",
        ],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      ></script>
      
      <HomePage />;
    </>
  );
}

interface pageProps {
  params: {
    id: string;
  };
}
export default async function Page({ params }: pageProps) {
  const { id } = params;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

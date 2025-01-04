interface pageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function Page(props: pageProps) {
  const params = await props.params;
  const { id } = params;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

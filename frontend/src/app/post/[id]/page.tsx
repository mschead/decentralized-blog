export default function Page({ params }: { params: { id: string } }) {
  return <p>Post: {params.id}</p>;
}

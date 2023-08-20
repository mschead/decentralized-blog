import Image from "next/image";
import Link from "next/link";

interface Props {
  cid: string;
  title: string;
  thumb: string;
}

const Card = ({ cid, title, thumb }: Props) => {
  const className =
    "border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col";
  return (
    <div key={cid} className={className}>
      <Link href={`/post/${cid}`}>
        <Image
          style={{ maxWidth: 512, height: 288 }}
          width={512}
          height={288}
          alt={title}
          src={thumb}
        />
        <h1 className="p-4">{title}</h1>
      </Link>
    </div>
  );
};

export default Card;

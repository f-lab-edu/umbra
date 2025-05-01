import Link from 'next/link';
import Image from 'next/image';

const MovieItem: React.FC<{ id: number; imageUrl: string }> = ({ id, imageUrl }) => {
  return (
    <Link href={`/movie/${id}`}>
      <div className="w-full h-full aspect-video rounded-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out hover:brightness-75">
        <Image
          className="w-full h-full"
          alt={'movie'}
          priority={true}
          src={`https://image.tmdb.org/t/p/w300/${imageUrl}`}
          width={300}
          height={300}
        />
      </div>
    </Link>
  );
};

export { MovieItem };

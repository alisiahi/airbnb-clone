import { useCountries } from "@/lib/getCountries";
import Image from "next/image";
import Link from "next/link";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
import { deleteFromFavorite } from "@/actions/deleteFromFavorite";
import { addToFavorite } from "@/actions/addToFavorite";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  listingId: string;
  pathname: string;
}

const ListingCard = ({
  imagePath,
  description,
  location,
  price,
  userId,
  isInFavoriteList,
  favoriteId,
  listingId,
  pathname,
}: iAppProps) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://nclkotauxfdrcqkkuluu.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of house"
          fill
          className="rounded-lg h-full object-cover"
        />

        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={deleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="listingId" value={listingId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/listing/${listingId}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="text-black font-medium">${price}</span> Night
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;

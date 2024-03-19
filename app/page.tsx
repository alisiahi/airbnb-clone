import FilterNavbar from "@/components/FilterNavbar";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import ListingCard from "@/components/ListingCard";
import NoItem from "@/components/NoItem";

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  noStore();
  const data = await prisma.listing.findMany({
    where: {
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });

  return data;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });
  return (
    <>
      <div className="container mx-auto px-5 lg:px-10">
        <FilterNavbar />
        <div>
          {data.length === 0 ? (
            <NoItem
              title="Sorry, no listing found for this category"
              description="Please check another category!"
            />
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8 mx-auto">
              {data.map((item) => (
                <ListingCard
                  key={item.id}
                  description={item.description as string}
                  imagePath={item.photo as string}
                  location={item.country as string}
                  price={item.price as number}
                  userId={user?.id}
                  favoriteId={item.Favorite[0]?.id}
                  isInFavoriteList={item.Favorite.length > 0 ? true : false}
                  listingId={item.id}
                  pathname="/"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

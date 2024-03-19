import ListingCard from "@/components/ListingCard";
import NoItem from "@/components/NoItem";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Listing: {
        select: {
          photo: true,
          id: true,
          Favorite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });
  return data;
}

const MyFavoritesPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");

  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 my-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      {data.length === 0 ? (
        <NoItem
          title="You don't have any favorites"
          description="
        Please add favorites to see them here..."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Listing?.id}
              description={item.Listing?.description as string}
              location={item.Listing?.country as string}
              pathname="/favorites"
              listingId={item.Listing?.id as string}
              imagePath={item.Listing?.photo as string}
              price={item.Listing?.price as number}
              userId={user.id}
              favoriteId={item.Listing?.Favorite[0].id as string}
              isInFavoriteList={
                (item.Listing?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyFavoritesPage;

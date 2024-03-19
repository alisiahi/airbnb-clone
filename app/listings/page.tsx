import ListingCard from "@/components/ListingCard";
import NoItem from "@/components/NoItem";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { deleteListing } from "@/actions/deleteListing";
import { SubmitButton } from "@/components/SubmitButtons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getData(userId: string) {
  noStore();
  const data = await prisma.listing.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}
const MyListingsPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");

  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 my-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      {data.length === 0 ? (
        <NoItem
          title="You don't have any homes listed"
          description="
        Please list a home on airbnb so that you can see it here..."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {data.map((item) => (
            <div className="flex flex-col gap-2" key={item.id}>
              <ListingCard
                key={item.id}
                imagePath={item.photo as string}
                listingId={item.id as string}
                price={item.price as number}
                description={item.description as string}
                location={item.country as string}
                userId={user.id}
                pathname="/listings"
                favoriteId={item.Favorite[0]?.id as string}
                isInFavoriteList={
                  (item.Favorite.length as number) > 0 ? true : false
                }
              />
              <form key={item.id} action={deleteListing}>
                <input type="hidden" name="listingId" value={item.id} />
                <input type="hidden" name="pathname" value={"/listings"} />
                <SubmitButton type="Delete Listing!" />
              </form>

              <Link href={`/edit-listing/${item.id}`}>
                <Button className="w-full text-lg">Edit Listing</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyListingsPage;

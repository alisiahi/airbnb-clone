import ListingCard from "@/components/ListingCard";
import NoItem from "@/components/NoItem";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { SubmitButton } from "@/components/SubmitButtons";
import { deleteReservation } from "@/actions/deleteReservation";

async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      Listing: {
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
      },
    },
  });
  return data;
}

const ReservationPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");

  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 my-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {data.length === 0 ? (
        <NoItem
          title="You don't have any reservations"
          description="
          Please reserve homes to see them here..."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {data.map((item) => (
            <div key={item.Listing?.id} className="flex flex-col gap-2">
              <ListingCard
                key={item.Listing?.id}
                description={item.Listing?.description as string}
                location={item.Listing?.country as string}
                pathname="/reservations"
                listingId={item.Listing?.id as string}
                imagePath={item.Listing?.photo as string}
                price={item.Listing?.price as number}
                userId={user.id}
                favoriteId={item.Listing?.Favorite[0]?.id as string}
                isInFavoriteList={
                  (item.Listing?.Favorite.length as number) > 0 ? true : false
                }
              />
              <form action={deleteReservation}>
                <input type="hidden" name="reservationId" value={item.id} />
                <input type="hidden" name="pathname" value={"/reservations"} />
                <SubmitButton type="Cancel Reservation!" />
              </form>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReservationPage;

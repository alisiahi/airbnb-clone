import SelectCalendar from "@/components/SelectCalendar";
import { SubmitButton } from "@/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { useCountries } from "@/lib/getCountries";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import MapInListingPage from "@/components/MapInListingPage";
import CategoryShowCase from "@/components/CategoryShowCase";
import { createReservation } from "@/actions/createReservation";

async function getData(listingId: string) {
  noStore();
  const data = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      Reservation: {
        where: {
          listingId: listingId,
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
          id: true,
        },
      },
    },
  });

  return data;
}

const ListingPage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="w-[85%] mx-auto mt-10 mb-20">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[50vh] md:h-[75vh]">
        <Image
          src={`https://nclkotauxfdrcqkkuluu.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt="Image of Home"
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-5 mt-8">
        <div className="lg:w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-1 text-muted-foreground">
            <p className="">{data?.guests} Guests *</p>
            <p className=""> {data?.bedrooms} Bedrooms *</p>
            <p className=""> {data?.bathrooms} Bathrooms</p>
          </div>
          <div className="flex items-center mt-6">
            <img
              src={data?.User?.profileImage ?? "/user.png"}
              alt="User Profile Image"
              className="h-11 w-11 rounded-full"
            />
            <div className="w-full flex items-center justify-between ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
            </div>
          </div>
          <Separator className="my-7" />

          <CategoryShowCase categoryName={data?.categoryName as string} />

          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />

          <MapInListingPage locationValue={country?.value as string} />
        </div>

        <form
          action={createReservation}
          className="flex flex-col gap-5 items-center"
        >
          <input type="hidden" name="listingId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalendar reservation={data?.Reservation} />
          {user?.id ? (
            <SubmitButton type="Make a Reservation" />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ListingPage;

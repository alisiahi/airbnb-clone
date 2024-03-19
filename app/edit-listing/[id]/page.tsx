import ListingForm from "@/components/ListingForm";

import prisma from "@/lib/db";
import { useCountries } from "@/lib/getCountries";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

async function getData(listingId: string, userId: string) {
  noStore();
  const data = await prisma.listing.findUnique({
    where: {
      id: listingId,
      userId: userId,
    },
    select: {
      userId: true,
      id: true,
      categoryName: true,
      title: true,
      description: true,
      price: true,
      photo: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      country: true,
    },
  });

  return data;
}
const EditListingPage = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData(params.id, user?.id as string);

  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);

  if (data?.userId === undefined) redirect("/");

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <h2 className="text-3xl text-center mt-10 font-semibold tracking-tight transition-colors">
        Edit your listing
      </h2>
      <ListingForm data={data} />
    </div>
  );
};

export default EditListingPage;

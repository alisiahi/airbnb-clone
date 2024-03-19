import { createListing } from "@/actions/createListing";
import Counter from "./Counter";
import SelectCategory from "./SelectCategory";
import { Card, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import MapInForm from "./MapInForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { editListing } from "@/actions/editListing";
import { Separator } from "./ui/separator";
import { SubmitButton } from "./SubmitButtons";

const ListingForm = async ({
  data,
}: {
  data?: {
    userId: string | null;
    id: string | null;
    title: string | null;
    description: string | null;
    guests: string | null;
    bedrooms: string | null;
    bathrooms: string | null;
    country: string | null;
    photo: string | null;
    price: number | null;
    categoryName: string | null;
  } | null;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect("/");

  return (
    <form
      action={data ? editListing : createListing}
      className="w-full mx-auto md:w-3/5"
    >
      <input type="hidden" name="userId" value={user?.id} />
      <input type="hidden" name="listingId" value={data?.id as string} />

      <div className="mx-auto flex flex-col gap-y-5 mb-20 mt-10">
        <div className="flex flex-col gap-y-2">
          <Label>Title</Label>
          <Input
            name="title"
            type="text"
            required
            placeholder="Short and simple..."
            defaultValue={data?.title as string}
          />
        </div>
        <SelectCategory defaultValue={data?.categoryName as string} />
        <div className="flex flex-col gap-y-2">
          <Label>Description</Label>
          <Textarea
            name="description"
            required
            placeholder="Please describe your home..."
            defaultValue={data?.description as string}
          />
        </div>
        <Separator />
        <div className="flex flex-col gap-y-2">
          <Label>Price</Label>
          <Input
            name="price"
            type="number"
            required
            placeholder="Price per night in USD"
            min={10}
            defaultValue={data?.price as number}
          />
        </div>
        <Separator />
        <div className="flex flex-col gap-y-2">
          <Label>Image</Label>
          <Input name="image" type="file" required />
        </div>
        <Separator />
        <Card>
          <CardHeader className="flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="underline font-medium">Guests</h3>
                <p className="text-muted-foreground text-sm">
                  How many guests do you allow?
                </p>
              </div>
              <Counter name="guest" defaultValue={Number(data?.guests)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="underline font-medium">Rooms</h3>
                <p className="text-muted-foreground text-sm">
                  How many rooms do you have?
                </p>
              </div>
              <Counter name="room" defaultValue={Number(data?.bedrooms)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="underline font-medium">Bathrooms</h3>
                <p className="text-muted-foreground text-sm">
                  How many bathrooms do you have?
                </p>
              </div>
              <Counter name="bathroom" defaultValue={Number(data?.bathrooms)} />
            </div>
          </CardHeader>
        </Card>
        <Separator />
        <MapInForm defaultLocationValue={data?.country as string} />
      </div>

      <div className="flex items-center justify-center my-20">
        <SubmitButton type={data ? "Edit Listing" : "Create Listing"} />
      </div>
    </form>
  );
};

export default ListingForm;

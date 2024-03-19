"use server";

import prisma from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function editListing(formData: FormData) {
  const userId = formData.get("userId") as string;
  const listingId = formData.get("listingId") as string;

  const categoryName = formData.get("categoryName") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;
  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomsNumber = formData.get("bathroom") as string;
  const countryValue = formData.get("countryValue") as string;

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const data = await prisma.listing.update({
    where: { id: listingId },
    data: {
      userId: userId,
      categoryName: categoryName,
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomsNumber,
      guests: guestNumber,
      photo: imageData?.path,
      country: countryValue,
    },
  });

  return redirect("/listings");
}

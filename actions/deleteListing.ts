"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteListing(formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const pathName = formData.get("pathname") as string;

  console.log(listingId + "-" + pathName);

  const data = await prisma.listing.delete({
    where: {
      id: listingId,
    },
  });

  revalidatePath(pathName);
}

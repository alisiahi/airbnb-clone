"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addToFavorite(formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathname") as string;

  const data = await prisma.favorite.create({
    data: {
      listingId: listingId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

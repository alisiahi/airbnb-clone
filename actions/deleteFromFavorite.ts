"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const pathName = formData.get("pathname") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
    },
  });

  revalidatePath(pathName);
}

"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteReservation(formData: FormData) {
  const reservationId = formData.get("reservationId") as string;
  const pathName = formData.get("pathname") as string;

  console.log(reservationId + "-" + pathName);

  const data = await prisma.reservation.delete({
    where: {
      id: reservationId,
    },
  });

  revalidatePath(pathName);
}

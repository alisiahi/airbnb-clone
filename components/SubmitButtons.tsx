"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Heart, Loader, Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";

export function SubmitButton({ type }: { type: string }) {
  const { pending } = useFormStatus();
  const pathname = usePathname();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full font-bold text-lg">
          <Loader className="mr-2 h-6 w-6 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" className="w-full font-bold text-lg">
          {type}
        </Button>
      )}
    </>
  );
}

export function AddToFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" className="bg-primary-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" className="bg-primary-foreground">
          <Heart className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}

export function DeleteFromFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" className="bg-primary-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" className="bg-primary-foreground">
          <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  );
}

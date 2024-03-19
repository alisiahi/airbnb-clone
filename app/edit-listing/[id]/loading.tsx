import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const EditListingPageLoading = () => {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <div className="mx-auto w-1/5 mt-10">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="mx-auto w-3/5 mt-10">
        <Skeleton className="h-8 w-1/6" />
        <Skeleton className="h-10 w-full mt-2" />
        <Skeleton className="h-8 w-1/6 mt-5" />
        <Skeleton className="h-10 w-full mt-2" />
        <Skeleton className="h-8 w-1/6 mt-5" />
        <Skeleton className="h-20 w-full mt-2" />
        <Separator />
        <Skeleton className="h-8 w-1/6 mt-5" />
        <Skeleton className="h-10 w-full mt-2" />
        <Separator />
        <Skeleton className="h-8 w-1/6 mt-5" />
        <Skeleton className="h-10 w-full mt-2" />
      </div>
    </div>
  );
};

export default EditListingPageLoading;

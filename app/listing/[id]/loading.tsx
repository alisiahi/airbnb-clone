import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ListingPageLoading = () => {
  return (
    <div className="w-[85%] mx-auto mt-10 mb-20">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="w-full h-[50vh] md:h-[75vh] mt-5" />

      <div className="flex flex-col lg:flex-row justify-between gap-5 mt-8">
        <div className="lg:w-2/3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/3 mt-3" />
        </div>
        <div className="lg:w-1/3">
          <Skeleton className="w-full h-72" />
        </div>
      </div>
    </div>
  );
};

export default ListingPageLoading;

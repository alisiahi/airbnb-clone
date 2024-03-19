"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountries } from "@/lib/getCountries";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const MapInForm = ({
  defaultLocationValue,
}: {
  defaultLocationValue?: string;
}) => {
  const { getAllCountries } = useCountries();
  const [locationValue, setLocationValue] = useState(
    defaultLocationValue ?? ""
  );

  const LazyMap = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return (
    <>
      <h2 className="text-3xl font-semibold tracking-tight transition-colors">
        Where is your home located?
      </h2>

      <input type="hidden" name="countryValue" value={locationValue} />

      <div className="mb-5">
        <Select required onValueChange={(value) => setLocationValue(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Countries</SelectLabel>
              {getAllCountries().map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.flag} {item.label} / {item.region}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <LazyMap locationValue={locationValue} />
    </>
  );
};

export default MapInForm;

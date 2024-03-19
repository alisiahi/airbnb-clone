"use client";

import { categoryItemsData } from "@/lib/categoryItemsData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { Label } from "./ui/label";

const SelectCategory = ({ defaultValue }: { defaultValue: string }) => {
  const [selectCategory, setSelectCategory] = useState<string>(
    defaultValue ?? ""
  );

  return (
    <div className="flex flex-col gap-y-2">
      <input
        type="hidden"
        name="categoryName"
        value={selectCategory as string}
      />
      <Label>Category</Label>

      <Select required onValueChange={(value) => setSelectCategory(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {categoryItemsData.map((item) => (
              <SelectItem key={item.id} value={item.name}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCategory;

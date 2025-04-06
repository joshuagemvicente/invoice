import { useState } from "react";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "~/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

type Category = {
  id: string | null;
  name: string;
  label?: string;
};

export function AddProduct({ categories }: { categories: Category[] }) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  return (
    <Form method="post">
      <div className="flex flex-col gap-2">
        <div className="space-y-1">
          <Label htmlFor="name">Product Name</Label>
          <Input type="text" name="name" placeholder="" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Product Description</Label>
          <Input type="text" name="description" placeholder="" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="price">Price</Label>
          <Input
            className="focus:outline-none  focus:ring-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            name="price"
            placeholder="0"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="">Stock</Label>
          <Input
            className="focus:outline-none  focus:ring-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            name="stock"
            placeholder="5"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="category">Category</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedCategoryId
                  ? categories.find((c) => c.id === selectedCategoryId)?.name
                  : "Select Category..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandList>
                  <CommandEmpty>No Category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.name}
                        onSelect={(currentValue) => {
                          const selected = categories.find(
                            (cat) => cat.name === currentValue
                          );
                          setSelectedCategoryId(selected?.id || null);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === category.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {category.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {selectedCategoryId && (
          <input type="hidden" name="category" value={selectedCategoryId} />
        )}
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

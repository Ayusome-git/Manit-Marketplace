import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { useProductStore } from "../store/useProductStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChevronDownIcon, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Label } from "@radix-ui/react-dropdown-menu";
import { usePresenceData } from "motion/react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./ui/spinner";

export function AddProduct() {
  const {user,login}=useAuthStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null, null, null]);
  const addProductStore = useProductStore((state) => state.addProduct);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const navigate=useNavigate()

  const handleFile = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = files && files[0] ? files[0] : null;
      return updated;
    });
  };

  function removeImage(idx: number) {
    setImages((prev) => {
      const updated = [...prev];
      updated[idx] = null;
      return updated;
    });
  }

  async function handleAddProduct() {
    if (!images[0]) {
      toast.error("Please select the first (main) image.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("productCondition", productCondition);
      if (date) formData.append("purchaseDate", date.toISOString());
      images.forEach((file) => {
        if (file) formData.append("images", file);
      });
      for (const [key, value] of formData.entries()) {
  console.log(key, value);
}
      await addProductStore(formData);
      if(error){
        alert("Adding product failed");
        return;
      }
      toast.success("Product added");
      setName("");
      setDescription("");
      setImages([null, null, null, null, null, null]);
      setProductCondition("");
      setCategory("");
      setDate(undefined);
      navigate("/profile/myads")
    } catch (e) {
      toast.error("Adding product failed");
    }
  }
  if (!user) {
    return (
    <Card className="sm:mx-32 font-sans text-center  items-center">
      <div>Please log in to post ad.</div>
      <Button className="w-fit cursor-pointer" onClick={login}>Login</Button>
    </Card>
    )
  }
  return (
    <div className="font-sans">
      <Card className="p-5 mx-5 sm:mx-32">
        <div className="gap-5 ">
          <Label className="px-1 text-sm py-1">
            Product Name
            <span className="text-red-400">*</span>
          </Label>
          <Input
            type="text"
            className=""
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
          <Label className="px-1 text-sm py-1">
            Category
            <span className="text-red-400">*</span>
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Product Category <span className="text-red-400">*</span></SelectLabel>
                <SelectItem value="electronics">Electronics & Gadget</SelectItem>
                <SelectItem value="stationary">Stationary & Books</SelectItem>
                <SelectItem value="cycle">Cycle</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="sports">Sports & Fitness</SelectItem>
                <SelectItem value="kitchen">Kitchen & Dining</SelectItem>
                <SelectItem value="health">Health & Beauty</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
          <div className="gap-3">
            <Label className="px-1 py-1 text-sm">
              Purchase Date
              <span className="text-red-400">*</span>
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
          <Label className="px-1 text-sm py-1">
            Price
            <span className="text-red-400">*</span>
          </Label>
          <Input
            className="w-full"
            placeholder="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Input>
          </div>
          <div>
          <Label className="px-1 text-sm py-1">
            Product Condition
            <span className="text-red-400">*</span>
          </Label>
          <Select value={productCondition} onValueChange={setProductCondition}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Product Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Product Condition</SelectLabel>
                <SelectItem value="used">Used</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="refurbished">Refurbished</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
        </div>
        <div className="">
          <Label className="px-1 text-sm py-1">
            Product Description
            <span className="text-red-400">*</span>
          </Label>
          <Textarea
            className="sm:min-h-36"
            placeholder="Enter the product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="flex flex-col items-center sm:h-72">
                <Label className="mb-1">
                  Image {idx + 1}{" "}
                  {idx === 0 ? (
                    <span className="text-gray-400 text-xs">
                      (Mandatory) <span className="text-red-400">*</span>
                    </span>
                  ) : idx > 0 && idx < 3 ? (
                    <span className="text-gray-400 text-xs">(Recommended)</span>
                  ) : (
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  )}
                </Label>
                {!images[idx] ? (
                  <Input
                    className="h-full"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFile(idx, e)}
                    required={idx === 0}
                  />
                ) : (
                  <div className="h-72 w-full rounded-2xl border p-3 flex items-center justify-center overflow-hidden relative">
                    <img
                      className="max-h-full max-w-full object-contain"
                      src={URL.createObjectURL(images[idx])}
                      alt="Preview"
                    />
                      <X className="w-4 h-4 text-red-500 top-2 right-1 absolute cursor-pointer" onClick={() => removeImage(idx)} />
                  </div>
                )}
              </div>
            ))}
          </div>

        <div className="items-center justify-center w-full flex">
          {loading ? <Button variant="destructive" className="cursor-not-allowed">Posting Add <Spinner></Spinner></Button> : (
            <Button onClick={handleAddProduct}>Submit</Button>
          )}
        </div>
      </Card>
    </div>
  );
}

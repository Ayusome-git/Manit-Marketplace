
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
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
import axios from "axios";
import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Label } from "@radix-ui/react-dropdown-menu";

export function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [images,setImages]=useState<File[]>([])


    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  }

  async function addProduct() {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("productCondition", productCondition);
      images.forEach((file) => {
      formData.append("images", file);
      });
      await axios.post(
        "http://localhost:3000/product",formData,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      alert("blog added");
    } catch (e) {
      alert("blog failed");
    }
  }
  return (
    <div className="font-sans"> 
      <Card className="p-5 mx-5 sm:mx-32">
        <div className="gap-5 ">
          <Label className="px-1 text-sm py-1">
            Product Name
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
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Product Category</SelectLabel>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="stationary">Stationary</SelectItem>
                <SelectItem value="appliances">Appliances</SelectItem>
                <SelectItem value="cycle">Cycle</SelectItem>
                <SelectItem value="bike">Bike</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
          <div className="gap-3">
            <Label className="px-1 py-1 text-sm">
              Purchase Date
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
          <Textarea
            placeholder="Enter the product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Picture</Label>
        <Input id="picture" type="file" accept="image/*" multiple onChange={handleFile} />
      </div>
        <div className="items-center justify-center w-full flex">
          <Button onClick={() => addProduct()}>Submit</Button>
        </div>
      </Card>
    </div>
  );
}

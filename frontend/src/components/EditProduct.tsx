import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
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
import { ChevronDownIcon, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, login } = useAuthStore();
  const { fetchProduct, loading, editProduct, product } = useProductStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null, null, null]);



  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id, fetchProduct]);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price?.toString() || "");
      setProductCondition(product.productCondition || "");
      setCategory(product.category || "");
      setDate(product.purchaseDate ? new Date(product.purchaseDate) : undefined);
      setExistingImages(product.productImages?.map(img => img.imageUrl) || []);
    }
  }, [product]);


  function removeExistingImage(idx: number) {
    setExistingImages(prev => prev.filter((_, i) => i !== idx));
  }


  function handleFile(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    setImages(prev => {
      const updated = [...prev];
      updated[idx] = files && files[0] ? files[0] : null;
      return updated;
    });
  }

  function removeImage(idx: number) {
    setImages(prev => {
      const updated = [...prev];
      updated[idx] = null;
      return updated;
    });
  }

  async function handleUpdateProduct() {
    if (!name || !category || !price || !productCondition || !description) {
      toast("Please fill all required fields.");
      return;
    }

    if (!existingImages[0] && !images[0]) {
      toast("At least one image is required.");
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

      existingImages.forEach((url) => {
        formData.append("existingImages", url);
      });

      images.forEach((file) => {
        if (file) formData.append("images", file);
      });
      if(id){
        await editProduct(id, formData);
      }
      toast.success("update successfull")
      navigate("/profile/myads")
    } catch (e:any) {
      const message =
      e?.message || e?.response?.data?.error || "Failed to update product";
    toast.error(message);
    }
  }

  if (!user) {
    return (
      <Card className="sm:mx-32 font-sans text-center items-center">
        <div>Please log in to edit product.</div>
        <Button className="w-fit cursor-pointer" onClick={login}>Login</Button>
      </Card>
    );
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="font-sans mt-40">
      <Card className="p-5 mx-5 sm:mx-32">
        <div className="gap-5 ">
          <Label className="px-1 text-sm py-1">
            Product Name <span className="text-red-400">*</span>
          </Label>
          <Input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <Label className="px-1 text-sm py-1">
              Category <span className="text-red-400">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Product Category</SelectLabel>
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
              Purchase Date <span className="text-red-400">*</span>
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
              Price <span className="text-red-400">*</span>
            </Label>
            <Input
              className="w-full"
              placeholder="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <Label className="px-1 text-sm py-1">
              Product Condition <span className="text-red-400">*</span>
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
        <div>
          <Label className="px-1 text-sm py-1">
            Product Description <span className="text-red-400">*</span>
          </Label>
          <Textarea
            className="sm:min-h-36"
            placeholder="Enter the product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* Images section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Existing images */}
          {existingImages.map((url, idx) => (
            <div key={`existing-${idx}`} className="flex flex-col items-center sm:h-72">
              <Label className="mb-1">Existing Image {idx + 1}</Label>
              <div className="h-72 w-full rounded-2xl border p-3 flex items-center justify-center overflow-hidden relative">
                <img
                  className="max-h-full max-w-full object-contain"
                  src={url}
                  alt="Existing"
                />
                <X
                  className="w-4 h-4 text-red-500 top-2 right-1 absolute cursor-pointer"
                  onClick={() => removeExistingImage(idx)}
                />
              </div>
            </div>
          ))}
          {Array.from({ length: 6 - existingImages.length }).map((_, idx) => (
            <div key={`new-${idx}`} className="flex flex-col items-center sm:h-72">
              <Label className="mb-1">New Image {existingImages.length + idx + 1}</Label>
              {!images[idx] ? (
                <Input
                  className="h-full"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(idx, e)}
                />
              ) : (
                <div className="h-72 w-full rounded-2xl border p-3 flex items-center justify-center overflow-hidden relative">
                  <img
                    className="max-h-full max-w-full object-contain"
                    src={URL.createObjectURL(images[idx]!)}
                    alt="Preview"
                  />
                  <X
                    className="w-4 h-4 text-red-500 top-2 right-1 absolute cursor-pointer"
                    onClick={() => removeImage(idx)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="items-center justify-center w-full flex gap-5">
        <Button onClick={()=>navigate("/")}variant="secondary" >Cancle</Button>
          {loading ? (
            <Button variant="destructive" className="cursor-not-allowed">Updating<Spinner></Spinner></Button>
          ) : (
            <Button onClick={handleUpdateProduct}>Update Product</Button>
          )}
        </div>
      </Card>
    </div>
  );
}

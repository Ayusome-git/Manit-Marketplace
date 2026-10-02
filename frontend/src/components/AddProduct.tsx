import { Input } from "./ui/input";
import { useState, useMemo } from "react";
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
import { ChevronDownIcon, X, UploadCloud, Tag, ArrowRight, ArrowLeft, Eye } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Label } from "./ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./ui/spinner";
import { motion, AnimatePresence } from "motion/react";
import { ProductCard } from "./ProductCard";

export function AddProduct() {
  const { user, login } = useAuthStore();
  const [step, setStep] = useState(1);
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
  const navigate = useNavigate();

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

  const validateStep1 = () => {
    if (!name || !category || !description) {
      toast.error("Please fill in all details");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!images[0]) {
      toast.error("Please upload at least one main photo");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  async function handleAddProduct() {
    if (!price || !productCondition) {
      toast.error("Please fill in price and condition");
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
      
      await addProductStore(formData);
      if(error){
        toast.error("Failed to list item. Please try again.");
        return;
      }
      
      toast.success("Item successfully listed!");
      setName("");
      setDescription("");
      setImages([null, null, null, null, null, null]);
      setProductCondition("");
      setCategory("");
      setDate(undefined);
      navigate("/profile/myads");
    } catch (e) {
      toast.error("Failed to list item. Please try again.");
    }
  }

  // Create a mock product for live preview
  const previewProduct = useMemo(() => {
    const previewImages = images.filter(img => img !== null).map((img, i) => ({
      imageId: i,
      productId: "preview",
      imageUrl: img ? URL.createObjectURL(img) : ""
    }));

    return {
      productId: "preview",
      name: name || "Product Name",
      description: description || "Product description goes here...",
      category: category || "Category",
      price: price ? parseInt(price) : 0,
      productCondition: productCondition || "Condition",
      viewCount: 0,
      sellerId: user?.userId || "user",
      productImages: previewImages,
      seller: {
        userId: user?.userId || "user",
        username: user?.username || "You"
      }
    };
  }, [name, description, category, price, productCondition, images, user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 mt-20">
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Tag className="size-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Sell an Item</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">You need to be logged in with your MANIT account to post an advertisement.</p>
        <Button size="lg" className="px-8 rounded-full shadow-sm" onClick={login}>Login to Continue</Button>
      </div>
    );
  }

  return (
    <div className="font-sans container mx-auto px-4 py-8 lg:py-16">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">List an Item</h1>
        <p className="text-muted-foreground mt-2 text-lg">Sell your stuff quickly to other students on campus.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 xl:col-span-8">
          
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border/50 -z-10" />
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2 bg-background px-2">
                <div className={`size-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step === s ? 'bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20' : step > s ? 'bg-primary/80 text-primary-foreground' : 'bg-muted text-muted-foreground border border-border/50'}`}>
                  {s}
                </div>
                <span className={`text-xs font-medium ${step === s ? 'text-primary' : 'text-muted-foreground'}`}>
                  {s === 1 ? 'Details' : s === 2 ? 'Media' : 'Price'}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden min-h-[450px]">
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold mb-1">What are you selling?</h2>
                    <p className="text-sm text-muted-foreground mb-6">Provide clear and accurate details.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-sm font-medium">Product Title <span className="text-destructive">*</span></Label>
                      <Input
                        id="name"
                        placeholder="e.g. iPad Air 5th Gen (64GB)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-muted/30 h-12 rounded-xl"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="category" className="text-sm font-medium">Category <span className="text-destructive">*</span></Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category" className="bg-muted/30 h-12 rounded-xl">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value="electronics">Electronics & Gadgets</SelectItem>
                            <SelectItem value="stationary">Stationery & Books</SelectItem>
                            <SelectItem value="cycle">Bicycles</SelectItem>
                            <SelectItem value="furniture">Furniture</SelectItem>
                            <SelectItem value="sports">Sports & Fitness</SelectItem>
                            <SelectItem value="kitchen">Kitchen & Dining</SelectItem>
                            <SelectItem value="health">Health & Beauty</SelectItem>
                            <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description" className="text-sm font-medium">Description <span className="text-destructive">*</span></Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the item, why you're selling it, and any flaws..."
                        className="min-h-[120px] bg-muted/30 rounded-xl resize-y"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Media */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold mb-1">Upload Photos</h2>
                    <p className="text-sm text-muted-foreground mb-6">Good photos sell items faster. The first photo is the cover.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <div key={idx} className="relative aspect-square">
                        {!images[idx] ? (
                          <label className={`flex flex-col items-center justify-center w-full h-full rounded-2xl border-2 border-dashed cursor-pointer transition-all hover:bg-muted/50 ${idx === 0 ? 'border-primary/50 bg-primary/5' : 'border-border/50 bg-muted/10'}`}>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <UploadCloud className={`size-8 mb-3 ${idx === 0 ? 'text-primary' : 'text-muted-foreground/50'}`} />
                              <p className={`text-xs font-medium text-center px-2 ${idx === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                                {idx === 0 ? "Main Photo *" : `Photo ${idx + 1}`}
                              </p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFile(idx, e)} />
                          </label>
                        ) : (
                          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border group bg-black/5 shadow-sm">
                            <img src={URL.createObjectURL(images[idx]!)} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                              <Button variant="destructive" size="sm" onClick={() => removeImage(idx)} className="rounded-full shadow-lg">
                                <X className="size-4 mr-1" /> Remove
                              </Button>
                            </div>
                            {idx === 0 && (
                              <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                COVER
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Price & Condition */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold mb-1">Set Your Price</h2>
                    <p className="text-sm text-muted-foreground mb-6">Price it right to sell it fast.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid gap-2">
                      <Label htmlFor="price" className="text-sm font-medium">Price (₹) <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="bg-muted/30 h-14 rounded-xl pl-8 text-lg font-bold"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="condition" className="text-sm font-medium">Condition <span className="text-destructive">*</span></Label>
                      <Select value={productCondition} onValueChange={setProductCondition}>
                        <SelectTrigger id="condition" className="bg-muted/30 h-12 rounded-xl">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Condition</SelectLabel>
                            <SelectItem value="new">New (Never used)</SelectItem>
                            <SelectItem value="used">Used (Good condition)</SelectItem>
                            <SelectItem value="refurbished">Refurbished / Repaired</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-sm font-medium">Purchase Date <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-between font-normal bg-muted/30 h-12 rounded-xl ${!date && "text-muted-foreground"}`}
                          >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon className="size-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(d) => { setDate(d); setOpen(false); }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="ghost" 
              onClick={step === 1 ? () => navigate(-1) : handleBack}
              className="rounded-full px-6 text-muted-foreground hover:text-foreground"
            >
              {step === 1 ? 'Cancel' : <><ArrowLeft className="mr-2 size-4" /> Back</>}
            </Button>
            
            {step < 3 ? (
              <Button onClick={handleNext} className="rounded-full px-8 shadow-sm">
                Next Step <ArrowRight className="ml-2 size-4" />
              </Button>
            ) : (
              <Button onClick={handleAddProduct} disabled={loading} className="rounded-full px-8 shadow-sm bg-green-600 hover:bg-green-700 text-white">
                {loading ? <><Spinner className="mr-2" /> Listing...</> : 'Publish Listing'}
              </Button>
            )}
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <Eye className="size-4" /> Live Preview
            </h3>
            <div className="opacity-90 pointer-events-none scale-95 origin-top">
              <ProductCard product={previewProduct as any} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

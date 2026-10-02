const fs = require('fs');

// 1. smart-image.tsx
let smartImage = fs.readFileSync('src/components/ui/smart-image.tsx', 'utf8');
smartImage = smartImage.replace('import { Product } from "@/store/useProductStore";', 'import type { Product } from "@/store/useProductStore";');
fs.writeFileSync('src/components/ui/smart-image.tsx', smartImage);

// 2. AddProduct.tsx
let addProd = fs.readFileSync('src/components/AddProduct.tsx', 'utf8');
addProd = addProd.replace('ChevronDownIcon, X, UploadCloud, Tag, ArrowRight, ArrowLeft', 'ChevronDownIcon, X, UploadCloud, Tag, ArrowRight, ArrowLeft, Eye');
fs.writeFileSync('src/components/AddProduct.tsx', addProd);

// 3. Allproducts.tsx
let allProd = fs.readFileSync('src/components/Allproducts.tsx', 'utf8');
allProd = allProd.replace('ease: "easeOut"', 'ease: "linear"');
fs.writeFileSync('src/components/Allproducts.tsx', allProd);

// 4. ChatPage.tsx
let chatPage = fs.readFileSync('src/components/ChatPage.tsx', 'utf8');
chatPage = chatPage.replace('const username = seller?.username;', 'const username = seller?.username || undefined;');
chatPage = chatPage.replace('const receiverId = seller?.userId;', 'const receiverId = seller?.userId || undefined;');
fs.writeFileSync('src/components/ChatPage.tsx', chatPage);

// 5. CommandPalette.tsx
let cmdPal = fs.readFileSync('src/components/CommandPalette.tsx', 'utf8');
cmdPal = cmdPal.replace('import { Search, MapPin, Tag } from "lucide-react";', 'import { Search, MapPin, Tag } from "lucide-react";\nimport { getProductImageUrl } from "./ui/smart-image";');
cmdPal = cmdPal.replace('src={product.images?.[0] || "/placeholder.png"}', 'src={getProductImageUrl(product) || "/placeholder.png"}');
cmdPal = cmdPal.replace('src={product.images?.[0]}', 'src={getProductImageUrl(product) || ""}');
fs.writeFileSync('src/components/CommandPalette.tsx', cmdPal);

// 6. Appbar.tsx
let appBar = fs.readFileSync('src/components/Appbar.tsx', 'utf8');
appBar = appBar.replace('import { Card } from "./ui/card";', '');
fs.writeFileSync('src/components/Appbar.tsx', appBar);

console.log('Fixed TypeScript errors');

import { PaginatedTable } from "./Admin-PaginatedTable"
import { Button } from "./ui/button"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown } from "lucide-react"
import PopCard from "./Admin-PopCard"
import { useState } from "react"


type Product = {
  productId: string
  category: string
  name: string
  description: string
  price: number
  productCondition: string
  viewCount: number
  // listedAt: Date
  sellerId: string
}

type AdminProductDetailsProps = {
  product_data: Product[]
}

const AdminProductDetails = ({ product_data }: AdminProductDetailsProps) => {

  const columns = [
    { key: "serialNo", label: "Serial No." },
    { key: "productId", label: "Product ID" },
    { key: "category", label: "Category" },
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "productCondition", label: "Product Condition" },
    // { key: "actions", label: "Actions" },
  ]

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  return (

    <div className="w-full">
      <PaginatedTable
        title="Product Details"
        data={product_data}
        columns={columns}
        rowsPerPageOptions={[5, 6, 10]}
        renderRow={(prod) => [
          <tr key={`row-${prod.productId}`}>
            <td className="font-medium px-4 py-3  text-center">{product_data.indexOf(prod) + 1}</td>
            <td className="font-medium px-4 py-3  text-center">{prod.productId}</td>
            <td className="font-bold px-4 py-3 capitalize text-center">{prod.category}</td>
            <td className="font-bold capitalize px-4 py-3  text-center">{prod.name}</td>
            <td className="px-4 py-3  text-center">{prod.price}/-</td>
            <td className="px-4 py-3  text-center">{prod.productCondition}</td>
            {/* <td>
              <Button onClick={() => setSelectedProductId(selectedProductId === prod.productId ? null : prod.productId)}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedProductId === prod.productId ? 'View' : 'edit'}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selectedProductId === prod.productId ? 'View' : 'Edit'}
                  </motion.span>
                </AnimatePresence>

                <motion.div
                  animate={{ rotate: selectedProductId === prod.productId ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown />
                </motion.div>
              </Button>
            </td> */}
          </tr>,
          <AnimatePresence key={`animate-${prod.productId}`}>
            {selectedProductId === prod.productId && (
              <motion.tr key={`expand-${prod.productId}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden">
                <td colSpan={7} className="bg-white">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-3 border">
                    {/* <PopCard data={prod} /> */}
                  </motion.div>
                </td>
              </motion.tr>
            )}
          </AnimatePresence>
        ].filter(Boolean)}
      />
    </div>
  )
}

export default AdminProductDetails
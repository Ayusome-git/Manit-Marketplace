import { PaginatedTable } from "./Admin-PaginatedTable"
import { Button } from "./ui/button"

type Product = {
  productId: string
  category: string
  name: string
  description: string
  price: number
  productCondition: string
  viewCount: number
  listedAt: Date
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
    { key: "actions", label: "Actions" },
  ]

  return (
    <div>
      <PaginatedTable
        title="Product Details"
        data={product_data}
        columns={columns}
        rowsPerPageOptions={[5, 6, 10]}
        renderRow={(prod) => [
          <tr key={`row-${prod.productId}`}>
            <td>{product_data.indexOf(prod) + 1}</td>
            <td>{prod.productId}</td>
            <td>{prod.category}</td>
            <td>{prod.name}</td>
            <td>{prod.price}/-</td>
            <td>{prod.productCondition}</td>
            <td>
              <Button>
                Edit
              </Button>
            </td>
          </tr>
        ]}
      />
    </div>
  )
}

export default AdminProductDetails
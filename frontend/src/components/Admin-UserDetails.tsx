import { ChevronDown, ChevronUp, SquarePen, Trash2 } from "lucide-react"
import { PaginatedTable } from "./Admin-PaginatedTable"
import { Button } from "./ui/button"
import PopCard from "./Admin-PopCard"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

type User = {
  userId: string
  username: string
  email: string
  phoneNo: string
  hostelNo: number
  products: string[]
  ratingsGiven: string[]
  ratingsReceived: string[]
  wishlist: string[]
  notification: string[]
  senderUser: string[]
  receiverUser: string[]
}

type AdminUserDetailsProps = {
  user_data: User[]
}

const AdminUserDetails = ({ user_data }: AdminUserDetailsProps) => {

  // const [showPopCard, setShowPopCard] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const columns = [
    { key: "serialNo", label: "Serial No." },
    { key: "userId", label: "User ID" },
    { key: "username", label: "Username" },
    { key: "phoneNo", label: "Phone No." },
    { key: "email", label: "Email" },
    { key: "hostelNo", label: "Hostel No." },
    { key: "actions", label: "Actions" }, // custom rendered
  ]

  return (
    <div className="w-full">
      <PaginatedTable
        title="User Details"
        data={user_data}
        columns={columns}
        rowsPerPageOptions={[5, 6, 10]}
        renderRow={(user) => [
          <tr key={`row-${user.userId}`}>
            <td className="font-medium px-4 py-3  text-center">{user_data.indexOf(user) + 1}</td>
            <td className="font-medium px-4 py-3  text-center">{user.userId}</td>
            <td className="font-bold capitalize px-4 py-3  text-center">{user.username}</td>
            <td className="px-4 py-3  text-center">{user.phoneNo}</td>
            <td className="px-4 py-3  text-center">{user.email}</td>
            <td className="px-4 py-3  text-center">{user.hostelNo}</td>
            <td className="relative px-4 py-3  text-center">
              {/* <SquarePen className="cursor-pointer text-blue-500 hover:text-blue-700" />
              <Trash2 className="cursor-pointer text-red-500 hover:text-red-700" /> */}
              <Button onClick={() => setSelectedUserId(selectedUserId === user.userId ? null : user.userId)}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedUserId === user.userId ? 'close' : 'edit'}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selectedUserId === user.userId ? 'Close' : 'Edit'}
                  </motion.span>
                </AnimatePresence>

                <motion.div
                  animate={{ rotate: selectedUserId === user.userId ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown />
                </motion.div>
              </Button>
            </td>
          </tr>,
          <AnimatePresence key={`animate-${user.userId}`}>
            {selectedUserId === user.userId && (
              <motion.tr key={`expand-${user.userId}`}
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
                    <PopCard data={user} />
                  </motion.div>
                </td>
              </motion.tr>
            )}
          </AnimatePresence>
        ].filter(Boolean)}

      />
    </div >
  )
}

export default AdminUserDetails
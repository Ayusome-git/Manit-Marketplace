
type Notification = {
  notificationId: number,
  userId: String,
  message: String,
  isRead: Boolean,
  notificationTime: Date,
}

type AdminNotificationProps = {
  notification_data: Notification[]
}

const AdminNotification = ({ notification_data }: AdminNotificationProps) => {
  return (
    <div>Admin-Notification
      <div>{notification_data.length}</div>
    </div>
  )
}

export default AdminNotification
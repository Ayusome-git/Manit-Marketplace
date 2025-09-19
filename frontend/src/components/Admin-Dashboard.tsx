const AdminDashboard = ({ user_data, product_data }) => {
 return (
  <div>
   <h4>Total users : {user_data.length}</h4>
   <h4>Total Products currently : {product_data.length}</h4>
  </div>
 )
}

export default AdminDashboard
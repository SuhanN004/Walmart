import { useEffect, useState } from "react";
import axios from "axios";
import "../AdminStyles/ManageOrders.css";

function ManageOrders() {

  const [orders, setOrders] = useState([]);
  const api=import.meta.env.VITE_API;
  const fetchOrders = async () => {
    try {

      const res = await axios.get(`${api}/api/order/all`);

      setOrders(res.data);

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  return (

    <div className="manage-orders">

      <h2> Manage Orders</h2>

      <table>
        <thead>
          <tr>

            <th>User id</th>
            <th>Products</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>



          </tr>
        </thead>
        <tbody>






          {orders.map((order) => (


            <tr key={order._id}>




              <td>{order.userId}</td>


              <td>
                {order.items.map((item, i) => (
                  <div key={i}>
                    {item.name}x{item.qty}
                  </div>

                ))}

              </td>




              <td>Rs . {order.totalAmount}</td>

              <td>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td>

                
                <label>
      
      <select name="status">
        <option value="">Select Category</option>
        <option value="Shipping">Shipping</option>
        <option value="Delivered">Delivered</option>
        <option value="Pending">Pending</option>
      </select>
    </label>
              </td>



            </tr>

          ))}

        </tbody>

      </table>


    </div>
  );


}

export default ManageOrders;
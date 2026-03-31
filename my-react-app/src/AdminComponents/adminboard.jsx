import { useNavigate } from "react-router-dom";
import "../AdminStyles/AdminBoard.css";

function AdminBoard() {

  const navigate = useNavigate();

  return (
    <div className="admin-board">
      <h1 className="admin-title">Walmart Admin Dashboard</h1>

      <div className="button-container">



        <button
          className="admin-btn"
          onClick={() => navigate("/admin/add-product")}
        >
          Add Product
        </button>



        <button
          className="admin-btn remove-btn"
          onClick={() => navigate("/admin/view-product")}
        >
          View Product
        </button>

        <button
          className="admin-btn"
          onClick={() => navigate("/admin/add-service")}
        >
          Add Category
        </button>

        <button
          className="admin-btn"
          onClick={() => navigate("/admin/orders")}
        >
          Manage Orders
        </button>


      </div>
    </div>
  );
}

export default AdminBoard;
import { useState } from "react";
import axios from "axios";
import "../AdminStyles/AddService.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddService() {

  const [title,setTitle] = useState("");


  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {



      const formData=new FormData();

      formData.append("title", title);


      formData.append("image", image);

      await axios.post(

        "http://localhost:5000/api/service/add",
        formData,

        {

          headers: {
            "Content-Type": "multipart/form-data",
          },

        }
      );

      toast.success("Service Added Successfully", {
        position: "top-right",
        autoClose: 3000,
      });


      setTitle("");
      setImage(null);



    } catch (error) {

      console.error("Error adding service:", error);

      toast.error("Error adding service", {


        position: "top-right",
        autoClose: 3000,
      });

    }

  };


  return (
    <div className="add-service-page">

      <div className="add-service-card">

        <h2>Add Category</h2>

        <form onSubmit={handleSubmit}>

          <label>Title</label>



          <input
            type="text"
              placeholder="Category Title"
              value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />



          <label>Image</label>



          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        


          <button type="submit">
          Add Service
          </button>

        </form>

        <ToastContainer />

      </div>

    </div>
  );
}

export default AddService;
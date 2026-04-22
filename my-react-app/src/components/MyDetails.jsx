import {useEffect , useState} from 'react';
import axios from 'axios';

import '../styles/MyDetails.css';
function MyDetails() {
    const [details, setDetails] = useState({});
    const BASE_URL = "https://walmart-3-ysdt.onrender.com";
    const userId = localStorage.getItem("userId");
    const fetchDetails = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/user/${userId}`);
            setDetails(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <div className="details-page">
            <h2>My Details</h2>
            <div className="details-card">
                <p><strong>Name:</strong> {details.name}</p>
                <p><strong>Email:</strong> {details.email}</p>
                <p><strong>Phone:</strong> {details.phone}</p>
                <p><strong>Address:</strong> {details.address}</p>
            </div>
        </div>
    );
}

export default MyDetails;
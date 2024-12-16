import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

const PackageDetails = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/packages/${id}`)
            .then(response => setPkg(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!pkg) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="card">
                <img src={pkg.image} alt={pkg.title} />
                <h1>{pkg.title}</h1>
                <p>{pkg.description}</p>
                <p>Price: {pkg.price}</p>
                <p>Available dates: {pkg.dates ? pkg.dates.join(', ') : 'No dates available'}</p>
                <Link to={`/book/${pkg._id}`}><button>Book Now</button></Link>
            </div>
        </div>
    );
};

export default PackageDetails;

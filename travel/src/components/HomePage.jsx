import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';



const HomePage = () => {

    const [packages, setPackages] = useState([]);


    useEffect(() => {
        // Fetch packages from the backend
        axios.get('http://localhost:5000/api/packages')
            .then(response => setPackages(response.data))
            .catch(error => console.error('Error fetching packages:', error));
    }, []);




    return (
        <div className="homepage">
            <header className="header">
                <h1>Welcome to Our Travel Agency</h1>

            </header>
            <div className="card-container">
                {packages.map(pkg => (
                    <div className="card" key={pkg._id}>
                        <img src={pkg.image} alt={pkg.title} />
                        <h2>{pkg.title}</h2>
                        <p>{pkg.description}</p>
                        <p>Price: {pkg.price}</p>
                        <p>Available dates: {pkg.dates ? pkg.dates.join(', ') : 'No dates available'}</p>

                        <Link className="link-button" to={`/book/${pkg._id}`}><button className='book-button'>Book Now</button></Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;


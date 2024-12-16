import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TourPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/packages')
      .then(response => {
        setPackages(response.data);
      })
      .catch(error => {
        console.error("Error fetching packages", error);
      });
  }, []);

  return (
    <div>
      <h1>Tour Packages</h1>
      <div className="packages">
        {packages.map(pkg => (
          <div key={pkg._id} className="package">
            <img src={pkg.image} alt={pkg.title} />
            <h2>{pkg.title}</h2>
            <p>{pkg.description}</p>
            <p>Price: ${pkg.price}</p>
            <p>Available Dates: {pkg.availableDates.join(', ')}</p>
            <Link to={`/book/${pkg._id}`}>
              <button>Book Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourPackages;
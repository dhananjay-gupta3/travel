import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
    const [packages, setPackages] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        dates: '',
        image: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [currentPackageId, setCurrentPackageId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = () => {
        const authCredentials = localStorage.getItem('authCredentials');
        axios.get('http://localhost:5000/api/packages', {
            headers: { Authorization: authCredentials }
        })
            .then(response => setPackages(response.data))
            .catch(error => console.error(error));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const authCredentials = localStorage.getItem('authCredentials');
        const formattedData = {
            ...formData,
            price: Number(formData.price), // Ensure price is a number
            dates: formData.dates.split(',').map(date => date.trim()) // Ensure dates is an array of strings
        };

        if (editMode) {
            // Update an existing package
            axios.put(`http://localhost:5000/api/admin/packages/${currentPackageId}`, formattedData, {
                headers: { Authorization: authCredentials }
            })
                .then(response => {
                    console.log(response);
                    fetchPackages();
                    setFormData({ title: '', description: '', price: '', dates: '', image: '' });
                    setEditMode(false);
                    setCurrentPackageId(null);
                })
                .catch(error => {
                    console.error('Error updating package:', error.response ? error.response.data : error.message);
                });
        } else {
            // Add a new package
            axios.post('http://localhost:5000/api/admin/packages', formattedData, {
                headers: { Authorization: authCredentials }
            })
                .then(response => {
                    console.log(response);
                    fetchPackages();
                    setFormData({ title: '', description: '', price: '', dates: '', image: '' });
                })
                .catch(error => {
                    console.error('Error adding package:', error.response ? error.response.data : error.message);
                });
        }
    };

    const handleEdit = (pkg) => {
        setEditMode(true);
        setCurrentPackageId(pkg._id);
        setFormData({
            title: pkg.title,
            description: pkg.description,
            price: pkg.price,
            dates: pkg.dates.join(', '), // Convert array to comma-separated string
            image: pkg.image
        });
    };

    const handleDelete = (id) => {
        const authCredentials = localStorage.getItem('authCredentials');
        axios.delete(`http://localhost:5000/api/admin/packages/${id}`, {
            headers: { Authorization: authCredentials }
        })
            .then(() => fetchPackages())
            .catch(error => console.error(error));
    };

    const handleLogout = () => {
        localStorage.removeItem('authCredentials');
        navigate('/login');
    };

    return (
        <div className="container">
            <h1>Admin Panel</h1>
            <button onClick={handleLogout}>Logout</button>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Available dates:</label>
                        <input type="text" name="dates" value={formData.dates} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Image URL:</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} required />
                    </div>
                    <button type="submit">{editMode ? 'Update Package' : 'Add Package'}</button>
                </form>
            </div>
            <h2>Tour Packages</h2>
            <ul>
                {packages.map(pkg => (
                    <li key={pkg._id} className="card">
                        <h3>{pkg.title}</h3>
                        <button onClick={() => handleEdit(pkg)}>Edit</button>
                        <button onClick={() => handleDelete(pkg._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;

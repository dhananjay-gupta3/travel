import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Homepage from './components/HomePage';
import PackageDetails from './components/PackageDetails';
import BookingForm from './components/BookingForm';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
function App() {


  return (
    <>

      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route path="/book/:id" element={<BookingForm />} />

            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App



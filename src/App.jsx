import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import './styles/main.css'
import SignInSignUp from './componenets/sign_in'
import Wishlist from './componenets/wishlist'
import image from '/images/logo.png'

function Header() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
   
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
  }, []);

  const handleProfileClick = () => {
    if (!currentUser) {
      navigate('/auth');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <header>
      {/* Logo */}
      <div className="logo_container">
        <Link to="/"><img className="logo_home" src={image} alt="Sahil Home" /></Link>
      </div>
      <div className="nav_bar">
        <Link to="#">Men</Link>
        <Link to="#">Women</Link>
        <Link to="#">Kids</Link>
        <Link to="#">Home & Living</Link>
        <Link to="#">Beauty</Link>
        <Link to="#">Studio <sup>New</sup></Link>
      </div>

      {/* Search Bar */}
      <div className="search_bar">
        <span className="material-symbols-outlined search_icon">search</span>
        <input className="search_input" placeholder="Search for products,brands and more" />
      </div>

      {/* Action */}
      <div className="action_bar">
        <div className="action_container" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined action_icon">person</span>
          <span className="action_name">
            {currentUser ? (
              <div className="user-profile">
                {currentUser.name}
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            ) : (
              'Profile'
            )}
          </span>
        </div>

        <div className="action_container" onClick={() => navigate('/wishlist')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined">favorite</span>
          <span className="action_name">Wishlist</span>
        </div>

        <div className="action_container">
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="action_name">Bag</span>
        </div>
      </div>
    </header>
  );
}

function MainContent() {
  const [products] = useState([
    { id: 1, title: 'Medal Worthy Brand 1', category: 'offers' },
  
  ]);

  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Load wishlist items from localStorage
    const items = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(items);
  }, []);

  const addToWishlist = (product) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    const isAlreadyInWishlist = wishlistItems.some(item => item.id === product.id);
    
    if (!isAlreadyInWishlist) {
      const newWishlistItems = [...wishlistItems, {
        id: product.id,
        title: product.title,
        image: `/images/${product.category} ${product.id}.jpg`,
      }];
      setWishlistItems(newWishlistItems);
      localStorage.setItem('wishlist', JSON.stringify(newWishlistItems));
      
      // Show success message
      const toast = document.createElement('div');
      toast.className = 'toast-message';
      toast.textContent = 'Added to wishlist!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <main>
      <div className="banner_container">
        <img className="banner_image" src="/images/banner.jpg" alt="Main Banner" />
      </div>

      <div className="category_heading">MEDAL WORTHY BRANDS TO BAG</div>
      <div className="category_items">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <div key={num} className="product-card">
            <img className="sale_item" src={`/images/offers ${num}.jpg`} alt={`Offer ${num}`} />
            <button 
              className={`wishlist-btn ${isInWishlist(num) ? 'active' : ''}`}
              onClick={() => addToWishlist({ id: num, title: `Medal Worthy Brand ${num}`, category: 'offers' })}
            >
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
        ))}
      </div>

      <div className="category_heading">SHOP BY CATEGORY</div>
      <div className="category_items">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <div key={num} className="product-card">
            <img className="sale_item" src={`/images/${num}.jpg`} alt={`Category ${num}`} />
            <button 
              className={`wishlist-btn ${isInWishlist(num + 100) ? 'active' : ''}`}
              onClick={() => addToWishlist({ id: num + 100, title: `Category ${num}`, category: '' })}
            >
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_column">
          <h3>ONLINE SHOPPING</h3>
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty</a>
          <a href="#">Gift Card</a>
          <a href="#">Myntra Insider</a>
        </div>

        <div className="footer_column">
          <h3>ONLINE SHOPPING</h3>
          <a href="#">Contact Us</a>
          <a href="#">FAQ</a>
          <a href="#">T&C</a>
          <a href="#">Terms of Use</a>
          <a href="#">Track Orders</a>
          <a href="#">Shipping</a>
          <a href="#">Cancellation</a>
          <a href="#">Returns</a>
          <a href="#">Privacy policy</a>
          <a href="#">Grievance Officer</a>
        </div>

        <div className="footer_column">
          <h3>CUSTOMER SERVICES</h3>
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty</a>
          <a href="#">Gift Card</a>
          <a href="#">Myntra Insider</a>
        </div>
      </div>

      <hr />

      <div className="copyright">
        2025 Sahil. All rights reserved.
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <MainContent />
            <Footer />
          </>
        } />
        <Route path="/auth" element={<SignInSignUp />} />
        <Route path="/wishlist" element={
          <>
            <Header />
            <Wishlist />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App

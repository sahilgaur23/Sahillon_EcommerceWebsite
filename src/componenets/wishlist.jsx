import React from 'react';
import { Link } from 'react-router-dom';
import './wishlist.css';

const Wishlist = () => {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    return (
      <div className="wishlist-container">
        <h2>Please login to view your wishlist</h2>
        <Link to="/auth" className="login-btn">Login</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty</p>
          <Link to="/" className="shop-now-btn">Shop Now</Link>
        </div>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map((item, index) => (
            <div key={index} className="wishlist-item">
              <img src={item.image} alt={item.title} />
              <div className="item-details">
                <h3>{item.title}</h3>
                <button 
                  className="remove-btn"
                  onClick={() => {
                    const updatedWishlist = wishlistItems.filter((_, i) => i !== index);
                    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
                    window.location.reload();
                  }}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

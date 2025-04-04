import React, { useState } from "react";
import "./style.css";

export default function App() {
  return <HomePage />;
}

function HomePage() {
  const [page, setPage] = useState("home");
  const [cementBill, setCementBill] = useState(0);
  const [ironRodBill, setIronRodBill] = useState(0);
  const [visitedCement, setVisitedCement] = useState(false);
  const [visitedIron, setVisitedIron] = useState(false);
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState(0);

  return (
    <div className="app-container">
      {page === "home" && <Home setPage={setPage} />}
      {page === "cement" && (
        <OrderCement
          setPage={setPage}
          setCementBill={setCementBill}
          setVisitedCement={setVisitedCement}
          visitedIron={visitedIron}
        />
      )}
      {page === "iron" && (
        <OrderIronRod
          setPage={setPage}
          setIronRodBill={setIronRodBill}
          setVisitedIron={setVisitedIron}
          visitedCement={visitedCement}
        />
      )}
      {page === "payment" && (
        <PaymentPage
          cementBill={cementBill}
          ironRodBill={ironRodBill}
          address={address}
          setAddress={setAddress}
          distance={distance}
          setDistance={setDistance}
        />
      )}
      {page === "about" && <AboutUs setPage={setPage} />}
    </div>
  );
}

function Home({ setPage }) {
  return (
    <div className="home-container">
      <h1 className="company-name"><span className="span">AGF Construction Supplies</span></h1>
      <h3>Name: Kalp Gandhi</h3>
      <h3>Reg No. : 23BCE0949</h3>
      <p className="tagline">Your Trusted Partner for Quality Cement & Iron Rods</p>
      <div className="order-buttons">
        <button className="order-box" onClick={() => setPage("cement")}>Order Cement</button>
        <button className="order-box" onClick={() => setPage("iron")}>Order Iron Rods</button>
      </div>
      <button className="about-button" onClick={() => setPage("about")}>About Us</button>
    </div>
  );
}

function OrderCement({ setPage, setCementBill, setVisitedCement, visitedIron }) {
  const [quality, setQuality] = useState("low");
  const [quantity, setQuantity] = useState(0);
  const price = quality === "low" ? 300 : 500;
  const total = quantity * price;

  return (
    <div className="order-container">
      <h2>Order Cement</h2>
      <select onChange={(e) => setQuality(e.target.value)}>
        <option value="low">Decent Quality (Rs. 300 per bag)</option>
        <option value="high">Premium Quality (Rs. 500 per bag)</option>
      </select>
      <input type="number" placeholder="Enter quantity" onChange={(e) => setQuantity(e.target.value)} />
      <p>Bill Amount: Rs. {total}</p>
      <button onClick={() => { 
        setCementBill(total);
        setVisitedCement(true);
        setPage(visitedIron ? "payment" : "iron");
      }}>Next</button>
      <button onClick={() => setPage("home")}>Back</button>
    </div>
  );
}

function OrderIronRod({ setPage, setIronRodBill, setVisitedIron, visitedCement }) {
  const [quality, setQuality] = useState("low");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [quantities, setQuantities] = useState({});
  const sizes = [4, 6, 8, 10, 12, 16, 20];

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleQuantityChange = (size, quantity) => {
    setQuantities((prev) => ({ ...prev, [size]: quantity }));
  };

  const calculateTotal = () => {
    return selectedSizes.reduce((total, size) => {
      const basePrice = quality === "low" ? 100 : 250 - size * 5;
      return total + (quantities[size] || 0) * basePrice;
    }, 0);
  };

  const total = calculateTotal();

  return (
    <div className="order-container">
      <h2>Order Iron Rods</h2>
      <select onChange={(e) => setQuality(e.target.value)}>
        <option value="low">Decent Quality (Rs. 100 per rod)</option>
        <option value="high">Premium Quality (Variable pricing)</option>
      </select>
      <p>Select Rod Sizes:</p>
      {sizes.map((size) => (
        <div className="size-selection" key={size}>
          <input
            type="checkbox"
            value={size}
            onChange={() => handleSizeChange(size)}
          />
          <label>{size}mm</label>
          {selectedSizes.includes(size) && (
            <input
              type="number"
              placeholder="Enter quantity"
              onChange={(e) => handleQuantityChange(size, parseInt(e.target.value) || 0)}
            />
          )}
        </div>
      ))}
      <p>Bill Amount: Rs. {total}</p>
      <button
        onClick={() => {
          setIronRodBill(total);
          setVisitedIron(true);
          setPage(visitedCement ? "payment" : "cement");
        }}
      >
        Next
      </button>
      <button onClick={() => setPage("home")}>Back</button>
    </div>
  );
}


function PaymentPage({ cementBill, ironRodBill, address, setAddress, distance, setDistance }) {
  const totalBill = cementBill + ironRodBill;
  const deliveryTime = Math.min(distance * 0.5, 24);
  const canDeliver = distance <= 50;

  return (
    <div className="payment-container">
      <h2>Final Payment</h2>
      <p>Total Bill: Rs. {totalBill}</p>
      <input type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <input type="number" placeholder="Distance (km)" value={distance} onChange={(e) => setDistance(e.target.value)} />
      {canDeliver ? <p>Estimated Delivery Time: {deliveryTime} hours</p> : <p>Sorry, we can't deliver that far.</p>}
      {canDeliver && <button onClick={() => alert("Thanks for your order! Visit again.")}>Pay Now</button>}
    </div>
  );
}

function AboutUs({ setPage }) {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>Website created by <b>Kalp Gandhi</b></p>
      <p>Registration Number: 23BCE0949</p>
      <p>slot: L37+L38+L53+L54</p>
      <p>VIT Vellore</p>
      <button onClick={() => setPage("home")}>Back to Home</button>
    </div>
  );
}

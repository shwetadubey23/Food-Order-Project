
import './App.css';
import Home from './screens/Home'

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Login from './screens/Login'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
          </Routes>
        </div>

      </Router>
    </CartProvider>
  );
}



export default App;


// ___________________________________________________________________________

// import React, { useState } from 'react';

// export default function Card(props) {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedOption, setSelectedOption] = useState(Object.keys(props.options)[0]);
//   const [cartItems, setCartItems] = useState([]);

//   const handleAddToCart = () => {
//     const newItem = {
//       foodName: props.foodName,
//       quantity: quantity,
//       priceOption: selectedOption,
//       totalPrice: props.options[selectedOption] * quantity
//     };

//     setCartItems([...cartItems, newItem]);
//   };

//   return (
//     <div>
//       <div className="card mt-3" style={{ width: "18rem", maxHight: "360px" }}>
//         <img src={props.imgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
//         <div className="card-body">
//           <h5 className="card-title">{props.foodName}</h5>
//           <div className="container w-100">
//             <select className='m-2 h-100 bg-success rounded' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
//               {Array.from(Array(6), (e, i) => (
//                 <option key={i + 1} value={i + 1}>{i + 1}</option>
//               ))}
//             </select>

//             <select className='m-2 h-100 bg-success rounded' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
//               {Object.keys(props.options).map((data) => (
//                 <option key={data} value={data}>{data}</option>
//               ))}
//             </select>
//             <div className='d-inline h-100 fs-5'>Total Price: {props.options[selectedOption] * quantity}</div>
//           </div>
//           <hr />
//           <button className="btn btn-success justify-center ms2" onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// }
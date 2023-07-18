import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const priceRef = useRef()
  let dispatch = useDispatchCart()
  let data = useCart()
  let priceOptions = Object.keys(props.options);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD", id: props.foodItem._id, name: props.foodItem.name,
      price: finalPrice, quantity: quantity, size: size
    })
    console.log(data);
  }
  let finalPrice = quantity * parseInt(props.options[size])
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (

    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHight: "360px" }} >
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="containar w-100">
            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQuantity(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (<option key={i + 1} value={i + 1}>{i + 1} </option>)
              })}
            </select>

            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}> {data}
                </option>
              })}
            </select>
            <div className='d-inline h-100 fs-5'>
             ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms2" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card'


export default function Home() {

    const [search, setSearch] = useState("")
     const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])

    const loadData = async () => {
        let result = await fetch("http://localhost:5000/foodData", {
            method: "POST",
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        })

        result = await result.json();
        setFoodItem(result[0])
        setFoodCat(result[1])
        // console.log(result[0], result[1]);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div> <Navbar /> </div>
            <div> 
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: 'contain !important' }}>
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center ">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch (e.target.value)}} />
              <button className="btn btn-outline-success text-white" type="submit">Search</button>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900×700/?Burger" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "fill" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?food" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "fill" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?ice-cream" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "fill" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        </div>
                 </div>
            <div className='container'>
                {
                    foodCat !== [] ? foodCat.map((data) => {
                        return (<div className='row mb-3'>
                            <div key={data._id} className="fs-3 m-3 " >
                                {data.CategoryName}
                            </div>
                            <hr />
                            {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                .map(filterItems => {
                                    return (
                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3' >
                                            <Card foodItem={filterItems}
                                                options={filterItems.options[0]}
                                                // imgSrc={filterItems.img}   
                                                >
                                            </Card>
                                        </div>
                                    )
                                }
                                ) : <div> No Such Data Found </div>}
                        </div>
                        )
                    }) : ""

                }
            </div>

            <div><Footer /> </div>

        </div>
    )
}
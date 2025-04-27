import React, { useState } from 'react'
import axios from 'axios'

function Products() {

    let [products,setProducts] = useState([])
    async function fetchProducts(){
        let {response} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        .then((response) =>{
            console.log(response.data.data);
            setProducts(response.data.data)
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    return <>
        <h2>abo amk 2bn klb</h2>
    </>
        
    
}

export default Products

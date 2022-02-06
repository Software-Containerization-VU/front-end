import React, { useState, useEffect } from 'react'
import image from './imgs/warehouses.png'
import axios from 'axios'

export default function Inventory() {

    const [items, setItems] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)


    const getInventory = () => {
        axios.get(`${process.env.REACT_APP_API_HOST}/api/product`).then((res) => {
            setItems(res.data)
            console.log(process.env.REACT_APP_API_HOST)
            console.log(items)
        })
    }

    const addItem = () => {
        const post = {"productName": name, "productPrice": price}
        
        axios.post(`${process.env.REACT_APP_API_HOST}/api/product`, post).then((res) => {
            getInventory()
        }).catch((error) => {
            console.log(error)
        })

        setName('')
        setPrice(0)
    }

    const deleteItem = (id) => {
        axios.delete(`${process.env.REACT_APP_API_HOST}/api/product/${id}`).then((res) => {
            getInventory()
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getInventory()
    }, [])

    return <>
    <img src={image} alt='-' className='w-20 h-20 mx-auto'></img>
    <h1 className='text-4xl mb-8'>Inventory Management Group 6</h1>
    <div className='bg-white w-1/2 mx-auto'>
        
        <table className='w-full drop-shadow-md'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
                <tr>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>#</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Item</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Price</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Action</th>
                </tr>
            </thead>
            <tbody>
                {items ? items.map((item) => 
                    <tr className='bg-white' key={item.productId}>
                        <td className='p-3 text-sm text-blue-500 text-left font-bold'>{item.productId}</td>
                        <td className='p-3 text-sm text-gray-700 text-left'>{item.productName}</td>
                        <td className='p-3 text-sm text-gray-700 text-left'>{item.productPrice}</td>
                        <td className='p-3 text-sm text-gray-700 text-left'><button onClick={() => deleteItem(item.productId)}>Remove</button></td>
                    </tr>
                ) : null}
                <tr className='bg-white' key="add">
                    <td className='p-3 text-sm text-blue-500 text-left font-bold'>#</td>
                    <td className='p-3 text-sm text-gray-700 text-left'>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='E.g. White Shirt' required></input>
                    </td>
                    <td className='p-3 text-sm text-gray-700 text-left'>
                        <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='12' required></input>
                    </td>
                    <td className='p-3 text-sm text-gray-700 text-left'>
                        <button onClick={() => addItem()}>Add</button>
                    </td>
                </tr>
            </tbody>
        </table>
       
    </div>
    </>;
}

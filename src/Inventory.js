import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import image from './imgs/warehouses.png'

export default function Inventory() {

    const [items, setItems] = useState()
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState()

    const getInventory = () => {
        Axios.get("http://10.152.183.25:8081/inventory/api/v1.0/books").then((res) => {
            console.log(res.data.books)
            setItems(res.data.books)
        })
    }

    const addItem = (e) => {
        e.preventDefault()
        // post request
        console.log(name)
        console.log(quantity)
        setName('')
        setQuantity('')
    }

    useEffect(() => {
        getInventory()
    }, [])

    return <>
    <img src={image} alt='-' className='w-20 h-20 mx-auto'></img>
    <h1 className='text-4xl mb-8'>Inventory Management</h1>
    <div className='bg-white w-1/2 mx-auto'>
        <form onSubmit={(e) => addItem(e)}>
        <table className='w-full drop-shadow-md'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
                <tr>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>#</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Item</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Quantity</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Action</th>
                </tr>
            </thead>
            <tbody>
                {items ? items.map((item) => 
                    <tr className='bg-white' key={item.id}>
                        <td className='p-3 text-sm text-blue-500 text-left font-bold'>{item.id}</td>
                        <td className='p-3 text-sm text-gray-700 text-left'>{item.title}</td>
                        <td className='p-3 text-sm text-gray-700 text-left'>{item.quantity}</td>
                        <td className='p-3 text-sm text-gray-700 text-left'><button>Remove</button></td>
                    </tr>
                ) : null}
                <tr className='bg-white'>
                    <td className='p-3 text-sm text-blue-500 text-left font-bold'>#</td>
                    <td className='p-3 text-sm text-gray-700 text-left'>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of Product' required></input>
                    </td>
                    <td className='p-3 text-sm text-gray-700 text-left'>
                        <input type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Quantity' required></input>
                    </td>
                    <td className='p-3 text-sm text-gray-700 text-left'>
                        <button type='submit'>Add</button>
                    </td>
                </tr>
            </tbody>
        </table>
        </form>
    </div>
    </>;
}

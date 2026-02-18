"use client"
import { SearchSchema } from '@/src/schema'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

export default function ProductSearchForm() {
    const handleSearchForm= (formData:FormData)=>{
        const data = {search:formData.get("search")}
        const result= SearchSchema.safeParse(data)
        console.log(result)
        if(!result.success){
            result.error.issues.forEach((error) =>{
                toast.error(error.message)
            })
            return
        }
        redirect(`/admin/products/search?search=${result.data.search}`)
    }
  return (
    <form action={handleSearchForm} className='flex items-center'>
        <input type="text"  placeholder='Buscar Producto' className='p-2 placeholder-gray-400 w-full' name='search'/>
        <input type="submit" value="Buscar" className='bg-indigo-600 cursor-pointer uppercase p-2 text-white' />
    </form>
)
}

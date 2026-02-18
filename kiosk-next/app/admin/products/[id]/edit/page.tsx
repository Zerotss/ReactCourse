import EditProductForm from '@/components/products/EditProductForm'
import ProductForm from '@/components/products/ProductForm'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
async function getProductById(id:number) {
    const product= await prisma.product.findUnique({
        where:{
            id
        }
    })
    return product
}
export default async function EditProductsPage({params}:{ params: Promise<{ id: string }>}) {
    const productId= (await params).id
    const product = await getProductById(Number(productId))
    if(!product){
        notFound()
    }
  return (
    <>
    <Heading>Editar Producto: {product.name}</Heading>
    <Link href={"/admin/products"} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">Volver</Link>

    <EditProductForm>
        <ProductForm product={product}/>
    </EditProductForm>
    </>
  )
}

import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductTable from '@/components/products/ProductsTable'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import React from 'react'
async function searchProducts(searchTerm:string) {
    const products= await prisma.product.findMany({
        where:{
            name:{
                contains:searchTerm,
                mode:"insensitive"
            }
        },
        include:{
            category:true
        }
    })
    return products
}
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ search: string }> }) {
    const param = await searchParams
    const products= await searchProducts(param.search)
    return (
        <>
            <Heading>Resultados de busqueda: {param.search}</Heading>
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
                <ProductSearchForm/>
            </div>
            {products.length===0 ? <p>No hay resultados</p>:(
                <ProductTable products={products}/>
            )}
            
        </>
    )
}

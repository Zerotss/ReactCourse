"use client"
import { Category } from "@/src/generated/prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
type CategoryIconProps = {
  category: Category
}

export default function CategoryIcon({category}:CategoryIconProps) {
  const params = useParams<{ category: string }>()
  return (
    <>
      <div className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b ${category.slug===params.category? 'bg-amber-400' : ''}`}>
        <div className="relative size-16">
            <Image src={`/icon_${category.slug}.svg`} alt={`Imagen de la categoría:${category.name}`} fill/>
        </div>
        <Link href={`/order/${category.slug}`} className="text-lg font-bold">{category.name}</Link>
      </div>
    </>
  )
}

import { formatCurrency } from "@/lib/utils"
import { Bath, Bed, Square } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PropertyFeatures {
  bedrooms: number
  bathrooms: number
  area: number
}

interface PropertyProps {
  id: number
  title: string
  type: "rent" | "sale"
  price: number
  location: string
  image: string
  description: string
  features: PropertyFeatures
}

export default function PropertyCard({ property }: { property: PropertyProps }) {
  const { id, title, type, price, location, image, description, features } = property

  return (
    <div className="bg-blue-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          {type === "rent" ? "Aluguel" : "Venda"}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className="font-bold text-lg text-white">{title}</h3>
          <p className="text-blue-200 text-sm">{location}</p>
        </div>

        <p className="text-blue-100 text-sm mb-4 flex-1">{description}</p>

        <div className="flex justify-between items-center text-blue-200 text-sm mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{features.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{features.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{features.area}m²</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-bold text-white">
            {type === "rent" ? `R$ ${formatCurrency(price)}/mês` : `R$ ${formatCurrency(price)}`}
          </p>
          <Link
            href={`/imoveis/${type === "rent" ? "alugar" : "comprar"}/${id}`}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Detalhes
          </Link>
        </div>
      </div>
    </div>
  )
}


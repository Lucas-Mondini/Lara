"use client"

import PropertyCard from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

// Mock data - this would be replaced by your API
const generateMockProperties = (start: number, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const id = start + i
    const isRent = Math.random() > 0.5
    return {
      id,
      title: `${isRent ? "Apartamento" : "Casa"} ${id}`,
      type: isRent ? "rent" : "sale",
      price: isRent ? Math.floor(Math.random() * 3000) + 1000 : Math.floor(Math.random() * 900000) + 300000,
      location: ["São Paulo", "Rio de Janeiro", "Curitiba", "Florianópolis", "Porto Alegre"][
        Math.floor(Math.random() * 5)
      ],
      image: `/placeholder.svg?height=200&width=300&text=Imóvel+${id}`,
      description: `Excelente ${isRent ? "apartamento" : "casa"} em localização privilegiada.`,
      features: {
        bedrooms: Math.floor(Math.random() * 3) + 1,
        bathrooms: Math.floor(Math.random() * 2) + 1,
        area: Math.floor(Math.random() * 100) + 50,
      },
    }
  })
}

export default function Properties() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [properties, setProperties] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)
  const ITEMS_PER_PAGE = 12

  // Initial load
  useEffect(() => {
    setProperties(generateMockProperties(1, ITEMS_PER_PAGE))
  }, [])

  // Load more data when scrolling
  useEffect(() => {
    if (page > 1) {
      setLoading(true)
      // Simulate API delay
      setTimeout(() => {
        const newProperties = generateMockProperties((page - 1) * ITEMS_PER_PAGE + 1, ITEMS_PER_PAGE)
        setProperties((prev) => [...prev, ...newProperties])
        setLoading(false)
      }, 800)
    }
  }, [page])

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      { threshold: 1.0 },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [loading])

  return (
    <div className="flex min-h-screen flex-col bg-blue-900 text-white overflow-x-hidden">
      <header className="border-b border-blue-700">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            LARA
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/imoveis" className="text-sm font-medium hover:underline">
              Imóveis
            </Link>
            <Link href="/anunciar" className="text-sm font-medium hover:underline">
              Anunciar
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/favoritos" className="text-sm font-medium hover:underline hidden md:block">
              Favoritos
            </Link>
            <Button variant="outline" size="sm" asChild className="text-white border-white bg-blue-800 hover:bg-blue-700">
              <Link href="/entrar">Entrar</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-blue-800">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Encontre o que você procura
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Imóveis em um só lugar. Conectando compradores, vendedores, locadores e locatários de forma prática.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="O que você está procurando?"
                    className="w-full bg-white pl-8 pr-4 py-2 rounded-md border text-gray-900"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">Buscar</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-blue-900">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8 text-white">Imóveis para alugar</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div ref={loaderRef} className="flex justify-center items-center py-8">
              {loading && (
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="mt-2 text-blue-200">Carregando mais imóveis...</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


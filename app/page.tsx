import Header from "@/components/header"
import LuxuryHeader from "@/components/luxury-header"
import Hero from "@/components/hero"
import Categories from "@/components/categories"
import Products from "@/components/products"
import PromotionalBanners from "@/components/promotional-banners"
import CustomerReviews from "@/components/customer-reviews"
import { DesignStories } from "@/components/design-stories"
import Footer from "@/components/footer"
import WhyChooseUs from "@/components/why-choose-us"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <LuxuryHeader />
      <Header />
      
      <Hero />
      <PromotionalBanners />
      <Categories />
      <Products />
      <DesignStories />
      <div className="md:bg-[#f7f4ee] md:pt-8">
        <CustomerReviews />
      </div>
      <WhyChooseUs />
      <Footer />
    </main>
  )
}

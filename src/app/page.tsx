import HeroSection from "@/components/store/home/HeroSection";
import MaxWidthWrapper from "@/components/store/home/MaxWidthWrapper";
import Navbar from "@/components/store/home/Navbar";
import SearchBar from "@/components/store/home/SearchBar";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <section>
        <Navbar />
        <HeroSection />
        <SearchBar />
      </section>
    </MaxWidthWrapper>
  );
}

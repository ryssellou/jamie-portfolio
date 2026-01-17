import ArchitectureScroll from "@/components/ArchitectureScroll";
import Navigation from "@/components/Navigation";
import PortfolioContent from "@/components/PortfolioContent";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navigation />
            <ArchitectureScroll />
            <PortfolioContent />
        </main>
    );
}

import Navbar from "../../../components/common/navbar"; 
import Footer from "../../../components/common/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-amber-50 text-black py-20">
        <div className="text-lg text-center grid space-y-4">
          <h3 className="font-bold text-4xl pb-4 text-red-500">Events</h3>
          
        </div>
      </main>
      <Footer />
    </>
  );

}
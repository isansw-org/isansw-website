import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import Profile from "./_components/profile";

export default function Home() {
    return (
        <section className="bg-amber-50">
            <Navbar />
            <div className="bg-amber-50 text-red-500 text-center py-12 px-6">
                <h1 className="text-4xl font-bold">Presenting the ISANSW Committee</h1>
                <h4 className="font-bold py-5">Batch of 2025 - 2026</h4>
                <div className="w-full border-t-4 border-red-500 mx-auto max-w-xs my-4" />
                <p className="text-lg text-black font-semibold">Executives</p>
            </div>

            <main className="bg-amber-50 text-black py-10 px-4 max-w-6xl mx-auto">
                {/* Filter button */}
                <button className="top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-300">
                    <a href="">Filter</a>
                </button>

                {/* PRESIDENT centered */}
                <div className="flex justify-center mb-10">
                    <Profile
                        name="David Jefferson Santoso"
                        role="President"
                        imageSrc="/images/profiles/david-santoso.jpg"
                        instagramUrl="https://instagram.com/"
                        linkedinUrl="https://linkedin.com/in/"
                    />
                </div>

                {/* ROW 1: 3 VPs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
                    <Profile
                        name="Elisha Honoris"
                        role="VP Internal"
                        imageSrc="/images/profiles/elisha-honoris.jpg"
                        instagramUrl="https://instagram.com/"
                        linkedinUrl="https://linkedin.com/in/"
                    />
                    <Profile
                        name="Dave Sebastian Setiawan"
                        role="VP Operation"
                        imageSrc="/images/profiles/dave-setiawan.jpg"
                        instagramUrl="https://instagram.com/"
                        linkedinUrl="https://linkedin.com/in/"
                    />
                    <Profile
                        name="Pius Gabriel"
                        role="VP External"
                        imageSrc="/images/profiles/pius-gabriel.jpg"
                        instagramUrl="https://instagram.com/"
                        linkedinUrl="https://linkedin.com/in/"
                    />
                </div>

                {/* ROW 2: Secretary + Treasurer */}
                <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <Profile
                        name="Karina Gabriela Sutrisna"
                        role="Secretary"
                        imageSrc="/images/profiles/karina-sutrisna.jpg"
                        instagramUrl="https://instagram.com/"
                        linkedinUrl="https://linkedin.com/in/"
                    />
                    <div className="pl-4">
                    <Profile
                        name="Davin Najanurdin"
                        role="Treasurer"
                        imageSrc="/images/profiles/davin-najanurdin.jpg"
                        instagramUrl="https://instagram.com/"
                        linkedinUrl="https://linkedin.com/in/"
                    />
                    </div>
                </div>
                </div>
            </main>

            <Footer />
        </section>
    );
}

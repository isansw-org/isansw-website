import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import Image, { type StaticImageData } from "next/image";

type Member = {
  title: string;
  name: string;
  image: string | StaticImageData;
};

const Card = ({ title, name, image }: Member) => (
  <div className="w-full max-w-xs rounded-xl bg-white p-3 text-center shadow">
    {/* Force a consistent image ratio for equal card heights */}
    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md">
      <Image src={image} alt={name} fill className="object-cover" />
    </div>

    <div className="mt-2">
      <p className="uppercase text-xs font-bold tracking-wide text-red-700">
        {title}
      </p>
      <p className="font-medium">{name}</p>
    </div>
  </div>
);

export default function Committees() {
  return (
    <section className="bg-amber-50 min-h-screen">
      <Navbar />

      {/* Header (reduced bottom padding) */}
      <div className="bg-amber-50 text-red-500 text-center pt-12 pb-4 px-6">
        <h1 className="text-4xl font-bold">Presenting the ISANSW Committee</h1>
        <h4 className="font-bold py-5">Batch of 2025 - 2026</h4>
        <div className="mx-auto my-2 w-full max-w-xs border-t-4 border-red-500" />
      </div>

      <main className="mx-auto max-w-6xl bg-amber-50 px-4 pt-4 pb-16 text-black space-y-12">
        {/* Executives label now inside main to avoid big gap */}
        <h2 className="text-center text-2xl font-semibold text-black">
          Executives
        </h2>

        {/* President */}
        <div className="flex justify-center">
          <Card
            title="President"
            name="David Jefferson Santoso"
            image="/image/committee/david.JPG"
          />
        </div>

        {/* VPs (3) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
          <Card
            title="VP Internal"
            name="Elisha Honoris"
            image="/image/committee/elisha.JPG"
          />
          <Card
            title="VP Operation"
            name="Dave Sebastian Setiawan"
            image="/image/committee/daves.JPG"
          />
          <Card
            title="VP External"
            name="Pius Gabriel"
            image="/image/committee/pius.JPG"
          />
        </div>

        {/* Secretary & Treasurer (2) */}
        <div className="flex flex-wrap justify-center gap-6">
          <Card
            title="Secretary"
            name="Karina Gabriela Sutrisna"
            image="/image/committee/karina.JPG"
          />
          <Card
            title="Treasurer"
            name="Davin Najanurdin"
            image="/image/committee/davin.JPG"
          />
        </div>

        {/* Webmaster */}
        <div className="text-center">
          <h2 className="mb-6 text-xl font-bold text-red-700">Webmaster</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            <Card
              title="Director"
              name="Abyan Majid"
              image="/image/committee/abyan.JPG"
            />
            <Card
              title="Co-Director"
              name="Jennifer Soetedjo"
              image="/image/committee/jennifer.JPG"
            />
            <Card
              title="Committee"
              name="Fiona Lee"
              image="/image/committee/fiona.JPG"
            />
            <Card
              title="Committee"
              name="Jason Chandra"
              image="/image/committee/jason.JPG"
            />
          </div>
        </div>

        {/* Fundraiser */}
        <div className="text-center">
          <h2 className="mb-6 text-xl font-bold text-red-700">Fundraiser</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            <Card
              title="Director"
              name="Fairy Dior Richtan"
              image="/image/committee/fairy.JPG"
            />
            <Card
              title="Committee"
              name="Aurelio Jonathan"
              image="/image/committee/aurelio.JPG"
            />
            <Card
              title="Committee"
              name="Chrisella Anastasia"
              image="/image/committee/chrisella.JPG"
            />
            <Card
              title="Committee"
              name="Bennedicta Mishka Natakusumah"
              image="/image/committee/mishka.JPG"
            />
            <Card
              title="Committee"
              name="Muhammad Alfaren Raisya Lesma"
              image="/image/committee/alfaren.JPG"
            />
            <Card
              title="Committee"
              name="Alghiyas Shafaqa"
              image="/image/committee/alghiyas.JPG"
            />
            <Card
              title="Committee"
              name="Jayson Earvin Weliyanto"
              image="/image/committee/jayson.JPG"
            />
          </div>
        </div>

        {/* Sponsorship */}
        <div className="text-center">
          <h2 className="mb-6 text-xl font-bold text-red-700">Sponsorship</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            <Card
              title="Director"
              name="Rafael Bisawan"
              image="/image/committee/rafael.JPG"
            />
            <Card
              title="Co-Director"
              name="Darren Verrel Kumala"
              image="/image/committee/darren.JPG"
            />
            <Card
              title="Committee"
              name="Jonathan Chandra"
              image="/image/committee/jonathan.JPG"
            />
            <Card
              title="Committee"
              name="Caesar Ehrlich Sampurna Achmad"
              image="/image/committee/elrich.JPG"
            />
            <Card
              title="Committee"
              name="Greta Clarabel Valeria"
              image="/image/committee/greta.JPG"
            />
          </div>
        </div>

        {/* Communication */}
        <div className="text-center">
          <h2 className="mb-6 text-xl font-bold text-red-700">Communication</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            <Card
              title="Director"
              name="Giorgia Soen"
              image="/image/committee/georgia.JPG"
            />
            <Card
              title="Committee"
              name="Sophie Kennieta Iskandarsjah"
              image="/image/committee/sophie.JPG"
            />
            <Card
              title="Committee"
              name="Jessica Dwinasya Permata Huseno"
              image="/image/committee/jessica.JPG"
            />
            <Card
              title="Committee"
              name="Muhammad Hilal Ariq"
              image="/image/committee/hilal.JPG"
            />
          </div>
        </div>

        {/* Design */}
        <div className="text-center">
          <h2 className="mb-6 text-xl font-bold text-red-700">Design</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            <Card
              title="Director"
              name="Nur Fadiyah Makareem"
              image="/image/committee/fay.JPG"
            />
            <Card
              title="Committee"
              name="Janice Athalia Wibowo"
              image="/image/committee/janice.JPG"
            />
            <Card
              title="Committee"
              name="Vania"
              image="/image/committee/vania.JPG"
            />
            <Card
              title="Committee"
              name="Grace Florencia Joshelyn Simen"
              image="/image/committee/grace.JPG"
            />
          </div>
        </div>

        {/* Outreach */}
        <div className="text-center">
          <h2 className="mb-6 text-xl font-bold text-red-700">Outreach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            <Card
              title="Director"
              name="Tricia Winter"
              image="/image/committee/winter.JPG"
            />
            <Card
              title="Committee"
              name="Hisyam Nailul Alim"
              image="/image/committee/hisyam.JPG"
            />
            <Card
              title="Committee"
              name="Hubert Japarif"
              image="/image/committee/hubert.JPG"
            />
            <Card
              title="Committee"
              name="Celine Angelica"
              image="/image/committee/celine.JPG"
            />
            <Card
              title="Committee"
              name="Ngui Zealand"
              image="/image/committee/ngui.JPG"
            />
            <Card
              title="Committee"
              name="Ansell Angouw"
              image="/image/committee/ansel.JPG"
            />
            <Card
              title="Committee"
              name="Keenan Marvelian Gunawan"
              image="/image/committee/keanan.JPG"
            />
            <Card
              title="Committee"
              name="Chanson Davechrysthoper"
              image="/image/committee/chanson.JPG"
            />
          </div>
        </div>

        {/* Human Resources */}
        <div className="text-center">
          <h2 className="mb-6 text-xl font-bold text-red-700">
            Human Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            <Card
              title="Director"
              name="Keira Hanjaya"
              image="/image/committee/keira.JPG"
            />
            <Card
              title="Committee"
              name="Evelyne Christina Welly"
              image="/image/committee/evelyn.JPG"
            />
            <Card
              title="Committee"
              name="Surya Fathurrahman Acton"
              image="/image/committee/acton.JPG"
            />
            <Card
              title="Committee"
              name="Aaron Kurniawan"
              image="/image/committee/aaron.JPG"
            />
          </div>
        </div>
      </main>

      <Footer />
    </section>
  );
}

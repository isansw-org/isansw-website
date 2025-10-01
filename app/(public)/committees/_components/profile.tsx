import { FaInstagram, FaLinkedin } from "react-icons/fa";

type ProfileProps = {
  name: string;
  role: string;
  imageSrc: string;
  instagramUrl?: string;
  linkedinUrl?: string;
};

export default function Profile({
  name,
  role,
  instagramUrl,
  linkedinUrl,
}: ProfileProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-64 text-center space-y-2">
      <h3 className="text-sm font-bold text-left">{role}</h3>
      {/* 
      <div className="w-full h-80 relative rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={`${name}'s photo`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      */}
      <div className="flex justify-center gap-4 mt-2">
        {instagramUrl && (
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-black text-2xl" />
          </a>
        )}
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-black text-2xl" />
          </a>
        )}
      </div>
      <p className="text-sm font-semibold">{name}</p>
    </div>
  );
}

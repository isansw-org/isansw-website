"use client";

import { FaInstagram, FaLinkedin } from "react-icons/fa";

type ProfileProps = {
  name: string;
  role: string;
  imageSrc?: string; // kept for future use
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
    <div className="w-64 rounded-2xl bg-white p-4 text-center shadow-lg">
      <h3 className="text-left text-sm font-bold">{role}</h3>

      {/* Photo placeholder intentionally omitted for now */}

      <div className="mt-2 flex justify-center gap-4">
        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on Instagram`}
          >
            <FaInstagram className="text-2xl text-black" />
          </a>
        )}
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
          >
            <FaLinkedin className="text-2xl text-black" />
          </a>
        )}
      </div>

      <p className="mt-1 text-sm font-semibold">{name}</p>
    </div>
  );
}

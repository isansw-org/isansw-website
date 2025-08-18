import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaGlobe,
  FaTiktok,
} from "react-icons/fa";
import type { IconType } from "react-icons";

export type Branch = {
  name: string;
  president?: string;
  contactEmail?: string;

  website?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;

  logo?: string; // e.g. "/image/branches/macquarie.png"
};

type Social = { href?: string; Icon: IconType; label: string };

export default function BranchCard({
  name,
  president,
  contactEmail,
  website,
  instagram,
  facebook,
  linkedin,
  youtube,
  tiktok,
  logo = "/image/placeholder.png",
}: Branch) {
  const socials: Social[] = [
    { href: instagram, Icon: FaInstagram, label: "Instagram" },
    { href: facebook, Icon: FaFacebookF, label: "Facebook" },
    { href: tiktok, Icon: FaTiktok, label: "TikTok" },
    { href: website, Icon: FaGlobe, label: "Website" },
    { href: youtube, Icon: FaYoutube, label: "YouTube" },
    { href: linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
  ];

  return (
    <div className="rounded-[16px] border-2 border-red-300 bg-white p-4 md:p-5 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-[200px_1fr] md:grid-cols-[220px_1fr] gap-6">
        {/* Logo box (bigger) */}
        <div className="relative h-[180px] w-[180px] md:h-[200px] md:w-[200px] overflow-hidden rounded-[14px] bg-white ring-1 ring-red-200">
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            className="object-contain p-2"
            sizes="(min-width: 768px) 140px, 120px"
          />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h3 className="text-[18px] md:text-[28px] font-semibold text-red-600 leading-6">
            {name}
          </h3>

          {/* President & Email text set to text-lg */}
          <div className="mt-3 space-y-1 text-xl text-black/90">
            {president && (
              <p>
                <span className="font-semibold">President:</span> {president}
              </p>
            )}
            {contactEmail && (
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href={`mailto:${contactEmail}`} className="underline">
                  {contactEmail}
                </a>
              </p>
            )}
          </div>

          {/* Socials row (bigger buttons & icons) */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {socials
              .filter((s) => !!s.href)
              .map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-15 w-15 items-center justify-center rounded-full 
             bg-white text-black shadow-[0_1px_0_rgba(0,0,0,0.06)] 
             ring-1 ring-black/10 transition 
             hover:bg-red-500 hover:text-white"
                >
                  <Icon size={30} />
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

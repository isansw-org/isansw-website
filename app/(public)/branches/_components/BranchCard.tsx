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
    <div className="rounded-[16px] border-2 border-red-300 bg-white p-3 sm:p-4 md:p-6 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
      {/* Stack on mobile; two columns on md+ */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-[minmax(180px,220px)_1fr] md:gap-6">
        {/* Logo box (centered on mobile) */}
        <div className="relative mx-auto h-[110px] w-[110px] sm:h-[130px] sm:w-[130px] md:h-[200px] md:w-[200px] overflow-hidden rounded-[14px] bg-white ring-1 ring-red-200">
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            className="object-contain p-2"
            sizes="(min-width: 768px) 200px, (min-width: 640px) 130px, 110px"
            priority={false}
          />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h3 className="text-[16px] sm:text-[18px] md:text-[28px] font-semibold text-red-600 leading-tight">
            {name}
          </h3>

          {/* President & Email */}
          <div className="mt-2 sm:mt-3 space-y-1 text-sm sm:text-base text-black/90 md:text-xl">
            {president && (
              <p>
                <span className="font-semibold">President:</span> {president}
              </p>
            )}
            {contactEmail && (
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="underline break-all"
                >
                  {contactEmail}
                </a>
              </p>
            )}
          </div>

          {/* Socials row */}
          <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-2.5 md:mt-5">
            {socials
              .filter((s) => !!s.href)
              .map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-full
                             bg-white text-black shadow-[0_1px_0_rgba(0,0,0,0.06)]
                             ring-1 ring-black/10 transition
                             hover:bg-red-500 hover:text-white
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  <Icon className="md:hidden" size={22} />
                  <Icon className="hidden md:block" size={28} />
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
//import isaLogo from "@/components/images/isa_logo.png";

export default function Footer() {
  return (
    <footer className="bg-red-500 text-amber-50 px-6 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
        {/* Logo */}
        {/* 
        <div className="flex flex-col items-start">
          <Image src={isaLogo} alt="ISANSW logo" width={120} height={50} />
        </div>
        */}

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/branches">Branches</Link></li>
            <li><Link href="/sponsors">Sponsors</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold mb-2">Contact Us</h3>
          <ul className="space-y-1">
            <li><Link href="/contact">Inquiry</Link></li>
            <li><Link href="/partners">Contact Our Partners</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between items-center text-xs gap-2">
        <p>&copy; {new Date().getFullYear()} ISANSW. All rights reserved.</p>
        <div className="space-x-4">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms and Conditions</Link>
        </div>
      </div>
    </footer>
  );
}

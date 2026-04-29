import { Link } from "react-router-dom";
import { PhoneIcon, MailIcon, LocateIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-3">
            Khadon Tech Store
          </h2>
          <p className="text-sm leading-6">
            Your trusted shop for laptops and accessories in Uganda. Quality
            products, best prices, fast delivery.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={"/"} className="hover:text-emerald-400">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/"} className="hover:text-emerald-400">
                All Products
              </Link>
            </li>
            <li>
              <Link to={"/"} className="hover:text-emerald-400">
                Laptops
              </Link>
            </li>
            <li>
              <Link to={"/"} className="hover:text-emerald-400">
                Accessories
              </Link>
            </li>
            <li>
              <Link to={"/info"} className="hover:text-emerald-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={"/faq"} className="hover:text-emerald-400">
                FAQ
              </Link>
            </li>
            <li>
              <Link to={"/returns"} className="hover:text-emerald-400">
                Returns Policy
              </Link>
            </li>
            <li>
              <Link to={"/delivery"} className="hover:text-emerald-400">
                Delivery Information
              </Link>
            </li>
            <li>
              <Link to={"/privacy"} className="hover:text-emerald-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to={"/terms"} className="hover:text-emerald-400">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Tel: +256 740 048604</li>
            <li>
              <a
                href="https://wa.me/+256740048604"
                className="hover:text-emerald-400"
              >
                WhatsApp
              </a>
            </li>
            <li>
              Email:
              <a
                href="mailto:khadontechs@gmail.com"
                className="hover:text-emerald-400"
              >
                khadontechs@gmail.com
              </a>
            </li>
            <li>Location: Along Kampala road, EM plaza lv.1 shop no. 304A</li>
          </ul>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 mt-4">
            <a
              href="https://www.instagram.com/khadontech"
              className="hover:text-emerald-400 text-sm"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/khadontech"
              className="hover:text-emerald-400 text-sm"
            >
              Facebook
            </a>
            <a
              href="https://www.x.com/khadontech"
              className="hover:text-emerald-400 text-sm"
            >
              X
            </a>
            <a
              href="https://www.tiktok.com/khadontech"
              className="hover:text-emerald-400 text-sm"
            >
              Tiktok
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Khadon Tech Store {"(UG)"}. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;

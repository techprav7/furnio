import { useState } from "react";
import api from "../utils/api";

function Footer() {
  const [email, setEmail] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [subError, setSubError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubMsg("");
    setSubError("");

    if (!email) {
      setSubError("Please enter your email");
      return;
    }

    try {
      const data = await api("/api/newsletter", {
        method: "POST",
        body: { email },
      });
      setSubMsg(data.message);
      setEmail("");
      setTimeout(() => setSubMsg(""), 5000);
    } catch (error) {
      setSubError(error.message);
      setTimeout(() => setSubError(""), 5000);
    }
  };

  return (
    <div className="footer px-4 overflow-x-hidden text-sm">
      <hr className="my-4 sm:my-6 border-t-2 border-gray-300" />

      <div className="footer-wrapper flex flex-col lg:flex-row lg:justify-center items-center lg:items-start gap-6 lg:gap-0 leading-relaxed sm:leading-loose">
        {/* Address */}
        <div className="firstpart text-center lg:text-left mb-4 lg:mb-0 lg:mr-16 xl:mr-24">
          <h3 className="mb-1 sm:mb-4 text-base sm:text-xl">Furnio.</h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-snug">
            400 University Drive Suite 200 Coral <br />
            Gables, <br />
            FL 33134 USA
          </p>
        </div>

        {/* Links & Help */}
        <div className="flex flex-row justify-center gap-8 mb-4 lg:mb-0 lg:flex-col lg:mr-16 xl:mr-24">
          {/* Links */}
          <div className="secondpart text-center lg:text-left">
            <ul>
              <li className="mb-1 sm:mb-4 font-semibold text-gray-400 text-xs sm:text-sm">Links</li>
              <li className="mb-1 sm:mb-2 font-semibold"><a href="/" className="text-black">Home</a></li>
              <li className="mb-1 sm:mb-2 font-semibold"><a href="/shop" className="text-black">Shop</a></li>
              <li className="mb-1 sm:mb-2 font-semibold"><a href="/blog" className="text-black">Blog</a></li>
              <li className="font-semibold"><a href="/contact" className="text-black">Contact</a></li>
            </ul>
          </div>

          {/* Help */}
          <div className="thirdpart text-center lg:text-left">
            <ul>
              <li className="mb-1 sm:mb-4 font-semibold text-gray-400 text-xs sm:text-sm">Help</li>
              <li className="mb-1 sm:mb-2 font-semibold"><a href="#" className="text-black">Payment Options</a></li>
              <li className="mb-1 sm:mb-2 font-semibold"><a href="#" className="text-black">Returns</a></li>
              <li className="font-semibold"><a href="#" className="text-black">Privacy Policies</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="forthpart text-center lg:text-left mb-6 lg:mb-0">
          <ul>
            <li className="mb-1 sm:mb-4 font-semibold text-gray-400 text-xs sm:text-sm">Newsletter</li>
            <li>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 items-center sm:items-start w-full">
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-b border-black outline-none px-2 py-1 w-64 max-w-full text-xs sm:text-sm"
                />
                <button type="submit" className="border-b border-black font-semibold px-3 py-1 text-xs sm:text-sm hover:text-[#B88E2F] transition-colors">
                  SUBSCRIBE
                </button>
              </form>
              {subMsg && <p className="text-green-600 text-xs mt-1">{subMsg}</p>}
              {subError && <p className="text-red-500 text-xs mt-1">{subError}</p>}
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full sm:w-[80%] mx-auto text-center">
        <hr className="my-4 sm:my-6 border-t-2 border-gray-300" />
        <div className="copyright mb-6 sm:mb-10 mt-2 text-gray-400 text-xs sm:text-sm">
          <h6>© 2025 Furnio | Developed by Praver Jain</h6>
        </div>
      </div>
    </div>
  );
}

export default Footer;

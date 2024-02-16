"use client";
import React from "react";
import Image from "next/image";
import { Navbar } from "flowbite-react";

const Header = () => {
  /* JSON-LD */
  const jsonld = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "Bank IFSC Finder and ATM Locator",
    url: "https://www.yourwebsite.com",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://www.yourwebsite.com/getquickifsc?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    hasPart: [
      {
        "@type": "SiteNavigationElement",
        name: "Home",
        url: "https://www.yourwebsite.com/",
      },
      {
        "@type": "SiteNavigationElement",
        name: "About",
        url: "https://www.yourwebsite.com/about",
      },
      {
        "@type": "SiteNavigationElement",
        name: "Contact",
        url: "https://www.yourwebsite.com/contact",
      },
    ],
  };

  /* Main */
  return (
    <div>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      {/* Main Body */}
     <Navbar fluid rounded className=" justify-content-center ">
        <Navbar.Brand className="" href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Bank IFSC Finder
          </span>
        </Navbar.Brand>

        <div className="ml-auto">
          <Image
            src="/magnify.png"
            height={50}
            width={50}
            alt="magnify"
            style={{ cursor: "pointer" }}
          />
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Link className="text-lg ml-2" href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link className="text-lg" href="#">
            About
          </Navbar.Link>
          <Navbar.Link className="text-lg" href="#">
            Contact
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

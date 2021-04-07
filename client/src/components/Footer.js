import React from "react";
import CYFLogo from "../assets/cyf_brand.png";

const Footer = () => {
  return (
    <div className="flex justify-around px-5 py-3 mt-5 lg:max-h-24 bg-yellow-200">
      <div className="w-4/12 py-2 text-center lg:w-3/12">
        <h4 className="mb-1 font-bold">Developers</h4>
        <ul className="flex flex-col lg:flex-row justify-between">
          <li className="px-1">Fatma</li>
          <li className="px-1">Hacer</li>
          <li className="px-1">Mawaddah</li>
          <li className="px-1">Nataliah</li>
          <li className="px-1">Samuel</li>
        </ul>
      </div>
      <div className="flex flex-col justify-center px-10">
        <p className="text-center text-lg">
          A dashboard for Maryhill Integration Network that staff can use to
          better track, and support service users and volunteers created by
          CodeYourFuture Students
        </p>
      </div>
      <div className="flex w-4/12 lg:w-3/12">
        <a className="flex justify-around" href="https://codeyourfuture.io">
          <img
            className="object-contain"
            src={CYFLogo}
            alt="Code Your Future Logo"
          ></img>
        </a>
      </div>
    </div>
  );
};

export default Footer;

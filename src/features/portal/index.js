import React from "react";
import {
  faArrowRight,
  faBank,
  faHouseMedicalFlag,
  faPrescriptionBottleMedical,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import NavbarLogo from "../../components/logo/navbar";
import DocMacFreeCaptionLogo from "../../components/logo/freeCapLogo";

const PortalModule = () => {
  return (
    <>
      <section className="overflow-hidden bg-portalBg sm:grid sm:grid-cols-2">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <DocMacFreeCaptionLogo />

            <p className="hidden text-base-100 md:mt-4 md:flex text-white">
              Reception is your clinic’s face, your first point of contact.
              docMac manages your appointments, billing and patient’s queues.
              Your patient management made easy.
            </p>

            <div className="mt-4 md:mt-8">
              <a
                href="/login"
                className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>

        <img
          alt="Student"
          src="/banners/digitalPrescriptionBg.png?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-56 w-full object-cover sm:h-full"
        />
      </section>
      <section className="bg-portalBg text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <div className="flex flex-col items-center justify-center">
              <NavbarLogo />
              <h2 className="text-3xl font-bold sm:text-4xl">
                Kickstart your marketing
              </h2>

              <p className="mt-4 text-gray-300">
                docMac E-Prescription shares your clinic google review link and
                gathers more review comments and ratings from patients, this
                improves credibility based market share. docMac empowers low
                cost digital marketing with boosted ads, videos at social media
                platforms.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              <FontAwesomeIcon
                icon={faSquareCheck}
                className="h-10 w-10 text-pink-500"
              />
              <h2 className="mt-4 text-xl font-bold text-white">Front Desk</h2>
              <p className="mt-1 text-sm text-gray-300">
                Makes paper free appointment using Whats app message utilities.
                The docMac adds digital experience for patients registration,
                check-in, doctors prescription with smart cloud service for free
                of cost.
              </p>
            </div>

            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              <FontAwesomeIcon
                icon={faPrescriptionBottleMedical}
                className="h-10 w-10 text-pink-500"
              />
              <h2 className="mt-4 text-xl font-bold text-white">
                e-prescription
              </h2>
              <p className="mt-1 text-sm text-gray-300">
                docMac makes prescription paper smart by sharing a prescription
                via whats app message. The prescription is a dynamic link that
                will be available for ever with secured passcode.
              </p>
            </div>

            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              <FontAwesomeIcon
                icon={faBank}
                className="h-10 w-10 text-pink-500"
              />
              <h2 className="mt-4 text-xl font-bold text-white">
                Accounts + ability + promised
              </h2>
              <p className="mt-1 text-sm text-gray-300">
                docMac manages clinic book keeping, working with billing,
                expenses, reference pay, bonus, inventory and maintainance
                tasks.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/login"
              className="mt-8 inline-flex items-center rounded border border-pink-600 bg-pink-600 px-8 py-3 text-white hover:bg-transparent focus:outline-none focus:ring active:text-pink-500"
            >
              <span className="text-sm font-medium"> Get Started </span>
              <FontAwesomeIcon icon={faArrowRight} className="ml-3 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
      <footer aria-label="Site Footer" className="bg-portalBg">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <DocMacFreeCaptionLogo />
            </div>

            <p className="mt-4 text-center text-sm text-white lg:mt-0 lg:text-right">
              Copyright &copy; 2022. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PortalModule;

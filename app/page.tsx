import PatientForms from "@/components/forms/PatientForms";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* OTP Verification */}
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/main-logo2.svg"
            width={32}
            height={32}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <PatientForms />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-[#76828D] xl:text-left">
              © 2025 PatientPro - copyright (adrianhajdin)
            </p>
            <Link href="/?admmin=true" className="text-[#24AE7C] ">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image 
        src="/assets/images/onboarding-img.png"
        width={900}
        height={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}

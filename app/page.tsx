import PatientForms from "@/components/forms/PatientForms";
import PassKeyModal from "@/components/PassKeyModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal />}

      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/main-logo2.svg"
            width={32}
            height={32}
            alt="logo"
            className="mb-5 h-10 w-fit"
          />

          <PatientForms />

          <div className="text-sm not-italic mt-6.5 flex justify-between">
            <p className="justify-items-end text-[#76828D] xl:text-left">
              © 2025 PatientPro - copyright (adrianhajdin)
            </p>
            <Link href="/?admin=true" className="text-[#24AE7C] ">
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

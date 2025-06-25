import React from "react";
import Image from "next/image";
import Link from "next/link";
import RegisterForms from "@/components/forms/RegisterForms";
import { getUser } from "@/lib/actions/patient.actions";
const Register = async ({params:{userId}}: SearchParamProps) => {
  const user = await getUser(userId)
  return (
    <div className="flex h-screen max-h-screen">


      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/main-logo2.svg"
            width={32}
            height={32}
            alt="logo"
            className="mb-5 h-10 w-fit"
          />

          <RegisterForms user={user} />

          <div className="text-sm not-italic mt-6.5 flex justify-between">
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
        src="/assets/images/register-img.png"
        width={900}
        height={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;

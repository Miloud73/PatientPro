import Image from "next/image";

// import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/main-logo2.svg"
            width={32}
            height={32}
            alt="logo"
            className="mb-5 h-10 w-fit"
          />

          {/* <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          /> */}
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={145}
        width={390}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;

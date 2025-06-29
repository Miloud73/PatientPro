"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormsFields from "../CustomFormsFields";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import {
  getAppointmentSchema,
  CreateAppointmentSchema,
} from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForms";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { createAppointment } from "@/lib/actions/appointment.action";

const AppointmentForm = ({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}) => {
  const AppointementFormValidation = getAppointmentSchema(type);
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointementFormValidation>>({
    resolver: zodResolver(AppointementFormValidation),
    defaultValues: {
      primaryPhysician: "",
      reason: "",
      note: "",
      schedule: new Date(),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointementFormValidation>) {
    setisLoading(true);

    let status;

    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointementData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        const appointement = await createAppointment(appointementData);

        if (appointement) {
          form.reset();
          router.push(
            `patients/${userId}/new-appointment/success?appointement_ID =${appointement.id}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointement";
      break;
    case "create":
      buttonLabel = "Create Appointement";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointement";
      break;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="mb-12 space-y-4">
          <h1 className="text-[32px] font-bold  md:text-[36px]">
            New Appoiintement 👋🏻
          </h1>
          <p className="text-[#ABB8C4]">
            Request a new appointment in a 10 sec
          </p>
        </section>

        {type !== "cancel" && (
          <>
            <CustomFormsFields
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-[#363A3D]"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormsFields>
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormsFields
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointement "
                placeholder="Enter reason for appointement"
              />
              <CustomFormsFields
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Notes"
                placeholder=" Notes"
              />
            </div>
            <CustomFormsFields
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointement date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
          </>
        )}
        {type === "cancel" && (
          <CustomFormsFields
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cencellation"
            placeholder=" Enter reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } cursor-pointer w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;

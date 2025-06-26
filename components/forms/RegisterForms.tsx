"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormsFields from "../CustomFormsFields";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForms";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";

const RegisterForms = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof userFormValidation>) {
    setisLoading(true);

    try {
      const userData = {
        name,
        email,
        phone,
      };
      const newUser = await createUser(userData);
      if (newUser) router.push(`/patients/${newUser.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className=" space-y-4">
          <h1 className="text-[32px] font-bold  md:text-[36px]">Welcome 👋🏻</h1>
          <p className="text-[#ABB8C4]">Let us know more about yourself</p>
        </section>

        <section className=" space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal information</h2>
          </div>

          <CustomFormsFields
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="ex: Adam"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormsFields
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email Address"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormsFields
              fieldType={FormFieldType.PHONE}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="+213 6 123 456 78"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormsFields
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of Birth"
              iconSrc="/assets/icons/calendar.svg"
              iconAlt="datePicker"
            />
            <CustomFormsFields
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormsFields
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />

            <CustomFormsFields
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder=" Software Engineer"
            />
          </div>
             <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormsFields
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormsFields
              fieldType={FormFieldType.PHONE}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="06 1234 56 78"
            />
          </div>
        </section>
         <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>          
          <CustomFormsFields
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
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
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />

            <CustomFormsFields
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormsFields
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomFormsFields
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormsFields
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormsFields
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>

        <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForms;

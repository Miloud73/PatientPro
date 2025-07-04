"use server";

import { ID, Query } from "node-appwrite"
import {InputFile} from "node-appwrite/file"
import { parseStringify } from "../utils";
import {
  NEXT_PUBLIC_BUCKET_ID,
  DATABASE_ID,
  NEXT_PUBLIC_ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";

export const createUser = async (user : CreateUserParams) => {
    try{
        const newUser = await users.create(
            ID.unique() ,
            user.email ,
            user.phone ,
            undefined ,
            user.name
        )
        return parseStringify(newUser);

    }catch(error: any){
        if(error && error?.code === 409){
            const documents = await users.list([
                Query.equal('email' , [user.email])
            ])
            return documents?.users[0]
        }
        console.error("An error occurred while creating a new user:", error);
    }

}

export const getUser = async (userId: string)=>{
    try{
        const user = await users.get(userId)

        return parseStringify(user)
    }catch (error){
        console.log(error)
    }
}

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile);
    }

    console.log(
      {
        id: patient.userId
      }
    )
    
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};

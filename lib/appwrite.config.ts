import 'dotenv/config';
import * as sdk from 'node-appwrite';

export const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT,
} = process.env;

// console.log('Config loaded:', {
//   PROJECT_ID: PROJECT_ID ? 'LOADED' : 'MISSING',
//   API_KEY: API_KEY ? 'LOADED' : 'MISSING'
// });

const client = new sdk.Client();
client.setEndpoint('https://nyc.cloud.appwrite.io/v1').setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);

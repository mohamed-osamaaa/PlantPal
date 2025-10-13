import * as admin from 'firebase-admin';

import {
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class FirebaseNotificationService {
    constructor() {
        if (
            !process.env.FIREBASE_PROJECT_ID ||
            !process.env.FIREBASE_CLIENT_EMAIL ||
            !process.env.FIREBASE_PRIVATE_KEY
        ) {
            throw new Error("Firebase environment variables are missing!");
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID!,
                privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
            }),
        });
    }

    async sendNotification(token: string, title: string, body: string) {
        try {
            await admin.messaging().send({
                token,
                notification: { title, body },
            });
        } catch (error) {
            throw new InternalServerErrorException(`Failed to send notification: ${error.message}`);
        }
    }
}

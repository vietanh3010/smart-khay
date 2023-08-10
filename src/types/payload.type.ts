
export type FaceSearchPayload = {
    file: File,
}

export type OcrPayload = {
    image: File
}

export type WebhookPayload = {
    email: string,
    message: string,
}
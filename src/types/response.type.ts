
export type FaceSearchResponse = {
    code: "200",
    data: FaceSearchItem,
} | {
    code: string,
    data: string,
}

export type FaceSearchItem = {
    id: string,
    name: string,
    similarity: number,
}

export type OcrItem = {
    no: string,
    item: string,
    quantity: string,
    unit_price: string,
    total: string,
}

export type OcrResponse = {
    errorCode: number,
    errorMessage: string,
    data: [
        {
            items: Array<OcrItem>,
            image_link: string,
        }
    ]
}
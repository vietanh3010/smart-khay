

export default class Utils {
    static base64toFile(dataURI: string, fileFormat = 'image/jpeg'): File {

        const byteString = atob(dataURI.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: fileFormat });
        const file = new File([blob], `face_search_image_${new Date().getTime()}.jpg`);
        return file;
    }

    private static priceFormatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'vnd',
    })

    static formatPrice(price: number) {
        return this.priceFormatter.format(price);
    }
}
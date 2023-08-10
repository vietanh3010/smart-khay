

export default class AppConfig {
    static LANG_TOKEN = "lang"
    static WEBHOOK = {
        URL: "https://cfdemo.fci.vn/api/send"
    }
    static FACE_SEARCH = {
        URL: "https://api.fpt.ai/dmp/facesearch/v2/search",
        API_KEY: "bBGHYcSLDfJ64XqJ1OGrs4R80NRwRo7c",
        COLLECTION: "fci-hackathon"
    }
    static OCR = {
        URL: "https://api.fpt.ai/vision/demo/tcb",
        API_KEY: "wsBqUJZHAXXWIPtIN0xn2fulFC162qfH"
    }

    static VOICE = {
        URL: "https://api.fpt.ai/hmi/tts/v5",
        API_KEY: "wsBqUJZHAXXWIPtIN0xn2fulFC162qfH"
    }
}
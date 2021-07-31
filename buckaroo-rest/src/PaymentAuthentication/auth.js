import express from 'express';
// const auth = express.Router();
import CryptoJS from "crypto-js";



const BuckarooHmac = (function () {
    const self = {};

    function getEncodedContent(content) {
        if (content) {
            const md5 = CryptoJS.MD5(content);
            const base64 = CryptoJS.enc.Base64.stringify(md5);
            return base64;
        }

        return content;
    }

    function getHash(websiteKey, secretKey, httpMethod, nonce, timeStamp, requestUri, content) {
        const encodedContent = getEncodedContent(content);

        const rawData = websiteKey + httpMethod + requestUri + timeStamp + nonce + encodedContent;
        const hash = CryptoJS.HmacSHA256(rawData, secretKey);
        const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

        return hashInBase64;
    }

    function getTimeStamp() {
        return Math.floor((new Date).getTime() / 1000);
    }

    function getNonce() {
        var text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 16; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    self.GetAuthHeader = function (requestUri, websiteKey, secretKey, content, httpMethod) {
        const nonce = getNonce();
        const timeStamp = getTimeStamp();
        content = content ? content : "";
        const url = encodeURIComponent(requestUri).toLowerCase();
        return "hmac " + websiteKey + ":" + getHash(websiteKey, secretKey, httpMethod, nonce, timeStamp, url, content) + ":" + nonce + ":" + timeStamp;
    }

    return self;
}());

export default BuckarooHmac;
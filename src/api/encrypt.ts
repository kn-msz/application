import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'encryptlong'
import { JSONValue } from "lossless-json/lib/types/types";

const rsa = {
    // rsa front end
    mePublicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCf0B4Al2wIuGK9Bj9Ao23siR2mMfkvdrxEGu2j0tNeA1LSyKOuw7FLmreRMYLCQMI4BTJNYsxUqvdS8IxFpD5hOx9mx6OqY2GQSIZq5a1lt3Rx4SpDiuuVGm7h5uuLN7bvMfaLBW3g4E5DAKapuZ/u5ULO+y2jczVXkaSb1IjNnwIDAQAB",
    mePrivateKey: "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAJ/QHgCXbAi4Yr0GP0CjbeyJHaYx+S92vEQa7aPS014DUtLIo67DsUuat5ExgsJAwjgFMk1izFSq91LwjEWkPmE7H2bHo6pjYZBIhmrlrWW3dHHhKkOK65UabuHm64s3tu8x9osFbeDgTkMApqm5n+7lQs77LaNzNVeRpJvUiM2fAgMBAAECgYAq4FxcTkPm5wleq4Fm5zIDxxnUUA4J5PJH122wiUy6KWwcL0ZzCf/UR/M+Gil50oQJIaPITVyCzsfCUdVgjdtKL7x8e1dQwlI3/DLEat02Njj4fl6KsMq9EqLyleq0UdgYtevZOOoi+ZKXlqZjkM3yOsbwyu9u0D+s77KfHihwuQJBAODhWKTLywJwSXPC6CvlSoyCjscWgUadk8IN+ELyLq591DYFCQllYQPyMj8Cy0dY5OC9GvwRLZurs9LGi6C9d0UCQQC17a76RNHqmmGKsEEGIx3XIzvDrjSRmE3v+NLMcf+JUaUJiKmedDZeWnJuxIXVmFbHi2bzCb2NXUYqhuXsuJ2TAkBHxSO5VKEx4gxPOcFHYSJtva07tN8FXn0tza+SDiD/54C2zNyZdxWDYOTQX1/pIWHKqA/YqtLXf/EgL+WYI1/RAkAk+RwRgsECo8NlEzLz01kyKtfvicznNgPI3FHC+PwM5UncKSkHqeiOvmT5O/lTEnW4cg1HIVijjSxAYlACDvb/AkBmwlv6+gLoKpCU6h7+J6OxB9GKM2Hjs3Mh5tgXgveCwMg2Knz+RPIj92jq7CLm20xs2654yYnyHc4V+kzr3Zu1",
    // rsa backend
    backPublicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJvCDW9GIBsiv9ma9r2btffIxQQHB98Pl1S2RV2PrQsK1O2yFSUf8P43l5EfAh+jiEn/k5egKEoeMRLdDZkt5afNgPYbNjiRFJP8NZTw4f3Yxp91+d04GGkeFcj59QIn/rqqHo2JLOESNae8IC1tKKQTqkwVIjLRwTIDcVmsq9NwIDAQAB"
}

const aes = {
    iv: "123456789abcdefh",
    key: "",
    encodeKey: ""
}


export function aesEncode(content: string, aesKey: any) {
    let iv = CryptoJS.enc.Utf8.parse(aes.iv);
    aesKey = CryptoJS.enc.Utf8.parse(aesKey);
    let encrypted = CryptoJS.AES.encrypt(content, aesKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

export function aesDecode(encrypted: string, aesKey:any) {
    let iv = CryptoJS.enc.Utf8.parse(aes.iv);
    aesKey = CryptoJS.enc.Utf8.parse(aesKey);
    var decrypted = CryptoJS.AES.decrypt(encrypted, aesKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypted);
}

export function rsaEncode(content: string) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + rsa.backPublicKey + '-----END PUBLIC KEY-----');
    return encrypt.encryptLong(content);
}

export function rsaDecode(content: string) {
    const encrypt = new JSEncrypt();
    encrypt.setPrivateKey(rsa.mePrivateKey);

    return encrypt.decryptLong(content);
}

export function generateKey() {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
}

export function reviver(key:string,value:any) {
    if (value && value.isLosslessNumber) {
        if (Number.isSafeInteger(parseInt(value.value))) {
            return Number(value.value)
        }
        return value.value
    } else {
        return value
    }
}

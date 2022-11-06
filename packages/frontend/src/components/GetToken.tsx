export default function GetToken() {

    const token = localStorage.getItem("backend3-ecom");

    if (token) {
        const decodeJWT = (token: string) => {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace("-", "+").replace("_", "/");
            return JSON.parse(window.atob(base64));
        };
        return decodeJWT(token);
    }
    return null;

}
// save token to local storage
export function fnSaveTokenToLocalStorage(token) {
    if (typeof window !== 'undefined') {
        console.log('Saving token to local storage:', token);
        localStorage.setItem('auth-token', token);
    }
}
// get token from local storage
export function fnGetTokenFromLocalStorage() {
    console.log('Getting token from local storage');
    return localStorage.getItem('auth-token');
}
export function fnRemoveTokenFromLocalStorage() {
    if (typeof window !== 'undefined') {
        console.log('Removing token from local storage');
        localStorage.removeItem('auth-token');
    }
}
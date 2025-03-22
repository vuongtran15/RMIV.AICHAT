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
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            console.log('Removing token from local storage');
            window.localStorage.removeItem('auth-token');
            // Verify the token was actually removed
            const token = window.localStorage.getItem('auth-token');
            if (!token) {
                console.log('Token successfully removed');
            }
        }
    } catch (error) {
        console.error('Error removing token from localStorage:', error);
    }
}
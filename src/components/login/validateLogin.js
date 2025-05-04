export const validateLogin = ({email, password})=>{
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    let loginFormErrors = {};

    // Email
    if (!trimmedEmail) {
        loginFormErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
        loginFormErrors.email = "Please enter a valid email address";
    }

    // Password
    if (!trimmedPassword) {
        loginFormErrors.password = 'Password is required';
    } else if (trimmedPassword.length < 8) {
        loginFormErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(trimmedPassword)) {
        loginFormErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(trimmedPassword)) {
        loginFormErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(trimmedPassword)) {
        loginFormErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword)) {
        loginFormErrors.password = 'Password must include at least one special character';
    }

    return loginFormErrors;

}
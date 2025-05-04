export const validateForm = ({
    companyName,
    companyEmail,
    companyPhone,
    companyGstNo,
    companyAddressStreet,
    companyAddressCity,
    companyAddressState,
    companyAddressZipCode,
    fullName,
    phone,
    email,
    password,
    panCardNumber,
    presentAddressStreet,
    presentAddressCity,
    presentAddressState,
    presentAddressZipCode,
    permanentAddressStreet,
    permanentAddressCity,
    permanentAddressState,
    permanentAddressZipCode
}) => {
    // Trim all inputs
    const trimmedCompanyName = companyName?.trim() || '';
    const trimmedCompanyEmail = companyEmail?.trim() || '';
    const trimmedCompanyPhone = companyPhone?.toString().trim() || '';
    const trimmedCompanyGstNo = companyGstNo?.trim() || '';
    const trimmedCompanyAddressStreet = companyAddressStreet?.trim() || '';
    const trimmedCompanyAddressCity = companyAddressCity?.trim() || '';
    const trimmedCompanyAddressState = companyAddressState?.trim() || '';
    const trimmedCompanyAddressZipCode = companyAddressZipCode?.toString().trim() || '';
    const trimmedFullname = fullName?.trim() || '';
    const trimmedPhone = phone?.toString().trim() || '';
    const trimmedEmail = email?.trim() || '';
    const trimmedPassword = password?.trim() || '';
    const trimmedPanCardNumber = panCardNumber?.trim() || '';
    const trimmedPresentAddressStreet = presentAddressStreet?.trim() || '';
    const trimmedPresentAddressCity = presentAddressCity?.trim() || '';
    const trimmedPresentAddressState = presentAddressState?.trim() || '';
    const trimmedPresentAddressZipCode = presentAddressZipCode?.toString().trim() || '';
    const trimmedPermanentAddressStreet = permanentAddressStreet?.trim() || '';
    const trimmedPermanentAddressCity = permanentAddressCity?.trim() || '';
    const trimmedPermanentAddressState = permanentAddressState?.trim() || '';
    const trimmedPermanentAddressZipCode = permanentAddressZipCode?.toString().trim() || '';

    let formErrors = {};

    // Company name
    if (!trimmedCompanyName) {
        formErrors.companyName = "Company name is required";
    }

    // Company email
    if (!trimmedCompanyEmail) {
        formErrors.companyEmail = "Company email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedCompanyEmail)) {
        formErrors.companyEmail = "Please enter a valid email address";
    }

    // Company phone
    if (!trimmedCompanyPhone) {
        formErrors.companyPhone = "Company phone number is required";
    } else if (!/^[0-9]+$/.test(trimmedCompanyPhone)) {
        formErrors.companyPhone = "Phone number must contain only digits";
    } else if (trimmedCompanyPhone.length !== 10) {
        formErrors.companyPhone = "Phone number must be exactly 10 digits";
    }

    // Company GST number
    if (!trimmedCompanyGstNo) {
        formErrors.companyGstNo = "GST number is required";
    } else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(trimmedCompanyGstNo)) {
        formErrors.companyGstNo = "Please enter a valid GST number";
    }

    // Company address
    if (!trimmedCompanyAddressStreet) {
        formErrors.companyAddressStreet = "Company street address is required";
    }

    if (!trimmedCompanyAddressCity) {
        formErrors.companyAddressCity = "Company city is required";
    }

    if (!trimmedCompanyAddressState) {
        formErrors.companyAddressState = "Company state is required";
    }

    if (!trimmedCompanyAddressZipCode) {
        formErrors.companyAddressZipCode = "Company zipcode is required";
    } else if (!/^[1-9]{1}[0-9]{5}$/.test(trimmedCompanyAddressZipCode)) {
        formErrors.companyAddressZipCode = "Zip code must be exactly 6 digits";
    }

    // Admin full name 
    if (!trimmedFullname) {
        formErrors.fullName = "Full name is required";
    } else if (!/^[A-Za-z ]+$/.test(trimmedFullname)) {
        formErrors.fullName = "Name can only contain letters";
    }

    // Admin Email
    if (!trimmedEmail) {
        formErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
        formErrors.email = "Please enter a valid email address";
    }

    // Admin phone number 
    if (!trimmedPhone) {
        formErrors.phone = "Phone number is required";
    } else if (!/^[0-9]+$/.test(trimmedPhone)) {
        formErrors.phone = "Phone number must contain only digits";
    } else if (trimmedPhone.length !== 10) {
        formErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Password
    if (!trimmedPassword) {
        formErrors.password = 'Password is required';
    } else if (trimmedPassword.length < 8) {
        formErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(trimmedPassword)) {
        formErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(trimmedPassword)) {
        formErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(trimmedPassword)) {
        formErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword)) {
        formErrors.password = 'Password must include at least one special character';
    }

    // PAN card
    if (!trimmedPanCardNumber) {
        formErrors.panCardNumber = "PAN Card number is required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(trimmedPanCardNumber)) {
        formErrors.panCardNumber = "Please enter a valid PAN Card number";
    }

    // Present address
    if (!trimmedPresentAddressStreet) {
        formErrors.presentAddressStreet = "Street is required";
    }

    if (!trimmedPresentAddressCity) {
        formErrors.presentAddressCity = "City is required";
    }

    if (!trimmedPresentAddressState) {
        formErrors.presentAddressState = "State is required";
    }

    if (!trimmedPresentAddressZipCode) {
        formErrors.presentAddressZipCode = "Zip code is required";
    } else if (!/^[1-9]{1}[0-9]{5}$/.test(trimmedPresentAddressZipCode)) {
        formErrors.presentAddressZipCode = "Zip code must be exactly 6 digits";
    }

    // Permanent address
    if (!trimmedPermanentAddressStreet) {
        formErrors.permanentAddressStreet = "Street is required";
    }

    if (!trimmedPermanentAddressCity) {
        formErrors.permanentAddressCity = "City is required";
    }

    if (!trimmedPermanentAddressState) {
        formErrors.permanentAddressState = "State is required";
    }

    if (!trimmedPermanentAddressZipCode) {
        formErrors.permanentAddressZipCode = "Zip code is required";
    } else if (!/^[1-9]{1}[0-9]{5}$/.test(trimmedPermanentAddressZipCode)) {
        formErrors.permanentAddressZipCode = "Zip code must be exactly 6 digits";
    }

    return formErrors;
}
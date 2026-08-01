export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
export const phonePattern = /^[0-9+\-\s()]{7,20}$/;
export function passwordMatchValidator(passwordKey = 'password', confirmKey = 'confirmPassword') {
    return (control) => {
        var _a, _b;
        const password = (_a = control.get(passwordKey)) === null || _a === void 0 ? void 0 : _a.value;
        const confirmPassword = (_b = control.get(confirmKey)) === null || _b === void 0 ? void 0 : _b.value;
        return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
    };
}
export function firstError(control, label) {
    if (!control || !control.touched || !control.errors) {
        return '';
    }
    if (control.errors['required']) {
        return `${label} is required.`;
    }
    if (control.errors['email']) {
        return 'Enter a valid email address.';
    }
    if (control.errors['pattern']) {
        return `${label} format is invalid.`;
    }
    if (control.errors['minlength']) {
        return `${label} must be at least ${control.errors['minlength'].requiredLength} characters.`;
    }
    return `${label} is invalid.`;
}
//# sourceMappingURL=auth-form.helpers.js.map
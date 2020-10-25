"use strict";
exports.__esModule = true;
exports.CustomValidator = void 0;
var CustomValidator = /** @class */ (function () {
    function CustomValidator() {
    }
    CustomValidator.patternValidator = function (regex, error) {
        return function (control) {
            if (!control.value) {
                // if control is empty return no error
                return null;
            }
            // test the value of the control against the regexp supplied
            var valid = regex.test(control.value);
            // if true, return no error (no error), else return error passed in the second parameter
            return valid ? null : error;
        };
    };
    CustomValidator.passwordMatchValidator = function (control) {
        var password = control.get('password').value; // get password from our password form control
        var confirmPassword = control.get('confirmPassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
        }
    };
    CustomValidator.minValue = function (min) {
        return function (control) {
            // tslint:disable-next-line: one-variable-per-declaration
            var input = control.value, isValid = input < min;
            if (isValid) {
                return { minValue: { min: min } };
            }
            else {
                return null;
            }
        };
    };
    CustomValidator.maxValue = function (max) {
        return function (control) {
            // tslint:disable-next-line: one-variable-per-declaration
            var input = control.value, isValid = input > max;
            if (isValid) {
                return { maxValue: { max: max } };
            }
            else {
                return null;
            }
        };
    };
    return CustomValidator;
}());
exports.CustomValidator = CustomValidator;

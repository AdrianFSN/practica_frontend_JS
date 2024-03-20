import { dispatchEvent } from "../utils/dispatchEvent.js";
import { loadSpinner } from "../utils/loadSpinner.js";
import { createUser } from "./register-user-model.js";

export function registerUserController(registerFormNode) {
    registerFormNode.addEventListener('submit', (event) => {
        event.preventDefault();

        handleSignupFormSubmit(registerFormNode);
    });

    function handleSignupFormSubmit(registerFormNode) {
        let errors = [];
        let emptyFields = isFieldEmpty(registerFormNode);
        let passwordsTooShorts = isPasswordShort(registerFormNode);


        if (!isEmailValid(registerFormNode)) {
            errors.push('Wrong format for email field');
        };

        if (!arePasswordsEqual(registerFormNode)) {
            errors.push('"Password" and "Confirm password" are different')
        };

        if (emptyFields.length > 0) {
            for (let i = 0; i < emptyFields.length; i++) {
                errors.push(emptyFields[i]);
            };
        };
        if (passwordsTooShorts.length > 0) {
            for (let i = 0; i < passwordsTooShorts.length; i++) {
                errors.push(passwordsTooShorts[i]);
            };
        };

        showFormErrors(errors);

        if (errors.length === 0) {
            registerUser(registerFormNode);
        };
    };

    function isEmailValid(registerFormNode) {
        const email = registerFormNode.querySelector('#email');
        const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

        return emailRegExp.test(email.value);
    };

    function arePasswordsEqual(registerFormNode) {
        const password = registerFormNode.querySelector('#password');
        const passwordCheck = registerFormNode.querySelector('#password-check');

        return password.value === passwordCheck.value;
    };

    function isFieldEmpty(registerFormNode) {
        const email = registerFormNode.querySelector('#email');
        const password = registerFormNode.querySelector('#password');
        const passwordCheck = registerFormNode.querySelector('#password-check');

        let emptyFields = []

        if (email.value.length === 0) {
            emptyFields.push('Email field cannot be empty');
        }

        if (password.value.length === 0) {
            emptyFields.push('Password field cannot be empty');
        }
        if (passwordCheck.value.length === 0) {
            emptyFields.push('Password confirmation field cannot be empty');
        }
        return emptyFields;

    };

    function isPasswordShort(registerFormNode) {
        const password = registerFormNode.querySelector('#password');
        const passwordCheck = registerFormNode.querySelector('#password-check');
        const minLength = password.minLength;
        let shortPasswordsArray = [];

        if (password.value.length < minLength) {
            shortPasswordsArray.push(`Password should be at least ${minLength} characters`);
        };
        if (passwordCheck.value.length < minLength) {
            shortPasswordsArray.push(`Password confirmation should be at least ${minLength} characters`);
        };
        return shortPasswordsArray;
    }

    function showFormErrors(errorsList) {
        for (const error of errorsList) {
            dispatchEvent('register-user-notification', {
                message: error,
                type: 'error'
            }, registerFormNode);
        };
    };

    async function registerUser(registerFormNode) {
        const email = registerFormNode.querySelector('#email');
        const password = registerFormNode.querySelector('#password');

        try {
            loadSpinner('show-spinner', registerFormNode)
            await createUser(email.value, password.value);
            dispatchEvent('register-user-notification', {
                message: 'Congrats, you are a registered user now!',
                type: 'success'
            }, registerFormNode);

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);

        } catch (error) {
            dispatchEvent('register-user-notification', {
                message: error,
                type: 'error'
            }, registerFormNode);
        } finally {
            loadSpinner('hide-spinner', registerFormNode);
        };
    };
};
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

        if (!isEmailValid(registerFormNode)) {
            errors.push('Wrong format for email field');
            email.classList.add('field-error');
        };

        if (!arePasswordsEqual(registerFormNode)) {
            errors.push('"Password" and "Confirm password" are different')
            password.classList.add('field-error');
            passwordCheck.classList.add('field-error');
        };

        if (!isPasswordLengthOk(registerFormNode)) {
            errors.push(`Password should be at least 6 characters`);
            password.classList.add('field-error');
            passwordCheck.classList.add('field-error');
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
        const passwordCheck = registerFormNode.querySelector('#passwordCheck');

        return password.value === passwordCheck.value;
    };

    function isPasswordLengthOk(registerFormNode) {
        const password = registerFormNode.querySelector('#password');
        const passwordCheck = registerFormNode.querySelector('#passwordCheck');
        const minLength = password.minLength;
        return password.value.length >= minLength && passwordCheck.value.length >= minLength;
    };

    function showFormErrors(errorsList) {
        for (const error of errorsList) {
            dispatchEvent('register-user-notification', {
                message: error,
                type: 'error'
            }, registerFormNode);
        };
    };

    function resetErrorClass() {
        email.classList.remove('field-error');
        password.classList.remove('field-error');
        passwordCheck.classList.remove('field-error');
    }

    async function registerUser(registerFormNode) {
        const email = registerFormNode.querySelector('#email');
        const password = registerFormNode.querySelector('#password');

        try {
            loadSpinner('show-spinner', registerFormNode)
            await createUser(email.value, password.value);
            resetErrorClass();

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
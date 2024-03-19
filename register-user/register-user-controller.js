import { dispatchEvent } from "../utils/dispatchEvent.js";
import { loadSpinner } from "../utils/loadSpinner.js";
import { createUser } from "./register-user-model.js";

export function registerUserController(formNode) {
    formNode.addEventListener('submit', (event) => {
        event.preventDefault();

        handleSignupFormSubmit(formNode);
    });

    function handleSignupFormSubmit(registerForm) {
        let errors = [];

        if (!isEmailValid(registerForm)) {
            errors.push('Wrong format for email field');
        };

        if (!arePasswordsEqual(registerForm)) {
            errors.push('"Password" and "Confirm password" are different')
        };

        showFormErrors(errors);

        if (errors.length === 0) {
            registerUser(registerForm);
        };
    };

    function isEmailValid(registerForm) {
        const email = registerForm.querySelector('#email');
        const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

        return emailRegExp.test(email.value);
    };

    function arePasswordsEqual(inputFormPasswords) {
        const password = inputFormPasswords.querySelector('#password');
        const passwordCheck = inputFormPasswords.querySelector('#password-check');

        return password.value === passwordCheck.value;
    };

    function showFormErrors(errorsList) {
        for (const error of errorsList) {
            dispatchEvent('register-user-notification', {
                message: error,
                type: 'error'
            }, formNode);
        };
    };

    async function registerUser(formNode) {
        const email = formNode.querySelector('#email');
        const password = formNode.querySelector('#password');

        try {
            loadSpinner('show-spinner', formNode)
            await createUser(email.value, password.value);
            dispatchEvent('register-user-notification', {
                message: 'Congrats, you are a registered user now!',
                type: 'success'
            }, formNode);

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);

        } catch (error) {
            dispatchEvent('register-user-notification', {
                message: error,
                type: 'error'
            }, formNode);
        } finally {
            loadSpinner('hide-spinner', formNode);
        };
    };
};
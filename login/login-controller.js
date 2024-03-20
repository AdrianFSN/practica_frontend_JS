import { loadSpinner } from "../utils/loadSpinner.js"
import { dispatchEvent } from "../utils/dispatchEvent.js"
import { loginUser } from "./login-model.js";

export const loginController = (loginFormNode) => {

    loginFormNode.addEventListener('submit', (event) => {
        event.preventDefault();
        submitLogin(loginFormNode);
    });

    const submitLogin = async (loginFormNode) => {
        const { email, password } = getLoginData(loginFormNode);

        try {
            loadSpinner('show-spinner', loginFormNode);

            console.log('Esto es email justo tras try en controller: ', email)
            console.log('Esto es password justo tras try en controller: ', password)

            const jwt = await loginUser(email, password);
            dispatchEvent('login-user-notification', {
                message: 'Login successful!',
                type: 'success'
            }, loginFormNode);
            localStorage.setItem('token', jwt);
            window.location = './index.html';

        } catch (error) {
            dispatchEvent('login-user-notification', {
                message: error,
                type: 'error'
            }, loginForm);
        } finally {
            loadSpinner('hide-spinner', loginFormNode);
        };
    };

    const getLoginData = (loginFormNode) => {
        const formData = new FormData(loginFormNode);
        console.log('Esto es lo que hay en formData', formData)
        const email = formData.get('email');
        const password = formData.get('password');
        /* const email = loginFormNode.querySelector('#email');
        const password = loginFormNode.querySelector('#password'); */

        return {
            email: email,
            password: password
        };
    };
};

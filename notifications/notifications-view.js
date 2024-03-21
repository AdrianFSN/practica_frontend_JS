export function buildNotification(message) {
    const capitalizedMessage = capitalizeFirstLetter(message);
    return `
    <p>
    ${capitalizedMessage}
    </p>
    `
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};
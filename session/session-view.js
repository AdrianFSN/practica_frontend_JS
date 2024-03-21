export function buildSession() {
  return `<ul>
  <li>
    <a href="./login.html">Login</a>
  </li>
  <li>
    <a href="./register-user.html">Register</a>
  </li>
</ul>`;
};

export function buildAuthenticatedSession() {
  return `
    <button>Logout</button>
    <a href="./create-ad.html">Create ad</a>
    `
}
const login = {
  submit: () => {
    return fetch('https://www.my.backend/book').then((res) => res.json())
  }
}
export default login

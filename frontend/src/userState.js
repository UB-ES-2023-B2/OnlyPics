const initialUserState = {
  user: {
    available_money: 0,
    password: null,
    username: null,
    email: null,
    profile_pic: null,
    biography: null,
    name: null,
    lastname: null,
    date_birth: null
  },
  logged: false
}

// Intenta cargar el estado del usuario desde localStorage
const storedUserState = JSON.parse(localStorage.getItem('userState'));

// Si hay un estado almacenado, úsalo. De lo contrario, utiliza el estado predeterminado
const userState = storedUserState || initialUserState;

const setUserState = (newState) => {
  localStorage.setItem('userState', JSON.stringify(newState));
};

export { userState, setUserState };

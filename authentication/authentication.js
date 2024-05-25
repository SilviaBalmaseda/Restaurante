import { 
    BaseException,
    InvalidAccessConstructorException 
} from "../js/exceptions.js";
import { User } from "../js/user.js";

class AuthenticationServiceException extends BaseException {
    constructor(message = 'Error: Authentication Service Exception.', fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = 'AuthenticationServiceException';
    }
}

// Patrón Singleton para validar un usuario denominado admin con contraseña adminy una factoría de objetos User.
const AuthenticationService = (function () {
    let instantiated;
    function init() { // Inicialización del Singleton
        class Authentication {
            constructor() {
                if (!new.target) throw new InvalidAccessConstructorException();
            }

            validateUser(username, password) {
                return !!((username === 'admin' && password === 'admin'));
            }

            getUser(username) {
                let user = null;
                if (username === 'admin') user = new User('admin');
                return user;
            }
        }

        const auth = new Authentication();
        Object.freeze(auth);
        return auth;
    }
    return {
        getInstance() {
        if (!instantiated) {
            instantiated = init();
        }
        return instantiated;
        },
    };
}());

export default AuthenticationService;
  
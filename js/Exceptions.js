//Excepción base para ir creando el resto de excepciones.
class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException)
        }
    }
}

//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Constructor can’t be called as a function.", fileName, lineNumber);
        this.name = "InvalidAccessConstructorException";
    }
}

//Excepción personalizada para indicar valores vacios.
class EmptyValueException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The parameter " + param + " can't be empty.", fileName, lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

//Excepciones de validación de parámetros. Reutilizables en todas las clases
class ParameterValidationException extends BaseException {
    constructor(param, fileName, lineNumber) {
        super("Error: The parameter " + param + " is invalid.", fileName, lineNumber);
        this.param = param;
        this.name = "ParameterValidationException";
    }
}

//Excepción de valor inválido
class InvalidValueException extends BaseException {
    constructor(param, value, fileName, lineNumber) {
        super(`Error: The paramenter ${param} has an invalid value. (${param}: ${value})`, fileName, lineNumber);
        this.param = param;
        this.name = "InvalidValueException";
    }
}

//Excepción personalizada para clases abstractas.
class AbstractClassException extends BaseException {
    constructor(className, fileName, lineNumber) {
        super(`Error: The class  ${className} is abstract.`, fileName, lineNumber);
        this.className = className;
        this.name = "AbstractClassException";
    }
}

// Excepción personalizada para indicar fuera de límite.
class PositionOutBoundsException extends BaseException {
    constructor(fileName, lineNumber) {
        super(`Error: The position is out of limit.`, fileName, lineNumber);
        this.name = "PositionOutBoundsException";
    }
}

// Excepción personalizada para indicar que el objeto pasado no es del tipo de objeto que se pide.
class ObjectException extends BaseException {
    constructor(object, fileName, lineNumber) {
        super(`Error: The passed object is not a ${object} object.`, fileName, lineNumber);
        this.name = "ObjectException";
    }
}

// Excepción personalizada para indicar que el objeto ya existe.
class ExistsObjectException extends BaseException {
    constructor(object, fileName, lineNumber) {
        super(`Error: The object ${object} already exists.`, fileName, lineNumber);
        this.name = "ExistsObjectException";
    }
}

// Excepción personalizada para indicar que el objeto no está registrado.
class RegisteredException extends BaseException {
    constructor(object, fileName, lineNumber) {
        super(`Error: Object ${object} is not registered.`, fileName, lineNumber);
        this.name = "RegisteredException";
    }
}

// Excepción personalizada para indicar que el objeto es NULL.
class NullObjectException extends BaseException {
    constructor(fileName, lineNumber) {
        super(`Error: The object is NULL.`, fileName, lineNumber);
        this.name = "NullObjectException";
    }
}

export {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    ParameterValidationException,
    InvalidValueException,
    AbstractClassException,
    PositionOutBoundsException,
    ObjectException,
    ExistsObjectException,
    RegisteredException,
    NullObjectException
};
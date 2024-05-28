function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
    const re = new RegExp(`(?:(?:^|.*;\\s*)${cname}\\s*\\=\\s*([^;]*).*$)|^.*$`);
    return document.cookie.replace(re, '$1');
}

// function greetUser() {
//     let user = getCookie("username");
//     if (user) {
//         alert("Hola " + user);
//     } else {
//         user = prompt("Dime tu nombre: ", "");
//         if (user != "" && user != null) {
//             setCookie("username", user, 10);
//         }
//     }
// }

function greetUser() {
    let user = getCookie("username");
    if (user) {
        alert("Hola " + user);
    }
}

function saveUser() {
    let user = prompt("Dime tu nombre: ", "");
    if (user != "" && user != null) {
        setCookie("username", user, 10);
    }
}

export { setCookie, getCookie, greetUser, saveUser };

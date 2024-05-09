// // Main de la página.
// this.main = document.getElementsByTagName("main")[0];
// const bMain = document.createElement('main');
// bMain.classList.add('container');
// bMain.classList.add('text-center');
// document.body.append(bMain);

// // Section de la página.
// this.mainAreaS = document.getElementById("mainAreaS");
// const bSeccion = document.createElement('section');
// bSeccion.id = "mainAreaS";
// bSeccion.classList.add('row');
// bSeccion.classList.add('justify-content-md-center');
// bSeccion.classList.add('principal');
// main.append(bSeccion);

// // Escuchamos los mensajes enviados desde el controlador.
// // window.addEventListener('message', (event) => {
// //     console.log("aaaaaaaaaaaaaaaaaaaa");
// //     console.log(event.source);
// //     // Verificamos si el mensaje proviene del controlador y tiene la estructura esperada.
// //     if (event.source === window.opener && event.data.name && event.data.image && event.data.description && event.data.ingredients) {
// //         const name = event.data.name;
// //         const image = event.data.image;
// //         const description = event.data.description;
// //         const ingredients = event.data.ingredients;

// //         // Aquí puedes usar los parámetros recibidos para realizar las acciones que necesites en esta página.
// //         console.log('Nombre:', name);
// //         console.log('Imagen:', image);
// //         console.log('Descripción:', description);
// //         console.log('Ingredientes:', ingredients);
// //     }
// // });

// const message = document.getElementById('message');
// alert(message);
// message.innerText = window.opener.document.title;

// window.addEventListener('message', function (event) {
//     // Verificar que el mensaje provenga de una fuente confiable si es necesario
//     // Procesar el mensaje recibido
//     const data = event.data;
//     console.log('Mensaje recibido:', data);
//     // Haz algo con los datos recibidos, como actualizar el contenido de la ventana
// });

// const data = JSON.parse(localStorage.getItem('data'));



// // function showMenuDishe(value, cadena = "1") {
// //     this.mainAreaS.insertAdjacentHTML("beforeend",
// //         `<div class="col">
// //                 <div class="card" style="width: 23rem">
// //                 <img class="tamImg" src="./img/${value.image}" alt="Imagen del plato: ${value.name}" />
// //                 <div class="card-body">
// //                     <h5 class="card-title">${value.name}</h5>

// //                     <button class="btn btn-dark" type="button"
// //                     data-bs-toggle="collapse" data-bs-target="#${cadena}" aria-expanded="false"
// //                     aria-controls="${cadena}">
// //                         Descripción
// //                     </button>

// //                     <button data-name="${value.name}" class="btn btn-dark openWindowButton" type="button">
// //                     Abrir página
// //                     </button>
                    
// //                     <div class="collapse" id="${cadena}">
// //                     <div class="card-text">
// //                         Descripción: ${value.description}. 
// //                         Incredientes: ${value.ingredients}      
// //                     </div>
// //                     </div>
// //                 </div>
// //                 </div>
// //             </div>`
// //     );
// // };

// // function show(nameD, imgD, descD, ingD) {
// //     console.log(nameD);
// //     console.log(imgD);
// //     console.log(descD);
// //     console.log(ingD);
// // }

// Main de la página.
this.main = document.getElementsByTagName("main")[0];
const bMain = document.createElement('main');
bMain.id = "mainAreaS";
bMain.classList.add('container');
bMain.classList.add('text-center');
document.body.append(bMain);

// Section de la página.
this.mainAreaS = document.getElementById("mainAreaS");
const bSeccion = document.createElement('section');
bSeccion.id = "sectionS";
bSeccion.classList.add('row');
bSeccion.classList.add('justify-content-md-center');
bSeccion.classList.add('principal');
mainAreaS.append(bSeccion);

this.sectionS = document.getElementById("sectionS");

// Recibir el plato y mostrarlo por pantalla.
window.addEventListener('message', function (event) {
  // Procesar el mensaje(plato) recibido.
  const myObj = event.data;
  // Deserializar.
  let restored = JSON.parse(myObj);

  this.sectionS.insertAdjacentHTML("beforeend",
    `<div class="col">
        <div class="card" style="width: 23rem">
          <img class="tamImg" src="./img/${restored.image}" alt="Imagen del plato: ${restored.name}" />
          <div class="card-body">
            <h5 class="card-title">${restored.name}</h5>

            <div class="card-text">
              Descripción: ${restored.description}. 
              Incredientes: ${restored.ingredients}      
            </div>
          </div>
        </div>
      </div>`
  );
});

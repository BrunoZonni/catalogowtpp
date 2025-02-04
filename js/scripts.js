$("#myModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});
const botonPedidos = document.getElementById("boton-pedidos");
const botonCantidadProductos = document.querySelector("#sel1");
const botonCantidadPedidos = document.querySelector("#sel2");
const spanItems = document.querySelector(".span-button");
const spanPrecio = document.querySelector("#price-span");
const botonAgregar = document.querySelector("#boton-agregar");
const botonproovedor1 = document.querySelector("#botonproovedor1");
const botonproovedor2 = document.querySelector("#botonproovedor2");
const botonproovedor3 = document.querySelector("#botonproovedor3");

//coma en numeros
let number = 123456.789;

// Usando el idioma predeterminado del navegador:
let formatted = number.toLocaleString();
const productos = [];

function addToModalClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let productImage = shopItem.getElementsByClassName("card-image")[0].src;
  let producTitle = shopItem.getElementsByClassName("card-title")[0].innerText;
  let description = shopItem.getElementsByClassName("card-text")[0].innerText;
  let spanDescription =
    shopItem.getElementsByClassName("not-display")[0].innerText;
  let productPrice = shopItem.getElementsByClassName("card-price")[0].innerText;
  ModalProductos(
    productImage,
    producTitle,
    description,
    productPrice,
    spanDescription
  );
}

function resetearCantidad() {
  $("#sel1").prop("selectedIndex", 0);
  spanItems.textContent = "1 unidad";
}

function ModalProductos(image, title, description, price, notShownDescription) {
  document.querySelector("#exampleModalImage").src = image;
  document.querySelector("#exampleModalLabel").textContent = title;
  document.querySelector("#modalText").textContent = (
    description +
    " " +
    notShownDescription
  ).replace("...", ".");
  document.querySelector("#price-span").innerText = price;
  const precioSinDivisa = parseFloat(
    document.querySelector("#price-span").innerText.replace("$", "")
  );
  botonCantidadProductos.addEventListener("change", function actualizarTotal() {
    let cantidad = document.querySelector("#sel1").value;
    totalItems = cantidad;
    spanItems.textContent = totalItems + " unidades";
    spanPrecio.textContent = "$" + totalItems * precioSinDivisa;
  });
  resetearCantidad();

  botonAgregar.onclick = (e) => {
    let button = e.target;
    let shopItem = button.parentElement.parentElement;

    let btn = document.querySelector("#boton-pedidos");
    let precioActual = parseFloat(
      document.querySelector("#price-span-pedidos").textContent.replace("$", "")
    );
    // console.log("Actual", precioActual);
    let precioModal = parseFloat(
      botonAgregar.querySelector("#price-span").textContent.replace("$", "")
    );
    // console.log("Modal", precioModal);
    let sumaPrecios = precioActual + precioModal;
    // console.log("Suma", sumaPrecios);
    btn.querySelector("#price-span-pedidos").textContent = "$" + sumaPrecios;
    ModalPedidos(
      document.querySelector("#exampleModalLabel").textContent,
      /* document.querySelector("#exampleModalImage").src, */ price,
      document.querySelector("#sel1").value,
      sumaPrecios
    );
    botonPedidos.classList.remove("not-display");

    //agrega el nuevo valor al total
    const productPrice = shopItem
      .querySelector("#price-span")
      .textContent.replace("$", "");
    const total = document.querySelector("#total-estimado");
    const dataTotal = total.innerHTML.replace("$", "");
    const valorTotal = parseFloat(dataTotal) + parseFloat(productPrice);
    total.innerHTML = `$${valorTotal}`;
    //aqui termina la funcion de total

    seleccionar_cantidad();
  };
}

let numeroPedidos = 0;
let index = 0;
function NumeroPedidos() {
  numeroPedidos++;
  // console.log("numeroPedidos", numeroPedidos);
}

function agregarItem(title, price, cantidad, total) {
  document.querySelector("#exampleModalLabel2").textContent = title;
  document.querySelector("#price-span2").textContent = "$" + total;
  document.querySelector("#sel2").value = cantidad;
  botonCantidadPedidos.addEventListener("change", function actualizarTotal() {
    let cantidad = document.querySelector("#sel2").value;
    document.querySelector("#price-span2").innerText =
      "$" + cantidad * parseFloat(price.replace("$", ""));
  });
}

function agregarMasItems(title, price, cantidad, total) {
  seleccionar_cantidad();
  document.querySelector("#price-span2").textContent = "$" + total;
  let filaPedidos = document.createElement("div");
  filaPedidos.classList.add("modal-new");
  let contenidoFila = `  <div class="modal-header">
  <div>
    <h5 class="modal-title-pedidos" id="exampleModalLabel2">Modal title </h5>
  <span id="price-span2"> $0 </span>
  </div>

 <div class="form-group">
    <select onclick="actualizarCantidadPedidos(event)" class="form-control" id="sel2" name="sellist2">
    <option>0</option>  
    <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>

    </select>
  </div>
</div>`;
  filaPedidos.innerHTML = contenidoFila;
  document.querySelector(".modal-products").appendChild(filaPedidos);
  document.querySelectorAll(".modal-new .modal-title-pedidos")[
    index
  ].textContent = title;
  totalItems = cantidad;
  document.querySelectorAll(".modal-new #price-span2")[index].innerText =
    "$" + totalItems * parseFloat(price.replace("$", "  "));
  document.querySelectorAll(".modal-new #sel2")[index].value = cantidad;
  index++;
  document
    .querySelectorAll("#sel2")
    [index].addEventListener("change", function actualizarTotal() {
      let cantidad = document.querySelectorAll("#sel2")[index].value;
      document.querySelectorAll("#price-span2")[index].innerText =
        "$" + cantidad * parseFloat(price.replace("$", ""));
    });
}

function borrarItem(price) {
  document
    .querySelector("#boton-pedidos")
    .querySelector("#price-span-pedidos").textContent =
    "$" +
    (parseFloat(
      document
        .querySelector("#boton-pedidos")
        .querySelector("#price-span-pedidos")
        .textContent.replace("$", "")
    ) -
      parseFloat(price.replace("$", "")));
}

function ModalPedidos(title, price, cantidad, total) {
  let itemsPedido = document.querySelectorAll(".modal-title-pedidos");
  for (let i = 0; i < itemsPedido.length; i++) {
    if (numeroPedidos === 0) {
      agregarItem(title, price, cantidad, total);
    } else if (numeroPedidos < 100) {
      agregarMasItems(title, price, cantidad, total);
    } else if (numeroPedidos >= 2000) {
      alert("estas comprando por mayor, tendras un descuento del 20%");
      return;
    }

    NumeroPedidos();
    agregarProducto();
  }
}

const agregarProducto = () => {
  const data = document.querySelector(".modal-content");
  const image = data.querySelector("#exampleModalImage");
  const tittle = data.querySelector("#exampleModalLabel");
  const precio = data.querySelector("#price-span");
};

function actualizarTotalEstimado() {
  const totalEstimado = document.querySelector("#total-estimado");
  numeroPedidos === 1
    ? (totalEstimado.textContent =
        "$" +
        parseFloat(
          document
            .querySelectorAll("#price-span2")[0]
            .textContent.replace("$", "")
        ))
    : numeroPedidos > 1;
  totalEstimado.textContent =
    "$" +
    (parseFloat(
      document.querySelectorAll("#price-span2")[0].textContent.replace("$", "")
    ) +
      parseFloat(
        document
          .querySelectorAll("#price-span2")[1].textContent.replace("$", "")
      ));
}

function actualizarTotalBotonPedidos(totalEstimado) {
  document.querySelector("#price-span-pedidos").textContent = totalEstimado;
}

function actualizarCantidadPedidos(event) {
  let button = event.target;
  button.addEventListener("change", function actualizarTotal() {
    let containerPedido = button.parentElement.parentElement;
    let precio = containerPedido.querySelector("#price-span2").innerText;
    let cantidad = button.value;
    precio = "$" + cantidad * parseFloat(precio.replace("$", ""));
    actualizarTotalEstimado();
    actualizarTotalBotonPedidos(
      document.querySelector("#total-estimado").textContent
    );
  });
}

const seleccionar_cantidad = () => {
  const cantidad = document.querySelector(".cantidad");
  if (numeroPedidos <= 0) {
    cantidad.classList.add("none");
  } else {
    cantidad.classList.remove("none");
  }
};

botonPedidos.onclick = function () {
  actualizarTotalEstimado();
};

botonproovedor3.onclick = function () {
  let formulario1 = document.querySelector("#formulario-1");
  let formulario2 = document.querySelector("#formulario-2");
  let tipoDeEnvio = formulario1.TypeOfDeliveryOption.value;
  let formaDePago = formulario2.TypeOfPaymentyOption.value;
  valid = true;
  event.preventDefault();
  // your validations
  if (formaDePago == "") {
    alert("Completa los espacios requeridos.");

    valid = false;
    console.log("falso");
  }
  // and so on all your validations
  if (valid) {
    let productoUno = document.querySelectorAll("#exampleModalLabel2")[0]
      .textContent;
    let precioUno = document.querySelectorAll("#price-span2")[0].textContent;
    let cantidadUno = document.querySelectorAll("#sel2")[0].value;
    let total = document.querySelector("#total-estimado").textContent;
    if (numeroPedidos) {
      let pedido1Item = `*Hola!*  %0a%0a *PEDIDO: prueba de tienda 2* %0a%0a— *[ ${cantidadUno} ]* ${productoUno} > *${precioUno}*%0a%0a*Total:* ${total}%0aForma de pago: *${formaDePago}*%0a`;
      window.open("https://api.whatsapp.com/send/?text=" + pedido1Item);
    } else if (numeroPedidos) {
      console.log(prueba)
    }
  }
};

// ejecutara al inicio de la pagina
seleccionar_cantidad()


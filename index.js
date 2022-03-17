"Use Strict";

//URL
const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

const foodCard = `
<div class="col-md-3">
  <div class="card" id="card" style="align-content: center">
  <div class="text-center">
    <img
      class="card-img-top"
      src={{image}}
      alt="Card image cap"
      style="width: 60%; margin-top: 30px"
    />
    </div>
    <div class="card-body">
      <p
      class = "name"
        style="
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 21px;
          text-align: center;
        "
      >
      {{name}}
      </p>
      <p
        class="card-text"
        style="
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 300;
          font-size: 12px;
          line-height: 14px;
        "
      >
      {{description}}
      </p>
      <p
        class="card-text price"
        style="
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 800;
          font-size: 12px;
          line-height: 14px;
        "
      >
     {{price}}
      </p>
      <a
        href="#carrito"
        class="btn btn-primary comprarBoton"
        style="
          width: 40%;
          height: 33px;
          margin: 0 30%;
          background-color: #f2a950;
          border: none;
          border-radius: 0;
          color: black;
          font-size: 12px;
          line-height: 14px;
          font-weight: 700;
        "
        
        >Add to car</a
      >
    </div>
  </div>
</div>
`;

//Recibir datos
function mostrarHam() {
  getProducts("Burguers");

  document.getElementById("tituloHamburguesa").style.display = "block";

  document.getElementById("tituloTacos").style.display = "none";

  document.getElementById("tituloEnsaladas").style.display = "none";

  document.getElementById("tituloPostres").style.display = "none";

  document.getElementById("tituloBebidas").style.display = "none";

  document.getElementById("tituloCarrito").style.display = "none";

  document.getElementById("carro").style.display = "none";
}

function mostrarTacos() {
  getProducts("Tacos");

  document.getElementById("tituloHamburguesa").style.display = "none";

  document.getElementById("tituloTacos").style.display = "block";

  document.getElementById("tituloEnsaladas").style.display = "none";

  document.getElementById("tituloPostres").style.display = "none";

  document.getElementById("tituloBebidas").style.display = "none";

  document.getElementById("tituloCarrito").style.display = "none";

  document.getElementById("carro").style.display = "none";
}

function mostrarEnsaladas() {
  getProducts("Salads");

  document.getElementById("tituloHamburguesa").style.display = "none";

  document.getElementById("tituloTacos").style.display = "none";

  document.getElementById("tituloEnsaladas").style.display = "block";

  document.getElementById("tituloPostres").style.display = "none";

  document.getElementById("tituloBebidas").style.display = "none";

  document.getElementById("tituloCarrito").style.display = "none";

  document.getElementById("carro").style.display = "none";
}

function mostrarPostres() {
  getProducts("Desserts");

  document.getElementById("tituloHamburguesa").style.display = "none";

  document.getElementById("tituloTacos").style.display = "none";

  document.getElementById("tituloEnsaladas").style.display = "none";

  document.getElementById("tituloPostres").style.display = "block";

  document.getElementById("tituloBebidas").style.display = "none";

  document.getElementById("tituloCarrito").style.display = "none";

  document.getElementById("carro").style.display = "none";
}

function mostrarBebidas() {
  getProducts("Drinks and Sides");

  document.getElementById("tituloHamburguesa").style.display = "none";

  document.getElementById("tituloTacos").style.display = "none";

  document.getElementById("tituloEnsaladas").style.display = "none";

  document.getElementById("tituloPostres").style.display = "none";

  document.getElementById("tituloBebidas").style.display = "block";

  document.getElementById("tituloCarrito").style.display = "none";

  document.getElementById("carro").style.display = "none";
}

function mostrarCarrito() {
  document.getElementById("productos").style.display = "none";

  document.getElementById("tituloHamburguesa").style.display = "none";

  document.getElementById("tituloTacos").style.display = "none";

  document.getElementById("tituloEnsaladas").style.display = "none";

  document.getElementById("tituloPostres").style.display = "none";

  document.getElementById("tituloBebidas").style.display = "none";

  document.getElementById("tituloCarrito").style.display = "block";

  document.getElementById("carro").style.display = "block";
}

const getData = async () => {
  const data = await fetch(url);
  return data.json();
};

const getProducts = (name) => {
  if (productos.innerHTML !== "") {
    productos.innerHTML = "";
  }

  if (productsSection.innerHTML !== '<div class="row" id="productos"></div>') {
    productsSection.innerHTML = '<div class="row" id="productos"></div>';
    productos = document.getElementById("productos");
  }

  let products;

  localData.map((cat, pos) => {
    if (cat.name === name) {
      products = localData[pos].products;
    }
  });

  let a;
  products.map((product) => {
    a = foodCard;
    a = a
      .replace("{{image}}", product.image)
      .replace("{{name}}", product.name)
      .replace("{{description}}", product.description)
      .replace("{{price}}", product.price);

    productos.innerHTML += a;
  });

  buyBtns = document.querySelectorAll(".comprarBoton");
  buyBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const parent = btn.parentElement.parentElement;
      const name = parent.querySelector(".name").innerHTML;
      let price = parent.querySelector(".price").innerHTML;
      price = parseFloat(price.substring(4, price.length - 4)).toFixed(2);

      añadirAlCarrito(name, price);
    });
  });
};

getData().then((data) => {
  localData = data;

  getProducts("Burguers");
});

fila = 0;

function addRow(item, price, nombre) {
  var row = document.getElementById("tableBody").insertRow(fila);

  contador = fila + 1;
  fila++;
  cantidad = 1;
  description = nombre;
  precio = price;
  monto = cantidad * price;

  row.innerHTML =
    `<td style="background-color: white;" id = "contador">` +
    contador +
    `</td><td style="background-color: white;" id = "cant">` +
    cantidad +
    `</td><td style="background-color: white;" id = "des">` +
    description +
    `</td><td style="background-color: white;" id = "pre" ">` +
    precio +
    `</td><td style="background-color: white;" id = "celda" ">` +
    monto +
    `</td><td style="background-color: white; color: #fff " id = "celda" "><a class="btn btn-warning masBtn style ="color:  #FFFFFF; margin = 0 5px; width: 15%" onclick = "addElement(this, contador, cant, des, pre)">+</a> <a class="btn btn-warning menossBtn" style ="color:  #FFFFFF; margin = 0 5px; width: 32%" onclick = "removeElement(this, contador, cant, des, pre)">-</a>`;

  total();
}

function añadirAlCarrito(n, p) {
  var cantidad = document.getElementById("carrito").innerText;
  c = parseInt(cantidad);
  c++;

  carrito.innerHTML = c;
  addRow(c, p, n);
}

function addElement(r, cont, cant, des, pre) {
  table = document.getElementById("tableBody");
  rows = table.rows;

  r = r + 1;
  r = r - 1;

  a = rows[r].getElementsByTagName("td")[0];
  b = rows[r].getElementsByTagName("td")[1];
  c = rows[r].getElementsByTagName("td")[2];
  d = rows[r].getElementsByTagName("td")[3];

  p = parseFloat(d.innerText);

  contador = a.innerText;
  cantidad = parseInt(b.innerText) + 1;
  description = c.innerText;
  precio = p;
  monto = cantidad * precio;

  if (r == 0) {
    document.getElementById("tableBody").deleteRow(r);
    var row = document.getElementById("tableBody").insertRow(r);
  } else {
    document.getElementById("tableBody").deleteRow(r - 1);
    var row = document.getElementById("tableBody").insertRow(r - 1);
  }

  row.innerHTML =
    `<td style="background-color: white;" id = "contador">` +
    contador +
    `</td><td style="background-color: white;" id = "cant">` +
    cantidad +
    `</td><td style="background-color: white;" id = "des">` +
    description +
    `</td><td style="background-color: white;" id = "pre" ">` +
    precio +
    `</td><td style="background-color: white;" id = "celda" ">` +
    monto +
    `</td><td style="background-color: white; color: #fff " id = "celda" "><a class="btn btn-warning masBtn style ="color:  #FFFFFF; margin = 0 5px; width: 15%" onclick = "addElement(this, contador, cant, des, pre)">+</a> <a class="btn btn-warning menossBtn" style ="color:  #FFFFFF; margin = 0 5px; width: 32%" onclick = "removeElement(this, contador, cant, des, pre)">-</a>`;
  total();
}

function removeElement(r, cont, cant, des, pre) {
  table = document.getElementById("tableBody");
  rows = table.rows;

  r = r + 1;
  r = r - 1;

  a = rows[r].getElementsByTagName("td")[0];
  b = rows[r].getElementsByTagName("td")[1];
  c = rows[r].getElementsByTagName("td")[2];
  d = rows[r].getElementsByTagName("td")[3];

  p = parseFloat(d.innerText);

  contador = a.innerText;
  cantidad = parseInt(b.innerText) - 1;
  description = c.innerText;
  precio = p;
  monto = cantidad * precio;

  if (cantidad == 0) {
    document.getElementById("tableBody").deleteRow(r);
    fila--;
    var cantidad = document.getElementById("carrito").innerText;
    c = parseInt(cantidad);
    c--;

    carrito.innerHTML = c;
  } else {
    document.getElementById("tableBody").deleteRow(r);
    var row = document.getElementById("tableBody").insertRow(r);

    row.innerHTML =
      `<td style="background-color: white;" id = "contador">` +
      contador +
      `</td><td style="background-color: white;" id = "cant">` +
      cantidad +
      `</td><td style="background-color: white;" id = "des">` +
      description +
      `</td><td style="background-color: white;" id = "pre" ">` +
      precio +
      `</td><td style="background-color: white;" id = "celda" ">` +
      monto +
      `</td><td style="background-color: white; color: #fff " id = "celda" "><a class="btn btn-warning masBtn style ="color:  #FFFFFF; margin = 0 5px; width: 15%" onclick = "addElement(contador, cant, des, pre)">+</a> <a class="btn btn-warning menossBtn" style ="color:  #FFFFFF; margin = 0 5px; width: 32%" onclick = "removeElement(this, contador, cant, des, pre)">-</a>`;
  }

  total();
}

function total() {
  table = document.getElementById("tableBody");
  rows = table.rows;
  tot = 0;
  if (rows.length == 1) {
    x = rows[0].getElementsByTagName("td")[4];

    p = parseFloat(x.innerText);
    tot = tot + p;
  } else {
    for (i = 0; i < rows.length; i++) {
      x = rows[i].getElementsByTagName("td")[4];

      p = parseFloat(x.innerText);
      tot = tot + p;
    }
  }

  totalCompra.innerHTML = tot;
}

function cancelarPedido() {
  var resultado = window.confirm("¿Esta seguro de cancelar el pedido?");
  if (resultado == true) {
    document.getElementById("tableBody").remove();
    window.alert("El pedido ha sido eliminado");
  } else {
    window.alert("Se cancelo la acción");
  }
}

function confirmarPedido() {
  table = document.getElementById("tableBody");
  rows = table.rows;

  for (i = 0; i < rows.length; i++) {
    a = rows[i].getElementsByTagName("td")[0];
    b = rows[i].getElementsByTagName("td")[1];
    c = rows[i].getElementsByTagName("td")[2];
    d = rows[i].getElementsByTagName("td")[3];

    console.log(
      i +
        ": item: " +
        a.innerText +
        ", quantity: " +
        b.innerText +
        ", description: " +
        c.innerText +
        ", unitPrice: " +
        d.innerText
    );
  }

  console.log("length :" + rows.length);
}

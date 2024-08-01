var lista = document.getElementById("lista");
var bruto = document.getElementById("bruto");
var porciento = document.getElementById("porciento");
var libre = document.getElementById("libre");

var fijo = document.getElementById("fijo");
var candado = document.getElementById("candado");
var parlet = document.getElementById("parlet");
var corrido = document.getElementById("corrido");
var centenafijo = document.getElementById("centenafijo");
var centenacorrido = document.getElementById("centenacorrido");

var cuadreBruto =
  (cuadrePercent =
  cuadreLibre =
  cuadrePremio =
  cuadreRecoger =
  cuadreDar =
    0);

var app = new Vue({
  el: "#tabla",
  data: {
    todos: [],
    totales: [],
  },
});

var appFT = new Vue({
  el: "#fondo",
  data: {
    ft: 0,
    seen: false,
    res: "",
    shoot: 0,
    time: "",
  },
  methods: {
    sacarFT: function (param, number) {
      this.ft = parseInt(ft.value);
      let aux = this.ft;
      if (param === "-") {
        this.ft -= number;
      } else {
        this.ft += number;
      }
      this.seen = true;
      this.shoot = `${tiroInput.value.split(";")[0]}\n${
        tiroInput.value.split(";")[1]
      }\n${tiroInput.value.split(";")[2]}`;
      let fecha = new Date(Date.now());
      if (fecha.getHours() > 19) {
        this.time += "Cuadre noche\n";
      } else {
        this.time += "Cuadre mediodía\n";
      }
      this.time += `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}\n\n`;
      this.res = `${aux} ${param} ${number} = ${this.ft}FT`;
    },
  },
});

function sumFin(numero) {
  var fixed = fijo.value * numero;
  var lock = candado.value * 800;
  var parlett = parlet.value * 800;
  var run = corrido.value * 20;
  var fixedCent = centenafijo.value * 300;
  var runCent = centenacorrido.value * 100;

  var premio = fixed + lock + parlett + run + fixedCent + runCent;
  var diferencia = libre.value - premio;

  //alert("El fijo es: "+fixed+", el candado es: "+lock+", el parlet es: "+parlett+", el corrido es: "+run+", la centena fija: "+fixedCent+", la centena corrida es: "+runCent+" y el premio total es: "+premio+" el bruto es: "+bruto.value+" La diferencia es: "+ diferencia);

  if (diferencia < 0) {
    app.todos.push({
      lista: lista.value,
      bruto: bruto.value,
      percent: porciento.value,
      libre: libre.value,
      premio: premio,
      recoger: "-",
      dar: Math.abs(diferencia),
    });
    cuadreDar += Math.abs(diferencia);
    //alert("Hay que dar " + Math.abs(diferencia));
  } else {
    app.todos.push({
      lista: lista.value,
      bruto: bruto.value,
      percent: porciento.value,
      libre: libre.value,
      premio: premio,
      recoger: diferencia,
      dar: "-",
    });
    cuadreRecoger += Math.abs(diferencia);
    //alert("Hay que recoger " + diferencia);
  }
  cuadreBruto += parseInt(bruto.value);
  cuadrePercent += parseInt(porciento.value);
  cuadreLibre += parseInt(libre.value);
  cuadrePremio += premio;
}

var numbers = document.getElementById("numbers");

function sum(numero) {
  var arreglo = numbers.value.split("+");
  var suma = 0;
  for (let index = 0; index < arreglo.length; index++) {
    suma += parseInt(arreglo[index]);
  }

  calcular(suma, numero);
}

function calcular(brute, numero) {
  var percent = Math.round((brute * numero) / 100);
  var free = brute - percent;
  bruto.value = brute;
  porciento.value = percent;
  libre.value = free;
  //alert("El bruto es: " + bruto.value + " el 15% es: " + percent + " el libre es: " + free);
}

function reset() {
  numbers.value = "";
  lista.value = "";
  fijo.value = "";
  candado.value = "";
  parlet.value = "";
  corrido.value = "";
  centenafijo.value = "";
  centenacorrido.value = "";
}

function cuadrar() {
  app.todos.push({
    lista: "TOTAL",
    bruto: cuadreBruto,
    percent: cuadrePercent,
    libre: cuadreLibre,
    premio: cuadrePremio,
    recoger: cuadreRecoger,
    dar: cuadreDar,
  });
  /* alert(`El bruto es: ${cuadreBruto}, el porciento es: ${cuadrePercent}, el libre es: ${cuadreLibre}, 
        el premio es: ${cuadrePremio}, el recoger es: ${cuadreRecoger} y el dar es: ${cuadreDar}`); 
  alert(
    `El bruto - porciento es: ${
      cuadreBruto - cuadrePercent
    } igual al libre: ${cuadreLibre}`
  );
  alert(
    `El libre - premio es: ${Math.abs(
      cuadreLibre - cuadrePremio
    )} igual al recoger - dar: ${Math.abs(cuadreRecoger - cuadreDar)}`
  ); */
  if (cuadreRecoger > cuadreDar) {
    app.totales.push({
      seen: false,
      lista: "5%",
      bruto: (cuadreBruto * 5) / 100,
      libre: Math.abs(cuadreLibre - cuadrePremio),
      recoger: Math.abs(cuadreRecoger - cuadreDar),
    });
    app.totales.push({
      minus: true,
      premio: "-",
      recoger: Math.round((cuadreBruto * 5) / 100),
    });
    app.totales.push({
      seen: false,
      recoger:
        Math.abs(cuadreRecoger - cuadreDar) -
        Math.round((cuadreBruto * 5) / 100),
    });
    app.totales.push({
      minus: true,
      premio: "-",
      recoger: 300,
    });
    app.totales.push({
      seen: false,
      recoger:
        Math.abs(cuadreRecoger - cuadreDar) -
        Math.round((cuadreBruto * 5) / 100) -
        300,
    });
    appFT.sacarFT(
      "+",
      Math.abs(cuadreRecoger - cuadreDar) -
        Math.round((cuadreBruto * 5) / 100) -
        300
    );
    //alert("Hay que recoger");
    //-
  } else {
    app.totales.push({
      seen: false,
      lista: "5%",
      bruto: (cuadreBruto * 5) / 100,
      premio: Math.abs(cuadreLibre - cuadrePremio),
      dar: Math.abs(cuadreRecoger - cuadreDar),
    });
    app.totales.push({
      plus: true,
      recoger: "+",
      dar: Math.round((cuadreBruto * 5) / 100),
    });
    app.totales.push({
      seen: false,
      dar:
        Math.abs(cuadreRecoger - cuadreDar) +
        Math.round((cuadreBruto * 5) / 100),
    });
    app.totales.push({
      plus: true,
      recoger: "+",
      dar: 300,
    });
    app.totales.push({
      seen: false,
      dar:
        Math.abs(cuadreRecoger - cuadreDar) +
        Math.round((cuadreBruto * 5) / 100) +
        300,
    });
    appFT.sacarFT(
      "-",
      Math.abs(cuadreRecoger - cuadreDar) +
        Math.round((cuadreBruto * 5) / 100) +
        300
    );
    //alert("Hay que dar");
    //+
  }
}

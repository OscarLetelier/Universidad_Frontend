function procesarOrdenes(ordenes) {
  let totalGlobal = 0; // Acumula el total de todas las órdenes válidas

  ordenes.forEach(function (orden) {
    // Verifica que la orden tenga un arreglo válido de items
    if (!Array.isArray(orden.items) || orden.items.length === 0) {
      console.warn("Orden omitida por no contener items:", orden); // Genera un warn Indicando que dentro de los datos de prueba una orden es omitida
      return;
    }

    // Se calcula el subtotal de la orden (suma de precios)
    let subtotal = calcularSubtotal(orden.items);

    // Se aplica el descuento a ese subtotal si corresponde
    let totalConDescuento = aplicarDescuento(subtotal, orden.descuento);

    // Se suma al total global
    totalGlobal += totalConDescuento;
  });

  return totalGlobal; // Se retorna el total de todas las órdenes válidas

  // --------------------
  // Función auxiliar para calcular el subtotal de los items
  function calcularSubtotal(items) {
    return items.reduce((subtotal, item) => subtotal + item.precio, 0);
  }

  // --------------------
  // Aplica descuento solo si el subtotal supera los 100
  function aplicarDescuento(subtotal, descuento) {
    if (descuento && subtotal > 100) {
      return subtotal - (subtotal * descuento) / 100;
    }
    return subtotal; // Si no aplica descuento, se retorna el mismo subtotal
  }
}

// --------------------
// Datos de prueba
let ordenes = [
  { items: [{ precio: 50 }, { precio: 70 }], descuento: 10 }, // subtotal = 120, con descuento → 108
  { items: [{ precio: 30 }, { precio: 20 }], descuento: 5 }, // subtotal = 50, sin descuento → 50
  { items: [], descuento: 20 }, // Orden inválida
];

// Resultado esperado: 108 + 50 = 158
console.log("Total Global: ", procesarOrdenes(ordenes));
console.log(ordenes);

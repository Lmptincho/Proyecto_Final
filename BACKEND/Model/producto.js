require("rootpath")();

const mysql = require("mysql");
const configuracion = require("../config.json");

//inicializa la conexion entre el servidor y la base de datos
const connection = mysql.createConnection(configuracion.database);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("base de datos conectada");
  }
});

const productoDb = {};

//crear producto
productoDb.create = function (producto, funCallback) {
  const consulta =
    "INSERT INTO producto (nombre, descripcion, precio, stock_disponible, imagen, talla) VALUES (?,?,?,?,?,?);";
  const params = [
    producto.nombre,
    producto.descripcion,
    producto.precio,
    producto.stock_disponible,
    producto.imagen,
    producto.talla,
  ];

  connection.query(consulta, params, (err, rows) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        funCallback({
          message: "El producto ya fue registrado anteriormente",
          detail: err,
        });
      } else {
        funCallback({
          message: "error diferente",
          detail: err,
        });
      }
    } else {
      funCallback(undefined, {
        message: `se creo el producto  ${producto.nombre}`,
        detail: rows,
      });
    }
  });
};

//R = READ
productoDb.getAll = function (funCallback) {
  const consulta = "SELECT * FROM producto";
  connection.query(consulta, function (err, rows) {
    if (err) {
      funCallback({
        message: "ha ocurrido un error inesperado al buscar el producto",
        detail: err,
      });
    } else {
      funCallback(undefined, rows);
    }
  });
};

// U = UPDATE
productoDb.update = function (producto, id, funCallback) {
  const consulta =
    "UPDATE producto SET nombre =?, descripcion= ?, precio =?, stock_disponible=?, imagen=?, talla=? WHERE id = ?";
  const params = [
    producto.nombre,
    producto.descripcion,
    producto.precio,
    producto.stock_disponible,
    producto.imagen,
    producto.talla,
    id,
  ];

  connection.query(consulta, params, (err, result) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        funCallback({
          message: "Los datos a insertar generan un producto duplicado",
          detail: err,
        });
      } else {
        funCallback({
          message: "error diferente, analizar codigo error",
          detail: err,
        });
      }
    } else if (result.affectedRows == 0) {
      funCallback({
        message: "No existe producto que coincida con el criterio de busqueda",
        detail: result,
      });
    } else {
      funCallback(undefined, {
        message: `se modificó el producto  ${producto.nombre} ${producto.descripcion}`,
        detail: result,
      });
    }
  });
};

// D = DELETE
productoDb.borrar = function (id, funCallback) {
  const consulta = "DELETE FROM producto WHERE id = ?";
  connection.query(consulta, id, (err, result) => {
    if (err) {
      funCallback({ message: err.code, detail: err });
    } else {
      if (result.affectedRows == 0) {
        funCallback(undefined, {
          message: "no se encontro producto con el id ingresado",
          detail: result,
        });
      } else {
        funCallback(undefined, {
          message: "producto eliminado",
          detail: result,
        });
      }
    }
  });
};

productoDb.getById = function (id, funCallback) {
  connection.query("SELECT * FROM producto WHERE id = ?", id, (err, result) => {
    if (err) {
      funCallback({
        message: "a ocurrido algun error inesperado al buscar el producto",
        detail: err,
      });
    } else if (result.length == 0) {
      funCallback(undefined, {
        message: `no se encontro un producto con el id: ${id}`,
        detail: result,
      });
    } else {
      funCallback(undefined, {
        message: `los datos del producto con el id ${id} son:`,
        detail: result[0],
      });
    }
  });
};

module.exports = productoDb;

require("rootpath")();

const mysql = require("mysql");
const configuracion = require("../config.json");

//inicializa la conexion entre el servidor y la base de datos
var connection = mysql.createConnection(configuracion.database);
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("base de datos conectada");
  }
});

var clienteDb = {};

// C = CREATE
clienteDb.create = function (datos, funCallback) {
  consulta =
    "INSERT INTO cliente (id, nombre, apellido, direccion, telefono, correo_electronico, fecha_de_registro, usuarioId) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP, ?);";
  params = [
    datos.id,
    datos.nombre,
    datos.apellido,
    datos.direccion,
    datos.telefono,
    datos.correo_electronico,
    datos.fecha_de_registro,
    datos.usuarioId,
  ];

  connection.query(consulta, params, (err, rows) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        funCallback({
          message: "El cliente ya fue registrado anteriormente",
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
        message: `se creo el cliente  ${datos.nombre} ${datos.apellido}`,
        detail: rows,
      });
    }
  });
};

//R = READ
clienteDb.getAll = function (funCallback) {
  var consulta = "SELECT * FROM cliente";
  connection.query(consulta, function (err, rows) {
    if (err) {
      funCallback({
        message: "ha ocurrido un error inesperado al buscar el cliente",
        detail: err,
      });
    } else {
      funCallback(undefined, rows);
    }
  });
};

// U = UPDATE
// personaController --> app.put('/', actualizar);
clienteDb.update = function (cliente, id, funCallback) {
  const consulta =
    "UPDATE cliente SET nombre =?, apellido= ?, direccion =?, telefono=?, correo_electronico=?  WHERE id = ?";
  const params = [
    cliente.nombre,
    cliente.apellido,
    cliente.direccion,
    cliente.telefono,
    cliente.correo_electronico,
    id,
  ];

  connection.query(consulta, params, (err, result) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        //dni duplicado
        funCallback({
          message: "Los datos a insertar generan un cliente duplicado",
          detail: err,
        });
      } else {
        //algun otro codigo de error
        funCallback({
          message: "error diferente, analizar codigo error",
          detail: err,
        });
      }
    } else if (result.affectedRows == 0) {
      //persona a actualizar no encontrada
      funCallback({
        message: "No existe cliente que coincida con el criterio de busqueda",
        detail: result,
      });
    } else {
      funCallback(undefined, {
        message: `se modificó el cliente  ${cliente.nombre} ${cliente.apellido}`,
        detail: result,
      });
    }
  });
};

// D = DELETE
// personaController --> app.post('/', borrar);
clienteDb.borrar = function (id, funCallback) {
  const consulta = "DELETE FROM cliente WHERE id = ?";
  connection.query(consulta, id, (err, result) => {
    if (err) {
      funCallback({ menssage: err.code, detail: err });
    } else {
      if (result.affectedRows == 0) {
        funCallback(undefined, {
          message: "no se encontro cliente con el id ingresado",
          detail: result,
        });
      } else {
        funCallback(undefined, {
          message: "cliente eliminado",
          detail: result,
        });
      }
    }
  });
};

// personaController --> app.get('/:dni', getByDNI);
clienteDb.getById = function (id, funCallback) {
  connection.query("SELECT * FROM cliente WHERE id = ?", id, (err, result) => {
    if (err) {
      funCallback({
        menssage: "a ocurrido algun error inesperado al buscar el cliente",
        detail: err,
      });
    } else if (result.length == 0) {
      //consulta no impacta en nada dentro de la BD
      funCallback(undefined, {
        menssage: `no se encontro un cliente con el id: ${id}`,
        detail: result,
      });
    } else {
      funCallback(undefined, {
        menssage: `los datos del cliente con el id ${id} son:`,
        detail: result,
      });
    }
  });
};

// personaController --> app.get('/:persona', getUserByPersona);
clienteDb.getUserByCliente = function (cliente, funcallback) {
  connection.query(
    "select * from cliente where id = ?",
    cliente,
    (err, result) => {
      if (err) {
        funcallback({
          menssage:
            "a ocurrido algun error, posiblemente de sintaxis en buscar al cliente",
          detail: err,
        });
      } else if (result.length == 0) {
        //consulta no impacta en nada dentro de la BD
        funcallback(undefined, {
          menssage: "no se encontro el cliente",
          detail: result,
        });
      } else {
        consulta =
          "select nickname from usuario INNER JOIN cliente on usuario.id = cliente.usuarioId where usuario.id=?";
        connection.query(consulta, persona, (err, result) => {
          if (err) {
            funcallback({
              menssage:
                "a ocurrido algun error, posiblemente de sintaxis en buscar el nickname",
              detail: err,
            });
          } else if (result.length == 0) {
            //array vacio
            funcallback(undefined, {
              menssage:
                "la persona seleccionada no posee usuario registrado en la base de datos",
              detail: result,
            });
          } else {
            funcallback(undefined, {
              // consulta impacta bien, y el array no esta vacio
              menssage: `El nikname del usuario seleccionada es ${result[0]["nickname"]}`,
              detail: result,
            });
          }
        });
      }
    }
  );
};

// exportamos el objeto clienteDb para que Node.JS lo haga publico y pueda utilizarse desde otros modulos
module.exports = clienteDb;

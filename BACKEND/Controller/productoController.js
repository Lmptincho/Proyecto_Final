// Importar el módulo rootpath para poder utilizar rutas relativas
require("rootpath")();

// Importar el módulo express
const express = require("express");

// Crear una instancia de express
const app = express();

// Utilizar el middleware de express.json()
app.use(express.json());

// Utilizar el middleware de express.urlencoded() con la opción extended en true
app.use(express.urlencoded({ extended: true }));

// Importar el módulo producto del modelo
const productoDb = require("../Model/producto");

// Importar el módulo securityController
const securityController = require("./securityController");

// Definir las rutas de escucha (endpoint) disponibles para PERSONAS
app.get("/", buscarTodos);
app.post("/", crear);
app.put("/:id", securityController.verificarToken, actualizar);
app.delete("/:id", securityController.verificarToken, borrar);
app.get("/:id", getById);

// Definir las funciones utilizadas en los endpoints

// Listar todos los productos
function buscarTodos(req, res) {
  productoDb.getAll(function (err, resultado) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(resultado);
    }
  });
}

// Crear producto
function crear(req, res) {
  let producto = req.body;
  productoDb.create(producto, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(resultado);
    }
  });
}

// Actualizar producto
function actualizar(req, res) {
  let producto = req.body;
  let id = req.params.id;
  productoDb.update(producto, id, (err, resultado) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(resultado);
    }
  });
}

// Borrar producto
function borrar(req, res) {
  let id_producto_a_eliminar = req.params.id;
  productoDb.borrar(id_producto_a_eliminar, (err, result_model) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (result_model.detail.affectedRows == 0) {
        res.status(404).send(result_model.message);
      } else {
        res.send(result_model.message);
      }
    }
  });
}

// Obtener producto por id
function getById(req, res) {
  let id = req.params.id;
  productoDb.getById(id, (err, result_model) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result_model);
    }
  });
}

// Exportar la instancia de express
module.exports = app;

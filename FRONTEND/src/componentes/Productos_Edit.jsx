import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Internal_Productos_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      descripcion: "",
      precio: null,
      imagen: "",
      modal: false,
    };
  }

  // como utilizamos el mismo formulario para crear y actualizar Productoss, si no vinene ningun parametro significa que es un ALTA
  // pero si viene "Productos_id" por parametro (dentro de las this.props del constructor) significa que es una MODIFICACION
  // por lo que aprovechamos el ciclo de vida del componente para realizar un fetch al backend y traer los datos del Productos a ser
  // modificado si es que viene dicho dato por parametro
  componentDidMount() {
    if (this.props.params.id) {
      let parametros = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: sessionStorage.getItem("token"),
        },
      };

      fetch(
        `http://localhost:8000/producto/${this.props.params.id}`,
        parametros
      )
        .then((res) => {
          return res.json().then((body) => {
            return {
              status: res.status,
              ok: res.ok,
              headers: res.headers,
              body: body,
            };
          });
        })
        .then((result) => {
          if (result.ok) {
            this.setState({
              nombre: result.body.detail.nombre,
              descripcion: result.body.detail.descripcion,
              precio: result.body.detail.precio,
              imagen: result.body.detail.imagen,
            });
          } else {
            toast.error(result.body.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // handler invocado por el evento onSubmit() del formulario, aqui hay dos caminos posibles, un POST para la creacion o un PUT para la edicion
  // eso lo diferenciamos mediante "this.props.params.producto_id", acorde a su existencia debemos cambiar tanto la URL como el METHOD del fetch
  handleSubmit = (event) => {
    event.preventDefault();

    let producto = {
      id: this.state.id,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      precio: this.state.precio,
      imagen: this.state.imagen,
    };

    let parametros = {
      method: this.props.params.id ? "PUT" : "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = this.props.params.id
      ? `http://localhost:8000/producto/${this.props.params.id}`
      : "http://localhost:8000/producto";
    fetch(url, parametros)
      .then((res) => {
        return res.json().then((body) => {
          return {
            status: res.status,
            ok: res.ok,
            headers: res.headers,
            body: body,
          };
        });
      })
      .then((result) => {
        if (result.ok) {
          toast.success(result.body.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          this.props.navigate("/productos");
        } else {
          toast.error(result.body.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>
              {this.props.params.id
                ? `Edicion del producto ${this.props.params.id}`
                : "Alta de producto"}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating" />
              <input
                type="text"
                className="form-control"
                id="floatingNombre"
                placeholder="Nombre"
                onChange={this.handleChange}
                value={this.state.nombre}
                name="nombre"
              />
              {/* <label htmlFor="floatingNombre">Nombre</label> */}
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingDescripcion"
                  placeholder="Descripcion"
                  onChange={this.handleChange}
                  value={this.state.descripcion}
                  name="descripcion"
                />
                <label htmlFor="floatingDescripcion">Descripcion</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="precio"
                  placeholder="Precio"
                  onChange={this.handleChange}
                  value={this.state.precio}
                  name="precio"
                />

                <label htmlFor="precio">Precio</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="url"
                  className="form-control"
                  id="imagen"
                  placeholder="Imagen"
                  onChange={this.handleChange}
                  value={this.state.imagen}
                  name="imagen"
                />

                <label htmlFor="imagen">Imagen</label>
              </div>
              <br />

              {/* 
                            <div className="form-floating">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="ano"
                                    placeholder="ano"
                                    min="0"
                                    max="2030"
                                    data-bind="value:replyNumber"
                                    onChange={this.handleChange}
                                    value={this.state.ano}
                                    name='ano'
                                />
                                <label for="ano">Año</label>
                            </div> */}
              <br />

              <input
                className="btn btn-primary"
                type="submit"
                value="Guardar"
              />
            </form>
          </div>
        </div>
        {/* 
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal> */}
      </div>
    );
  }
}

export default Productos_Edit;

export function Productos_Edit() {
  const p = useParams();

  const navigate = useNavigate();

  return (
    <>
      <Internal_Productos_Edit navigate={navigate} params={p} />
    </>
  );
}

import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clientes from "./clientes";

export class Internal_Clientes_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      nombre: "",
      apellido: "",
      direccion: "",
      telefono: "",
      correo_electronico: "",
      usuarioId: "",
      modal: false,
    };
  }

  // como utilizamos el mismo formulario para crear y actualizar vehiculos, si no vinene ningun parametro significa que es un ALTA
  // pero si viene "vehiculo_id" por parametro (dentro de las this.props del constructor) significa que es una MODIFICACION
  // por lo que aprovechamos el ciclo de vida del componente para realizar un fetch al backend y traer los datos del vehiculo a ser
  // modificado si es que viene dicho dato por parametro
  componentDidMount() {
    if (this.props.params.id) {
      this.fetchCliente(this.props.params.id);
    }
  }

  fetchCliente = (id) => {
    fetch(`http://localhost:8000/cliente/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())

      .then((result) => {
        if (result.ok) {
          this.setState({
            nombre: result.body.detail.nombre,
            apellido: result.body.detail.apellido,
            direccion: result.body.detail.direccion,
            telefono: result.body.detail.telefono,
            correo_electronico: result.body.detail.correo_electronico,
            usuarioId: result.body.detail.usuarioId,
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
  };

  // handler invocado por el evento onSubmit() del formulario, aqui hay dos caminos posibles, un POST para la creacion o un PUT para la edicion
  // eso lo diferenciamos mediante "this.props.params.vehiculo_id", acorde a su existencia debemos cambiar tanto la URL como el METHOD del fetch

  handleSubmit = (event) => {
    event.preventDefault();

    const { id, ...cliente } = this.state;

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:8000/cliente/${id}`
      : "http://localhost:8000/cliente";

    fetch(url, {
      method,
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
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
          this.props.navigate("/clientes");
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
                ? `Edicion del Cliente ${this.props.params.id}`
                : "Alta del Cliente"}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingNombre"
                  placeholder="Nombre"
                  onChange={this.handleChange}
                  value={this.state.nombre}
                  name="nombre"
                />
                <label htmlFor="floatingNombre">Nombre</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingApellido"
                  placeholder="Apellido"
                  onChange={this.handleChange}
                  value={this.state.apellido}
                  name="apellido"
                />
                <label htmlFor="floatingApellido">Apellido</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  placeholder="Direccion"
                  onChange={this.handleChange}
                  value={this.state.direccion}
                  name="direccion"
                />

                <label htmlFor="direccion">Direccion</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  id="telefono"
                  placeholder="telefono"
                  onChange={this.handleChange}
                  value={this.state.telefono}
                  name="telefono"
                />
                <label for="telefono">Telefono</label>
              </div>
              <br />
              <br />

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="correo_electronico"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.correo_electronico}
                  name="correo_electronico"
                />
                <label for="correo_electronico">Email</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  id="usuarioId"
                  placeholder="UsuarioId"
                  onChange={this.handleChange}
                  value={this.state.usuarioId}
                  name="usuarioId"
                />
                <label for="usuarioId">Usuario Id</label>
              </div>
              <br />

              <input
                className="btn btn-primary"
                type="submit"
                value="Guardar"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Clientes_Edit;

export function Clientes_Edit() {
  const p = useParams();

  const navigate = useNavigate();

  return (
    <>
      <Internal_Clientes_Edit navigate={navigate} params={p} />
    </>
  );
}

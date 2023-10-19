import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class Clientes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientes: [],
      //cliente: props.location.state.cliente,
      modal: false,
      idToDelete: null,
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    let parametros = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    };

    fetch("http://localhost:8000/cliente", parametros)
      .then((res) =>
        res.json().then((body) => ({
          status: res.status,
          ok: res.ok,
          headers: res.headers,
          body: body,
        }))
      )
      .then((result) => {
        if (result.ok) {
          this.setState({
            clientes: result.body,
            modal: false,
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
      .catch((error) => console.log(error));
  }

  closeModal() {
    this.setState({
      modal: false,
      idToDelete: null,
    });
  }

  showModal(id) {
    this.setState({
      modal: true,
      idToDelete: id,
    });
  }

  handleClickDelete() {
    let parametros = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Accept: "application/json",
      },
    };
    const url = `http://localhost:8000/cliente/${this.state.idToDelete}`;
    fetch(url, parametros)
      .then((res) =>
        res.json().then((body) => ({
          status: res.status,
          ok: res.ok,
          headers: res.headers,
          body: body,
        }))
      )
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
          this.componentDidMount();
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
      .catch((error) => console.log(error));
  }

  render() {
    const filas = this.state.clientes.map((cliente, index) => (
      <tr key={index}>
        <td>{cliente.nombre}</td>
        <td>{cliente.apellido}</td>
        <td>{cliente.direccion}</td>
        <td>{cliente.telefono}</td>
        <td>{cliente.correo_electronico}</td>
        <td>{cliente.usuarioId}</td>
        <td>
          <Link
            to={{
              pathname: `/clientes/edit/${cliente.id}`,
              state: { cliente },
            }}
            className="btn btn-primary"
          >
            <span className="material-symbols-outlined">edit</span>
          </Link>

          <button
            className="btn btn-danger"
            onClick={() => this.showModal(cliente.id)}
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </td>
      </tr>
    ));
    return (
      <>
        <div>
          <table className="table  table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Mail</th>
                <th>usuarioId</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{filas}</tbody>
          </table>
          <br />
          <Link to="/clientes/edit" className="btn btn-info">
            Nuevo Cliente
          </Link>
        </div>

        <Modal show={this.state.modal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación de Eliminacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Está seguro de eliminar el cliente seleccionado?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.closeModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.handleClickDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Clientes;

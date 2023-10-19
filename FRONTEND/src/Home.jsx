import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

export default function Home() {
  return (
    <>
      {" "}
      <h1>Algunos productos</h1>
      <div className="d-flex justify-content-around">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/401778e50ef4449d9656d40e9346b8af_9366/Camiseta_Titular_River_Plate_23-24_Blanco_HT3679_01_laydown.jpg"
          />
          <Card.Body>
            <Card.Title>Camiseta River Temp 23-24</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">PEDIR</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://pbs.twimg.com/media/CQfjMNEWUAA3BFc.jpg"
          />
          <Card.Body>
            <Card.Title>Camiseta de Independiente</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">PEDIR</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://sporting.vteximg.com.br/arquivos/ids/201295-1000-1000/1640020-000-1.jpg?v=637152942987430000"
          />
          <Card.Body>
            <Card.Title>Camiseta de Racing</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">PEDIR</Button>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://th.bing.com/th/id/R.04db5a5b8c9e05b3a9837a1f060f333c?rik=EgQrPmmAjoYuqg&riu=http%3a%2f%2fwww.maillots-football.com%2fmedia%2f47528%2fboca-juniors-thuisshirt-2021-2022.jpg&ehk=DB0hT7CU9B7hEAtcMkcrFbYs%2bz1QBD0ncpeRQ9p%2bFYk%3d&risl=&pid=ImgRaw&r=0"
          />
          <Card.Body>
            <Card.Title>Camiseta de Boca</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">PEDIR</Button>
          </Card.Body>
        </Card>
      </div>
      <footer>Sobre Nosotros</footer>
    </>
  );
}

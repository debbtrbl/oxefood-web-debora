import InputMask from "comigo-tech-react-input-mask";
import { React, useState } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FormCliente() {
  const [titulo, setTitulo] = useState();
  const [codigo, setCodigo] = useState();
  const [descricao, setDescricao] = useState();
  const [valorUnitario, setValorUnitario] = useState();
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();

  function salvar() {
    let produtoRequest = {
      titulo: titulo,
      codigo: codigo,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo,
    };

    axios
      .post("http://localhost:8080/api/produto", produtoRequest)
      .then((response) => {
        console.log("Produto cadastrado com sucesso.");
      })
      .catch((error) => {
        console.log("Erro ao incluir o um produto.");
      });
  }

  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Produto &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label="Título"
                  maxLength="100"
                  width={13}
                  placeholder="Informe o título do produto"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Código do produto"
                  width={5}
                  placeholder="Informe o código do produto"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                ></Form.Input>
              </Form.Group>
              <Form.TextArea
                fluid
                label="Descrição"
                placeholder="Informe a descrição do produto"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <Form.Group>
                <Form.Input
                  fluid
                  label="Valor unitário"
                  width={6}
                  placeholder="Informe o valor unitário"
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Tempo de entrega mínimo em minutos"
                  width={6}
                  placeholder="Informe o tempo de entrega mínimo"
                  value={tempoEntregaMinimo}
                  onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Tempo de entrega máximo em minutos"
                  width={6}
                  placeholder="Informe o tempo de entrega máximo"
                  value={tempoEntregaMaximo}
                  onChange={(e) => setTempoEntregaMaximo(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to="/list-produto">
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
              >
                <Icon name="reply" />
                Listar
              </Button>
              </Link>
              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

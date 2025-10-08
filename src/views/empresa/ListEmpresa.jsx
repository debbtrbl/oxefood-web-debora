import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  Modal,
  Header,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListEmpresa() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/empresa").then((response) => {
      setLista(response.data);
    });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/empresa/" + idRemover)
      .then((response) => {
        console.log("Empresa removida com sucesso.");

        axios.get("http://localhost:8080/api/empresa").then((response) => {
          setLista(response.data);
        });
      })
      .catch((error) => {
        console.log("Erro ao remover uma empresa.");
      });
    setOpenModal(false);
  }

  return (
    <div>
      <MenuSistema tela={"empresa"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Empresa </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-empresa"
            />
            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome Fantasia</Table.HeaderCell>
                  <Table.HeaderCell>Nome Empresarial</Table.HeaderCell>
                  <Table.HeaderCell>CNPJ</Table.HeaderCell>
                  <Table.HeaderCell>Inscrição Estadual</Table.HeaderCell>
                  <Table.HeaderCell>Site</Table.HeaderCell>
                  <Table.HeaderCell>Telefone 1</Table.HeaderCell>
                  <Table.HeaderCell>Telefone 2</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((empresa) => (
                  <Table.Row key={empresa.id}>
                    <Table.Cell>{empresa.nomeFantasia}</Table.Cell>
                    <Table.Cell>{empresa.nomeEmpresarial}</Table.Cell>
                    <Table.Cell>{empresa.cnpj}</Table.Cell>
                    <Table.Cell>{empresa.inscricaoEstadual}</Table.Cell>
                    <Table.Cell width={2}>{empresa.site}</Table.Cell>
                    <Table.Cell>{empresa.fone}</Table.Cell>
                    <Table.Cell>{empresa.foneAlternativo}</Table.Cell>

                    <Table.Cell textAlign="center">
                      <Link to="/form-empresa" state={{ id: empresa.id }}>
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados desta empresa"
                          icon
                        >
                          <Icon name="edit" />
                        </Button>
                      </Link>
                      <Button
                        inverted
                        circular
                        color="red"
                        onClick={(e) => confirmaRemover(empresa.id)}
                        title="Clique aqui para remover esta empresa"
                        icon
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <Header icon>
          <Icon name="trash" />
          <div style={{ marginTop: "5%" }}>
            {" "}
            Tem certeza que deseja remover esse registro?{" "}
          </div>
        </Header>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => setOpenModal(false)}
          >
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" inverted onClick={() => remover()}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

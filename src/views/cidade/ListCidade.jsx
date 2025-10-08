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

export default function ListCidade() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/cidade").then((response) => {
      setLista(response.data);
    });
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

   function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

    function detalhesCidade(id) {
    setOpenModal2(true);
  }
  async function remover() {
    await axios
      .delete("http://localhost:8080/api/cidade/" + idRemover)
      .then((response) => {
        console.log("Cidade removida com sucesso.");

        axios.get("http://localhost:8080/api/cidade").then((response) => {
          setLista(response.data);
        });
      })
      .catch((error) => {
        console.log("Erro ao remover uma cidade.");
      });
    setOpenModal(false);
  }

  return (
    <div>
      <MenuSistema tela={"cidade"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Cidade </h2>
          <Divider />
          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-cidade"
            />
            <br />
            <br />
            <br />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Estado</Table.HeaderCell>
                  <Table.HeaderCell>Detalhes</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {lista.map((cidade) => (
                  <Table.Row key={cidade.id}>
                    <Table.Cell width={5}>{cidade.nome}</Table.Cell>
                    <Table.Cell width={5}>{cidade.estado.sigla}</Table.Cell>
                    <Table.Cell width={2} textAlign="center">
                        <Button
                        inverted
                        color="orange"
                        onClick={(e) => detalhesCidade(cidade.id)}
                        title="Clique aqui para ver detalhes desta cidade"
                        icon
                      >
                        Ver detalhes
                      </Button>
                    </Table.Cell>
                    <Table.Cell width={6} textAlign="center">
                        
                      <Link to="/form-cidade" state={{ id: cidade.id }}>
                        <Button
                          inverted
                          circular
                          color="green"
                          title="Clique aqui para editar os dados desta cidade"
                          icon
                        >
                          <Icon name="edit" />
                        </Button>
                      </Link>
                      <Button
                        inverted
                        circular
                        color="red"
                        onClick={(e) => confirmaRemover(cidade.id)}
                        title="Clique aqui para remover esta cidade"
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
            <Icon name='trash' />
            <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
        </Header>
        <Modal.Actions>
            <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                <Icon name='remove' /> Não
            </Button>
            <Button color='green' inverted onClick={() => remover()}>
                <Icon name='checkmark' /> Sim
            </Button>
        </Modal.Actions>
</Modal>
<Modal
        basic
        onClose={() => setOpenModal2(false)}
        onOpen={() => setOpenModal2(true)}
        open={openModal2}
>
        <Header icon>
            <Icon name='map' />
            <div style={{marginTop: '5%'}}> Detalhamento da Cidade  </div>
            {lista.map((cidade) => (
                <p textAlign="justified">Nome: {cidade.nome} <br/>  UF: {cidade.estado.sigla} <br/> População: {cidade.qtdPopulacao} <br/>Data de fundação:{formatarData(cidade.dataFundacao)}</p>
                
            ))}
            
        </Header>
        <Modal.Actions>
            <Button basic color='red' inverted onClick={() => setOpenModal2(false)}>
                <Icon name='remove' /> Fechar
            </Button>
        </Modal.Actions>
</Modal>
    </div>
  );
}

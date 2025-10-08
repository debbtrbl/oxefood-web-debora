import InputMask from "comigo-tech-react-input-mask";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Icon,
} from "semantic-ui-react";
import axios from "axios";
import MenuSistema from "../../MenuSistema";
import { Link, useLocation } from "react-router-dom";

export default function FormEmpresa() {
  const [site, setSite] = useState();
  const [cnpj, setCnpj] = useState();
  const [inscricaoEstadual, setInscricaoEstadual] = useState();
  const [nomeEmpresarial, setNomeEmpresarial] = useState();
  const [nomeFantasia, setNomeFantasia] = useState();
  const [fone, setFone] = useState();
  const [foneAlternativo, setFoneAlternativo] = useState();
  const { state } = useLocation();
  const [idEmpresa, setIdEmpresa] = useState();


  useEffect(() => {
    if (state !== null && state.id !== null) {
      axios
        .get("http://localhost:8080/api/empresa/" + state.id)
        .then((response) => {
        setIdEmpresa(response.data.id);
        setSite(response.data.site);
        setCnpj(response.data.cnpj);
        setInscricaoEstadual(response.data.inscricaoEstadual);
        setNomeEmpresarial(response.data.nomeEmpresarial);
        setNomeFantasia(response.data.nomeFantasia);
        setFone(response.data.fone);
        setFoneAlternativo(response.data.foneAlternativo);
        });
    }
  }, [state]);

  function salvar() {
    let empresaRequest = {
        site: site,
        cnpj: cnpj,
        inscricaoEstadual: inscricaoEstadual,
        nomeEmpresarial: nomeEmpresarial,
        nomeFantasia: nomeFantasia,
        fone: fone,
        foneAlternativo: foneAlternativo
    };

    if (idEmpresa !== null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/empresa/" + idEmpresa, empresaRequest)
        .then((response) => {
          console.log("Empresa alterada com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alterar a empresa.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/empresa", empresaRequest)
        .then((response) => {
          console.log("Empresa cadastrada com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir a empresa.");
        });
    }
  }

  return (
    <div>
      <MenuSistema tela="empresa" />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEmpresa === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Empresa &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idEmpresa != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Empresa &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Editar
            </h2>
          )}
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
                <Form.Group>
                <Form.Input
                  fluid
                  required
                    placeholder="Digite o nome empresarial da empresa"
                  label="Nome Empresarial"
                  width={9}
                  value={nomeEmpresarial}
                  onChange={(e) => setNomeEmpresarial(e.target.value)}
                ></Form.Input>

                <Form.Input
                  fluid
                  required
                  placeholder="Digite o nome fantasia da empresa"
                  label="Nome Fantasia"
                  width={9}
                  value={nomeFantasia}
                  onChange={(e) => setNomeFantasia(e.target.value)}
                ></Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label="Site"
                  placeholder="Digite o site da empresa"
                  maxLength="100"
                  width={8}
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                />

                <Form.Input required fluid label="CNPJ" width={5}>
                  <InputMask
                    required
                    placeholder="99.999.999/9999-99"
                    mask="99.999.999/9999-99"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </Form.Input>
                <Form.Input
                  fluid
                  label="Inscrição Estadual"
                  width={5}
                  placeholder="Digite a inscrição estadual"
                  value={inscricaoEstadual}
                  onChange={(e) => setInscricaoEstadual(e.target.value)}
                ></Form.Input>
              </Form.Group>
              
              <Form.Group>
                <Form.Input
                  fluid
                  required
                  label="Telefone"
                  width={9}
                  value={fone}
                  onChange={(e) => setFone(e.target.value)}
                >
                    <InputMask
                      mask="(99) 99999-9999"
                      value={fone}
                      placeholder="(99) 99999-9999"
                      onChange={(e) => setFone(e.target.value)}
                    />
                </Form.Input>
                <Form.Input
                  fluid
                  required
                  label="Telefone"
                  width={9}
                >
                    <InputMask
                      mask="(99) 99999-9999"
                      value={foneAlternativo}
                      placeholder="(99) 99999-9999"
                      onChange={(e) => setFoneAlternativo(e.target.value)}
                    />
                </Form.Input>
              </Form.Group>

                
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to="/list-empresa">
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" />
                  Voltar
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

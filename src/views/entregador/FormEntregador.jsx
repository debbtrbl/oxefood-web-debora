import InputMask from "comigo-tech-react-input-mask";
import React from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";

export default function FormCliente() {
  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group>
                <Form.Input required fluid label="Nome" maxLength="100"  width={8} />

                <Form.Input required fluid label="CPF"  width={5}>
                  <InputMask required mask="999.999.999-99" />
                </Form.Input>
                <Form.Input fluid label="RG"  width={5}>
                </Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input fluid label="Data de nascimento" width={6}></Form.Input>
                <Form.Input required fluid label="Telefone Celular" width={6}>
                  <InputMask required mask="(99) 99999-9999" />
                </Form.Input>
                <Form.Input fluid label="Telefone Fixo" width={6}>
                  <InputMask mask="(99) 9999-9999" />
                </Form.Input>
                <Form.Input fluid label="Qtd. de entregas realizadas" width={6}></Form.Input>
                <Form.Input fluid label="Valor por frete" width={6}></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Rua" width={13}></Form.Input>
                <Form.Input fluid label="Número" width={5}></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Bairro" width={7}></Form.Input>
                <Form.Input fluid label="Cidade" width={7}></Form.Input>
                <Form.Input fluid label="CEP" width={4}></Form.Input>
              </Form.Group>

              <Form.Select
                fluid
                label="UF"
                options={[
                  { key: "PE", text: "Pernambuco", value: "PE" },
                  { key: "SP", text: "São Paulo", value: "SP" },
                  { key: "RJ", text: "Rio de Janeiro", value: "RJ" },
                ]}
                placeholder="Selecione"
              />

              <Form.Input fluid label="Complemento"></Form.Input>
              <Form.Group>
                <label><strong>Ativo: </strong></label>
                <Form.Radio label="Sim" style={{ marginTop: "4%" }} defaultChecked>
                  <input type="checkbox"  /> 
                </Form.Radio>
                <Form.Radio label="Não" style={{ marginTop: "4%" }}>
                  <input type="checkbox"  /> 
                </Form.Radio>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
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

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
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

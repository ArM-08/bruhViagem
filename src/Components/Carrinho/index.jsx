import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import CardCarrinho from "../CardCarrinho";
import { Button, Card, message } from "antd";
import "./index.css"
const Carrinho = () => {
  const context = useContext(CartContext);
  const { carrinho } = context;
  const total = carrinho.reduce(
    (acc, produto) => produto.value * produto.quantidade + acc,
    0
  );

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi

      .open({
        type: "loading",
        content: "Finalizando Pagamento..",
        duration: 4.0,
      })
      .then(() => message.success("Compra efetuada com sucesso", 3.5));
  };

  return (
    <div>
      <Card type="inner" title="Carrinho" className="containerCarrinho">
        {carrinho.map((destino) => (
          <CardCarrinho destino={destino} key={destino.id} />
        ))}
        {carrinho.length >= 1 && (
          <div className="total" >
            <h3> Valor Total: R$ {total.toFixed(2).replace(".", ",")} </h3>
            {contextHolder}
            <Button
            className="btnTotal"
              type="primary"
              onClick={success}
            >
              Finalizar Compra
            </Button>
          </div>
        )}
        {carrinho.length === 0 && <h2>Carrinho Vazio</h2>}
      </Card>
    </div>
  );
};

export default Carrinho;

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { formatToCurrency } from '~/utils/format';

import { Container, Content, ContentSection } from './styles';

export default function DetailsModal({ data, onClose }) {
  const [serviceOrderItems, setServiceOrderItems] = useState([]);
  const [serviceOrderPayments, setServiceOrderPayments] = useState([]);

  const paidValue = useMemo(() => {
    return serviceOrderPayments.reduce((total, payment) => {
      const sum = parseFloat(total) + parseFloat(payment.value);

      return sum;
    }, 0);
  }, [serviceOrderPayments]);

  useEffect(() => {
    async function loadServiceOrderItems() {
      const response = await api.get(`service_orders/${data.id}/items`);

      setServiceOrderItems(response.data);
    }

    async function loadServiceOrderPayments() {
      const response = await api.get(`service_orders/${data.id}/payments`);

      setServiceOrderPayments(response.data);
    }

    loadServiceOrderItems();
    loadServiceOrderPayments();
  }, [data]);

  return (
    <Container>
      <header>
        <h3>Detalhes da Ordem de Serviço</h3>
      </header>

      <Content>
        <ContentSection className="service-order-financial">
          <header>
            <h4>Financeiro</h4>
          </header>

          <div>
            <span className="totalValue">
              <strong>Valor Total: </strong>
              {formatToCurrency(data.total_value)}
            </span>

            <span className="paidValue">
              <strong>Valor Pago: </strong>
              {formatToCurrency(paidValue)}
            </span>
          </div>
        </ContentSection>

        <ContentSection className="service-order-items">
          <header>
            <h4>Itens do Serviço</h4>
          </header>

          <ul>
            {serviceOrderItems.map((item) => (
              <li key={String(item.id)}>
                <span className="itemAmount">
                  <strong>Quantidade: </strong>
                  {item.amount}
                </span>

                <span className="itemDescription">
                  <strong>Descrição: </strong>
                  {item.description}
                </span>

                <span className="itemValue">
                  <strong>Valor Unitário: </strong>
                  {formatToCurrency(item.value)}
                </span>

                <span className="itemTotalValue">
                  <strong>Valor Total: </strong>
                  {formatToCurrency(item.amount * item.value)}
                </span>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection className="service-order-payments">
          <header>
            <h4>Pagamentos</h4>
          </header>

          <ul>
            {serviceOrderPayments.map((payment) => (
              <li key={String(payment.id)}>
                <span className="paymentDate">
                  <strong>Data: </strong>
                  {format(parseISO(payment.date), 'dd/MM/yyyy', { locale: pt })}
                </span>

                <span className="paymentValue">
                  <strong>Valor: </strong>
                  {formatToCurrency(payment.value)}
                </span>

                <span className="paymentMethod">
                  <strong>Forma de Pagamento: </strong>
                  {payment.payment_method.description}
                </span>
              </li>
            ))}
          </ul>
        </ContentSection>
      </Content>

      <footer>
        <button type="button" onClick={onClose}>
          OK
        </button>
      </footer>
    </Container>
  );
}

DetailsModal.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    total_value: PropTypes.string.isRequired,
    paid_out: PropTypes.bool.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

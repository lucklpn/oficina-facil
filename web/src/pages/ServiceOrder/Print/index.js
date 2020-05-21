import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { formatToPhone, formatToCpf, formatToDecial } from '~/utils/format';

import {
  Wrapper,
  Header,
  CompanyInfo,
  CustomerInfo,
  ServiceOrderInfo,
  DateIssue,
  Content,
} from './styles';

import logo from '~/assets/logo.png';

export default function ServiceOrderPrinting() {
  const [serviceOrder, setServiceOrder] = useState(undefined);

  useEffect(() => {
    async function loadServiceOrder(id) {
      const response = await api.get(`service_orders/${id}`);

      setServiceOrder(response.data);
    }

    const { state } = window.history.state;

    if (state.service_order_id) {
      loadServiceOrder(state.service_order_id);
    }
  }, []);

  if (!serviceOrder) {
    return <Wrapper />;
  }

  return (
    <Wrapper>
      <Header>
        <div className="logo">
          <img src={logo} alt="Logo" />

          <CompanyInfo>
            <h3>AUTO MECÂNICA JUNIOR IORI</h3>
            <div>
              <strong>Endereço: </strong>
              <span>rua Teste Impressão, 245</span>
            </div>
            <div>
              <strong>Bairro: </strong>
              <span>Jardim Panorama</span>
            </div>
            <div>
              <strong>Cidade: </strong>
              <span>Itajobi - SP</span>
            </div>
            <div>
              <strong>Telefone: </strong>
              <span>(17) 99752-7884</span>
            </div>
          </CompanyInfo>
        </div>

        <div className="service-order">
          <ServiceOrderInfo>
            <div className="service-order-number">
              <h1>Ordem de Serviço - nº {serviceOrder.id}</h1>
            </div>

            <div className="service-order-date">
              <strong>
                {serviceOrder.date &&
                  format(parseISO(serviceOrder.date), 'dd/MM/yyyy', {
                    locale: pt,
                  })}
              </strong>
            </div>
          </ServiceOrderInfo>

          <CustomerInfo>
            <div>
              <strong>Cliente: </strong>
              <span>{serviceOrder.customer.name}</span>
            </div>

            <div>
              <strong>Endereço: </strong>
              <span>
                {`${serviceOrder.customer.address}, ${serviceOrder.customer.address_number}, ${serviceOrder.customer.district} - ${serviceOrder.customer.city}, ${serviceOrder.customer.state}`}
              </span>
            </div>

            <div>
              <div>
                <strong>Telefone: </strong>
                <span>{formatToPhone(serviceOrder.customer.phone)}</span>
              </div>

              <div>
                <strong>CPF: </strong>
                <span>{formatToCpf(serviceOrder.customer.cpf)}</span>
              </div>
            </div>

            <div>
              <div>
                <strong>Veículo: </strong>
                <span>
                  {serviceOrder.customer_car &&
                    `${serviceOrder.customer_car.model}, ${serviceOrder.customer_car.manufacture_year}`}
                </span>
              </div>

              <div>
                <strong>Placa: </strong>
                <span>
                  {serviceOrder.customer_car &&
                    serviceOrder.customer_car.license_plate}
                </span>
              </div>
            </div>
          </CustomerInfo>

          <DateIssue>
            <i>Emitido em: {format(new Date(), "dd/MM/yyyy' 'HH:mm:ss")}</i>
          </DateIssue>
        </div>
      </Header>

      <Content>
        <table cellSpacing="0">
          <thead>
            <tr>
              <th className="amountColumn">QUANTIDADE</th>
              <th className="descriptionColumn">DESCRIÇÃO</th>
              <th className="valueColumn">VALOR (R$)</th>
            </tr>
          </thead>
          <tbody>
            {serviceOrder.items &&
              serviceOrder.items.map((item) => (
                <tr key={String(item.id)}>
                  <td>{item.amount}</td>
                  <td>{item.description}</td>
                  <td>{formatToDecial(item.value)}</td>
                </tr>
              ))}

            <tr className="totalRow">
              <td colSpan="2">TOTAL</td>
              <td>{formatToDecial(serviceOrder.total_value)}</td>
            </tr>
          </tbody>
        </table>
      </Content>
    </Wrapper>
  );
}

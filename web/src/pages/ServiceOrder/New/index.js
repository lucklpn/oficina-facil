import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { parse } from 'date-fns';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import MainData from './MainData';
import ServiceItems from './ServiceItems';
import FinancialData from './FinancialData';
import NewServiceItemModal from './NewServiceItemModal';

import { Wrapper, Header } from './styles';

export default function NewServiceOrder() {
  const [serviceItems, setServiceItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalServiceItem, setModalServiceItem] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const totalValue = useMemo(() => {
    return serviceItems.reduce((total, item) => {
      return total + item.total_value;
    }, 0);
  }, [serviceItems]);

  const serviceOrderSchema = Yup.object().shape({
    customer_id: Yup.string().required('* Campo obrigatório'),
    customer_car_id: Yup.string().required('* Campo obrigatório'),
    date: Yup.string().required('* Campo obrigatório'),
    service_items: Yup.array(
      Yup.object().shape({
        description: Yup.string().required('* Campo obrigatório'),
        amount: Yup.string().required('* Campo obrigatório'),
        value: Yup.string().required('* Campo obrigatório'),
      })
    ),
    total_value: Yup.string(),
    payment: Yup.object().shape({
      value: Yup.string(),
      payment_method_id: Yup.string().when('value', (value, field) =>
        value ? field.required('* Campo obrigatório') : field
      ),
    }),
  });

  function handleAddServiceItem(data) {
    setServiceItems([
      ...serviceItems,
      { ...data, total_value: data.amount * data.value },
    ]);

    setModalIsOpen(false);
  }

  function handleEditServiceItem(data) {
    const serviceItemIndex = serviceItems.findIndex(
      (item) =>
        item.description.toLowerCase().trim() ===
        modalServiceItem.description.toLowerCase().trim()
    );

    setServiceItems(
      serviceItems.map((item, index) => {
        if (index !== serviceItemIndex) return item;

        return { ...data, total_value: data.amount * data.value };
      })
    );

    setModalServiceItem(null);
    setModalIsOpen(false);
  }

  function handleRemoveServiceItem(index) {
    setServiceItems(serviceItems.filter((item, i) => i !== index));
  }

  // eslint-disable-next-line
  async function storeServiceOrder({ total_value, ...data }) {
    const parsedDate = parse(data.date, 'dd/MM/yyyy', new Date());

    const response = await api.post('service_orders', {
      ...data,
      date: parsedDate,
    });

    return response.data.id;
  }

  async function storeServiceItem(serviceOrderId, data) {
    await api.post(`service_orders/${serviceOrderId}/items`, data);
  }

  async function storeServicePayment(serviceOrderId, data) {
    const parsedDate = parse(data.date, 'dd/MM/yyyy', new Date());

    await api.post(`service_orders/${serviceOrderId}/payments`, {
      ...data,
      date: parsedDate,
    });
  }

  async function handleSubmit(data) {
    if (serviceItems.length === 0) {
      toast.error('Por favor, informe os itens da ordem de serviço');
      return;
    }

    if (parseFloat(data.payment.value) > parseFloat(data.total_value)) {
      toast.error('Valor de pagamento excede valor total da ordem de serviço');
      return;
    }

    setLoading(true);

    try {
      const { service_items: items, payment, ...rest } = data;

      const serviceOrderId = await storeServiceOrder(rest);

      for (const item of items) {
        await storeServiceItem(serviceOrderId, item); //eslint-disable-line
      }

      if (payment.value) {
        await storeServicePayment(serviceOrderId, {
          ...payment,
          date: rest.date,
        });
      }

      toast.success('Ordem de serviço cadastrada com sucesso');

      setLoading(false);

      setTimeout(() => {
        history.push('/orders');
      }, 3000);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response
          ? err.response.data.error
          : 'Erro ao salvar ordem de serviço'
      );
    }
  }

  return (
    <>
      <Wrapper>
        <Header>
          <h1>CADASTRO DE ORDEM DE SERVIÇO</h1>

          <button type="button" className="cancel-button">
            <Link to="/orders">CANCELAR</Link>
          </button>
        </Header>

        <Form onSubmit={handleSubmit} schema={serviceOrderSchema}>
          <MainData />

          <ServiceItems
            data={serviceItems}
            onShowModal={() => {
              setModalIsOpen(true);
            }}
            onEditItem={(serviceItem) => {
              setModalServiceItem(serviceItem);
              setModalIsOpen(true);
            }}
            onRemoveItem={(index) => {
              handleRemoveServiceItem(index);
            }}
          />

          <FinancialData totalValue={totalValue} />

          <button type="submit" disabled={loading}>
            {loading ? 'SALVANDO...' : 'SALVAR'}
          </button>
        </Form>
      </Wrapper>

      <NewServiceItemModal
        isOpen={modalIsOpen}
        data={modalServiceItem}
        onAddItem={handleAddServiceItem}
        onEditItem={handleEditServiceItem}
        onClose={() => {
          setModalIsOpen(false);
        }}
      />
    </>
  );
}

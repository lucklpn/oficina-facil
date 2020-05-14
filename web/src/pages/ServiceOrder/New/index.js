import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import MainData from './MainData';
import ServiceItems from './ServiceItems';
import FinancialData from './FinancialData';
import NewServiceItemModal from './NewServiceItemModal';

import { Wrapper, Header } from './styles';

export default function NewServiceOrder() {
  const [serviceOrder, setServiceOrder] = useState({}); //eslint-disable-line
  const [serviceItems, setServiceItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalServiceItem, setModalServiceItem] = useState(undefined);
  const [loading, setLoading] = useState(false); //eslint-disable-line

  const serviceOrderSchema = Yup.object().shape({
    customer_id: Yup.number()
      .typeError('* Campo obrigatório')
      .required('* Campo obrigatório'),
    customer_car_id: Yup.number()
      .typeError('* Campo obrigatório')
      .required('* Campo obrigatório'),
    date: Yup.date()
      .typeError('Por favor informe um valor válido')
      .required('* Campo obrigatório'),
    service_items: Yup.array(
      Yup.object().shape({
        description: Yup.string().required('* Campo obrigatório'),
        amount: Yup.number()
          .typeError('* Campo obrigatório')
          .required('* Campo obrigatório')
          .min(1, 'Quantidade mínima é 1'),
        value: Yup.number()
          .typeError('* Campo obrigatório')
          .required('* Campo obrigatório')
          .min(1, 'Valor mínimo é 1'),
      })
    ),
  });

  useEffect(() => {
    async function loadCustomer() {
      // try {
      //   const response = await api.get(`customers/${customerId}`);
      //   setCustomer(response.data);
      // } catch (err) {
      //   toast.error(
      //     err.response ? err.response.data.error : 'Erro ao buscar cliente.'
      //   );
      // }
    }

    async function loadCars() {
      // try {
      //   const response = await api.get(`customers/${customerId}/cars`);
      //   setCars(response.data);
      // } catch (err) {
      //   toast.error(
      //     err.response ? err.response.data.error : 'Erro ao buscar veículos.'
      //   );
      // }
    }

    const routeParam = window.location.pathname.split('/')[2];

    if (routeParam !== 'new' && Number(routeParam)) {
      loadCustomer(routeParam);
      loadCars(routeParam);
    }
  }, []);

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

    setModalIsOpen(false);
  }

  function handleRemoveServiceItem(index) {
    setServiceItems(
      serviceItems.map((item, i) => {
        if (i !== index) return item;

        return { ...item, removed: true };
      })
    );
  }

  // eslint-disable-next-line
  async function saveCustomer(customerData) {
    // if (customer.id) {
    //   await api.put(`customers/${customer.id}`, customerData);
    //   return customer.id;
    // }
    // const response = await api.post('customers', customerData);
    // return response.data.id;
  }

  // eslint-disable-next-line
  async function saveCar(customerId, customerCar) {
    // const car = cars.find((c) => c.license_plate === customerCar.license_plate);
    // if (car.removed) return;
    // if (car && car.id) {
    //   await api.put(`customers/${customerId}/cars/${car.id}`, customerCar);
    // } else {
    //   await api.post(`customers/${customerId}/cars`, customerCar);
    // }
  }

  // eslint-disable-next-line
  async function deleteCar(customerId, customerCarId) {
    // await api.delete(`customers/${customerId}/cars/${customerCarId}`);
  }

  // eslint-disable-next-line
  async function handleSubmit(data) {
    // const customerCarsAmount = cars.filter((c) => !c.removed);
    // if (customerCarsAmount <= 0) {
    //   toast.error(
    //     'Não é possível salvar um cliente sem automóveis cadastrados.'
    //   );
    //   return;
    // }
    // setLoading(true);
    // try {
    //   const customerId = await saveCustomer(data);
    //   for (const car of cars) {
    //     await saveCar(customerId, car); //eslint-disable-line
    //   }
    //   const removedCars = cars.filter((c) => c.removed);
    //   for (const car of removedCars) {
    //     await deleteCar(customerId, car.id); //eslint-disable-line
    //   }
    //   toast.success(
    //     `Cliente ${customer.id ? 'atualizado' : 'cadastrado'} com sucesso.`
    //   );
    //   setLoading(false);
    //   setTimeout(() => {
    //     history.push('/customers');
    //   }, 3000);
    // } catch (err) {
    //   setLoading(false);
    //   toast.error(
    //     err.response ? err.response.data.error : 'Erro ao salvar cliente.'
    //   );
    // }
  }

  return (
    <>
      <Wrapper>
        <Header>
          <h1>CADASTRO DE SERVIÇO</h1>

          <button type="button" className="cancel-button">
            <Link to="/orders">CANCELAR</Link>
          </button>
        </Header>

        <Form
          onSubmit={handleSubmit}
          initialData={serviceOrder}
          schema={serviceOrderSchema}
        >
          <MainData />

          <ServiceItems
            serviceItems={serviceItems}
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

          <FinancialData />

          <button type="submit" disabled={loading}>
            {loading ? 'SALVANDO...' : 'SALVAR'}
          </button>
        </Form>
      </Wrapper>

      <NewServiceItemModal
        isOpen={modalIsOpen}
        serviceItem={modalServiceItem}
        onAddItem={handleAddServiceItem}
        onEditItem={handleEditServiceItem}
        onClose={() => {
          setModalIsOpen(false);
        }}
      />
    </>
  );
}

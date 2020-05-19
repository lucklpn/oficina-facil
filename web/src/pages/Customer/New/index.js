import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import PersonalData from './PersonalData';
import CustomerCars from './CustomerCars';
import NewCustomerCarModal from './NewCustomerCarModal';

import { Wrapper, Header } from './styles';

export default function New() {
  const [customer, setCustomer] = useState({});
  const [cars, setCars] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalCustomerCar, setModalCustomerCar] = useState(null);
  const [loading, setLoading] = useState(false);

  const customerSchema = Yup.object().shape({
    name: Yup.string().required('* Campo obrigatório'),
    email: Yup.string().email(),
    cpf: Yup.string().required('* Campo obrigatório'),
    phone: Yup.string(),
    address: Yup.string(),
    address_number: Yup.string(),
    address_complement: Yup.string(),
    district: Yup.string(),
    zip_code: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    customer_cars: Yup.array(
      Yup.object().shape({
        model: Yup.string().required('* Campo obrigatório'),
        manufacture_year: Yup.string().required('* Campo obrigatório'),
        manufacturer: Yup.string().required('* Campo obrigatório'),
        license_plate: Yup.string().required('* Campo obrigatório'),
      })
    ),
  });

  useEffect(() => {
    async function loadCustomer(customerId) {
      try {
        const response = await api.get(`customers/${customerId}`);

        setCustomer(response.data);
      } catch (err) {
        toast.error(
          err.response ? err.response.data.error : 'Erro ao buscar cliente'
        );
      }
    }

    async function loadCars(customerId) {
      try {
        const response = await api.get(`customers/${customerId}/cars`);

        setCars(response.data);
      } catch (err) {
        toast.error(
          err.response ? err.response.data.error : 'Erro ao buscar veículos'
        );
      }
    }

    const routeParam = window.location.pathname.split('/')[2];

    if (routeParam !== 'new' && Number(routeParam)) {
      loadCustomer(routeParam);
      loadCars(routeParam);
    }
  }, []);

  function handleAddCar(data) {
    const selectedCarIndex = cars.findIndex(
      (car) =>
        car.license_plate.toLowerCase().trim() ===
        data.license_plate.toLowerCase().trim()
    );

    if (modalCustomerCar) {
      if (selectedCarIndex >= 0) {
        if (
          data.license_plate.toLowerCase().trim() !==
          modalCustomerCar.license_plate.toLowerCase().trim()
        ) {
          toast.error('Já existe um automóvel com essa placa cadastrada.');
          return;
        }

        const newCars = cars;
        newCars.splice(selectedCarIndex, 1, data);

        setCars(newCars);
      }
    } else {
      if (selectedCarIndex >= 0) {
        toast.error('Já existe um automóvel com essa placa cadastrada.');
        return;
      }

      setCars([...cars, data]);
    }

    setModalCustomerCar(null);
    setModalIsOpen(false);
  }

  function handleEditCar(licensePlate) {
    const car = cars.find((c) => c.license_plate === licensePlate);

    setModalCustomerCar(car);
    setModalIsOpen(true);
  }

  function handleRemoveCar(licensePlate) {
    setCars(
      cars.map((car) => {
        if (car.license_plate !== licensePlate) return car;

        return { ...car, removed: true };
      })
    );
  }

  async function saveCustomer(customerData) {
    if (customer.id) {
      await api.put(`customers/${customer.id}`, customerData);

      return customer.id;
    }

    const response = await api.post('customers', customerData);

    return response.data.id;
  }

  async function saveCar(customerId, customerCar) {
    const car = cars.find((c) => c.license_plate === customerCar.license_plate);

    if (car.removed) return;

    if (car && car.id) {
      await api.put(`customers/${customerId}/cars/${car.id}`, customerCar);
    } else {
      await api.post(`customers/${customerId}/cars`, customerCar);
    }
  }

  async function deleteCar(customerId, customerCarId) {
    await api.delete(`customers/${customerId}/cars/${customerCarId}`);
  }

  async function handleSubmit(data) {
    const customerCarsAmount = cars.filter((c) => !c.removed);

    if (customerCarsAmount <= 0) {
      toast.error(
        'Não é possível salvar um cliente sem automóveis cadastrados'
      );

      return;
    }

    setLoading(true);

    try {
      const customerId = await saveCustomer(data);

      for (const car of cars) {
        await saveCar(customerId, car); //eslint-disable-line
      }

      const removedCars = cars.filter((c) => c.removed);

      for (const car of removedCars) {
        await deleteCar(customerId, car.id); //eslint-disable-line
      }

      toast.success(
        `Cliente ${customer.id ? 'atualizado' : 'cadastrado'} com sucesso`
      );
      setLoading(false);
      setTimeout(() => {
        history.push('/customers');
      }, 3000);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response ? err.response.data.error : 'Erro ao salvar cliente'
      );
    }
  }

  return (
    <>
      <Wrapper>
        <Header>
          <h1>CADASTRO DE CLIENTE</h1>

          <button type="button" className="cancel-button">
            <Link to="/customers">CANCELAR</Link>
          </button>
        </Header>

        <Form
          onSubmit={handleSubmit}
          initialData={customer}
          schema={customerSchema}
        >
          <PersonalData data={customer} />

          <CustomerCars
            data={cars.filter((car) => !car.removed)}
            showNewCarModal={() => {
              setModalIsOpen(true);
            }}
            handleEditCar={handleEditCar}
            handleRemoveCar={handleRemoveCar}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'SALVANDO...' : 'SALVAR'}
          </button>
        </Form>
      </Wrapper>

      <NewCustomerCarModal
        isOpen={modalIsOpen}
        data={modalCustomerCar || {}}
        onClose={() => {
          setModalIsOpen(false);
        }}
        onSubmit={handleAddCar}
      />
    </>
  );
}

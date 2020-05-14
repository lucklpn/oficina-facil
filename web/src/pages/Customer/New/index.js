import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

import api from '~/services/api';
import history from '~/services/history';

import MaskedInput from './MaskedInput';
import StatesSelect from './StatesSelect';
import CustomerCarsTable from './CustomerCarsTable';

import colors from '~/utils/colors';

import {
  Wrapper,
  Header,
  Container,
  FormContainer,
  FormGroup,
  AddCarButton,
  NewCarModal,
} from './styles';

export default function New() {
  const [customer, setCustomer] = useState({});
  const [cars, setCars] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
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
  });

  const carSchema = Yup.object().shape({
    model: Yup.string().required('* Campo obrigatório'),
    manufacture_year: Yup.number()
      .typeError('* Campo obrigatório')
      .required('* Campo obrigatório')
      .min(1, 'Por favor informe um valor válido')
      .max(new Date().getFullYear(), 'Por favor informe um valor válido'),
    manufacturer: Yup.string().required('* Campo obrigatório'),
    license_plate: Yup.string().required('* Campo obrigatório'),
  });

  useEffect(() => {
    async function loadCustomer(customerId) {
      try {
        const response = await api.get(`customers/${customerId}`);

        setCustomer(response.data);
      } catch (err) {
        toast.error(
          err.response ? err.response.data.error : 'Erro ao buscar cliente.'
        );
      }
    }

    async function loadCars(customerId) {
      try {
        const response = await api.get(`customers/${customerId}/cars`);

        setCars(response.data);
      } catch (err) {
        toast.error(
          err.response ? err.response.data.error : 'Erro ao buscar veículos.'
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
        car.license_plate.toLowerCase() === data.license_plate.toLowerCase()
    );

    if (selectedCar) {
      if (selectedCarIndex >= 0) {
        if (
          cars[selectedCarIndex].license_plate.toLowerCase() !==
          selectedCar.license_plate.toLowerCase()
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

    setSelectedCar(null);
    setModalIsOpen(false);
  }

  function handleEditCar(licensePlate) {
    const car = cars.find((c) => c.license_plate === licensePlate);

    setSelectedCar(car);
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
        'Não é possível salvar um cliente sem automóveis cadastrados.'
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
        `Cliente ${customer.id ? 'atualizado' : 'cadastrado'} com sucesso.`
      );
      setLoading(false);
      setTimeout(() => {
        history.push('/customers');
      }, 3000);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response ? err.response.data.error : 'Erro ao salvar cliente.'
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
          <Container>
            <header>
              <h2>DADOS PESSOAIS</h2>
            </header>

            <FormContainer>
              <FormGroup id="nameFormGroup">
                <label htmlFor="name">Nome</label>
                <Input id="name" name="name" />
              </FormGroup>

              <FormGroup id="emailFormGroup">
                <label htmlFor="email">
                  Email <span>(opcional)</span>
                </label>
                <Input id="email" name="email" type="email" />
              </FormGroup>
            </FormContainer>

            <FormContainer>
              <FormGroup id="cpfFormGroup">
                <label htmlFor="cpf">CPF</label>
                <MaskedInput
                  id="cpf"
                  name="cpf"
                  mask="999.999.999-99"
                  defaultValue={customer.cpf}
                  disabled={!!customer.id}
                />
              </FormGroup>

              <FormGroup id="phoneFormGroup">
                <label htmlFor="phone">
                  Telefone <span>(opcional)</span>
                </label>
                <MaskedInput
                  id="phone"
                  name="phone"
                  mask="(99) 99999-9999"
                  defaultValue={customer.phone}
                />
              </FormGroup>
            </FormContainer>

            <FormContainer>
              <FormGroup id="addressFormGroup">
                <label htmlFor="address">
                  Endereço <span>(opcional)</span>
                </label>
                <Input id="address" name="address" />
              </FormGroup>

              <FormGroup id="addressNumberFormGroup">
                <label htmlFor="address_number">
                  Número <span>(opcional)</span>
                </label>
                <Input id="address_number" name="address_number" />
              </FormGroup>
            </FormContainer>

            <FormContainer>
              <FormGroup id="addressComplementFormGroup">
                <label htmlFor="address_complement">
                  Complemento <span>(opcional)</span>
                </label>
                <Input id="address_complement" name="address_complement" />
              </FormGroup>

              <FormGroup id="districtFormGroup">
                <label htmlFor="district">
                  Bairro <span>(opcional)</span>
                </label>
                <Input id="district" name="district" />
              </FormGroup>
            </FormContainer>

            <FormContainer>
              <FormGroup id="zipCodeFormGroup">
                <label htmlFor="zip_code">
                  CEP <span>(opcional)</span>
                </label>
                <MaskedInput
                  id="zip_code"
                  name="zip_code"
                  mask="99999-999"
                  defaultValue={customer.zip_code}
                />
              </FormGroup>

              <FormGroup id="cityFormGroup">
                <label htmlFor="city">
                  Cidade <span>(opcional)</span>
                </label>
                <Input id="city" name="city" />
              </FormGroup>

              <FormGroup id="stateFormGroup">
                <label htmlFor="state">
                  Estado <span>(opcional)</span>
                </label>
                <StatesSelect
                  id="state"
                  name="state"
                  defaultValue={customer.state}
                />
              </FormGroup>
            </FormContainer>
          </Container>

          <Container>
            <header>
              <h2>AUTOMÓVEIS</h2>
            </header>

            {cars.filter((car) => !car.removed).length > 0 && (
              <CustomerCarsTable
                cars={cars}
                onEditCar={handleEditCar}
                onRemoveCar={handleRemoveCar}
              />
            )}

            <AddCarButton
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              <FaPlus size={16} color={colors.blue.main} />
              Adicionar automóvel
            </AddCarButton>
          </Container>

          <button type="submit" disabled={loading}>
            {loading ? 'SALVANDO...' : 'SALVAR'}
          </button>
        </Form>
      </Wrapper>

      <NewCarModal
        isOpen={modalIsOpen}
        initialData={selectedCar || {}}
        schemaValidator={carSchema}
        onClose={() => {
          setModalIsOpen(false);
        }}
        onSubmit={handleAddCar}
      >
        <FormContainer>
          <FormGroup id="modelFormGroup">
            <label htmlFor="model">Modelo</label>
            <Input id="model" name="model" />
          </FormGroup>

          <FormGroup id="manufactureYearFormGroup">
            <label htmlFor="manufacture_year">Ano</label>

            <MaskedInput
              id="manufacture_year"
              name="manufacture_year"
              mask="9999"
              defaultValue={
                selectedCar ? selectedCar.manufacture_year : undefined
              }
            />
          </FormGroup>
        </FormContainer>

        <FormContainer>
          <FormGroup id="manufacturerFormGroup">
            <label htmlFor="manufacturer">Fabricante</label>
            <Input id="manufacturer" name="manufacturer" />
          </FormGroup>

          <FormGroup id="licensePlateFormGroup">
            <label htmlFor="license_plate">Placa</label>
            <Input
              id="license_plate"
              name="license_plate"
              disabled={selectedCar && !!selectedCar.id}
            />
          </FormGroup>
        </FormContainer>
      </NewCarModal>
    </>
  );
}

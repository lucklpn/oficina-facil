import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

import api from '~/services/api';
import history from '~/services/history';

import InputSearch from '~/components/InputSearch';
import TableData from '~/components/TableData';
import PopoverMenu from '~/components/PopoverMenu';
import Pagination from '~/components/Pagination';
import Alert from '~/components/Alert';

import colors from '~/utils/colors';
import { formatToPhone, formatToAddress } from '~/utils/format';

import { Container, Header } from './styles';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [itensAmount, setItensAmount] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(1); //eslint-disable-line
  const [queryFilter, setQueryFilter] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(null);

  useEffect(() => {
    async function loadCustomers() {
      const response = await api.get('customers');

      setCustomers(response.data);
      setItensAmount(Number(response.headers['x-total-count']));
    }

    loadCustomers();
  }, []);

  async function handleFilterCustomers(page) {
    try {
      setCurrentPageIndex(page || 1);

      const params = { page: page || 1, query: queryFilter };

      const response = await api.get('customers', { params });

      setCustomers(response.data);

      if (!page) {
        setItensAmount(Number(response.headers['x-total-count']));
      }

      if (response.data.length <= 0) {
        toast.info('Nenhum cliente encontrado');
      }
    } catch (err) {
      toast.error(
        err.response ? err.response.data.error : 'Erro ao buscar clientes.'
      );
    }
  }

  function handleKeyPress(keyCode) {
    if (keyCode === 13) {
      handleFilterCustomers();
    }
  }

  function handleDelete(id) {
    async function deleteRecipient() {
      try {
        await api.delete(`customers/${id}`);

        setItensAmount(itensAmount - 1);

        if (customers.length === 1) {
          if (currentPageIndex > 1) {
            handleFilterCustomers(currentPageIndex - 1);
          }
        }

        setCustomers(customers.filter((c) => c.id !== id));

        toast.success('Cliente excluído com sucesso.');
      } catch (err) {
        toast.error(
          err.response ? err.response.data.error : 'Erro ao excluir cliente.'
        );
      }
    }

    confirmAlert({
      customUI: (props) => (
        <Alert
          {...props}
          title="Atenção"
          message="Deseja realmente excluir o cliente?"
          onConfirm={deleteRecipient}
        />
      ),
    });
  }

  return (
    <Container>
      <Header>
        <h1>CONSULTA DE CLIENTES</h1>

        <InputSearch
          placeholder="Filtrar por nome do cliente"
          value={queryFilter}
          onChange={(e) => setQueryFilter(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e.which)}
        />
      </Header>

      <section>
        <section className="add-customer-section">
          <button type="button" className="new-button">
            <Link to="/customers/new">NOVO CADASTRO</Link>
          </button>
        </section>

        <section className="content-section">
          <TableData>
            <thead>
              <tr>
                <th id="idColumn">ID</th>
                <th id="nameColumn">NOME</th>
                <th id="phoneColumn">TELEFONE</th>
                <th id="addressColumn">ENDEREÇO</th>
                <th id="menuColumn"> </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={String(customer.id)}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>
                    {customer.phone
                      ? formatToPhone(customer.phone)
                      : 'Não informado'}
                  </td>
                  <td>
                    {customer ? formatToAddress(customer) : 'Não informado'}
                  </td>
                  <td>
                    <PopoverMenu
                      isOpen={popoverOpen === customer.id}
                      onClickOutside={() => setPopoverOpen(null)}
                      onButtonClick={() =>
                        setPopoverOpen(
                          popoverOpen === customer.id ? null : customer.id
                        )
                      }
                    >
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            history.push(`/customers/${customer.id}`);
                          }}
                        >
                          <FaPen size={15} color={colors.yellow.main} />
                          Editar Cadastro
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(customer.id);
                          }}
                        >
                          <FaTrashAlt size={15} color={colors.primary.main} />
                          Excluir Cadastro
                        </button>
                      </li>
                    </PopoverMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableData>
        </section>

        <Pagination
          itensAmount={itensAmount}
          currentPage={currentPageIndex}
          onPrevPage={() => handleFilterCustomers(currentPageIndex - 1)}
          onNextPage={() => handleFilterCustomers(currentPageIndex + 1)}
        />
      </section>
    </Container>
  );
}

export default Customer;

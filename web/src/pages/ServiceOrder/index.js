import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO, parse } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { FaFileInvoiceDollar, FaTrashAlt } from 'react-icons/fa';
import { MdRemoveRedEye } from 'react-icons/md';
import { AiFillPrinter } from 'react-icons/ai';

import api from '~/services/api';
import history from '~/services/history';

import InputSearch from '~/components/InputSearch';
import TableData from '~/components/TableData';
import PopoverMenu from '~/components/PopoverMenu';
import Pagination from '~/components/Pagination';
import Alert from '~/components/Alert';
import NewPaymentModal from './components/NewPaymentModal';
import ServiceOrderStatus from './components/ServiceOrderStatus';
import DetailsModal from './components/DetailsModal';

import colors from '~/utils/colors';
import { formatToCurrency } from '~/utils/format';

import { Container, Header } from './styles';

export default function ServiceOrder() {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [itensAmount, setItensAmount] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [queryFilter, setQueryFilter] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(null);
  const [modalServiceOrder, setModalServiceOrder] = useState(null);

  useEffect(() => {
    async function loadServiceOrders() {
      const response = await api.get('service_orders');

      setServiceOrders(response.data);
      setItensAmount(Number(response.headers['x-total-count']));
    }

    loadServiceOrders();
  }, []);

  async function handleFilterServiceOrders(page) {
    try {
      setCurrentPageIndex(page || 1);

      const params = { page: page || 1, query: queryFilter };

      const response = await api.get('service_orders', { params });

      setServiceOrders(response.data);

      if (!page) {
        setItensAmount(Number(response.headers['x-total-count']));
      }

      if (response.data.length <= 0) {
        toast.info('Nenhuma ordem de serviço encontrada');
      }
    } catch (err) {
      toast.error(
        err.response
          ? err.response.data.error
          : 'Erro ao buscar ordens de serviço'
      );
    }
  }

  function handleKeyPress(keyCode) {
    if (keyCode === 13) {
      handleFilterServiceOrders();
    }
  }

  function handleDelete(id) {
    async function deleteServiceOrder() {
      try {
        await api.delete(`service_orders/${id}`);

        setItensAmount(itensAmount - 1);

        if (serviceOrders.length === 1) {
          if (currentPageIndex > 1) {
            handleFilterServiceOrders(currentPageIndex - 1);
          }
        }

        setServiceOrders(serviceOrders.filter((s) => s.id !== id));

        toast.success('Ordem de serviço excluída com sucesso');
      } catch (err) {
        toast.error(
          err.response
            ? err.response.data.error
            : 'Erro ao excluir ordem de serviço'
        );
      }
    }

    confirmAlert({
      customUI: (props) => (
        <Alert
          {...props}
          title="Atenção"
          message="Deseja realmente excluir a ordem de serviço?"
          onConfirm={deleteServiceOrder}
        />
      ),
    });
  }

  async function handleRegisterNewPayment(serviceOrderId, data) {
    const parsedDate = parse(data.date, 'dd/MM/yyyy', new Date());

    try {
      await api.post(`service_orders/${serviceOrderId}/payments`, {
        ...data,
        date: parsedDate,
      });

      const response = await api.get(`service_orders/${serviceOrderId}`);

      setServiceOrders(
        serviceOrders.map((order) =>
          order.id === serviceOrderId ? response.data : order
        )
      );

      toast.success('Pagamento registrado com sucesso');
    } catch (err) {
      toast.error(
        err.response ? err.response.data.error : 'Erro ao registrar pagamento'
      );
    }
  }

  function handleShowDetailsModal(serviceOrder) {
    confirmAlert({
      customUI: (props) => <DetailsModal {...props} data={serviceOrder} />,
    });
  }

  return (
    <>
      <Container>
        <Header>
          <h1>CONSULTA DE ORDENS DE SERVIÇO</h1>

          <InputSearch
            placeholder="Filtrar por nome do cliente"
            value={queryFilter}
            onChange={(e) => setQueryFilter(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e.which)}
          />
        </Header>

        <section>
          <section className="add-service-order-section">
            <button type="button" className="new-button">
              <Link to="/orders/new">NOVO CADASTRO</Link>
            </button>
          </section>

          <section className="content-section">
            <TableData>
              <thead>
                <tr>
                  <th id="idColumn">ID</th>
                  <th id="customerColumn">CLIENTE</th>
                  <th id="customerCarColumn">VEÍCULO</th>
                  <th id="dateColumn">DATA</th>
                  <th id="valueColumn">VALOR</th>
                  <th id="statusColumn">STATUS</th>
                  <th id="menuColumn"> </th>
                </tr>
              </thead>
              <tbody>
                {serviceOrders.map((order) => (
                  <tr key={String(order.id)}>
                    <td>{order.id}</td>
                    <td>{order.customer.name}</td>
                    <td>
                      {`${order.customer_car.model}, ${order.customer_car.manufacture_year} | Placa: ${order.customer_car.license_plate}`}
                    </td>
                    <td>
                      {format(parseISO(order.date), 'dd/MM/yyyy', {
                        locale: pt,
                      })}
                    </td>
                    <td>{formatToCurrency(order.total_value)}</td>
                    <td>
                      <ServiceOrderStatus paidOut={order.paid_out} />
                    </td>
                    <td>
                      <PopoverMenu
                        isOpen={popoverOpen === order.id}
                        onClickOutside={() => {
                          setPopoverOpen(null);
                        }}
                        onButtonClick={() => {
                          setPopoverOpen(
                            popoverOpen === order.id ? null : order.id
                          );
                        }}
                      >
                        {!order.paid_out && (
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                setModalServiceOrder(order.id);
                              }}
                            >
                              <FaFileInvoiceDollar
                                size={15}
                                color={colors.green.main}
                              />
                              Registrar Pagamento
                            </button>
                          </li>
                        )}
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              handleShowDetailsModal(order);
                            }}
                          >
                            <MdRemoveRedEye
                              size={15}
                              color={colors.blue.main}
                            />
                            Visualizar Detalhes
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              history.push(`/orders/${order.id}/print`, {
                                service_order_id: order.id,
                              });
                            }}
                          >
                            <AiFillPrinter
                              size={15}
                              color={colors.purple.main}
                            />
                            Imprimir
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              handleDelete(order.id);
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
            onPrevPage={() => handleFilterServiceOrders(currentPageIndex - 1)}
            onNextPage={() => handleFilterServiceOrders(currentPageIndex + 1)}
          />
        </section>
      </Container>

      {modalServiceOrder && (
        <NewPaymentModal
          serviceOrderId={modalServiceOrder || -1}
          onSubmit={handleRegisterNewPayment}
          onClose={() => {
            setModalServiceOrder(null);
          }}
        />
      )}
    </>
  );
}

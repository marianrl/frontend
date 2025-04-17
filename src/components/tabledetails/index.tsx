import React, { useState, useEffect } from 'react';
import Button from '../general/button';
import DetailsModal from '../detailsmodal';
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
  MdOutlineKeyboardBackspace,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import '../tabledetails/style.css';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { IconContext } from 'react-icons';
import { FcCheckmark } from 'react-icons/fc';
import { RiFileExcel2Line, RiDeleteBin6Fill } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa6';
import DeleteConfirmationModal from '../deleteconfirmationmodal';
import { auditService } from '../../services/ams/audit';
import { commonInputService } from '../../services/ams/commonInput';
import { afipInputService } from '../../services/ams/afipInput';
import { cloudmersiveService } from '../../services/integrations/cloudmersive';
import Spinner from '../general/Spinner';
import { CreateInputRequest } from '../../types/createInputRequest';

interface Data {
  id: number;
  lastName: string;
  name: string;
  cuil: number;
  file: number;
  allocation: string;
  client: { client: string };
  uoc: string;
  branch: { branch: string };
  admissionDate: string;
  features: {
    id: number;
    auditType: { id: number; auditType: string };
    answer: { id: number; answer: string };
  };
  audit: {
    id: number;
    auditNumber: number;
    auditDate: string;
    idTipoAuditoria: { id: number; auditType: string };
    idAuditado: { id: number; audited: string };
  };
}

// Define un nuevo tipo para el estado de la fila seleccionada
type SelectedRowState = Data | null;

interface TableDetailsProps {
  data: Data[];
  CommonOrAfipAudit: 'commonAuditDetails' | 'afipAuditDetails';
  auditId: number;
}

const TableDetails: React.FC<TableDetailsProps> = ({
  data,
  CommonOrAfipAudit,
  auditId,
}) => {
  const navigate = useNavigate();
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [orderBy, setOrderBy] = useState<{
    key: keyof Data;
    asc: boolean;
  } | null>(null);
  const [page, setPage] = useState(1);
  const resultsPerPage = 10; //Cantidad
  const [selectedRow, setSelectedRow] = useState<SelectedRowState>(null); // Estado para la fila seleccionada
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.style.display = 'none';
    document.body.appendChild(input);
    setFileInput(input);

    return () => {
      if (input && document.body.contains(input)) {
        document.body.removeChild(input);
      }
    };
  }, []);

  const handleRowClick = (rowData: Data) => {
    setSelectedRow(rowData); // Almacena la información de la fila seleccionada en el estado
    cambiarEstadoModal(true); // Abre el detailsmodal
  };

  const handleBackButtonClick = () => {
    if (CommonOrAfipAudit === 'commonAuditDetails') {
      navigate('/audit');
    } else {
      navigate('/auditafip');
    }
  };

  const handleSort = (key: keyof Data) => {
    setOrderBy((prevState) => {
      if (prevState && prevState.key === key) {
        return { key, asc: !prevState.asc };
      } else {
        return { key, asc: true };
      }
    });
  };

  const sortedData = orderBy
    ? [...data].sort((a, b) => {
        const aValue = orderBy.asc ? a[orderBy.key] : b[orderBy.key];
        const bValue = orderBy.asc ? b[orderBy.key] : a[orderBy.key];

        if (orderBy.key === 'cuil') {
          // Si se está ordenando numéricamente (para cuil)
          return orderBy.key === 'cuil'
            ? (aValue as number) - (bValue as number)
            : (aValue as string).localeCompare(bValue as string);
        } else if (orderBy.key === 'file') {
          // Si se está ordenando numéricamente (para file)
          return orderBy.key === 'file'
            ? (aValue as number) - (bValue as number)
            : (aValue as string).localeCompare(bValue as string);
        } else {
          return (aValue as string).localeCompare(bValue as string);
        }
      })
    : data;

  const totalPages = Math.ceil(sortedData.length / resultsPerPage);
  const paginatedData = sortedData.slice(
    (page - 1) * resultsPerPage,
    page * resultsPerPage
  );

  const isButtonDisabledForUser = (user: Data): boolean => {
    return user.features.auditType.auditType !== 'SIN RESPUESTA';
  };

  const handleDeleteConfirmationButtonClick = async () => {
    if (data !== null) {
      try {
        if (data[0]) {
          if (CommonOrAfipAudit === 'commonAuditDetails') {
            await commonInputService.deleteCommonInput('commonInput', auditId);
            await auditService.deleteAudit('audit', auditId);
            navigate('/audit');
          } else {
            await afipInputService.deleteAfipInput('afipInput', auditId);
            await auditService.deleteAudit('audit', auditId);
            navigate('/auditafip');
          }
        } else {
          if (CommonOrAfipAudit === 'commonAuditDetails') {
            await auditService.deleteAudit('audit', auditId);
            navigate('/audit');
          } else {
            await auditService.deleteAudit('audit', auditId);
            navigate('/auditafip');
          }
        }
      } catch (error) {
        console.error('Error al eliminar la auditoria:', error);
      }
    }
  };

  const handleModalClose = () => {
    cambiarEstadoModal(false);
  };

  const handleImportClick = () => {
    if (fileInput) {
      fileInput.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          try {
            setIsLoading(true);
            const response = await cloudmersiveService.convertExcelToJson(file);
            console.log('Excel converted to JSON:', response.data);

            // Map the Excel response to CreateInputRequest
            const mappedData: CreateInputRequest[] = response.data.map(
              (item: any) => {
                // Convert date from MM/DD/YYYY to YYYY-MM-DD
                const [month, day, year] = item.fecha_ingreso.split('/');
                const formattedDate = `${year}-${month.padStart(
                  2,
                  '0'
                )}-${day.padStart(2, '0')}`;

                return {
                  lastName: item.apellido,
                  name: item.nombre,
                  cuil: item.cuil,
                  file: item.legajo,
                  allocation: item.asignacion,
                  uoc: item.uoc,
                  admissionDate: formattedDate,
                  client: parseInt(item.cliente),
                  branch: parseInt(item.sucursal),
                  auditId: auditId,
                };
              }
            );

            console.log('mappedData', mappedData);

            // Call the appropriate service based on CommonOrAfipAudit
            if (CommonOrAfipAudit === 'commonAuditDetails') {
              await commonInputService.createCommonInputs(
                'commonInput',
                mappedData
              );
            } else {
              await afipInputService.createAfipInputs('afipInput', mappedData);
            }

            // Reload the page to show the new data
          } catch (error) {
            console.error('Error converting Excel to JSON:', error);
          } finally {
            setIsLoading(false);
            window.location.reload();
          }
        }
      };
      fileInput.click();
    }
  };

  return (
    <div id="bodywrap">
      <DetailsModal
        estado={estadoModal}
        cambiarEstadoModal={cambiarEstadoModal}
        data={selectedRow} // Pasa la información de la fila seleccionada al detailsmodal
        auditType={CommonOrAfipAudit}
      />
      {showDeleteConfirmationModal && (
        <DeleteConfirmationModal
          estado={showDeleteConfirmationModal}
          cambiarEstadoDeleteConfirmationModal={setShowDeleteConfirmationModal}
          handleDeleteConfirmationButtonClick={
            handleDeleteConfirmationButtonClick
          }
          handleModalClose={handleModalClose}
          auditType={
            data.length > 0 ? data[0].audit.idTipoAuditoria.auditType : '--'
          }
          auditDate={data.length > 0 ? data[0].audit.auditDate : '--'}
        />
      )}
      <div className="row">
        <div className="large-10 columns">
          <div className="scroll-window-wrapper">
            <div className="container">
              <h2>
                Detalle de Auditoria -{' '}
                {data.length > 0
                  ? data[0].audit.idTipoAuditoria.auditType
                  : 'Nueva auditoria'}{' '}
                -{data.length > 0 ? data[0].audit.auditDate : ''}
              </h2>
              <ul>
                <div>
                  <li className="filaTable">
                    <Button
                      type="button"
                      backgroundColor="#92a9fc"
                      hoverColor="#92a9fc"
                      hoverBorderColor="2px solid #92a9fc"
                      onClick={() => setShowDeleteConfirmationModal(true)}
                    >
                      <FaCheck style={{ marginRight: '10px' }} /> Aprobar
                    </Button>
                    <Button
                      type="button"
                      backgroundColor="#004217"
                      hoverColor="#004217"
                      hoverBorderColor="2px solid #004217"
                      onClick={handleImportClick}
                      disabled={isLoading}
                    >
                      <RiFileExcel2Line style={{ marginRight: '10px' }} />{' '}
                      Importar
                    </Button>
                    <Button
                      type="button"
                      label="Eliminar"
                      backgroundColor="#960909"
                      hoverColor="#960909"
                      hoverBorderColor="2px solid #960909"
                      onClick={() => setShowDeleteConfirmationModal(true)}
                    >
                      <RiDeleteBin6Fill style={{ marginRight: '10px' }} />{' '}
                      Eliminar
                    </Button>
                    <Button
                      type="button"
                      backgroundColor="#00004b"
                      hoverColor="#00004b"
                      hoverBorderColor="2px solid #00004b"
                      style={{ width: '70px', marginLeft: '70px' }}
                      onClick={() => handleBackButtonClick()}
                    >
                      <MdOutlineKeyboardBackspace />
                    </Button>
                  </li>
                </div>
              </ul>
            </div>
            {isLoading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '20px 0',
                }}
              >
                <Spinner />
              </div>
            )}
            <div className="table-wrapper">
              <table className="table table-striped table-hover">
                <thead className="table-header">
                  <tr>
                    <th onClick={() => handleSort('lastName')}>
                      Apellido
                      <span className="icon-right">
                        {orderBy && orderBy.key === 'lastName' ? (
                          orderBy.asc ? (
                            <MdOutlineArrowDropDown />
                          ) : (
                            <MdOutlineArrowDropUp />
                          )
                        ) : null}
                      </span>
                    </th>
                    <th
                      className="details-second-child"
                      onClick={() => handleSort('name')}
                    >
                      Nombre
                      <span className="icon-right">
                        {orderBy && orderBy.key === 'name' ? (
                          orderBy.asc ? (
                            <MdOutlineArrowDropDown />
                          ) : (
                            <MdOutlineArrowDropUp />
                          )
                        ) : null}
                      </span>
                    </th>
                    <th
                      className="details-third-child"
                      onClick={() => handleSort('cuil')}
                    >
                      CUIL
                      <span className="icon-right">
                        {orderBy && orderBy.key === 'cuil' ? (
                          orderBy.asc ? (
                            <MdOutlineArrowDropDown />
                          ) : (
                            <MdOutlineArrowDropUp />
                          )
                        ) : null}
                      </span>
                    </th>
                    <th
                      className="details-fourth-child"
                      onClick={() => handleSort('file')}
                    >
                      N° Legajo
                      <span className="icon-right">
                        {orderBy && orderBy.key === 'file' ? (
                          orderBy.asc ? (
                            <MdOutlineArrowDropDown />
                          ) : (
                            <MdOutlineArrowDropUp />
                          )
                        ) : null}
                      </span>
                    </th>
                    <th>
                      <div></div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((user, index) => (
                    <tr key={index}>
                      <td>{user.lastName}</td>
                      <td>{user.name}</td>
                      <td>{user.cuil}</td>
                      <td className="cellContainer">
                        <div className="leftContent">{user.file}</div>
                        {user.features.auditType.auditType !==
                          'SIN RESPUESTA' && (
                          <div className="rightContent">
                            <IconContext.Provider value={{ size: '30px' }}>
                              <FcCheckmark />
                            </IconContext.Provider>
                          </div>
                        )}
                      </td>
                      <td>
                        <Button
                          type="button"
                          label={
                            isButtonDisabledForUser(user)
                              ? 'Respondido'
                              : 'Ver detalle'
                          }
                          {...(isButtonDisabledForUser(user) && {
                            color: '#00004b',
                          })} // Si la condición es verdadera, se agrega la prop
                          {...(isButtonDisabledForUser(user) && {
                            backgroundColor: '#ffffff',
                          })}
                          {...(isButtonDisabledForUser(user) && {
                            borderColor: '2px solid #00004b',
                          })}
                          hoverColor="#00004b"
                          hoverBorderColor="2px solid #00004b"
                          onClick={() => handleRowClick(user)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <Stack spacing={2} className="pagination">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </Stack>
      )}
    </div>
  );
};

export default TableDetails;

import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { RespostasSearch } from "src/sections/respostas/respostas-search";
import { RespostasTable } from "src/sections/respostas/respostas-table";
import { useSession } from "next-auth/react";
import { sharedConsult, sharedDelete } from "./routes";
import { LoadingForm } from "src/sections/Forms/LoadingForm";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalDelete from "src/sections/respostas/modal-delete";

const Page = () => {
  const { data: session } = useSession();
  const [customer, setCustomer] = useState(null);
  const [loadedItems, setLoadedItems] = useState(0);
  const [filteredItems, setFilteredItems] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [deleteButton, setDeleteButton] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const handleModalDeleteOpen = () => setModalDeleteOpen(true);
  const handleModalDeleteClose = () => setModalDeleteOpen(false);

  //Chamada inicial
  useEffect(() => {
    const fetchData = async () => {
      const data = await sharedConsult(session, "10", "0");
      setCustomer(data);
      setLoadedItems(data.length);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selected.length > 0) {
      setDeleteButton(true);
    } else {
      setDeleteButton(false);
    }
  }, [selected]);

  const filteredData =
    statusFilter !== null
      ? customer.filter((customer) => customer.Status === statusFilter)
      : customer;

  // Paginar os dados filtrados
  const startIndex = (page - 1) * itemsPerPage;
  const slicedData =
    filteredData &&
    filteredData
      .sort((a, b) => {
        // Itens com Status true vêm primeiro
        if (a.Status && !b.Status) return -1;
        if (!a.Status && b.Status) return 1;
        return 0; // Caso contrário, mantenha a ordem atual
      })
      .slice(startIndex, startIndex + itemsPerPage);

  //Selecionar todos
  const handleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      const allCustomerIds = slicedData.map((customer) => customer.id);
      setSelected(allCustomerIds); // Selecionar todos
    } else {
      setSelected([]);
    }
  };

  const handleDeleteSelected = async () => {
    // Para cada cliente selecionado, exclua-o
    for (const selectedId of selected) {
      await sharedDelete(session, selectedId);
    }
    // removendo os clientes excluídos da lista
    setCustomer((prevCustomers) =>
      prevCustomers.filter((customer) => !selected.includes(customer.id))
    );

    // Limpar a seleção após excluir os clientes
    setSelected([]);
  };

  const handleDelete = async (id) => {
    sharedDelete(session, id);
    setCustomer(customer.filter((customer) => customer.id !== id));
  };

  //Mudança de pagina
  const handleChange = (event, value) => {
    setPage(value);
  };

  //Função para redenrizar os clientes novamente sem precisar de uma nova requisição
  const updateCustomer = (customerId, updatedData) => {
    // Atualize os dados do cliente com o ID correspondente
    setCustomer((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === customerId ? { ...customer, ...updatedData } : customer
      )
    );
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setFilteredItems(true);
  };

  const handleClearFilter = () => {
    setStatusFilter(null);
    setFilteredItems(null);
    console.log("aqui");
  };

  return (
    <>
      <Head>
        <title>Respostas</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <ModalDelete
          open={modalDeleteOpen}
          onClose={handleModalDeleteClose}
          selected={selected}
          handleDeleteSelected={handleDeleteSelected}
        />
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">Respostas</Typography>
            <RespostasSearch />
            <Stack spacing={1.5}>
              {filteredData === null ? (
                <LoadingForm />
              ) : filteredData.length === 0 ? (
                <Stack display="flex" alignItems="center">
                  <Typography variant="subtitle1">Nenhuma resposta encontrada</Typography>
                  <Typography variant="subtitle2" textAlign="center">
                    Crie um formulário e comece a receber seus orçamentos
                  </Typography>
                  <Button variant="contained" sx={{ mt: 3 }}>
                    Criar um formulário
                  </Button>
                </Stack>
              ) : (
                <>
                  <Card>
                    <Box sx={{ m: 2 }}>
                      <Stack spacing={2} direction={"row"}>
                        <Checkbox // Novo checkbox para seleção em massa
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                        <FormControl variant="filled" sx={{ width: 150 }} size="small">
                          <InputLabel id="filter-status">Status</InputLabel>
                          <Select
                            labelId="status"
                            id="status"
                            label="Status"
                            value={statusFilter}
                            onChange={(event) => handleStatusFilter(event)}
                          >
                            <MenuItem value={true}>
                              <Chip
                                color="success"
                                size="small"
                                icon={<TagFacesIcon />}
                                label="Novo"
                              />
                            </MenuItem>
                            <MenuItem value={false}>
                              <Chip
                                color="primary"
                                size="small"
                                icon={<TagFacesIcon />}
                                label="Agendado"
                              />
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {filteredItems !== null && (
                          <Button onClick={handleClearFilter}>Limpar filtros</Button>
                        )}
                        {deleteButton === true && (
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={handleModalDeleteOpen}
                            startIcon={<DeleteIcon />}
                          >
                            Excluir resposta
                          </Button>
                        )}
                      </Stack>
                    </Box>
                    {slicedData.map((customer) => (
                      <RespostasTable
                        key={customer.id}
                        customer={customer}
                        handleDelete={handleDelete}
                        session={session}
                        updateCustomer={updateCustomer}
                        setSelected={setSelected}
                        selectAll={selectAll}
                        setSelectAll={setSelectAll}
                        selected={selected}
                        setDeleteButton={setDeleteButton}
                      />
                    ))}
                  </Card>
                  {loadedItems >= 10 && (
                    <Stack sx={{ mt: 1 }} alignItems={"center"}>
                      <Pagination
                        count={Math.ceil(customer.length / itemsPerPage)}
                        page={page}
                        onChange={handleChange}
                      />
                    </Stack>
                  )}
                </>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

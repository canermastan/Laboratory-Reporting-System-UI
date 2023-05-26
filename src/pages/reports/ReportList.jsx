import React, { useEffect, useState } from "react";
import ReportService from "../../services/reportService";
import {
  Button,
  Dropdown,
  Grid,
  Pagination,
  Search,
  Table,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { toast } from "react-toastify";

export default function ReportList() {
  const [reports, setReports] = useState([]);

  const [value, setValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  const [isShowPagination, setIsShowPagination] = useState(false);

  const navigate = useNavigate();

  let reportService = new ReportService();

  useEffect(() => {
    getReportsWithPagination(activePage);
  }, []);

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
    getReportsWithPagination(activePage);
  };

  const getReportsWithPagination = (page) => {
    reportService.getReportsWithPagination(page - 1).then((result) => {
      setReports(result.data.data);
      setTotalPages(parseInt(result.data.totalPages));
      setIsShowPagination(true);
      toast.success("Tüm raporlar listelendi.",  { autoClose: 2000 });
    });
  };

  const handleSearchChange = (e, { value }) => {
    setValue(value);
  };

  const filterOptions = [
    { key: 1, text: "Hasta Adı/Soyadı", value: 1 },
    { key: 2, text: "Hasta TC", value: 2 },
    { key: 3, text: "Laborant Adı/Soyadı", value: 3 },
    { key: 4, text: "Rapor Tarihi", value: 4 },
    { key: 5, text: "Rapor Numarası", value: 5 },
    { key: 6, text: "Tüm Raporlar", value: 6}
  ];
  const [filterValue, setFilterValue] = useState(1);
  const handleDropdownChange = (e, { value }) => setFilterValue(value);

  const [date, setDate] = useState(new Date());
  const handleDateChange = (date) => setDate(date);

  const handleSearchButton = () => {

    if (value === "" && filterValue !== 6 && filterValue !== 4) {
      toast.error("Lütfen bir değer giriniz.");
      return;
    }

    if (filterValue === 1) {
      reportService.getReportsByPatientName(value).then((result) => {
        setReports(result.data);
        setIsShowPagination(false);

        if (result.data.length === 0) {
          toast.error("Rapor bulunamadı.");
        }

      })
      .catch((result) => {
        toast.error("Bir hata oluştu.");
      });
    } else if (filterValue === 2) {
      reportService.getReportsByPatientIdentityNumber(value).then((result) => {
        setReports(result.data);
        setIsShowPagination(false);

        if (result.data.length === 0) {
          toast.error("Rapor bulunamadı.");
        }

      })
      .catch((result) => {
        toast.error("Bir hata oluştu.");
      });
    } else if (filterValue === 3) {
      reportService.getReportsByLaboratoryTechnicianName(value).then((result) => {
        setReports(result.data);
        setIsShowPagination(false);
        
        if (result.data.length === 0) {
          toast.error("Rapor bulunamadı.");
        }

      })
      .catch((result) => {
        toast.error("Bir hata oluştu.");
      });
    } else if (filterValue === 4) {
      reportService
        .getReportsByReportDate(format(date, "yyyy-MM-dd"))
        .then((result) => {
          setReports(result.data);
          setIsShowPagination(false);

          if (result.data.length === 0) {
            toast.error("Rapor bulunamadı.");
          }
  
        })
        .catch((result) => {
          toast.error("Bir hata oluştu.");
        });
    } else if (filterValue === 5) {
      reportService.getReportByReportNo(value).then((result) => {
        navigate(`/report/${result.data.id}`);
      })
      .catch((result) => {
        toast.error("Rapor bulunamadı.");
      });
    } else if (filterValue === 6) {
        setValue("");
        setIsShowPagination(true);
        getReportsWithPagination(activePage);
    }
  };


  return (
    <div>
      <Grid>
        <Grid.Column floated="left" width={2}>
          <h1>Raporlar</h1>
        </Grid.Column>

        <Grid.Column width={12}>
          <Grid centered columns={4}>
            <Grid.Column>
              <Search
                input={{ icon: "search", iconPosition: "left" }}
                onSearchChange={_.debounce(handleSearchChange, 500, {
                  leading: true,
                })}
                value={value}
                showNoResults={false}
              />
            </Grid.Column>

            <Grid.Column>
              <Dropdown
                selection
                options={filterOptions}
                onChange={handleDropdownChange}
                defaultValue={1}
              />
            </Grid.Column>

            {filterValue === 4 ? (
              <div style={{ display: "inline-block", marginTop: 20 }}>
                <Grid.Column>
                  <ReactDatePicker
                    selected={date}
                    onChange={(date) => handleDateChange(date)}
                    dateFormat={"yyyy-MM-dd"}
                  />
                </Grid.Column>
              </div>
            ) : null}
            <div style={{ display: "inline-block", marginTop: 15 }}>
              <Grid.Column>
                <Button primary onClick={handleSearchButton}>
                  {filterValue === 5 ? "Rapora Git" : "Ara"}
                </Button>
              </Grid.Column>
            </div>
            <Grid.Column floated="right">
              <Button
                as={Link}
                to={"/report/add"}
                color="green"
                floated="right"
              >
                Rapor Ekle
              </Button>
            </Grid.Column>
          </Grid>
          <Table color="teal">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Rapor Numarası</Table.HeaderCell>
                <Table.HeaderCell>Hasta Adı</Table.HeaderCell>
                <Table.HeaderCell>Hasta Soyadı</Table.HeaderCell>
                <Table.HeaderCell>Hasta TC</Table.HeaderCell>
                <Table.HeaderCell>Koyulan Tanı Başlığı</Table.HeaderCell>
                <Table.HeaderCell>Raporun Verildiği Tarih</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {reports &&
                reports.map((report) => (
                  <Table.Row>
                    <Table.Cell key={report.id}>{report.reportNo}</Table.Cell>
                    <Table.Cell>{report.patientFirstName}</Table.Cell>
                    <Table.Cell>{report.patientLastName}</Table.Cell>
                    <Table.Cell>{report.patientIdentityNumber}</Table.Cell>
                    <Table.Cell>{report.diagnosisTitle}</Table.Cell>
                    <Table.Cell>{report.reportDate}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/report/${report.id}`}>
                        <Button color="teal">Detaylar</Button>
                      </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <Link to={`/report/edit/${report.id}`}>
                        <Button color="orange">Düzenle</Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              {isShowPagination ? (
                <Pagination
                  boundaryRange={0}
                  defaultActivePage={1}
                  siblingRange={1}
                  totalPages={totalPages}
                  activePage={activePage}
                  onPageChange={handlePaginationChange}
                />
              ) : null}
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column floated="right" width={2}></Grid.Column>
      </Grid>
    </div>
  );
}

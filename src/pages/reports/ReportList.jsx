import React, { useEffect, useState } from "react";
import ReportService from "../../services/reportService";
import {
  Button,
  Dropdown,
  Grid,
  Search,
  Table,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import _ from "lodash";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { toast } from "react-toastify";

export default function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    let reportService = new ReportService();
    reportService.getReports().then((result) => setReports(result.data));
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  const handleResultSelect = (e, { result }) => setValue(result.title);

  const handleSearchChange = (e, { value }) => {
    setIsLoading(true);
    setValue(value);
    filter();
  };

  const filter = () => {
    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = (result) => {
        if (filterValue === 1) {
          return (
            re.test(result.patientFirstName) || re.test(result.patientLastName)
          );
        } else if (filterValue === 2) {
          return re.test(result.patientIdentityNumber);
        } else if (filterValue === 3) {
          return (
            re.test(result.laboratoryTechnicianFirstName) ||
            re.test(result.laboratoryTechnicianLastName)
          );
        }
      };

      setIsLoading(false);
      setResults(_.filter(reports, isMatch));
    }, 300);
  };

  const filterOptions = [
    { key: 1, text: "Hasta Adı/Soyadı", value: 1 },
    { key: 2, text: "Hasta TC", value: 2 },
    { key: 3, text: "Laborant Adı/Soyadı", value: 3 },
    { key: 4, text: "Rapor Tarihi", value: 4 },
  ];
  const [filterValue, setFilterValue] = useState(1);
  const handleDropdownChange = (e, { value }) => setFilterValue(value);

  const [date, setDate] = useState(new Date());
  const handleDateChange = (date) => setDate(date);

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
                loading={isLoading}
                onResultSelect={handleResultSelect}
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
              />
            </Grid.Column>

            {filterValue === 4 ? (
              <Grid.Column>
                <ReactDatePicker
                  selected={date}
                  onChange={(date) => handleDateChange(date)}
                  dateFormat={"yyyy-MM-dd"}
                />
              </Grid.Column>
            ) : null}

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
                <Table.HeaderCell>Dosya Numarası</Table.HeaderCell>
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
                value.length < 1 &&
                filterValue !== 4 &&
                reports.map((report) => (
                  <Table.Row>
                    <Table.Cell>{report.reportNo}</Table.Cell>
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
              {value.length > 0 &&
                results.map((report) => (
                  <Table.Row>
                    <Table.Cell>{report.reportNo}</Table.Cell>
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

              {filterValue === 4 &&
                value.length < 1 &&
                reports
                  .filter(
                    (report) => report.reportDate === format(date, "yyyy-MM-dd")
                  )
                  .map((report) => (
                    <Table.Row>
                      <Table.Cell>{report.reportNo}</Table.Cell>
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
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column floated="right" width={2}></Grid.Column>
      </Grid>
    </div>
  );
}

import React, {
  createRef,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router";
import ReportService from "../../services/reportService";
import { Formik, Form } from "formik";
import TextInput from "../../utilities/customFormElements/TextInput";
import * as Yup from "yup";
import { Button, Grid, Header, Icon, Segment } from "semantic-ui-react";
import TextArea from "../../utilities/customFormElements/TextArea";
import { toast } from "react-toastify";

export default function ReportEdit() {
  let { id } = useParams();

  const navigate = useNavigate();

  const [report, setReport] = useState({});
  const [laboratoryTechnician, setLaboratoryTechnician] = useState({});

  useEffect(() => {
    let reportService = new ReportService();
    reportService.getReportById(id).then((result) => {
      setReport(result.data);
      setLaboratoryTechnician(result.data.laboratoryTechnician);
    });
  }, []);

  const initialValues = {
    diagnosisTitle: report.diagnosisTitle,
    diagnosisDetail: report.diagnosisDetail,
    patientFirstName: report.patientFirstName,
    patientLastName: report.patientLastName,
    patientIdentityNumber: report.patientIdentityNumber,
    reportNo: report.reportNo,
    reportDate: report.reportDate,
    laboratoryTechnicianFirstName: report.laboratoryTechnicianFirstName,
    laboratoryTechnicianLastName: report.laboratoryTechnicianLastName,
    laboratoryTechnicianHospitalIdentityNumber:
      report.laboratoryTechnicianHospitalIdentityNumber,
  };

  const schema = Yup.object({
    diagnosisTitle: Yup.string().required("Rapor Başlığı zorunlu"),
    diagnosisDetail: Yup.string().required("Rapor Detayı zorunlu"),
    patientFirstName: Yup.string().required("Hasta Adı zorunlu"),
    patientLastName: Yup.string().required("Hasta Soyadı zorunlu"),
    patientIdentityNumber: Yup.string()
      .required("Hasta TC zorunlu")
      .max(11, "TC maksimum 11 karakter olabilir"),
  });

  const handleFormOnSubmit = (values) => {
    delete values.laboratoryTechnicianFirstName;
    delete values.laboratoryTechnicianLastName;
    delete values.laboratoryTechnicianHospitalIdentityNumber;

    let reportService = new ReportService();
    reportService
      .updateReport(id, values)
      .then((result) => toast.success("Rapor başarıyla güncellendi"))
      .catch((err) => console.log(err));

    // serverda verinin güncellendiğinden emin olmak için sayfaya yönlendirmeden önce 500ms bekletiyoruz
    setTimeout(() => {
      navigate(`/report/${id}`);
    }, 500);
  };

  const [file, setFile] = useState(null);

  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    let reportService = new ReportService();
    const formData = new FormData();
    formData.append("file", file);
    reportService.uploadReportImage(id, formData).then((result) => {
      toast.success("Rapor görseli başarıyla güncellendi");
      setTimeout(() => {
        navigate(`/report/${id}`);
      }, 500);
    });
  };

  return (
    <Grid>
      <Grid.Column width={2}></Grid.Column>

      <Grid.Column width={13}>
        <Segment placeholder>
          <Header icon>
            <Icon name="images outline" />
            Rapor görselini güncelle
          </Header>
          <form>
            <input
              type="file"
              name="file"
              onChange={(e) => handleFileInput(e)}
            />
          </form>
          <Button color="green" onClick={() => handleFileUpload()}>
            Kaydet
          </Button>
        </Segment>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => handleFormOnSubmit(values)}
        >
          <Form className="ui form">
            <Header size="tiny">Koyulan Tanının Başlığı</Header>
            <TextInput name="diagnosisTitle" placeholder="Rapor Başlığı" />
            <Header size="tiny">Koyulan Tanının Detayı</Header>
            <TextArea name="diagnosisDetail" placeholder="Rapor Detayı" />
            <Header size="tiny">Hasta Adı</Header>
            <TextInput name="patientFirstName" placeholder="Hasta Adı" />
            <Header size="tiny">Hasta Soyadı</Header>
            <TextInput name="patientLastName" placeholder="Hasta Soyadı" />
            <Header size="tiny">Hasta TC</Header>
            <TextInput name="patientIdentityNumber" placeholder="Hasta TC" />
            <Header size="tiny">Rapor Numarası</Header>
            <TextInput name="reportNo" placeholder="Rapor Numarası" disabled />
            <Header size="tiny">Rapor Tarihi</Header>
            <TextInput name="reportDate" placeholder="Rapor Tarihi" disabled />
            <Header size="tiny">Laborant Adı</Header>
            <TextInput
              name="laboratoryTechnicianFirstName"
              placeholder="Laborant Adı"
              disabled
            />
            <Header size="tiny">Laborant Soyadı</Header>
            <TextInput
              name="laboratoryTechnicianLastName"
              placeholder="Laborant Soyadı"
              disabled
            />
            <Header size="tiny">Laborant Hastane Kimlik Numarası</Header>
            <TextInput
              name="laboratoryTechnicianHospitalIdentityNumber"
              placeholder="Laborant Hastane Kimlik Numarası"
              disabled
            />
            <Button color="green" type="submit" size="large">
              Kaydet
            </Button>
          </Form>
        </Formik>
      </Grid.Column>
      <Grid.Column width={1}></Grid.Column>
    </Grid>
  );
}

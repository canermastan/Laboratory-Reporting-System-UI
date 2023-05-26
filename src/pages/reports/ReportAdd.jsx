import { Formik, Form } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Header } from "semantic-ui-react";
import TextInput from "../../utilities/customFormElements/TextInput";
import TextArea from "../../utilities/customFormElements/TextArea";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ReportService from "../../services/reportService";

export default function ReportAdd() {
  const navigate = useNavigate();

  const initialValues = {
    diagnosisTitle: "",
    diagnosisDetail: "",
    patientFirstName: "",
    patientLastName: "",
    patientIdentityNumber: "",
  };

  const schema = Yup.object({
    diagnosisTitle: Yup.string().required("Rapor Başlığı zorunlu"),
    diagnosisDetail: Yup.string().required("Rapor Detayı zorunlu"),
    patientFirstName: Yup.string().required("Hasta Adı zorunlu"),
    patientLastName: Yup.string().required("Hasta Soyadı zorunlu"),
    patientIdentityNumber: Yup.string()
      .required("Hasta TC zorunlu")
      .min(11, "TC minimum 11 karakter olabilir")
      .max(11, "TC maksimum 11 karakter olabilir"),
  });

  const handleFormOnSubmit = (values) => {
    let reportService = new ReportService();
    reportService.saveReport(values).then((result) => {
      toast.success("Rapor başarıyla eklendi.");
      setTimeout(() => {
        navigate("/reports");
      }, 500);
    });
  };

  return (
    <Grid>
      <Grid.Column width={2}></Grid.Column>

      <Grid.Column width={13}>
        <Formik
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

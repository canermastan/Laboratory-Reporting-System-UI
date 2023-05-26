import React, { useEffect, useState } from "react";
import {
  Button,
  Confirm,
  Grid,
  Header,
  Image,
  Popup,
} from "semantic-ui-react";
import ReportService from "../../services/reportService";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function ReportDetail() {
  let { id } = useParams();

  const [report, setReport] = useState({});
  const [reportImageUrl, setReportImageUrl] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  let reportService = new ReportService();
  
  useEffect(() => {  
    reportService.getReportById(id).then((result) => {
      setReport(result.data);
      if (result.data.reportImageId){
        setReportImageUrl(`/image/download/${result.data.reportImageId}`);
      } else {
        setReportImageUrl("https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png")
      }
    });
  }, []);

  const handleConfirmModalOpen = () => setShowConfirm(true);
  const handleConfirmModalClose = () => setShowConfirm(false);

  const handleConfirm = () => {
    reportService.deleteReport(id);

    toast.success("Rapor silindi");

    // serverda verinin silindiğinden emin olmak için sayfaya yönlendirmeden önce 500ms bekletiyoruz
    setTimeout(() => {
      navigate("/reports");
    }, 500);
  };

  const userRole = JSON.parse(localStorage.getItem('role'));

  return (
    <div>
      <Grid>
        <Grid.Column width={6}>
          <Image src={reportImageUrl} />
        </Grid.Column>

        <Grid.Column width={10}>
          <Grid>
            <Grid.Column width={2} floated="left">
              <Header as="h4">Rapor Başlığı:</Header>
              <span className="text">{report.diagnosisTitle}</span>
              <br />
              <Header as="h4">Rapor Numarası:</Header>
              <span className="text">{report.reportNo}</span>
              <br />
              <Header as="h4">Rapor Tarihi:</Header>
              <span className="text">{report.reportDate}</span>
            </Grid.Column>

            <Grid.Column width={6} floated="center">
              <Header as="h4">Rapor detayı:</Header>
              <span className="detailText">{report.diagnosisDetail}</span>
            </Grid.Column>

            <Grid.Column width={2} floated="right">
              <Header as="h4">Hasta Adı:</Header>
              <span className="text">{report.patientFirstName}</span>

              <br />
              <Header as="h4">Hasta Soyadı:</Header>
              <span className="text">{report.patientLastName}</span>
              <br />
              <Header as="h4">Hasta TC:</Header>
              <span className="text">{report.patientIdentityNumber}</span>

              <br />
              <Header as="h4">Laborant Adı:</Header>
              <span className="text">{report.laboratoryTechnicianFirstName}</span>
              <br />
              <Header as="h4">Laborant Soyadı:</Header>
              <span className="text">{report.laboratoryTechnicianLastName}</span>
              <br />
              <Header as="h4">Laborant Hastane Kimlik:</Header>
              <span className="text">
                {report.laboratoryTechnicianHospitalIdentityNumber}
              </span>
            </Grid.Column>
          </Grid>
          {
            userRole === "ADMIN" ? (
              <Button color="red" onClick={handleConfirmModalOpen}>
              Raporu Sil
            </Button>
            )
            : (
              <Popup content='Sadece yöneticiler silme yetkisine sahiptir!' pinned on='hover' trigger={<Button color="red" active='false'>Raporu Sil</Button>} />
            )
          }

          <Button color="orange" onClick={() => navigate(`/report/edit/${id}`)}>
            Raporu Düzenle
          </Button>

          <Confirm
            open={showConfirm}
            onCancel={handleConfirmModalClose}
            onConfirm={handleConfirm}
            header="Onayla"
            content="Raporu silmek istediğinize emin misiniz?"
            cancelButton="Hayır"
            confirmButton="Evet"
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}

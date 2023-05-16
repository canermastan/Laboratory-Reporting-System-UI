import React from "react";
import { Route, Routes } from "react-router";
import { Grid } from "semantic-ui-react";
import ReportDetail from "../pages/reports/ReportDetail";
import ReportList from "../pages/reports/ReportList";
import ReportEdit from "../pages/reports/ReportEdit";
import { ToastContainer } from "react-toastify";
import Login from "../pages/Login";
import ReportAdd from "../pages/reports/ReportAdd";

export default function Dashboard() {
  
  return (
    <>
    <Grid>
    <ToastContainer position="top-right"/>
      <Grid.Row>
        <Grid.Column width={16}>
          <Routes>
            <Route path="/" element={<ReportList />} />
            <Route exact path="/reports" element={<ReportList />} />
            <Route path="/report/:id" element={<ReportDetail />} />
            <Route path="/report/edit/:id" element={<ReportEdit />}/>
            <Route path="/report/add" element={<ReportAdd />}/>
          </Routes>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </>
  );
}

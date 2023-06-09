import axios from "axios";
import authHeader from "./auth/authHeader";

// package.json has been modified to proxy all requests to the backend
const API_URL = "/api/v1/report";

export default class ReportService {
    getReports(){
        return axios.get(`${API_URL}/all`, { headers: authHeader() });
    }
    getReportsWithPagination(page){
        return axios.get(`${API_URL}/all/${page}`, { headers: authHeader() });
    }
    getReportById(id){
        return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
    }
    deleteReport(id) {
        return axios.delete(`${API_URL}/delete/${id}`, { headers: authHeader() });
    }
    updateReport(id, data) {  
        return axios.put(`${API_URL}/update/${id}`, data, { headers: authHeader() }); 
    }
    saveReport(data) {
        return axios.post(`${API_URL}/save`, data, { headers: authHeader() });
    }
    getReportImageById(id) {
        return axios.get(`/image/download/${id}`, { headers: authHeader() });
    }
    uploadReportImage(id, data) {
        return axios.post(`${API_URL}/image/upload/${id}`, data, { headers: authHeader() }, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    getReportsByPatientName(name){
        return axios.get(`${API_URL}/all-by-patient-name?name=${encodeURIComponent(name)}`, { headers: authHeader() });
    }
    getReportsByPatientIdentityNumber(identityNumber){
        return axios.get(`${API_URL}/all-by-patient-identity-number?id=${encodeURIComponent(identityNumber)}`, { headers: authHeader() });
    }
    getReportsByReportDate(reportDate){
        return axios.get(`${API_URL}/all-by-report-date?date=${encodeURIComponent(reportDate)}`, { headers: authHeader() });
    }
    getReportsByLaboratoryTechnicianName(name){
        return axios.get(`${API_URL}/all-by-laboratory-technician-name?name=${encodeURIComponent(name)}`, { headers: authHeader() });
    }
    getReportByReportNo(reportNo){
        return axios.get(`${API_URL}/report-no/${reportNo}`, { headers: authHeader() });
    }
}
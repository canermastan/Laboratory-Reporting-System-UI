
# Laboratory Reporting Application

This project is a web application developed for managing laboratory reports. The backend is developed using Java and Spring Boot, while the frontend is developed using React. The project supports functionalities such as defining, updating, deleting, and listing reports. Additionally, secure login is implemented using JWT.

## Other Repo

You can access the backend code used for this project [here](https://github.com/canermastan/Laboratory-Reporting-System-API).

## Setup

### React (Frontend)

To start the project, you can use the following commands:

```bash
npm install && npm start
```

### User Information
Admin and user accounts are automatically created when the backend application is started. The user information is as follows:

#### Admin
```
Email: admin@test.com
Password: 123456
```

#### User
```
Email: user@test.com
Password: 123456
```

### Technical Details

#### UI Library
This application uses Semantic UI to help developers quickly and effectively understand the code. Semantic UI has a clear structure, and classes and labels are meaningfully named with semantic naming conventions. It is also preferred due to its comprehensive documentation.

#### Authentication Mechanism

This application uses JSON Web Token (JWT) to ensure secure login for users. JWT is a widely used authentication standard in modern web applications.

#### Data Transfer Object (DTO)

DTO (Data Transfer Object) is a design pattern optimized for data transfer. It effectively transfers data objects in communication with the database or external services. DTOs reduce network traffic, improve client-side application performance, and ensure that only the necessary data is fetched. This design pattern is preferred in this application to provide users with easy access to only the required data.

#### Cache Mechanism

In REST APIs, a caching mechanism is used to improve performance and reduce server load. Cache is a memory space where data or responses are temporarily stored. Although no special caching mechanism is used in this application, Spring's caching capabilities are minimally leveraged, keeping performance requirements in mind.

## Endpoints

### Authentication

**POST /auth/register**

User registers in the system.

Request Body:
```json
{
  "firstName": "",
  "lastName": "",
  "email": "",
  "password": "",
  "hospitalIdentityNumber": ""
}
```

**POST /auth/login**

User logs in to the system.

Request Body:
```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

### Image
```
POST /image/upload/{reportId}
```

Defines an image for a report.

```
GET /image/download/{fileId}
```

Fetches the image defined for the report.

### Report
```
GET /api/v1/report/all
```

Fetches all reports.

```
GET /api/v1/report/{id}
```

Fetches the report that matches the given ID.

**POST /api/v1/report/save**

Request Body:
```json
{
  "reportNo": "",
  "patientFirstName": "",
  "patientLastName": "",
  "patientIdentityNumber": "",
  "diagnosisTitle": "",
  "diagnosisDetail": ""
}
```

Adds a new report.

```
PUT /api/v1/report/upload/{id}
```

Updates the report that matches the given ID.

```
DELETE /api/v1/report/delete/{id}
```

Deletes the report that matches the given ID (this operation can only be performed by admin users).

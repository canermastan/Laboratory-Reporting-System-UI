import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Button, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import TextInput from "../utilities/customFormElements/TextInput";
import AuthService from "../services/auth/authService";
import { toast } from "react-toastify";
import { useNavigate, useRouteLoaderData } from "react-router";

export default function Login() {
  let navigate = useNavigate();

  const schema = Yup.object({
    email: Yup.string()
      .required("Email zorunlu")
      .email("Geçerli bir email değil."),
    password: Yup.string().required("Şifre zorunlu."),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const [errorLogin, setErrorLogin] = useState(false);

  const handleFormOnSubmit = (values) => {
    let authService = new AuthService();
    console.log(values.email);
    console.log(values.password);
    authService
      .login(values.email, values.password)
      .then((result) => {
        if (result.token !== null) {
          toast.success("Giriş başarılı.");
          window.location.reload();
        }
      })
      .catch((err) => {
        setErrorLogin(true);
      });
  };

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="https://react.semantic-ui.com/logo.png" /> Hesaba giriş
            yap
          </Header>
          {errorLogin ? <Message color='red'>Giriş işlemi başarısız.</Message> : null}
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values) => handleFormOnSubmit(values)}
          >
            <Form size="large" className="ui form">
              <Segment stacked>
                <TextInput
                  name="email"
                  placeholder="E-mail address"
                  type="email"
                />
                <TextInput
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <Button type="submit" color="teal" fluid size="large">
                  Giriş Yap
                </Button>
              </Segment>
            </Form>
          </Formik>
        </Grid.Column>
      </Grid>
    </>
  );
}

"use client";

import { CounterContext } from "@/context/counter.context";
import { login } from "@/services/authApi";
import { Box, Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";

export default function Page() {
  const { state, dispatch } = useContext(CounterContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Укажите правильную почту")
        .required("Укажите email"),
      password: Yup.string().required("Укажите пароль"),
    }),
    onSubmit: async (values) => {
      const response = await login(values);
      sessionStorage.setItem("token", response.token);
    },
  });

  return (
    <Container maxWidth="xs">
      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <TextField
            value={formik.values.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={formik.handleChange}
            helperText={formik.errors.email}
            error={
              formik.touched.email ? formik.errors.email !== undefined : false
            }
          />
          <TextField
            value={formik.values.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            helperText={formik.errors.password}
            error={
              formik.touched.password
                ? formik.errors.password !== undefined
                : false
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
}

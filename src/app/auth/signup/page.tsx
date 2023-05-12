'use client';

import { registration } from "@/services/authApi";
import { Box, Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Page() {

    
    const formik = useFormik({
        initialValues: {
            email: '',
            firstname: '',
            lastname: '',
            password: '',

        },
        validationSchema: 
            Yup.object().shape({
                firstname: Yup.string().required('Укажите имя'),
                lastname: Yup.string().required('Укажите фамилию'),
                email: Yup.string().email('Укажите правильную почту').required('Укажите email'),
                password: Yup.string().required('Укажите пароль')
            }),
        onSubmit: async values => {
            const response = await registration(values);
            sessionStorage.setItem('token', response.token);
        }
    })

    return (
        <Container maxWidth='xs'>
            <Box>
                <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                >
                <TextField
                    value={formik.values.firstname}
                    margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="First name"
                    name="firstname"
                    autoComplete="firstname"
                    onChange={formik.handleChange}
                    helperText={formik.errors.firstname}
                    error={formik.touched.firstname ? formik.errors.firstname !== undefined : false}
                />
                <TextField
                    value={formik.values.lastname}
                    margin="normal"
                    required
                    fullWidth
                    id="lastname"
                    label="Last name"
                    name="lastname"
                    autoComplete="lastname"
                    onChange={formik.handleChange}
                    helperText={formik.errors.lastname}
                    error={formik.touched.lastname ? formik.errors.lastname !== undefined : false}
                />
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
                        error={formik.touched.email ? formik.errors.email !== undefined : false}
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
                        error={formik.touched.password ? formik.errors.password !== undefined : false}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                </form>
            </Box>
        </Container>
    )
}
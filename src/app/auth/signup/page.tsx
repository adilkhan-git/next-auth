'use client';

import { registration } from "@/services/authApi";
import { Box, Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function Page() {

    const router = useRouter();
    
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            surname: '',
            password: '',

        },
        validationSchema: 
            Yup.object().shape({
                name: Yup.string().required('Укажите имя'),
                surname: Yup.string().required('Укажите фамилию'),
                email: Yup.string().email('Укажите правильную почту').required('Укажите email'),
                password: Yup.string().required('Укажите пароль')
            }),
        onSubmit: async values => {
            await registration(values);
            router.push('/login');
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
                    value={formik.values.name}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="First name"
                    name="name"
                    autoComplete="name"
                    onChange={formik.handleChange}
                    helperText={formik.errors.name}
                    error={formik.touched.name ? formik.errors.name !== undefined : false}
                />
                <TextField
                    value={formik.values.surname}
                    margin="normal"
                    required
                    fullWidth
                    id="surname"
                    label="Last name"
                    name="surname"
                    autoComplete="surname"
                    onChange={formik.handleChange}
                    helperText={formik.errors.surname}
                    error={formik.touched.surname ? formik.errors.surname !== undefined : false}
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
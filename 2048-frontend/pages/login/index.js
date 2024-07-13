'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "../page.module.css";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


function Login() {
    // className={styles.main}
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting login with', { email, password });
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    router.push('/home');
                } else {
                    setError('Invalid email or password');
                }
            })
            .catch(err => {
                console.log(err)
                setError('An error occurred. Please try again.');
            });
    }


    return (
        <main className={styles.main}>
            <div className={styles.login}>
                <h2>Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>{' '}
                    {error && <label style={{ color: 'red' }}>{error}</label>} {/* Conditionally render error message */}
                </Form>
                <>
                    <label>Don't Have an Account?</label>
                    <br />
                    <Link href="/register" passHref>
                        <Button variant="secondary" className={styles.loginDir}>Register</Button>{' '}
                    </Link>
                </>
            </div>
        </main>
    );
}

export default Login; 
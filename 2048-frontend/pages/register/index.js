'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "../page.module.css";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Error state for displaying error messages
    const router = useRouter();

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Reset error state before submitting
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result);
                // I want to direct this to /login here
                router.push('/login');
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.status === 400) {
                    setError('Invalid email or password');
                } else {
                    setError('An error occurred. Please try again.');
                }
            });
    }

    return (
        <main className={styles.main}>
            <div className={styles.register}>
                <h2>Register</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </Form.Group>
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
                    <Button variant="primary" type="submit">Register</Button>{' '}
                    {error && <label style={{ color: 'red' }}>{error}</label>} {/* Conditionally render error message */}
                </Form>
                <>
                    <label>Already Have an Account</label>
                    <br />
                    <Link href="/login" passHref>
                        <Button variant="secondary" className={styles.loginDir}>Login</Button>{' '}
                    </Link>
                </>
            </div>
        </main>
    );
}

export default Signup;
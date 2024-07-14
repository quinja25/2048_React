'use client'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "./page.module.css";

function Signup() {
    // className={styles.main}
    return (
        <main className={styles.main}>
            <div className={styles.register}>
                <h2>Register</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" />
                    </Form.Group>
                </Form>
                <>
                    <Button variant="primary">Register</Button>{' '}
                    <br />
                    <label>Already Have an Account</label>
                    <br />
                    <Button variant="secondary" className={styles.loginDir}>Login</Button>{' '}
                </>
            </div>
        </main>
    );
}

export default Signup;
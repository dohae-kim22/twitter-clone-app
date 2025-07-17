import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import {
  Title,
  Wrapper,
  Form,
  Input,
  Switcher,
  Error,
} from "../components/AuthComponents";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || !email) return;
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      navigate("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Find your 𝕏 account</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="E-mail"
          type="email"
          onChange={handleChange}
          value={email}
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Sending email..." : "Reset password"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Remember your password? <Link to="/login">Log in</Link>
      </Switcher>
    </Wrapper>
  );
}

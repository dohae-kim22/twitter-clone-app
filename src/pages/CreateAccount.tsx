import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Title,
  Wrapper,
  Form,
  Input,
  Switcher,
  Error,
} from "../components/AuthComponents";
import SocialLoginButton from "../components/SocialLoginButton";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || !name || !email || !password) return;
    try {
      setIsLoading(true);
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credential.user);
      await updateProfile(credential.user, { displayName: name });
      navigate("/");
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
      <Title>Join 𝕏</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Name"
          type="text"
          onChange={handleChange}
          value={name}
          required
        />
        <Input
          name="email"
          placeholder="E-mail"
          type="email"
          onChange={handleChange}
          value={email}
          required
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          value={password}
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in</Link>
      </Switcher>
      <SocialLoginButton provider="google" />
      <SocialLoginButton provider="github" />
    </Wrapper>
  );
}

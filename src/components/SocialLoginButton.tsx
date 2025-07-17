import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  background-color: white;
  color: black;
  width: 100%;
  margin-top: 10px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Logo = styled.img`
  height: 25px;
`;

interface SocialLoginButtonProps {
  provider: "google" | "github";
}

export default function SocialLoginButton({
  provider,
}: SocialLoginButtonProps) {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const authProvider =
        provider === "google"
          ? new GoogleAuthProvider()
          : new GithubAuthProvider();
      await signInWithPopup(auth, authProvider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleClick}>
      <Logo src={`/${provider}-logo.svg`} />
      Continue with {provider[0].toUpperCase() + provider.slice(1)}
    </Button>
  );
}

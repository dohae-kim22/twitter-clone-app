import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0;
  color: #1d9bf0;
  border: 1px solid #1d9bf0;
  border-radius: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  return (
    <Form>
      <TextArea
        value={tweet}
        placeholder="What's happening?"
        rows={5}
        maxLength={200}
        onChange={handleChange}
      ></TextArea>
      <AttachFileButton htmlFor="file">{file ? 'Photo added ✅':'Add photo'}</AttachFileButton>
      <AttachFileInput
        type="file"
        id="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <SubmitButton
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}

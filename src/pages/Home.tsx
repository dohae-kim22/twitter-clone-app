import styled from "styled-components";
import PostTweetForm from "../components/PostTweetForm";
import Timeline from "../components/TimeLine";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  grid-template-rows: 1fr 5fr;
  overflow-y: scroll;
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}

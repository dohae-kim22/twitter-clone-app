import styled from "styled-components";
import type { ITweet } from "./TimeLine";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const UserName = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;

const Photo = styled.img`
  height: 100px;
  border-radius: 15px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  text-transform: uppercase;
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default function Tweet({ userName, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;

  const handleDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");

    if (!ok || user?.uid !== userId) return;

    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${userId}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Column>
        <UserName>{userName}</UserName>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        ) : null}
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
}

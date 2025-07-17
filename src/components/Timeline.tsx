import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Tweet from "./Tweet";

export interface ITweet {
  id: string;
  createdAt: number;
  photo?: string;
  tweet: string;
  userId: string;
  userName: string;
}

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(tweetsQuery);
    const fetchedTweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, photo, userId, userName } = doc.data();
      return {
        tweet,
        createdAt,
        photo,
        userId,
        userName,
        id: doc.id,
      };
    });
    setTweets(fetchedTweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </>
  );
}

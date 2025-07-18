import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  type Unsubscribe,
} from "firebase/firestore";
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

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
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
        console.log(fetchTweets);
        setTweets(fetchedTweets);
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    };
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

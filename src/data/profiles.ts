import type { Profile } from "../types/profile";
import { profileImages } from "./images";

export const profiles: Profile[] = [
  {
    id: 1,
    name: "ジュン",
    age: 23,
    bio: "ゲームとラーメンを愛しています。",
    image: profileImages.jun1,
    matchRate: 0.85,
  },
  {
    id: 2,
    name: "Hiro",
    age: 23,
    bio: "週末は友達と飲みに行くのが好きです。",
    image: profileImages.jun2,
    matchRate: 0.6,
  },
  {
    id: 3,
    name: "Jun",
    age: 23,
    bio: "よくメロいって言われます！",
    image: profileImages.jun3,
    matchRate: 0.6,
  },
  {
    id: 4,
    name: "ヒロキ",
    age: 23,
    bio: "週128は筋トレしてますよ",
    image: profileImages.jun4,
    matchRate: 0.6,
  },
  {
    id: 5,
    name: "たかだ",
    age: 23,
    bio: "ウェイ系の陽キャです！お酒強い人と仲良くなりたいです！",
    image: profileImages.jun5,
    matchRate: 0.6,
  },
  {
    id: 6,
    name: "ヒ",
    age: 23,
    bio: "猫ミーム真似してみたり。",
    image: profileImages.jun6,
    matchRate: 0.6,
  },
  {
    id: 7,
    name: "ヒロッキ",
    age: 23,
    bio: "男らしい顔してるってよく言われます！",
    image: profileImages.jun7,
    matchRate: 0.6,
  },
];
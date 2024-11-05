"use client";
import Image from "next/image";
import Card from "./components/Card"

export default function Home() {
  return (
    <>
      <Card price={200} alt="test" img="https://ecs-static.teamtreehouse.com/assets/views/marketing/shared/community-banner-white-47072046c51352fe6a69f5e691ff5700b28bb11d45197d7bdf066d9ea3f72d0c.webp"/>
      <p>Hello, world.</p>
    </>
  );
}

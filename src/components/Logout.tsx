"use client";

import { doLogout } from "./LoginFuncs";
import Button from "./Button";
import Link from "next/link";

/** TO DO: PROBABLY USESTATE TO  REFRESH PAGE? LOOK UP HOW */
export default function Logout() {
    return(
    <Link href="/"><Button onClick={doLogout}>Logout</Button></Link>);
}
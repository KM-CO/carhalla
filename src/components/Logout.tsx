"use client";

import Button from "./Button";
import Link from "next/link";
import { signOut } from "next-auth/react";

/** TO DO: PROBABLY USESTATE TO  REFRESH PAGE? LOOK UP HOW
 * using default sign out in order to refresh page; talk to Dr. Stephens to see if it's okay
 * WE WANT REACT TO RERENDER BUT NOT REGET THE CARS -- SEE HOW TO DO
 * - i.e., we want to update View button, Delete, and Add WITHOUT recalling database; may be okay to
 * recall anyway since potential updates; ask Dr. Stephens
 */
export default function Logout() {
    return (
        <Link href="/">
            <Button onClick={() => signOut()}>Logout</Button>
        </Link >
    );
}
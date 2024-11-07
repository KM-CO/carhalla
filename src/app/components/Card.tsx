"use client"
import Link from "next/link";
import Button from "./Button"
import Image from 'next/image'

interface CardProps {
  model: string,
  make: string,
  price: number,
  img: string,
  alt: string,
  desc: string,
}

/** TO DO
 * Add functionality to clicking card/image
 * Add functionality to clicking BUY button (should take to same page as clicking anywhere else)
 * Add fonts and more CSS
 * Change button stuff to EDIT when logged in (should be something about it on slides using ternary operators)
 */
export default function Card({ model, make, price, img, alt, desc }: CardProps) {
  return (
    <div className="mx-auto relative flex flex-grow-0 flex-col h-[300px] min-w-[300px] max-w-[300px] bg-slate-500 content-center rounded-3xl border-2 border-gray-500">
      <div className="absolute z-10 m-2 border-2 rounded-full p-2 min-w-[100px] text-center bg-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] flex-1">${price}</div>
      <div className="relative m-auto mb-0 content-center">
        <div className="absolute h-[200px] w-[250px] duration-1000 opacity-0 hover:opacity-100">
          <div className="absolute grid grid-rows-2 w-[250px] h-[200px] rounded-3xl bg-[rgb(255,255,255,.5)] opacity-0 hover:opacity-100 duration-200 border-2 border-slate-600">
          <div className="justify-self-center self-end text-xl">{model} <b>{make}</b></div>
            <div className="absolute top-[100px] max-h-[100px] h-[98px] px-2 max-w-[250px] w-[246px] line-clamp-4 after:bg-gradient-to-t after:from-white after:via-transparent after:to-transparent after:h-[200px] after:w-[250px] after:content-[''] after:absolute after:bottom-0 after:-left-[2px] rounded-b-3xl after:pointer-events-none after:border-slate-600 after:border-2 after:rounded-b-3xl">
              {desc}
            </div>
          </div>
        </div>
        <Image height={200} width={250} src={img} alt={alt} className="min-h-[200px] min-w-[250px] max-h-[200px] max-w-[250px] resize-none rounded-3xl border-gray-600 border-2" priority />
      </div>
      <Link href="form-submission" className="m-auto"><Button onClick={() => {}}>Test</Button></Link>
    </div>
  );
}
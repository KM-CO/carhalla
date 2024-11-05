import Button from "./Button"
import Image from 'next/image'

interface CardProps {
  price: number,
  img: string,
  alt: string
}

/** TO DO
 * Add functionality to clicking card/image
 * Add functionality to clicking BUY button (should take to same page as clicking anywhere else)
 * Add fonts and more CSS
 * Change button stuff to EDIT when logged in (should be something about it on slides using ternary operators)
 */
export default function Card({price, img, alt}: CardProps) {
    return (
      <div className="flex flex-col h-[300px] min-w-[300px] bg-slate-500 m-4 content-center rounded-3xl border-2 border-gray-500 hover:border-">
        <div className="absolute m-2 border-2 rounded-full p-2 min-w-[100px] text-center bg-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] flex-1">${price}</div>
        <Image height={200} width={250} className="border-gray-600 border-2 m-auto mb-0 rounded-3xl text-center content-center" src={img} alt={alt} priority />
        <Button onClick={() => {}}>Test</Button>
      </div>  
    );
}
import Button from "./Button"
import Image from 'next/image'

interface CardProps {
  price: number,
  img: string,
  alt: string
}

export default function Card({price, img, alt}: CardProps) {
    return (
      <div className="flex flex-col h-[300px] w-[300px] bg-slate-500 m-4 content-center rounded-3xl border-2 border-gray-500 hover:border-">
        <div className="fixed top-6 left-6 border-2 rounded-full p-2 min-w-[100px] text-center bg-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] flex-1">${price}</div>
        <Image height={200} width={250} className="border-gray-600 border-2 m-auto mb-0 rounded-3xl text-center content-center" src={img} alt={alt} />
        <Button onClick={() => {}}>Test</Button>
      </div>  
    );
}
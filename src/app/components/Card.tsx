import { CiImageOff } from "react-icons/ci";

export default function Card() {
    return (
      <div className="h-[300px] w-[300px] bg-slate-500 drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)] m-4 content-center rounded-3xl hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] duration-500 hover:translate-y-[-5px]">
        <div className="fixed top-3 left-3 border-2 rounded-full p-2 w-[100px] text-center bg-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">price</div>
        <div className="h-[200px] w-[250px] border-gray-600 border-2 m-auto rounded-3xl text-center content-center">image here</div>
        <div className="m-auto mt-4 text-center border-2 w-[75px] p-2">button</div>
      </div>  
    );
}
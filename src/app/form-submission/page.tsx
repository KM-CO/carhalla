"use client";
import Button from "../components/Button";
import Image from "next/image"
import Header from "../components/Header"
import Link from "next/link";

export default function Home() {
    /** TO DO
     * Make components and stuff for the follow
     * CSS
     * fix appearance when resizing
     */
    return (
        <div className="grid grid-rows-[min-content] h-full">
            <Header />
            <div className="grid grid-cols-2 grid-rows-2">
                <Link href="/" className="absolute right-5 my-4"><div className="right-5 absolute h-[30px] w-[30px] after:content-[''] after:right-[14px] before:right-[14px] after:h-[30px] after:border-[1px] after:border-black after:bg-black before:bg-black after:rotate-45 after:absolute before:content-[''] before:h-[30px] before:border-[1px] before:border-black before:-rotate-45 before:absolute"></div></Link>
                <div className="flex flex-col items-center justify-evenly">
                    <div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <input className="w-[100%] p-1" placeholder="Make/Model" />
                    </div>
                    <Image height={200} width={250} src={"https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="} alt={"no image"} className="min-h-[200px] min-w-[250px] max-h-[200px] max-w-[250px] resize-none rounded-3xl border-gray-600 border-2" priority />
                    <div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <input className="w-[100%] p-1" placeholder="Image link" />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-evenly">
                    <div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <input className="w-[100%] p-1" placeholder="Image link" />
                    </div><div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <input className="w-[100%] p-1" placeholder="Image link" />
                    </div><div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <input className="w-[100%] p-1" placeholder="Image link" />
                    </div>
                </div>
                <div className="col-span-2 flex flex-col justify-center">
                    <textarea rows={8} className="mx-auto w-[90%] resize-none border-2 border-slate-400 p-2" defaultValue="test" />
                    <Button>Submit</Button>
                </div>
            </div>
        </div>
    );
}

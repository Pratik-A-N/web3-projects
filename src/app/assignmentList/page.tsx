'use client';
import Link from "next/link";

export default function AssignmentList(){
    return <div className="flex justify-center pt-10">
        <div className="w-3/4  px-16">
            <div className="text-4xl pb-5">Assignments</div>
            <div>
                <div className="text-xl py-2 hover:text-blue-400"><Link href="/assignment1" >1. Proof of work</Link></div>
                <div className="text-xl py-2 hover:text-blue-400"><Link href="/assignment2" >2. Web based Wallet</Link> </div>
            </div>
        </div>
    </div>
}
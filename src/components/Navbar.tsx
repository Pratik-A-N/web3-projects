
import Link from "next/link"

export default function Navbar(){
    return <div className="border-b-2 border-slate-700 flex p-2 justify-between">
        <div className="font-extrabold hover:text-blue-400 cursor-pointer m-1"><Link href="/">NavbarName</Link></div>
        <div className="m-1">
            <div className="font-medium hover:text-blue-400 cursor-pointer"><Link href="/assignmentList">Assignments</Link> </div>
        </div>
    </div>
}
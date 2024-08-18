import { LabelledInput } from "./LabeledInput";

export function SignIn(){
    return <div className="flex justify-center items-center h-screen">
    <div className="rounded p-8 outline-dashed">
      <div className="text-center text-xl pb-5">Sign In</div>
      <div>
        <LabelledInput label="Username" placeholder="@pookie.." />
        <LabelledInput
          label="Password"
          placeholder="@pookie123"
          type="password"
        />
        <button
          className="bg-slate-600 text-white pt-1 pb-1 pl-3 pr-3 rounded mt-5 hover:bg-slate-800"
          type="button"
        >
          Login In
        </button>
      </div>
    </div>
  </div>
}
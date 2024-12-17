import Link from "next/link";

export default function Home() {
    
   

  return (
    <div className='flex justify-center items-center mt-10'>
        <Link href={'/countries'} className="py-4 px-8 bg-emerald-400 text-white text-xl">See availables countries</Link>
    </div>
  )
}

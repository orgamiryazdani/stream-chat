import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className='w-full h-svh'>
      <div className='container flex items-center justify-center h-full'>
        <SignIn />
      </div>
    </section>
  )
}

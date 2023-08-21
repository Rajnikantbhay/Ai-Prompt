'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const [providers, setProviders] = useState(null);
    const {data: session} = useSession()
    const [toggleDropdown, setToggleDropdown] = useState(false)
    useEffect(() => {
        const setProvidersfun = async() => {
            const response = await getProviders();
            setProviders(response);
        }
        setProvidersfun()
    },[])
    
  return (
    <nav className='flex justify-between w-full mb-16 pt-3'>
      <Link href={'/'} className='flex gap-2 items-center'>
        <Image src={'/assets/images/logo.svg'} alt='promptopia' width={30} height={30} className='object-contain'/>
        <p className='logo_text'>Promptopia</p>
      </Link>

    {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
            {session?.user ? (<div className='flex gap-3 md:gap-5'>
                <Link href={'create-prompt'} className='black_btn'>
                    Create Post
                </Link>

                <button type='button' onClick={signOut} className='outline_btn'>
                    Sign out
                </button>

                <Link href={'/profile'}>
                    <Image src={session?.user.image} width={37} height={37} alt='profile picture' className='rounded-full'/>
                </Link>

            </div>) : (
                <>{providers && Object.values(providers).map((provider) => (
                    <button type='button' className='black_btn' key={provider.name} onClick={() => signIn(provider.id)}>
                        Sign in
                    </button>
                ))}</>
            )}
        </div>

    {/* Mobile navigation */}
        
        <div className='sm:hidden flex relative'>
            {session?.user ? (<div className='flex'>
                <Image src={session?.user.image} width={37} height={37} alt='profile picture' className='rounded-full cursor-pointer' onClick={() => {setToggleDropdown((prev) => !prev)}} />

            {toggleDropdown && (<div className='dropdown'>
                <Link href={'/profile'} className='dropdown_link' onClick={() => setToggleDropdown(false)}>My Profile</Link>
                <Link href={'/create-prompt'} className='dropdown_link' onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
                <button type='button' onClick={() => {setToggleDropdown(false); signOut()}} className='mt-5 w-full black_btn'>
                    Sign Out
                </button>
            </div>)}

            </div>) : (
                <>{providers && Object.values(providers).map((provider) => (
                    <button type='button' className='black_btn' key={provider.name} onClick={() => signIn(provider.id)}>
                        Sign in
                    </button>
                ))}</>
            )}
        </div>

    </nav>
  )
}

export default Nav

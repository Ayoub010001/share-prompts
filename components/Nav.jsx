'use client'
import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {

  const isLogged = true;
  const [toggleDropDown, setToggleDropDown] = useState(false)

  const [providers, setProviders] = useState(null)


  // useEffect(()=>{
  //     const setProviders = async()=>{
  //       const response = await getProviders();
  //       setProviders(response);
  //     }
  //     setProviders();
  // },[]);

  return (
    <nav className=' flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image  src="/assets/images/logo.svg" width={30}
        height={30} alt='Promptopia log'/>
        <p className='logo_text'>Promptopia</p>
      </Link>
      {/*Desktop navigation*/}
      <div className='sm:flex hidden'>
          {isLogged ?
            (<div className='flex gap-3 md:gap-5'>
              <Link href="/create-prompt" className='black_btn'>
                Create Post
              </Link>
              <button type='button' onClick={signOut} 
              className='outline_btn'>Sign Out</button>
              
              <Link href="/profile">
              <Image 
                src="/assets/images/logo.svg" width={37} height={37}
                className='rounded-full' alt='profile'
              />
              </Link>

            </div>):
            (<Fragment>
                {/*
                  providers && Object.values(providers).map((provider)=>{
                    return <button type='button' 
                                  className='black_btn'
                                  key={provider.name}
                                  onClick={()=> signIn(provider.id)}>Sign In</button>
                  })
                */}
              </Fragment>)}
      </div>
      {/**Mobile navigation*/}
      <div className='sm:hidden flex relative'>
          {
            isLogged ? (
              <div className='flex'>
                <Image 
                  src="/assets/images/logo.svg" 
                  width={37} height={37}
                  className='rounded-full' 
                  alt='profile'
                  onClick={()=>{
                    setToggleDropDown(prev => !prev)
                  }}  
                />
                {
                  toggleDropDown && (
                    <div className='dropdown'>
                        <Link
                          href="/profile"
                          className="dropdown_link"
                          onClick={
                            ()=> setToggleDropDown(false)
                          }
                        >
                        Profile
                        </Link>
                        <Link
                          href="/profile"
                          className="dropdown_link"
                          onClick={
                            ()=> setToggleDropDown(false)
                          }
                        >
                        Create Prompt
                        </Link>
                        <button type='button'
                        onClick={
                          ()=> {setToggleDropDown(false);
                                signOut();
                          }
                        }
                        className='mt-5 w-full black_btn'
                        >Sign Out
                        </button>
                    </div>
                  )
                }
              </div>
            ):(<Fragment></Fragment>)
          }
      </div>
    </nav>
  )
}

export default Nav
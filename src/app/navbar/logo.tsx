import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <div>
      <Link href="/">
  
          <Image src="/content/logodemo.svg"  width={150} height={150} alt="logo" className='w-40'/>
       
      </Link>
    </div>
  )
}

export default Logo

// import Head from 'next/head'
// import Image from 'next/image'
import { useState } from 'react'
import DropSection from '../components/index/DropSection'
import ToolsSection from '../components/index/ToolsSection'



const  DragNDropTool = () => {
  console.log('DragNDropTool render')
  return (
    <div className='flex'>
      <div className='w-60 min-h-[100vh] border-r-8 border-r-slate-500  fixed overflow-y-auto bg-slate-100/95'>
        <div className='p-5 border-b-slate-500 border-b-2 font-bold fixed border-r-8 border-r-slate-500 w-[15rem] bg-inherit'>Tools Section</div>
        <div className='px-3 space-y-5 mt-20'>
          <ToolsSection />
        </div>
      </div>
      <div className='w-full pl-[15rem] bg-slate-100/95'>
        <p className='p-5 border-b-slate-500 border-b-2 font-bold fixed w-full bg-inherit'>Layout Section</p>
        <div className='flex min-h-[calc(100vh-15rem)] bg-red-200 justify-center  overflow-y-auto mt-20'>
          <DropSection />
        </div>
      </div>
    </div>
  )
}

export default DragNDropTool

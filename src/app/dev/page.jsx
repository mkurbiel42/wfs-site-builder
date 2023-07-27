'use client'
import ComponentsList from '../_components/ComponentsList'
import UpperBar from '../_components/UpperBar'
import Generator from '../_components/Generator'
import PagesList from '../_components/PagesList'
import ComponentsTree from '../_components/ComponentsTree'
import "./index.css"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useRouter } from 'next/navigation'
import { firebaseApp, firebaseAuth, logOut } from '../_util/Firebase'
import { useEffect, useState } from 'react'
import UseAuthContext from './_util/UseAuthContext'
import UsePagesContext from './_util/UsePagesContext'
import UserCampaignsMenu from '../_components/UserCampaignsMenu'

export default function Page(){
  let router = useRouter()
  let {state, dispatch} = UsePagesContext()
  let {currentUser} = UseAuthContext()

  useEffect(() => {
    if(!currentUser) router.replace("/login")
  }, [currentUser])

  return (
    <div id='root'>
      {
        !state.edittedCampaign && 
        <UserCampaignsMenu />
      }

      {state.edittedCampaign &&
        <>
          <UpperBar>
            <PagesList/>
            <button className='default-button' onClick={async () => {
              let {result, error} = await logOut();
              if(error) console.log(error)
            }}>Log out</button>
          </UpperBar>
          <ComponentsList />
          <ComponentsTree />
          <Generator />
        </>
      } 
      
    </div>
  )
}
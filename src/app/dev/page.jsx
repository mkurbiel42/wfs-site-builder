'use client'
import ComponentsList from '../_components/ComponentsList'
import UpperBar from '../_components/UpperBar'
import Generator from '../_components/Generator'
import PagesList from '../_components/PagesList'
import ComponentsTree from '../_components/ComponentsTree'
import { useRouter } from 'next/navigation'
import UseAuthContext from './_util/UseAuthContext'
import UsePagesContext from "@/app/_util/UsePagesContext"
import UserCampaignsMenu from '../_components/UserCampaignsMenu'
import CampaignInfo from '../_components/CampaignSettings'
import "./style.css"
import LoginPage from '../_components/LoginPage'

export default function Page(){
  let router = useRouter()
  let {state, dispatch} = UsePagesContext()
  let {currentUser} = UseAuthContext()

  return (
    <div id='root'>
      {!currentUser ? <LoginPage /> : 
        <>
          {
            (!state.edittedCampaign && currentUser && currentUser != "WAITING_FOR_AUTH") &&
            <>
              <UpperBar />
              <UserCampaignsMenu />
            </>
          }
    
          {state.edittedCampaign &&
            <>
              <UpperBar />
              <PagesList />
              <Generator />
              <CampaignInfo />
              <ComponentsTree />
            </>
          }
        </>
      }
    </div>
  )
}
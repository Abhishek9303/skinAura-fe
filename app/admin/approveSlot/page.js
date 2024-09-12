export async function GetAllSlots() {
  try{
    const res = axios.get("/api/v1/admin/getAllMeetingReq");
  }
  catch(err){
    console.log(err)
    return null
  }
}
import React from 'react'

const ApproveSlot = () => {
  return (
    <>
    
    </>
  )
}

export default ApproveSlot
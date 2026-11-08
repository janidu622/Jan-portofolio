import { NextResponse } from 'next/server';
export async function GET() {
 try {
  const response=await fetch('https://leetcode.com/graphql/',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:'query userProgress($username: String!) { matchedUser(username: $username) { submitStatsGlobal { acSubmissionNum { difficulty count } } } }',variables:{username:'janidu622'}}),next:{revalidate:3600}});
  if(!response.ok) throw new Error('Profile unavailable');
  const data=await response.json();const all=data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find((item:{difficulty:string})=>item.difficulty==='All');
  if(typeof all?.count!=='number') throw new Error('Count unavailable');
  return NextResponse.json({solved:all.count});
 } catch {return NextResponse.json({solved:null});}
}

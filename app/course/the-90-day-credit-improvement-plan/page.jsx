import{cookies}from"next/headers";
import{course110}from"../../../lib/course-110-data";
import{verifySession}from"../../../lib/session";
import{PasswordGate}from"../../../components/PasswordGate";
import{CreditMissionCourse}from"../../../components/CreditMissionCourse";
export const dynamic="force-dynamic";
export default async function CoursePage(){const jar=await cookies();const unlocked=await verifySession(jar.get("cp_course_access")?.value,"course1");return unlocked?<CreditMissionCourse course={course110}/>:<PasswordGate course={course110}/>}

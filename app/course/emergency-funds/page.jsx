import{cookies}from"next/headers";
import{course23}from"../../../lib/course-23-data";
import{verifySession}from"../../../lib/session";
import{PasswordGate}from"../../../components/PasswordGate";
import{EmergencyFundCourse}from"../../../components/EmergencyFundCourse";
export const dynamic="force-dynamic";
export default async function CoursePage(){const jar=await cookies();const unlocked=await verifySession(jar.get("cp_course_access")?.value,course23.id);return unlocked?<EmergencyFundCourse course={course23}/>:<PasswordGate course={course23}/>}

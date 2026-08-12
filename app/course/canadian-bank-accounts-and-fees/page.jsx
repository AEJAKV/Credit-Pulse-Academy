import{cookies}from"next/headers";import{course24}from"../../../lib/course-24-data";import{verifySession}from"../../../lib/session";import{PasswordGate}from"../../../components/PasswordGate";import{BankFeesCourse}from"../../../components/BankFeesCourse";
export const dynamic="force-dynamic";
export default async function CoursePage(){const jar=await cookies();const unlocked=await verifySession(jar.get("cp_course_access")?.value,course24.id);return unlocked?<BankFeesCourse course={course24}/>:<PasswordGate course={course24}/>}

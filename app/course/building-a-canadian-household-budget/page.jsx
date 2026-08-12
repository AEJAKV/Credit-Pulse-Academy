import{cookies}from"next/headers";
import{course21}from"../../../lib/course-21-data";
import{verifySession}from"../../../lib/session";
import{PasswordGate}from"../../../components/PasswordGate";
import{HouseholdBudgetCourse}from"../../../components/HouseholdBudgetCourse";
export const dynamic="force-dynamic";
export default async function CoursePage(){const jar=await cookies();const unlocked=await verifySession(jar.get("cp_course_access")?.value,course21.id);return unlocked?<HouseholdBudgetCourse course={course21}/>:<PasswordGate course={course21}/>}

import {cookies} from "next/headers";
import {course214} from "../../../lib/course-214-data";
import {verifySession} from "../../../lib/session";
import {PasswordGate} from "../../../components/PasswordGate";
import {MajorPurchaseCourse} from "../../../components/MajorPurchaseCourse";

export const dynamic="force-dynamic";

export default async function CoursePage(){
  const jar=await cookies();
  const unlocked=await verifySession(jar.get("cp_course_access")?.value,"course1");
  return unlocked?<MajorPurchaseCourse course={course214}/>:<PasswordGate course={course214}/>;
}

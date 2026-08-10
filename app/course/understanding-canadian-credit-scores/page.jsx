import { cookies } from "next/headers";
import { course } from "../../../lib/course-data";
import { verifySession } from "../../../lib/session";
import { PasswordGate } from "../../../components/PasswordGate";
import { SinglePageCourse } from "../../../components/SinglePageCourse";

export const dynamic = "force-dynamic";
export default async function CoursePage() {
  const jar = await cookies();
  const unlocked = await verifySession(jar.get("cp_course_access")?.value, "course1");
  return unlocked ? <SinglePageCourse course={course}/> : <PasswordGate course={course}/>;
}

import { cookies } from "next/headers";
import { course15 } from "../../../lib/course-15-data";
import { verifySession } from "../../../lib/session";
import { PasswordGate } from "../../../components/PasswordGate";
import { BuildCreditCourse } from "../../../components/BuildCreditCourse";

export const dynamic = "force-dynamic";

export default async function CoursePage() {
  const jar = await cookies();
  const unlocked = await verifySession(jar.get("cp_course_access")?.value, "course1");
  return unlocked ? <BuildCreditCourse course={course15} /> : <PasswordGate course={course15} />;
}

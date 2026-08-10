import { cookies } from "next/headers";
import { course17 } from "../../../lib/course-17-data";
import { verifySession } from "../../../lib/session";
import { PasswordGate } from "../../../components/PasswordGate";
import { CreditUtilizationCourse } from "../../../components/CreditUtilizationCourse";

export const dynamic = "force-dynamic";

export default async function CoursePage() {
  const jar = await cookies();
  const unlocked = await verifySession(jar.get("cp_course_access")?.value, "course1");
  return unlocked ? <CreditUtilizationCourse course={course17} /> : <PasswordGate course={course17} />;
}

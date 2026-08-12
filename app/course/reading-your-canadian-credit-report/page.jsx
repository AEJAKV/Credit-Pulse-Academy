import { cookies } from "next/headers";
import { course13 } from "../../../lib/course-13-data";
import { verifySession } from "../../../lib/session";
import { PasswordGate } from "../../../components/PasswordGate";
import { CreditReportCourse } from "../../../components/CreditReportCourse";

export const dynamic = "force-dynamic";

export default async function CoursePage() {
  const jar = await cookies();
  const unlocked = await verifySession(jar.get("cp_course_access")?.value, course13.id);
  return unlocked ? <CreditReportCourse course={course13} /> : <PasswordGate course={course13} />;
}

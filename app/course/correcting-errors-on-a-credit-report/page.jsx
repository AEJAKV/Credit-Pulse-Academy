import { cookies } from "next/headers";
import { course14 } from "../../../lib/course-14-data";
import { verifySession } from "../../../lib/session";
import { PasswordGate } from "../../../components/PasswordGate";
import { CreditDisputeCourse } from "../../../components/CreditDisputeCourse";

export const dynamic = "force-dynamic";

export default async function CoursePage() {
  const jar = await cookies();
  const unlocked = await verifySession(jar.get("cp_course_access")?.value, "course1");
  return unlocked ? <CreditDisputeCourse course={course14} /> : <PasswordGate course={course14} />;
}

import { cookies } from "next/headers";
import { course22 } from "../../../lib/course-22-data";
import { verifySession } from "../../../lib/session";
import { PasswordGate } from "../../../components/PasswordGate";
import { PaydayBridgeCourse } from "../../../components/PaydayBridgeCourse";

export const dynamic = "force-dynamic";

export default async function CoursePage() {
  const jar = await cookies();
  const unlocked = await verifySession(jar.get("cp_course_access")?.value, course22.id);
  return unlocked ? <PaydayBridgeCourse course={course22} /> : <PasswordGate course={course22} />;
}

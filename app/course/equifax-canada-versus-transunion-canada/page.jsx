import { cookies } from "next/headers";
import { course12 } from "../../../lib/course-12-data";
import { verifySession } from "../../../lib/session";
import { PasswordGate } from "../../../components/PasswordGate";
import { BureauComparisonCourse } from "../../../components/BureauComparisonCourse";

export const dynamic = "force-dynamic";

export default async function CoursePage() {
  const jar = await cookies();
  const unlocked = await verifySession(jar.get("cp_course_access")?.value, course12.id);
  return unlocked ? <BureauComparisonCourse course={course12} /> : <PasswordGate course={course12} />;
}

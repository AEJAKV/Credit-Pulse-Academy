import { cookies } from "next/headers";
import { course16 } from "../../../lib/course-16-data";
import { verifySession } from "../../../lib/session";
import { PasswordGate } from "../../../components/PasswordGate";
import { SecuredCardCourse } from "../../../components/SecuredCardCourse";

export const dynamic = "force-dynamic";

export default async function CoursePage() {
  const jar = await cookies();
  const unlocked = await verifySession(jar.get("cp_course_access")?.value, "course1");
  return unlocked ? <SecuredCardCourse course={course16} /> : <PasswordGate course={course16} />;
}

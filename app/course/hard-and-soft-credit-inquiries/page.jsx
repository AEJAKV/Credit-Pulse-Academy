import { cookies } from "next/headers";
import { course19 } from "../../../lib/course-19-data";
import { verifySession } from "../../../lib/session";
import { PasswordGate } from "../../../components/PasswordGate";
import { CreditInquiryCourse } from "../../../components/CreditInquiryCourse";

export const dynamic = "force-dynamic";

export default async function CoursePage() {
  const jar = await cookies();
  const unlocked = await verifySession(jar.get("cp_course_access")?.value, course19.id);
  return unlocked ? <CreditInquiryCourse course={course19} /> : <PasswordGate course={course19} />;
}

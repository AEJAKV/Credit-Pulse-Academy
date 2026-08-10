import { cookies } from "next/headers";
import { course18 } from "../../../lib/course-18-data";
import { verifySession } from "../../../lib/session";
import { PasswordGate } from "../../../components/PasswordGate";
import { PaymentHistoryCourse } from "../../../components/PaymentHistoryCourse";

export const dynamic = "force-dynamic";

export default async function CoursePage() {
  const jar = await cookies();
  const unlocked = await verifySession(jar.get("cp_course_access")?.value, "course1");
  return unlocked ? <PaymentHistoryCourse course={course18} /> : <PasswordGate course={course18} />;
}

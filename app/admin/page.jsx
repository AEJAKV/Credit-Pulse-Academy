import { cookies } from "next/headers";
import { verifySession } from "../../lib/session";
import { course } from "../../lib/course-data";
import { AdminDashboard, AdminLogin } from "../../components/Admin";

export const dynamic = "force-dynamic";
export default async function AdminPage(){const jar=await cookies();const unlocked=await verifySession(jar.get("cp_admin")?.value,"admin");return unlocked?<AdminDashboard course={course}/>:<AdminLogin/>}

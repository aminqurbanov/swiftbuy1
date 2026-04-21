import { NextRequest, NextResponse } from "next/server";
import { getLeads }                  from "@/lib/leads";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await getLeads();
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json(
      { error: "Leadlər alınarkən xəta baş verdi" },
      { status: 500 }
    );
  }
}

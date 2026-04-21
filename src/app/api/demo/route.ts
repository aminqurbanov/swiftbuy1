import { NextRequest, NextResponse } from "next/server";
import { validateDemoForm }          from "@/lib/validation";
import { saveLead }                  from "@/lib/leads";
import { DemoFormData, ApiResponse } from "@/types/lead";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    let body: Partial<DemoFormData>;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Sorğu formatı yanlışdır" },
        { status: 400 }
      );
    }

    const errors = validateDemoForm(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 422 }
      );
    }

    await saveLead({
      name:         body.name!.trim(),
      phone:        body.phone!.trim(),
      businessName: body.businessName!.trim(),
      city:         body.city!.trim(),
      salesArea:    body.salesArea ? body.salesArea.trim() : undefined,
      intent:       body.intent ?? "demo",
      role:         body.role   ?? "general",
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[demo] Unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Server xətası. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
      },
      { status: 500 }
    );
  }
}

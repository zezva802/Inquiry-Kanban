import { mockInquiries } from "@/lib/mockData";

export async function GET(request: Request) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return Response.json(mockInquiries);
}
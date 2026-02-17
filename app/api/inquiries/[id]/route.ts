import { mockInquiries } from "@/lib/mockData";

export async function PATCH(request:Request, {params}:{params:{id: string}}) {
    const id = params.id;
    const body = await request.json()

    await new Promise(resolve => setTimeout(resolve, 500));

    const inquiry = mockInquiries.find(i => i.id === id);

    if(!inquiry) {
        return Response.json({error: "Not Found"}, {status: 404});
    }

    return Response.json({ ...inquiry, phase: body.phase })
}
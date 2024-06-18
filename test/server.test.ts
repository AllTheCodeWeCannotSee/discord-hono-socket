import app from "@/app/api/[[...route]]/servers";



describe('PATCH /api/servers/:id', async () => {
    const json = {
        name: "My Server",
        imageUrl: "https://example.com/image.png"
    }
    const param = { id: "lemna4igd5pspfjws4vjcszs" }

    const res = await app.request("/:id", {
        method: "PATCH",
        body: JSON.stringify({
            json,
            param
        })
    });


    expect(await res.json()).toMatchObject({
        serverData: {
            name: "My Server",
            imageUrl: "https://example.com/image.png"
        }
    })

});
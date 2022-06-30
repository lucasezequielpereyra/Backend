// @deno-types="https://deno.land/x/servest@v1.3.4/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.4/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp, createRouter, contentTypeFilter  } from "https://deno.land/x/servest@v1.3.4/mod.ts";

const app = createApp();

const colors: Array<string> = [];

function IndexRoutes() {
  const router = createRouter();
  router.post("/", contentTypeFilter("multipart/form-data"), async (req) => {
    const bodyForm = await req.formData();
    const data: string | undefined = bodyForm.value("color");
    if(data !== undefined) {
      colors.push(data);
    }

    req.redirect("/");
  });

  return router;
}

app.handle("/", async (req) => {
  const translateToSpanish = (color:string): string => {
    switch (color) {
      case "red":
        return "rojo";
      case "green":
        return "verde";
      case "blue":
        return "azul";
      case "yellow":
        return "amarillo";
      case "orange":
        return "naranja";
      case "violet":
        return "violeta";
      default:
        return "";
    }
  }

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Hello</title>
        </head>
        <body>
          <div id="root">
            <h1>Formulario Color</h1>
            <form className="select" style={{display: 'flex', flexDirection: 'row'}} action="/colors/" method="post" encType="multipart/form-data" >
              <p style={{marginRight: '10px'}} >Seleccione color</p>
                <select name="color" id='optionColor'>
                  <option value="blue">Azul</option>
                  <option value="green">Verde</option>
                  <option value="yellow">Amarillo</option>
                  <option value="orange">Naranja</option>
                  <option value="red">Rojo</option>
                  <option value="violet">Violeta</option>
                </select>
                <button type="submit">Agregar</button>
            </form>
            <div className="colors" style={{width: '300px', height: '300px', backgroundColor:"black", marginTop: '20px', display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignItems: 'center'}} >
              {colors.map((color, index) => {
                return <p key={index} style={{color: color}}> {translateToSpanish(color)} </p>
              })}
            </div>
          </div>
        </body>
      </html>
    )
  })
})

app.route("/colors", IndexRoutes());

app.listen({ port: 8080 });
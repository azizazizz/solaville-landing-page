import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import AppRoutes from "./AppRoutes"

// Dipanggil scripts/prerender.mjs saat build untuk menghasilkan HTML tiap rute
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  )
}

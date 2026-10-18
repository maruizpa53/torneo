import { put, list, del } from "@vercel/blob";

const PREFIX = "copa-dm14/estado";
const N = 128;

const valid = (d) =>
  d && Array.isArray(d.players) && d.players.length === N &&
  d.players.every((p) => p && typeof p.name === "string" && p.name.length <= 120) &&
  d.win && typeof d.win === "object" && !Array.isArray(d.win) &&
  Object.entries(d.win).every(([k, v]) => /^[0-6]_\d{1,2}$/.test(k) && (v === 0 || v === 1));

async function latest() {
  const { blobs } = await list({ prefix: PREFIX });
  blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  return blobs;
}

export default async function handler(req, res) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ mensaje: "Almacenamiento no configurado" });
  }

  if (req.method === "GET") {
    const blobs = await latest();
    res.setHeader("Cache-Control", "public, s-maxage=5, stale-while-revalidate=25");
    if (!blobs.length) return res.status(404).json({ mensaje: "Sin datos publicados" });
    const r = await fetch(blobs[0].url, { cache: "no-store" });
    return res.status(200).json(await r.json());
  }

  if (req.method === "POST") {
    const pass = process.env.ADMIN_PASSWORD;
    if (!pass || req.headers["x-admin-key"] !== pass) {
      return res.status(401).json({ mensaje: "Clave incorrecta" });
    }
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    if (body.check) return res.status(200).json({ ok: true });
    if (!valid(body)) return res.status(400).json({ mensaje: "Datos inválidos" });

    const data = {
      players: body.players.map((p) => ({
        name: String(p.name).trim(),
        cat: String(p.cat || "").slice(0, 20),
        club: String(p.club || "").slice(0, 60),
        hcp: String(p.hcp || "").slice(0, 4),
      })),
      win: body.win,
      horas: Array.isArray(body.horas) ? body.horas.slice(0, 64).map((h) => String(h || "").slice(0, 4)) : [],
      updated: new Date().toISOString(),
    };
    const old = await latest();
    await put(`${PREFIX}.json`, JSON.stringify(data), {
      access: "public",
      addRandomSuffix: true,
      contentType: "application/json",
    });
    if (old.length) await del(old.map((b) => b.url));
    return res.status(200).json({ ok: true, updated: data.updated });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ mensaje: "Método no permitido" });
}

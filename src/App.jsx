import { useState } from "react";

const F = "system-ui, -apple-system, sans-serif";

const HC_COLORS = {
  17: { bg: "rgba(232,160,32,0.18)",  color: "#e8a020" },
  16: { bg: "rgba(239,159,39,0.18)",  color: "#EF9F27" },
  15: { bg: "rgba(192,132,252,0.18)", color: "#c084fc" },
  14: { bg: "rgba(96,165,250,0.18)",  color: "#60a5fa" },
  13: { bg: "rgba(45,212,191,0.18)",  color: "#2dd4bf" },
  12: { bg: "rgba(20,184,166,0.18)",  color: "#14b8a6" },
  11: { bg: "rgba(74,222,128,0.18)",  color: "#4ade80" },
  10: { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" },
  9:  { bg: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.38)" },
  8:  { bg: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.28)" },
};

const PLAYERS = [
  { name: "Richard",            hc: 17 },
  { name: "Miguel",             hc: 17 },
  { name: "Sayayin",            hc: 17 },
  { name: "Kakaroto",           hc: 16 },
  { name: "Nando",              hc: 16 },
  { name: "David Díaz",         hc: 15 },
  { name: "Antonio",            hc: 15 },
  { name: "Gato",               hc: 15 },
  { name: "Arturo",             hc: 15 },
  { name: "Cristian Marín",     hc: 14 },
  { name: "Jose Soto",          hc: 14 },
  { name: "Jhon Guerrero",      hc: 14 },
  { name: "Jorge Roncancio",    hc: 14 },
  { name: "Hamilton",           hc: 14 },
  { name: "Nicolás",            hc: 14 },
  { name: "William",            hc: 13 },
  { name: "Albeiro",            hc: 13 },
  { name: "Giovanny",           hc: 13 },
  { name: "Javier",             hc: 12 },
  { name: "Diego Coronado",     hc: 11 },
  { name: "Diego Salazar",      hc: 11 },
  { name: "Andrés",             hc: 11 },
  { name: "Jhon Barbosa",       hc: 11 },
  { name: "Jeisson",            hc: 11 },
  { name: "Yesid",              hc: 11 },
  { name: "Oscar",              hc: 11 },
  { name: "Julio",              hc: 11 },
  { name: "Mauricio Domínguez", hc: 11 },
  { name: "Leonardo",           hc: 10 },
  { name: "Cristian Barbosa",   hc: 10 },
  { name: "Carlos Barbosa",     hc: 10 },
  { name: "Chalo",              hc: 10 },
  { name: "Alex Pardo",         hc: 9  },
  { name: "Jhon Pardo",         hc: 9  },
  { name: "Cristian Sierra",    hc: 9  },
  { name: "Juan Diego",         hc: 9  },
  { name: "César",              hc: 9  },
  { name: "Edwin Wilches",      hc: 9  },
  { name: "Russi",              hc: 9  },
  { name: "Mauricio Velázquez", hc: 8  },
];

// Metro: Richard, Miguel, Sayayin, Kakaroto, Nando, David Díaz, Antonio
// Miguel juega a las 7:10 PM — los otros 6 del Metro arrancan a las 6:10 PM
// Nunca Metro vs Metro
// 40 jugadores, 7 mesas x 3 rondas = 42 cupos → 2 jugadores del Galán juegan 2 veces

const ROUNDS = [
  {
    time: "6:10 PM",
    color: "#e8a020",
    label: "Ronda 1",
    matches: [
      { p1: { name: "Richard",    hc: 17 }, p2: { name: "Hamilton",        hc: 14 }, mesa: 1 },
      { p1: { name: "Sayayin",    hc: 17 }, p2: { name: "Jorge Roncancio", hc: 14 }, mesa: 2 },
      { p1: { name: "Kakaroto",   hc: 16 }, p2: { name: "Jhon Guerrero",   hc: 14 }, mesa: 3 },
      { p1: { name: "Nando",      hc: 16 }, p2: { name: "William",         hc: 13 }, mesa: 4 },
      { p1: { name: "David Díaz", hc: 15 }, p2: { name: "Albeiro",         hc: 13 }, mesa: 5 },
      { p1: { name: "Antonio",    hc: 15 }, p2: { name: "Giovanny",        hc: 13 }, mesa: 6 },
      { p1: { name: "Gato",       hc: 15 }, p2: { name: "Javier",          hc: 12 }, mesa: 7 },
    ],
  },
  {
    time: "6:40 PM",
    color: "#60a5fa",
    label: "Ronda 2",
    matches: [
      { p1: { name: "Arturo",         hc: 15 }, p2: { name: "Diego Coronado",  hc: 11 }, mesa: 1 },
      { p1: { name: "Cristian Marín", hc: 14 }, p2: { name: "Diego Salazar",   hc: 11 }, mesa: 2 },
      { p1: { name: "Jose Soto",      hc: 14 }, p2: { name: "Andrés",          hc: 11 }, mesa: 3 },
      { p1: { name: "Nicolás",        hc: 14 }, p2: { name: "Jeisson",         hc: 11 }, mesa: 4 },
      { p1: { name: "Jhon Barbosa",   hc: 11 }, p2: { name: "Yesid",           hc: 11 }, mesa: 5 },
      { p1: { name: "Julio",          hc: 11 }, p2: { name: "Leonardo",        hc: 10 }, mesa: 6 },
      { p1: { name: "Oscar",          hc: 11 }, p2: { name: "Cristian Barbosa",hc: 10 }, mesa: 7 },
    ],
  },
  {
    time: "7:10 PM",
    color: "#c084fc",
    label: "Ronda 3",
    matches: [
      { p1: { name: "Miguel",             hc: 17 }, p2: { name: "Mauricio Domínguez", hc: 11 }, mesa: 1 },
      { p1: { name: "Carlos Barbosa",     hc: 10 }, p2: { name: "Chalo",              hc: 10 }, mesa: 2 },
      { p1: { name: "Alex Pardo",         hc: 9  }, p2: { name: "Mauricio Velázquez", hc: 8  }, mesa: 3 },
      { p1: { name: "Jhon Pardo",         hc: 9  }, p2: { name: "Cristian Sierra",    hc: 9  }, mesa: 4 },
      { p1: { name: "Juan Diego",         hc: 9  }, p2: { name: "Edwin Wilches",      hc: 9  }, mesa: 5 },
      { p1: { name: "César",              hc: 9  }, p2: { name: "Russi",              hc: 9  }, mesa: 6 },
      { p1: { name: "Gato",               hc: 15 }, p2: { name: "William",            hc: 13 }, mesa: 7 },
    ],
    note: "Gato y William juegan una segunda partida para completar las 7 mesas",
  },
];

const LEGEND = [
  { hc: 17, label: "HC 17" },
  { hc: 16, label: "HC 16" },
  { hc: 15, label: "HC 15" },
  { hc: 14, label: "HC 14" },
  { hc: 13, label: "HC 13" },
  { hc: 12, label: "HC 12" },
  { hc: 11, label: "HC 11" },
  { hc: 10, label: "HC 10" },
  { hc: 9,  label: "HC 9"  },
  { hc: 8,  label: "HC 8"  },
];

function HcBadge({ hc }) {
  const c = HC_COLORS[hc] || HC_COLORS[8];
  return (
    <div style={{
      minWidth: 30, height: 30, borderRadius: 7,
      background: c.bg, color: c.color,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 700, flexShrink: 0, fontFamily: F,
    }}>
      {hc}
    </div>
  );
}

function PlayerRow({ name, hc }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "9px 12px", borderRadius: 8,
      border: "0.5px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.025)",
    }}>
      <HcBadge hc={hc} />
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: F }}>{name}</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: F, marginTop: 1 }}>Hándicap {hc}</div>
      </div>
    </div>
  );
}

function MatchCard({ match, num }) {
  const c1 = HC_COLORS[match.p1.hc] || HC_COLORS[8];
  const c2 = HC_COLORS[match.p2.hc] || HC_COLORS[8];
  return (
    <div style={{
      borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.025)", marginBottom: 7, overflow: "hidden",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 36px 1fr" }}>
        <div style={{ padding: "11px 13px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.88)", fontFamily: F }}>{match.p1.name}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: c1.color, fontFamily: F, marginTop: 2 }}>HC {match.p1.hc}</div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.04)", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.22)",
          letterSpacing: ".1em", fontFamily: F,
        }}>VS</div>
        <div style={{ padding: "11px 13px", textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.88)", fontFamily: F }}>{match.p2.name}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: c2.color, fontFamily: F, marginTop: 2 }}>HC {match.p2.hc}</div>
        </div>
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "4px 13px", borderTop: "0.5px solid rgba(255,255,255,0.05)",
      }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".12em", color: "rgba(255,255,255,0.2)", fontFamily: F }}>
          Partida {num}
        </span>
        <span style={{
          fontSize: 9, fontWeight: 700, padding: "3px 7px", borderRadius: 4,
          background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.32)", fontFamily: F,
        }}>
          Mesa {match.mesa}
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("jugadores");

  const tabStyle = (id) => ({
    flex: 1, padding: "11px 4px", border: "none", cursor: "pointer",
    fontSize: 12, fontWeight: 600, letterSpacing: ".05em",
    transition: "background .2s, color .2s", fontFamily: F,
    background: tab === id ? "rgba(232,160,32,0.18)" : "rgba(255,255,255,0.03)",
    color: tab === id ? "#e8a020" : "rgba(255,255,255,0.4)",
  });

  let matchNum = 1;

  return (
    <div style={{ background: "#0d1117", color: "#e8eaf0", padding: "20px 16px", borderRadius: 16, fontFamily: F }}>

      <div style={{ textAlign: "center", paddingBottom: 16, borderBottom: "0.5px solid rgba(255,255,255,0.07)", marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".16em", color: "#e8a020", marginBottom: 5 }}>
          TORNEO BILLARES GALÁN 2026
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Billar 3 Bandas con Hándicap</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>
          40 jugadores · 7 mesas · 3 rondas · 21 partidas
        </div>
      </div>

      <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: "0.5px solid rgba(255,255,255,0.1)", marginBottom: 20 }}>
        <button style={tabStyle("jugadores")} onClick={() => setTab("jugadores")}>Jugadores</button>
        <button style={tabStyle("enfrentamientos")} onClick={() => setTab("enfrentamientos")}>Enfrentamientos</button>
      </div>

      {tab === "jugadores" && (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {LEGEND.map(l => {
              const c = HC_COLORS[l.hc] || HC_COLORS[8];
              return (
                <div key={l.hc} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(255,255,255,0.42)" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color }} />
                  {l.label}
                </div>
              );
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 6 }}>
            {PLAYERS.map((p, i) => <PlayerRow key={i} {...p} />)}
          </div>
        </div>
      )}

      {tab === "enfrentamientos" && (
        <div>
          {ROUNDS.map((round, ri) => (
            <div key={ri}>
              {ri > 0 && (
                <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", margin: "14px 0" }} />
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: round.color }} />
                <span style={{ fontSize: 16, fontWeight: 700, color: round.color, fontFamily: F }}>{round.time}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: F }}>
                  — {round.label} · 7 mesas
                </span>
              </div>
              {round.matches.map((m) => {
                const n = matchNum;
                matchNum++;
                return <MatchCard key={n} match={m} num={n} />;
              })}
              {round.note && (
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", padding: "4px 4px 0", fontFamily: F }}>
                  * {round.note}
                </div>
              )}
            </div>
          ))}
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.2)", textAlign: "center",
            paddingTop: 14, borderTop: "0.5px solid rgba(255,255,255,0.06)", marginTop: 14, fontFamily: F,
          }}>
            21 partidas · 40 jugadores · todos juegan al menos una vez
          </div>
        </div>
      )}

    </div>
  );
}
import { useState, useEffect, useCallback } from "react";
import I18N from "./i18n.json";

const ADMIN_TOKEN = "maestros2026";

const PLAYERS_MED = {
  A: [
    { name: "JUNGHAN HEO", ck: "korea", flag: "🇰🇷" },
    { name: "ALEJANDRO PIZA", ck: "colombia", flag: "🇨🇴" },
    { name: "ALEXANDER MUÑOZ", ck: "colombia", flag: "🇨🇴" },
  ],
  B: [
    { name: "MYUNWOO CHO", ck: "korea", flag: "🇰🇷" },
    { name: "ALEXANDER SALAZAR", ck: "colombia", flag: "🇨🇴" },
    { name: "ARLEY MONTOYA", ck: "colombia", flag: "🇨🇴" },
  ],
  C: [
    { name: "MARCO ZANETTI", ck: "italy", flag: "🇮🇹" },
    { name: "JOSE JUAN GARCIA", ck: "colombia", flag: "🇨🇴" },
    { name: "HUBERNEY CATAÑO", ck: "colombia", flag: "🇨🇴" },
  ],
};

const PLAYERS_CALI = {
  A: [
    { name: "MARCO ZANETTI", ck: "italy", flag: "🇮🇹" },
    { name: "HARRY ZAMORA", ck: "colombia", flag: "🇨🇴" },
    { name: "ANDRES RESTREPO", ck: "colombia", flag: "🇨🇴" },
  ],
  B: [
    { name: "JUNGHAN HEO", ck: "korea", flag: "🇰🇷" },
    { name: "CARLOS CAMPIÑO", ck: "colombia", flag: "🇨🇴" },
    { name: "SANTIAGO OCAMPO", ck: "colombia", flag: "🇨🇴" },
  ],
  C: [
    { name: "MYUNWOO CHO", ck: "korea", flag: "🇰🇷" },
    { name: "ARLEY GALEANO", ck: "colombia", flag: "🇨🇴" },
    { name: "MAURICIO AGUILAR", ck: "colombia", flag: "🇨🇴" },
  ],
};

const MATCHES_MED = {
  A: [
    { p1: "JUNGHAN HEO", p2: "ALEXANDER MUÑOZ" },
    { p1: "ALEJANDRO PIZA", p2: "ALEXANDER MUÑOZ" },
    { p1: "JUNGHAN HEO", p2: "ALEJANDRO PIZA" },
  ],
  B: [
    { p1: "MYUNWOO CHO", p2: "ARLEY MONTOYA" },
    { p1: "ALEXANDER SALAZAR", p2: "ARLEY MONTOYA" },
    { p1: "MYUNWOO CHO", p2: "ALEXANDER SALAZAR" },
  ],
  C: [
    { p1: "JOSE JUAN GARCIA", p2: "HUBERNEY CATAÑO" },
    { p1: "MARCO ZANETTI", p2: "HUBERNEY CATAÑO" },
    { p1: "MARCO ZANETTI", p2: "JOSE JUAN GARCIA" },
  ],
};

const MATCHES_CALI = {
  A: [
    { p1: "HARRY ZAMORA", p2: "ANDRES RESTREPO" },
    { p1: "MARCO ZANETTI", p2: "ANDRES RESTREPO" },
    { p1: "MARCO ZANETTI", p2: "HARRY ZAMORA" },
  ],
  B: [
    { p1: "CARLOS CAMPIÑO", p2: "SANTIAGO OCAMPO" },
    { p1: "JUNGHAN HEO", p2: "SANTIAGO OCAMPO" },
    { p1: "JUNGHAN HEO", p2: "CARLOS CAMPIÑO" },
  ],
  C: [
    { p1: "ARLEY GALEANO", p2: "MAURICIO AGUILAR" },
    { p1: "MYUNWOO CHO", p2: "MAURICIO AGUILAR" },
    { p1: "MYUNWOO CHO", p2: "ARLEY GALEANO" },
  ],
};

const GC = { A: "#10b981", B: "#3b82f6", C: "#ef4444" };
const KO_IDS = ["QF1", "QF2", "SF1", "SF2", "FINAL"];

function getPlayers(city) {
  return city === "cali" ? PLAYERS_CALI : PLAYERS_MED;
}
function getMatches(city) {
  return city === "cali" ? MATCHES_CALI : MATCHES_MED;
}

function emptyScore() {
  return { car: "", ent: "", ms: "" };
}
function emptyMatch() {
  return { p1: emptyScore(), p2: emptyScore() };
}

function initMedData() {
  return {
    groups: {
      A: [
        {
          p1: { car: "32", ent: "20", ms: "9" },
          p2: { car: "35", ent: "20", ms: "9" },
        },
        {
          p1: { car: "35", ent: "17", ms: "6" },
          p2: { car: "21", ent: "17", ms: "7" },
        },
        {
          p1: { car: "35", ent: "19", ms: "8" },
          p2: { car: "29", ent: "19", ms: "5" },
        },
      ],
      B: [
        {
          p1: { car: "35", ent: "23", ms: "5" },
          p2: { car: "30", ent: "23", ms: "6" },
        },
        {
          p1: { car: "35", ent: "19", ms: "12" },
          p2: { car: "15", ent: "19", ms: "3" },
        },
        {
          p1: { car: "35", ent: "18", ms: "8" },
          p2: { car: "33", ent: "18", ms: "5" },
        },
      ],
      C: [
        {
          p1: { car: "35", ent: "23", ms: "8" },
          p2: { car: "35", ent: "23", ms: "8" },
        },
        {
          p1: { car: "35", ent: "20", ms: "9" },
          p2: { car: "35", ent: "20", ms: "6" },
        },
        {
          p1: { car: "35", ent: "25", ms: "8" },
          p2: { car: "35", ent: "25", ms: "9" },
        },
      ],
    },
    knockout: {
      QF1: {
        p1name: "MARCO ZANETTI",
        p2name: "HUBERNEY CATAÑO",
        p1: { car: "35", ent: "25", ms: "9" },
        p2: { car: "27", ent: "25", ms: "3" },
      },
      QF2: {
        p1name: "JUNGHAN HEO",
        p2name: "ALEXANDER SALAZAR",
        p1: { car: "34", ent: "24", ms: "7" },
        p2: { car: "35", ent: "24", ms: "7" },
      },
      SF1: {
        p1name: "ALEJANDRO PIZA",
        p2name: "ALEXANDER SALAZAR",
        p1: { car: "40", ent: "26", ms: "10" },
        p2: { car: "33", ent: "26", ms: "6" },
      },
      SF2: {
        p1name: "MARCO ZANETTI",
        p2name: "MYUNWOO CHO",
        p1: { car: "40", ent: "30", ms: "9" },
        p2: { car: "37", ent: "30", ms: "7" },
      },
      FINAL: {
        p1name: "MARCO ZANETTI",
        p2name: "ALEJANDRO PIZA",
        p1: { car: "40", ent: "25", ms: "7" },
        p2: { car: "33", ent: "25", ms: "6" },
      },
    },
  };
}

function initCaliData() {
  return {
    groups: {
      A: [
        {
          p1: { car: "35", ent: "29", ms: "7" },
          p2: { car: "35", ent: "29", ms: "5" },
        },
        {
          p1: { car: "35", ent: "21", ms: "5" },
          p2: { car: "26", ent: "21", ms: "4" },
        },
        {
          p1: { car: "35", ent: "12", ms: "6" },
          p2: { car: "20", ent: "12", ms: "5" },
        },
      ],
      B: [
        {
          p1: { car: "35", ent: "26", ms: "6" },
          p2: { car: "27", ent: "26", ms: "6" },
        },
        {
          p1: { car: "35", ent: "24", ms: "6" },
          p2: { car: "32", ent: "24", ms: "5" },
        },
        {
          p1: { car: "35", ent: "13", ms: "9" },
          p2: { car: "17", ent: "13", ms: "6" },
        },
      ],
      C: [
        {
          p1: { car: "35", ent: "26", ms: "6" },
          p2: { car: "22", ent: "26", ms: "6" },
        },
        {
          p1: { car: "35", ent: "14", ms: "5" },
          p2: { car: "13", ent: "14", ms: "4" },
        },
        {
          p1: { car: "35", ent: "20", ms: "6" },
          p2: { car: "33", ent: "20", ms: "5" },
        },
      ],
    },
    knockout: {
      QF1: { p1name: "", p2name: "", p1: emptyScore(), p2: emptyScore() },
      QF2: { p1name: "", p2name: "", p1: emptyScore(), p2: emptyScore() },
      SF1: { p1name: "", p2name: "", p1: emptyScore(), p2: emptyScore() },
      SF2: { p1name: "", p2name: "", p1: emptyScore(), p2: emptyScore() },
      FINAL: { p1name: "", p2name: "", p1: emptyScore(), p2: emptyScore() },
    },
  };
}

const STORAGE_KEYS = { medellin: "torneo-data-v2", cali: "torneo-cali-v1" };
const SCHEDULE_OFFSET = { medellin: 0, cali: -15 };

const F = "'DM Sans', sans-serif";
const FD = "'Playfair Display', serif";
const FM = "'DM Mono', monospace";

const LANGS = [
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "es", flag: "🇨🇴", label: "ES" },
  { code: "ko", flag: "🇰🇷", label: "KO" },
];

const memStore = {};
const storage = {
  get: async (key, shared) => {
    try {
      return await window.storage.get(key, shared);
    } catch {
      return memStore[key] ? { value: memStore[key] } : null;
    }
  },
  set: async (key, value, shared) => {
    memStore[key] = value;
    try {
      return await window.storage.set(key, value, shared);
    } catch {
      return null;
    }
  },
};

function useData(city) {
  const skey = STORAGE_KEYS[city];
  const initFn = city === "medellin" ? initMedData : initCaliData;
  const [data, setData] = useState(initFn);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = await storage.get(skey, true);
      if (r && r.value) {
        setData(JSON.parse(r.value));
      }
    } catch (e) {
      console.error("Storage load error:", e);
    }
    setLoaded(true);
  }, [skey]);

  useEffect(() => {
    setData(city === "medellin" ? initMedData() : initCaliData());
    setLoaded(false);
    let cancelled = false;
    const doLoad = async () => {
      await load();
      if (!cancelled) setLoaded(true);
    };
    doLoad();
    const iv = setInterval(load, 5000);
    return () => {
      cancelled = true;
      clearInterval(iv);
    };
  }, [city, load]);

  const save = useCallback(
    async (newData) => {
      setData(newData);
      try {
        await storage.set(skey, JSON.stringify(newData), true);
      } catch (e) {
        console.error("Storage save error:", e);
      }
    },
    [skey],
  );

  return { data, save, loaded };
}

function calcStandings(data, city) {
  const players = getPlayers(city);
  const matches = getMatches(city);
  const stats = {};

  Object.entries(players).forEach(([g, ps]) => {
    ps.forEach((p) => {
      stats[p.name] = {
        name: p.name,
        flag: p.flag,
        ck: p.ck,
        group: g,
        color: GC[g],
        mp: 0,
        w: 0,
        l: 0,
        d: 0,
        pts: 0,
        totalCar: 0,
        totalEnt: 0,
        bestRun: 0,
        bestIndivAvg: 0,
      };
    });
  });

  Object.entries(matches).forEach(([g, gMatches]) => {
    gMatches.forEach((m, mi) => {
      const md = data.groups[g]?.[mi];
      if (!md) return;
      const c1 = Number(md.p1.car) || 0,
        e1 = Number(md.p1.ent) || 0,
        ms1 = Number(md.p1.ms) || 0;
      const c2 = Number(md.p2.car) || 0,
        e2 = Number(md.p2.ent) || 0,
        ms2 = Number(md.p2.ms) || 0;
      if (c1 === 0 && c2 === 0 && e1 === 0 && e2 === 0) return;
      const s1 = stats[m.p1],
        s2 = stats[m.p2];
      if (!s1 || !s2) return;
      s1.mp++;
      s2.mp++;
      s1.totalCar += c1;
      s1.totalEnt += e1;
      s1.bestRun = Math.max(s1.bestRun, ms1);
      s2.totalCar += c2;
      s2.totalEnt += e2;
      s2.bestRun = Math.max(s2.bestRun, ms2);
      const indivAvg1 = e1 > 0 ? c1 / e1 : 0,
        indivAvg2 = e2 > 0 ? c2 / e2 : 0;
      s1.bestIndivAvg = Math.max(s1.bestIndivAvg, indivAvg1);
      s2.bestIndivAvg = Math.max(s2.bestIndivAvg, indivAvg2);
      if (c1 > c2) {
        s1.w++;
        s1.pts += 2;
        s2.l++;
      } else if (c2 > c1) {
        s2.w++;
        s2.pts += 2;
        s1.l++;
      } else {
        s1.d++;
        s1.pts += 1;
        s2.d++;
        s2.pts += 1;
      }
    });
  });

  const groupRanks = {};
  Object.entries(matches).forEach(([g]) => {
    const gPlayers = Object.values(stats).filter((p) => p.group === g);
    gPlayers.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      const avgA = a.totalEnt > 0 ? a.totalCar / a.totalEnt : 0;
      const avgB = b.totalEnt > 0 ? b.totalCar / b.totalEnt : 0;
      if (Math.abs(avgB - avgA) > 0.000001) return avgB - avgA;
      if (Math.abs(b.bestIndivAvg - a.bestIndivAvg) > 0.000001)
        return b.bestIndivAvg - a.bestIndivAvg;
      if (b.bestRun !== a.bestRun) return b.bestRun - a.bestRun;
      return a.totalEnt - b.totalEnt;
    });
    gPlayers.forEach((p, i) => {
      groupRanks[p.name] = i + 1;
    });
  });

  return Object.values(stats).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const ra = groupRanks[a.name] || 9,
      rb = groupRanks[b.name] || 9;
    if (ra !== rb) return ra - rb;
    const avgA = a.totalEnt > 0 ? a.totalCar / a.totalEnt : 0;
    const avgB = b.totalEnt > 0 ? b.totalCar / b.totalEnt : 0;
    if (Math.abs(avgB - avgA) > 0.000001) return avgB - avgA;
    if (Math.abs(b.bestIndivAvg - a.bestIndivAvg) > 0.000001)
      return b.bestIndivAvg - a.bestIndivAvg;
    if (b.bestRun !== a.bestRun) return b.bestRun - a.bestRun;
    return a.totalEnt - b.totalEnt;
  });
}

function offsetTime(timeStr, offsetMinutes) {
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return timeStr;
  let h = parseInt(match[1]),
    m = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  let total = h * 60 + m + offsetMinutes;
  if (total < 0) total += 24 * 60;
  let nh = Math.floor(total / 60) % 24;
  let nm = total % 60;
  const np = nh >= 12 ? "PM" : "AM";
  if (nh > 12) nh -= 12;
  if (nh === 0) nh = 12;
  return `${nh}:${String(nm).padStart(2, "0")} ${np}`;
}

function LangSwitcher({ lang, setLang }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 10,
        display: "flex",
        gap: 4,
        padding: 3,
        borderRadius: 10,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          style={{
            padding: "6px 10px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            background: lang === l.code ? "rgba(234,171,0,0.2)" : "transparent",
            color: lang === l.code ? "#eaab00" : "rgba(255,255,255,0.4)",
            fontFamily: F,
            fontSize: 11,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 4,
            transition: "all 0.2s",
          }}
        >
          <span style={{ fontSize: 14 }}>{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  );
}

function CitySwitcher({ city, setCity, t }) {
  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid rgba(234,171,0,0.3)",
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        marginBottom: 28,
      }}
    >
      {[
        { id: "medellin", label: t.switchMedellin, icon: "🏔️" },
        { id: "cali", label: t.switchCali, icon: "🌴" },
      ].map((c) => (
        <button
          key={c.id}
          onClick={() => setCity(c.id)}
          style={{
            padding: "14px 32px",
            border: "none",
            cursor: "pointer",
            background:
              city === c.id
                ? "linear-gradient(135deg, rgba(234,171,0,0.25), rgba(232,119,34,0.15))"
                : "transparent",
            color: city === c.id ? "#eaab00" : "rgba(255,255,255,0.35)",
            fontFamily: F,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.12em",
            transition: "all 0.3s",
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderRight:
              c.id === "medellin" ? "1px solid rgba(234,171,0,0.15)" : "none",
          }}
        >
          <span style={{ fontSize: 18 }}>{c.icon}</span>
          {c.label}
        </button>
      ))}
    </div>
  );
}

function SectionTitle({ icon, title, subtitle }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <h3
          style={{
            fontFamily: FD,
            fontSize: 22,
            fontWeight: 800,
            color: "white",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      {subtitle && (
        <p
          style={{
            fontFamily: F,
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            margin: "6px 0 0 28px",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function MatchResult({ m, t }) {
  const c1 = Number(m.p1.car) || 0,
    c2 = Number(m.p2.car) || 0;
  const e1 = Number(m.p1.ent) || 0,
    e2 = Number(m.p2.ent) || 0;
  if (c1 === 0 && c2 === 0 && e1 === 0 && e2 === 0) return null;
  const avg1 = e1 > 0 ? (c1 / e1).toFixed(3) : "—",
    avg2 = e2 > 0 ? (c2 / e2).toFixed(3) : "—";
  const ms1 = Number(m.p1.ms) || 0,
    ms2 = Number(m.p2.ms) || 0;
  const isDraw = c1 === c2;
  const w1 = c1 > c2,
    w2 = c2 > c1;
  const tag1 = w1 ? t.winner : isDraw ? t.draw : t.loser;
  const tag2 = w2 ? t.winner : isDraw ? t.draw : t.loser;
  const tc1 = w1 ? "#10b981" : isDraw ? "#eaab00" : "#ef4444";
  const tc2 = w2 ? "#10b981" : isDraw ? "#eaab00" : "#ef4444";

  const rows = [
    { label: t.car, v1: c1, v2: c2, bold: true },
    { label: t.ent, v1: e1, v2: e2 },
    { label: t.avg, v1: avg1, v2: avg2 },
    { label: t.ms, v1: ms1, v2: ms2 },
  ];

  const cellBase = {
    padding: "7px 10px",
    fontFamily: FM,
    fontSize: 13,
    textAlign: "center",
  };
  const headerCell = {
    ...cellBase,
    fontFamily: F,
    fontSize: 10,
    fontWeight: 700,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.08em",
    textAlign: "left",
  };

  return (
    <div
      style={{
        marginTop: 8,
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.04)" }}>
            <th style={{ ...headerCell, width: "34%" }} />
            <th
              style={{
                ...cellBase,
                fontFamily: F,
                fontSize: 10,
                fontWeight: 700,
                color: tc1,
                letterSpacing: "0.08em",
                width: "33%",
              }}
            >
              {tag1}
            </th>
            <th
              style={{
                ...cellBase,
                fontFamily: F,
                fontSize: 10,
                fontWeight: 700,
                color: tc2,
                letterSpacing: "0.08em",
                width: "33%",
              }}
            >
              {tag2}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                background:
                  i % 2 === 0
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.05)",
              }}
            >
              <td style={{ ...headerCell }}>{row.label}</td>
              <td
                style={{
                  ...cellBase,
                  fontWeight: row.bold ? 800 : 500,
                  color: row.bold ? tc1 : "rgba(255,255,255,0.7)",
                  fontSize: row.bold ? 15 : 13,
                }}
              >
                {row.v1}
              </td>
              <td
                style={{
                  ...cellBase,
                  fontWeight: row.bold ? 800 : 500,
                  color: row.bold ? tc2 : "rgba(255,255,255,0.7)",
                  fontSize: row.bold ? 15 : 13,
                }}
              >
                {row.v2}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupsTab({ t, data, city }) {
  const players = getPlayers(city);
  const matches = getMatches(city);

  return (
    <div>
      <SectionTitle
        icon="🎯"
        title={t.groupsSectionTitle}
        subtitle={t.groupsSub}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        {Object.entries(players).map(([key, gPlayers]) => {
          const c = GC[key];
          const gLabel = t[`group${key}`];
          return (
            <div
              key={key}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                border: `1px solid ${c}25`,
                background: `linear-gradient(160deg, ${c}0a, ${c}03)`,
              }}
            >
              <div
                style={{
                  padding: "20px 24px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  borderBottom: `1px solid ${c}15`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `${c}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FD,
                    fontSize: 18,
                    fontWeight: 900,
                    color: c,
                  }}
                >
                  {key}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: FD,
                      fontSize: 18,
                      fontWeight: 800,
                      color: "white",
                    }}
                  >
                    {gLabel}
                  </div>
                  <div
                    style={{
                      fontFamily: F,
                      fontSize: 10,
                      color: "rgba(255,255,255,0.3)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {t.roundRobin}
                  </div>
                </div>
              </div>
              <div style={{ padding: "16px 24px" }}>
                {gPlayers.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 0",
                      borderBottom: i < 2 ? `1px solid ${c}0c` : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: `${c}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: F,
                        fontSize: 11,
                        fontWeight: 800,
                        color: c,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: F,
                          fontSize: 14,
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontFamily: F,
                          fontSize: 11,
                          color: "rgba(255,255,255,0.35)",
                          marginTop: 1,
                        }}
                      >
                        {p.flag} {t[p.ck]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0 24px 20px" }}>
                <div
                  style={{
                    fontFamily: F,
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.14em",
                    marginBottom: 10,
                  }}
                >
                  {t.matchesLabel}
                </div>
                {matches[key].map((m, i) => (
                  <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 14px",
                        borderRadius: 10,
                        background: `${c}08`,
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          fontFamily: F,
                          fontSize: 12,
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {m.p1}
                      </div>
                      <div
                        style={{
                          width: 36,
                          height: 22,
                          borderRadius: 6,
                          background: `${c}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: F,
                          fontSize: 9,
                          fontWeight: 800,
                          color: c,
                        }}
                      >
                        VS
                      </div>
                      <div
                        style={{
                          flex: 1,
                          fontFamily: F,
                          fontSize: 12,
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.7)",
                          textAlign: "right",
                        }}
                      >
                        {m.p2}
                      </div>
                    </div>
                    {data.groups[key]?.[i] && (
                      <MatchResult m={data.groups[key][i]} t={t} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StandingsTab({ t, data, city }) {
  const standings = calcStandings(data, city);
  return (
    <div>
      <SectionTitle
        icon="📊"
        title={t.standingsTitle}
        subtitle={t.standingsSub}
      />
      <div
        style={{
          marginTop: 20,
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontFamily: F }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {[
                  "#",
                  t.thPlayer,
                  t.thGrp,
                  t.thMp,
                  t.thW,
                  t.thL,
                  t.thD,
                  t.thPts,
                  t.thAvg,
                  t.thBr,
                ].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "14px 10px",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.12em",
                      textAlign: i < 2 ? "left" : "center",
                      background: "rgba(255,255,255,0.04)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {standings.map((p, i) => {
                const isSemi = i < 2,
                  isQF = i >= 2 && i < 6;
                let bg = "rgba(255,255,255,0.015)";
                if (isSemi) bg = "rgba(234,171,0,0.08)";
                else if (isQF) bg = "rgba(255,255,255,0.035)";
                const avg =
                  p.totalEnt > 0 ? (p.totalCar / p.totalEnt).toFixed(3) : "—";
                return (
                  <tr
                    key={i}
                    style={{
                      background: bg,
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <td style={{ padding: "14px 10px" }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: isSemi
                            ? "rgba(234,171,0,0.15)"
                            : isQF
                              ? "rgba(255,255,255,0.06)"
                              : "transparent",
                          fontFamily: FD,
                          fontSize: 15,
                          fontWeight: 900,
                          color: isSemi
                            ? "#eaab00"
                            : isQF
                              ? "rgba(255,255,255,0.55)"
                              : "rgba(255,255,255,0.2)",
                        }}
                      >
                        {i + 1}
                      </div>
                    </td>
                    <td style={{ padding: "14px 10px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{p.flag}</span>
                        <div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: "rgba(255,255,255,0.9)",
                            }}
                          >
                            {p.name}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: "rgba(255,255,255,0.3)",
                            }}
                          >
                            {t[p.ck]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 6px", textAlign: "center" }}>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: 6,
                          fontSize: 10,
                          fontWeight: 700,
                          background: `${p.color}18`,
                          color: p.color,
                        }}
                      >
                        {p.group}
                      </span>
                    </td>
                    {[p.mp, p.w, p.l, p.d, p.pts, avg, p.bestRun].map(
                      (v, j) => (
                        <td
                          key={j}
                          style={{
                            padding: "14px 6px",
                            textAlign: "center",
                            fontSize: 13,
                            fontWeight: j === 4 ? 800 : 600,
                            color:
                              j === 4
                                ? isSemi
                                  ? "#eaab00"
                                  : isQF
                                    ? "rgba(255,255,255,0.8)"
                                    : "rgba(255,255,255,0.5)"
                                : "rgba(255,255,255,0.35)",
                            fontFamily: FM,
                          }}
                        >
                          {v}
                        </td>
                      ),
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        {[
          [t.pos12, t.pos12d, "#eaab00", "rgba(234,171,0,0.08)"],
          [
            t.pos36,
            t.pos36d,
            "rgba(255,255,255,0.6)",
            "rgba(255,255,255,0.04)",
          ],
          [
            t.pos79,
            t.pos79d,
            "rgba(255,255,255,0.25)",
            "rgba(255,255,255,0.02)",
          ],
        ].map(([l, d, c, bg], i) => (
          <div
            key={i}
            style={{
              flex: 1,
              minWidth: 150,
              padding: "10px 14px",
              borderRadius: 10,
              background: bg,
              border: `1px solid ${c}20`,
            }}
          >
            <span
              style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: c }}
            >
              {l}:{" "}
            </span>
            <span
              style={{
                fontFamily: F,
                fontSize: 11,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {d}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BracketTab({ t, data, city }) {
  const standings = calcStandings(data, city);
  const getPlayerByRank = (rank) => standings[rank - 1]?.name || null;

  const koLabels = {
    QF1: { title: t.qf1, p1: t.p3rd, p2: t.p6th },
    QF2: { title: t.qf2, p1: t.p4th, p2: t.p5th },
    SF1: { title: t.sf1, p1: t.p1st, p2: t.qfW },
    SF2: { title: t.sf2, p1: t.p2nd, p2: t.qfW },
    FINAL: { title: t.fin, p1: t.sf1W, p2: t.sf2W },
  };

  const getP1Name = (id) => {
    const kd = data.knockout?.[id];
    if (kd?.p1name) return kd.p1name;
    if (id === "QF1") return getPlayerByRank(3) || koLabels[id].p1;
    if (id === "QF2") return getPlayerByRank(4) || koLabels[id].p1;
    if (id === "SF1") return getPlayerByRank(1) || koLabels[id].p1;
    if (id === "SF2") return getPlayerByRank(2) || koLabels[id].p2;
    return koLabels[id].p1;
  };
  const getP2Name = (id) => {
    const kd = data.knockout?.[id];
    if (kd?.p2name) return kd.p2name;
    if (id === "QF1") return getPlayerByRank(6) || koLabels[id].p2;
    if (id === "QF2") return getPlayerByRank(5) || koLabels[id].p2;
    return koLabels[id].p2;
  };

  const rounds = [
    { title: t.qf, ids: ["QF1", "QF2"], color: "#a855f7", pts: 35 },
    { title: t.sf, ids: ["SF1", "SF2"], color: "#3b82f6", pts: 40 },
    { title: t.gf, ids: ["FINAL"], color: "#eaab00", pts: 40 },
  ];

  const champion = (() => {
    const fd = data.knockout?.FINAL;
    if (!fd) return null;
    const c1 = Number(fd.p1?.car) || 0,
      c2 = Number(fd.p2?.car) || 0;
    if (c1 === 0 && c2 === 0) return null;
    if (c1 > c2) return fd.p1name || getP1Name("FINAL");
    if (c2 > c1) return fd.p2name || getP2Name("FINAL");
    return null;
  })();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      {rounds.map((round, ri) => (
        <div key={ri}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: round.color,
                boxShadow: `0 0 12px ${round.color}60`,
              }}
            />
            <h3
              style={{
                fontFamily: FD,
                fontSize: 20,
                fontWeight: 800,
                color: "white",
                margin: 0,
              }}
            >
              {round.title}
            </h3>
            <span
              style={{
                fontFamily: F,
                fontSize: 10,
                fontWeight: 700,
                color: round.color,
                letterSpacing: "0.1em",
                padding: "3px 10px",
                borderRadius: 100,
                background: `${round.color}15`,
              }}
            >
              {round.pts} PTS
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {round.ids.map((id) => {
              const kd = data.knockout?.[id] || {};
              const isFinal = id === "FINAL";
              const p1n = getP1Name(id),
                p2n = getP2Name(id);
              const hasData =
                (Number(kd.p1?.car) || 0) > 0 || (Number(kd.p2?.car) || 0) > 0;
              return (
                <div
                  key={id}
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    border: isFinal
                      ? "1px solid rgba(234,171,0,0.25)"
                      : "1px solid rgba(255,255,255,0.06)",
                    background: isFinal
                      ? "linear-gradient(135deg, rgba(234,171,0,0.08), rgba(232,119,34,0.04))"
                      : "rgba(255,255,255,0.02)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "stretch" }}>
                    <div
                      style={{
                        flex: 1,
                        padding: "18px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: F,
                          fontSize: 14,
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.8)",
                          textAlign: "center",
                        }}
                      >
                        {p1n}
                      </span>
                    </div>
                    <div
                      style={{
                        width: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `${round.color}12`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: F,
                          fontSize: 10,
                          fontWeight: 800,
                          color: round.color,
                          letterSpacing: "0.15em",
                        }}
                      >
                        VS
                      </span>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        padding: "18px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: F,
                          fontSize: 14,
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.8)",
                          textAlign: "center",
                        }}
                      >
                        {p2n}
                      </span>
                    </div>
                  </div>
                  {hasData && (
                    <div style={{ padding: "0 16px 12px" }}>
                      <MatchResult m={kd} t={t} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div
        style={{
          textAlign: "center",
          padding: "32px 20px",
          borderRadius: 16,
          background:
            "linear-gradient(135deg, rgba(234,171,0,0.08), rgba(232,119,34,0.04))",
          border: "1px solid rgba(234,171,0,0.15)",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
        <div
          style={{
            fontFamily: F,
            fontSize: 10,
            fontWeight: 700,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.15em",
            marginBottom: 8,
          }}
        >
          {t.champion}
        </div>
        <div
          style={{
            fontFamily: FD,
            fontSize: 24,
            fontWeight: 900,
            background: "linear-gradient(135deg, #eaab00, #e87722)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {champion || t.tbd}
        </div>
      </div>
    </div>
  );
}

function ScheduleTab({ t, city }) {
  const off = SCHEDULE_OFFSET[city];
  const matches = getMatches(city);
  const config = [
    [t.cfgFormat, t.cfgFormatVal],
    [t.cfgGroups, t.cfgGroupsVal],
    [t.cfgSemis, t.cfgSemisVal],
    [t.cfgFinal, t.cfgFinalVal],
    [t.cfgTables, t.cfgTablesVal],
    [t.cfgQualify, t.cfgQualifyVal],
  ];

  const r1 = matches.A[0],
    r1b = matches.B[0],
    r1c = matches.C[0];
  const r2 = matches.A[1],
    r2b = matches.B[1],
    r2c = matches.C[1];
  const r3 = matches.A[2],
    r3b = matches.B[2],
    r3c = matches.C[2];

  const timeline = [
    {
      time: offsetTime("2:00 PM", off),
      end: offsetTime("2:15 PM", off),
      type: "event",
      color: "#10b981",
      icon: "🟢",
      title: t.opening,
      sub: t.openingSub,
    },
    {
      time: offsetTime("2:15 PM", off),
      end: offsetTime("3:30 PM", off),
      type: "round",
      color: "#3b82f6",
      icon: "🔵",
      title: `${t.round} 1 — ${t.day1}`,
      matches: [
        [`${t.table} 1`, `${t.groupTitle} A · P1`, r1.p1, r1.p2, "A"],
        [`${t.table} 2`, `${t.groupTitle} B · P1`, r1b.p1, r1b.p2, "B"],
        [`${t.table} 3`, `${t.groupTitle} C · P1`, r1c.p1, r1c.p2, "C"],
      ],
    },
    {
      time: offsetTime("3:30 PM", off),
      end: offsetTime("4:45 PM", off),
      type: "round",
      color: "#3b82f6",
      icon: "🔵",
      title: `${t.round} 2`,
      matches: [
        [`${t.table} 1`, `${t.groupTitle} A · P2`, r2.p1, r2.p2, "A"],
        [`${t.table} 2`, `${t.groupTitle} B · P2`, r2b.p1, r2b.p2, "B"],
        [`${t.table} 3`, `${t.groupTitle} C · P2`, r2c.p1, r2c.p2, "C"],
      ],
    },
    {
      time: offsetTime("4:45 PM", off),
      end: offsetTime("5:00 PM", off),
      type: "break",
      color: "#78716c",
      icon: "☕",
      title: t.pause,
      sub: t.pauseSub,
    },
    {
      time: offsetTime("5:00 PM", off),
      end: offsetTime("6:15 PM", off),
      type: "round",
      color: "#3b82f6",
      icon: "🔵",
      title: `${t.round} 3`,
      matches: [
        [`${t.table} 1`, `${t.groupTitle} A · P3`, r3.p1, r3.p2, "A"],
        [`${t.table} 2`, `${t.groupTitle} B · P3`, r3b.p1, r3b.p2, "B"],
        [`${t.table} 3`, `${t.groupTitle} C · P3`, r3c.p1, r3c.p2, "C"],
      ],
    },
    {
      time: offsetTime("6:15 PM", off),
      end: offsetTime("6:30 PM", off),
      type: "event",
      color: "#eaab00",
      icon: "📊",
      title: t.ranking,
      sub: `${t.rankingSub}\n${t.rankDetail}`,
    },
    {
      time: offsetTime("6:30 PM", off),
      end: offsetTime("7:45 PM", off),
      type: "round",
      color: "#ef4444",
      icon: "🔴",
      title: t.crosses,
      sub: t.crossesSub,
      matches: [
        [`${t.table} 1`, t.qf1, t.p3rd, t.p6th, "QF"],
        [`${t.table} 2`, t.qf2, t.p4th, t.p5th, "QF"],
      ],
    },
    {
      time: offsetTime("8:00 PM", off),
      end: offsetTime("9:15 PM", off),
      type: "round",
      color: "#a855f7",
      icon: "🟣",
      title: t.semisTitle,
      sub: t.semisSub,
      matches: [
        [`${t.table} 1`, t.sf1, t.p1st, t.qfW, "SF"],
        [`${t.table} 1`, t.sf2, t.p2nd, t.qfW, "SF"],
      ],
    },
    {
      time: offsetTime("9:30 PM", off),
      end: offsetTime("10:45 PM", off),
      type: "round",
      color: "#eaab00",
      icon: "🏁",
      title: t.finalTitle,
      sub: t.finalSub,
      matches: [[`${t.table} 1`, t.fin, t.sf1W, t.sf2W, "F"]],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div>
        <SectionTitle icon="⚙" title={t.techTitle} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
            marginTop: 16,
          }}
        >
          {config.map(([l, v], i) => (
            <div
              key={i}
              style={{
                padding: "16px 20px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontFamily: F,
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.12em",
                  marginBottom: 6,
                }}
              >
                {l}
              </div>
              <div
                style={{
                  fontFamily: F,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 500,
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle
          icon="📋"
          title={
            t.tabs[0] === "programa"
              ? "Programa del Evento"
              : t.tabs[0] === "일정"
                ? "이벤트 일정"
                : "Event Schedule"
          }
          subtitle={t[`date_${city}`]}
        />
        <div style={{ marginTop: 20, position: "relative", paddingLeft: 28 }}>
          <div
            style={{
              position: "absolute",
              left: 11,
              top: 0,
              bottom: 0,
              width: 2,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 1,
            }}
          />
          {timeline.map((block, bi) => (
            <div
              key={bi}
              style={{
                position: "relative",
                marginBottom: bi < timeline.length - 1 ? 20 : 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -22,
                  top: 6,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: `${block.color}30`,
                  border: `2px solid ${block.color}`,
                }}
              />
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: 14,
                  background:
                    block.type === "break"
                      ? "rgba(120,113,108,0.08)"
                      : `${block.color}08`,
                  border: `1px solid ${block.color}18`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: block.matches || block.sub ? 10 : 0,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{block.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: F,
                        fontSize: 14,
                        fontWeight: 700,
                        color: block.color,
                      }}
                    >
                      {block.title}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: FM,
                      fontSize: 11,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.3)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {block.time} – {block.end}
                  </div>
                </div>
                {block.sub && (
                  <div
                    style={{
                      fontFamily: F,
                      fontSize: 12,
                      color: "rgba(255,255,255,0.35)",
                      lineHeight: 1.6,
                      marginLeft: 24,
                    }}
                  >
                    {block.sub.split("\n").map((line, li) => (
                      <div key={li}>{line}</div>
                    ))}
                  </div>
                )}
                {block.matches && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      marginLeft: 24,
                    }}
                  >
                    {block.matches.map(([mesa, phase, p1, p2, g], mi) => {
                      const mc = GC[g] || block.color;
                      return (
                        <div
                          key={mi}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "70px 1fr",
                            alignItems: "center",
                            gap: 12,
                            padding: "8px 12px",
                            borderRadius: 8,
                            background: "rgba(255,255,255,0.02)",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: F,
                              fontSize: 10,
                              fontWeight: 700,
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            {mesa}
                          </div>
                          <div>
                            <div
                              style={{
                                fontFamily: F,
                                fontSize: 12,
                                fontWeight: 600,
                                color: "rgba(255,255,255,0.75)",
                              }}
                            >
                              <span
                                style={{
                                  color: mc,
                                  marginRight: 6,
                                  fontSize: 9,
                                }}
                              >
                                ●
                              </span>
                              {p1}{" "}
                              <span
                                style={{
                                  color: "rgba(255,255,255,0.2)",
                                  margin: "0 6px",
                                  fontSize: 10,
                                }}
                              >
                                vs
                              </span>{" "}
                              {p2}
                            </div>
                            <div
                              style={{
                                fontFamily: F,
                                fontSize: 10,
                                color: "rgba(255,255,255,0.25)",
                                marginTop: 1,
                              }}
                            >
                              {phase}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreField({ label, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label
        style={{
          fontFamily: F,
          fontSize: 9,
          fontWeight: 700,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: 72,
          padding: "10px 8px",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
          color: "white",
          fontFamily: FM,
          fontSize: 16,
          fontWeight: 700,
          textAlign: "center",
          outline: "none",
          transition: "border 0.2s",
        }}
        onFocus={(e) =>
          (e.target.style.border = "1px solid rgba(234,171,0,0.5)")
        }
        onBlur={(e) =>
          (e.target.style.border = "1px solid rgba(255,255,255,0.12)")
        }
      />
    </div>
  );
}

function AdminMatchCard({
  title,
  p1Label,
  p2Label,
  scoreData,
  onUpdate,
  color = "#eaab00",
  t,
}) {
  const sc1 = scoreData?.p1 || emptyScore();
  const sc2 = scoreData?.p2 || emptyScore();
  const c1 = Number(sc1.car) || 0,
    c2 = Number(sc2.car) || 0;
  const hasResult = c1 > 0 || c2 > 0;

  return (
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${color}20`,
        background: `linear-gradient(135deg, ${color}06, rgba(255,255,255,0.02))`,
        overflow: "hidden",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          padding: "12px 20px",
          borderBottom: `1px solid ${color}12`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: F,
            fontSize: 11,
            fontWeight: 700,
            color: color,
            letterSpacing: "0.1em",
          }}
        >
          {title}
        </span>
        {hasResult && (
          <span
            style={{
              fontFamily: FM,
              fontSize: 13,
              fontWeight: 800,
              color: c1 === c2 ? "#eaab00" : "#10b981",
            }}
          >
            {c1} – {c2}
          </span>
        )}
      </div>
      {[
        { side: "p1", label: p1Label, sc: sc1 },
        { side: "p2", label: p2Label, sc: sc2 },
      ].map(({ side, label, sc }) => {
        const isWinner =
          hasResult &&
          c1 !== c2 &&
          ((side === "p1" && c1 > c2) || (side === "p2" && c2 > c1));
        return (
          <div
            key={side}
            style={{
              padding: "14px 20px",
              borderBottom:
                side === "p1" ? "1px solid rgba(255,255,255,0.04)" : "none",
              background: isWinner ? "rgba(16,185,129,0.05)" : "transparent",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              {isWinner && <span style={{ fontSize: 12 }}>🏆</span>}
              <span
                style={{
                  fontFamily: F,
                  fontSize: 13,
                  fontWeight: 700,
                  color: isWinner ? "#10b981" : "rgba(255,255,255,0.8)",
                }}
              >
                {label}
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <ScoreField
                label={t.car}
                value={sc.car}
                onChange={(v) => onUpdate(side, "car", v)}
              />
              <ScoreField
                label={t.ent}
                value={sc.ent}
                onChange={(v) => onUpdate(side, "ent", v)}
              />
              <ScoreField
                label={t.ms}
                value={sc.ms}
                onChange={(v) => onUpdate(side, "ms", v)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AdminPanel({ t, data, save, city }) {
  const matches = getMatches(city);
  const [d, setD] = useState(() => JSON.parse(JSON.stringify(data)));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [adminTab, setAdminTab] = useState("groups");

  useEffect(() => {
    setD(JSON.parse(JSON.stringify(data)));
  }, [data]);

  const updateGroup = (g, mi, side, field, val) => {
    setD((prev) => {
      const nd = JSON.parse(JSON.stringify(prev));
      nd.groups[g][mi][side][field] = val;
      return nd;
    });
    setSaved(false);
  };

  const updateKO = (id, side, field, val) => {
    setD((prev) => {
      const nd = JSON.parse(JSON.stringify(prev));
      if (!nd.knockout[id])
        nd.knockout[id] = {
          p1name: "",
          p2name: "",
          p1: emptyScore(),
          p2: emptyScore(),
        };
      if (field === "name") nd.knockout[id][`${side}name`] = val;
      else nd.knockout[id][side][field] = val;
      return nd;
    });
    setSaved(false);
  };

  const doSave = async () => {
    setSaving(true);
    await save(d);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const koLabels = {
    QF1: { title: t.qf1, p1: t.p3rd, p2: t.p6th, color: "#a855f7" },
    QF2: { title: t.qf2, p1: t.p4th, p2: t.p5th, color: "#a855f7" },
    SF1: { title: t.sf1, p1: t.p1st, p2: t.qfW, color: "#3b82f6" },
    SF2: { title: t.sf2, p1: t.p2nd, p2: t.qfW, color: "#3b82f6" },
    FINAL: { title: t.fin, p1: t.sf1W, p2: t.sf2W, color: "#eaab00" },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 28,
          alignItems: "center",
        }}
      >
        {[
          ["groups", "🎯 " + t.groupStage],
          ["knockout", "⚡ " + t.knockoutStage],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setAdminTab(k)}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              background:
                adminTab === k
                  ? "rgba(234,171,0,0.18)"
                  : "rgba(255,255,255,0.05)",
              color: adminTab === k ? "#eaab00" : "rgba(255,255,255,0.4)",
              fontFamily: F,
              fontSize: 12,
              fontWeight: 700,
              transition: "all 0.2s",
            }}
          >
            {l}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button
          onClick={doSave}
          disabled={saving}
          style={{
            padding: "10px 28px",
            borderRadius: 10,
            border: "none",
            cursor: saving ? "wait" : "pointer",
            background: saved
              ? "rgba(16,185,129,0.18)"
              : "linear-gradient(135deg, #eaab00, #e87722)",
            color: saved ? "#10b981" : "#0a0f1a",
            fontFamily: F,
            fontSize: 13,
            fontWeight: 800,
            transition: "all 0.3s",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "⏳" : saved ? "✓ " + t.saved : "💾 " + t.save}
        </button>
      </div>

      {adminTab === "groups" &&
        Object.entries(matches).map(([g, gMatches]) => (
          <div key={g} style={{ marginBottom: 36 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: `${GC[g]}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FD,
                  fontSize: 16,
                  fontWeight: 900,
                  color: GC[g],
                }}
              >
                {g}
              </div>
              <h3
                style={{
                  fontFamily: FD,
                  fontSize: 20,
                  fontWeight: 800,
                  color: GC[g],
                  margin: 0,
                }}
              >
                {t[`group${g}`]}
              </h3>
            </div>
            {gMatches.map((m, mi) => (
              <AdminMatchCard
                key={mi}
                title={`${t.match} ${mi + 1}`}
                p1Label={m.p1}
                p2Label={m.p2}
                scoreData={d.groups[g]?.[mi] || emptyMatch()}
                onUpdate={(side, field, val) =>
                  updateGroup(g, mi, side, field, val)
                }
                color={GC[g]}
                t={t}
              />
            ))}
          </div>
        ))}

      {adminTab === "knockout" &&
        KO_IDS.map((id) => {
          const lbl = koLabels[id];
          const kd = d.knockout[id] || {
            p1name: "",
            p2name: "",
            p1: emptyScore(),
            p2: emptyScore(),
          };
          return (
            <div key={id} style={{ marginBottom: 28 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                {["p1", "p2"].map((side) => (
                  <div key={side}>
                    <label
                      style={{
                        fontFamily: F,
                        fontSize: 9,
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {side === "p1" ? t.p1name : t.p2name}
                    </label>
                    <input
                      type="text"
                      value={kd[`${side}name`] || ""}
                      onChange={(e) =>
                        updateKO(id, side, "name", e.target.value)
                      }
                      placeholder="..."
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.05)",
                        color: "white",
                        fontFamily: F,
                        fontSize: 13,
                        fontWeight: 600,
                        outline: "none",
                        marginTop: 4,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>
              <AdminMatchCard
                title={lbl.title}
                p1Label={kd.p1name || lbl.p1}
                p2Label={kd.p2name || lbl.p2}
                scoreData={kd}
                onUpdate={(side, field, val) => updateKO(id, side, field, val)}
                color={lbl.color}
                t={t}
              />
            </div>
          );
        })}
    </div>
  );
}

function LoginScreen({ t, onLogin }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const tryLogin = () => {
    if (token === ADMIN_TOKEN) onLogin();
    else setError(true);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <div
        style={{
          padding: 40,
          borderRadius: 20,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          maxWidth: 360,
          width: "100%",
        }}
      >
        <div style={{ fontSize: 32, textAlign: "center", marginBottom: 16 }}>
          🔐
        </div>
        <h2
          style={{
            fontFamily: FD,
            fontSize: 22,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            margin: "0 0 24px",
          }}
        >
          {t.loginTitle}
        </h2>
        <label
          style={{
            fontFamily: F,
            fontSize: 10,
            fontWeight: 700,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.12em",
          }}
        >
          {t.tokenLabel}
        </label>
        <input
          type="password"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && tryLogin()}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 10,
            border: error
              ? "1px solid #ef4444"
              : "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            fontFamily: FM,
            fontSize: 15,
            outline: "none",
            marginTop: 8,
            boxSizing: "border-box",
          }}
        />
        {error && (
          <p
            style={{
              fontFamily: F,
              fontSize: 12,
              color: "#ef4444",
              margin: "8px 0 0",
            }}
          >
            {t.wrongToken}
          </p>
        )}
        <button
          onClick={tryLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(135deg, #eaab00, #e87722)",
            color: "#0a0f1a",
            fontFamily: F,
            fontSize: 14,
            fontWeight: 800,
            marginTop: 16,
          }}
        >
          {t.enter}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("es");
  const [tabIdx, setTabIdx] = useState(0);
  const [page, setPage] = useState("public");
  const [authed, setAuthed] = useState(false);
  const [city, setCity] = useState("medellin");
  const { data, save, loaded } = useData(city);
  const t = I18N[lang];

  if (!loaded)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0f1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.3)",
          fontFamily: F,
          fontSize: 14,
        }}
      >
        Cargando…
      </div>
    );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1a", color: "white" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: page === "admin" ? "40px 20px 30px" : "80px 20px 60px",
          background:
            "linear-gradient(135deg, #0a0f1a 0%, #0f1729 40%, #1a1a2e 70%, #0a0f1a 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-20%",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(234,171,0,0.08), transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <LangSwitcher lang={lang} setLang={setLang} />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {page === "admin" ? (
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 16px",
                  borderRadius: 100,
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  marginBottom: 16,
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#ef4444",
                  fontFamily: F,
                  letterSpacing: "0.1em",
                }}
              >
                🔒 {t.adminTitle}
              </div>
              <h1
                style={{
                  fontFamily: FD,
                  fontWeight: 900,
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  color: "white",
                  margin: "0 0 12px",
                }}
              >
                {t.title1}{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #eaab00, #e87722)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t.title2}
                </span>
              </h1>
              <CitySwitcher city={city} setCity={setCity} t={t} />
              <div
                style={{ display: "flex", justifyContent: "center", gap: 12 }}
              >
                <button
                  onClick={() => setPage("public")}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: F,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  ← {t.tabs[0]}
                </button>
                {authed && (
                  <button
                    onClick={() => setAuthed(false)}
                    style={{
                      padding: "8px 20px",
                      borderRadius: 8,
                      border: "1px solid rgba(239,68,68,0.3)",
                      background: "rgba(239,68,68,0.1)",
                      color: "#ef4444",
                      fontFamily: F,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {t.logout}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 20px",
                  borderRadius: 100,
                  background: "rgba(234,171,0,0.1)",
                  border: "1px solid rgba(234,171,0,0.25)",
                  marginBottom: 24,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "#eaab00",
                  fontFamily: F,
                }}
              >
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
                </svg>
                {t.badge}
              </div>
              <h1
                style={{
                  fontFamily: FD,
                  fontWeight: 900,
                  fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                  lineHeight: 1.05,
                  color: "white",
                  margin: "0 0 16px",
                  letterSpacing: "-0.02em",
                }}
              >
                {t.title1}
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #eaab00, #e87722, #eaab00)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t.title2}
                </span>
              </h1>
              <CitySwitcher city={city} setCity={setCity} t={t} />
              <p
                style={{
                  fontFamily: F,
                  fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
                  color: "rgba(255,255,255,0.45)",
                  margin: "0 0 12px",
                }}
              >
                {t[`venue_${city}`]}
              </p>
              <p
                style={{
                  fontFamily: FM,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.3)",
                  margin: "0 0 36px",
                  letterSpacing: "0.08em",
                }}
              >
                {t[`date_${city}`]}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 40,
                  flexWrap: "wrap",
                  marginBottom: 20,
                }}
              >
                {[
                  { n: "9", l: t.statPlayers },
                  { n: "3", l: t.statGroups },
                  { n: "3", l: t.statCountries },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: FD,
                        fontSize: 40,
                        fontWeight: 900,
                        color: "#eaab00",
                        lineHeight: 1,
                      }}
                    >
                      {s.n}
                    </div>
                    <div
                      style={{
                        fontFamily: F,
                        fontSize: 10,
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.18em",
                        fontWeight: 600,
                        marginTop: 4,
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setPage("admin")}
                style={{
                  padding: "6px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: F,
                  fontSize: 10,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                🔒 Admin
              </button>
            </>
          )}
        </div>
      </div>

      {page === "public" && (
        <>
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              background: "rgba(10,15,26,0.92)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                maxWidth: 900,
                margin: "0 auto",
                display: "flex",
                padding: "0 20px",
              }}
            >
              {t.tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setTabIdx(i)}
                  style={{
                    flex: 1,
                    padding: "14px 8px",
                    border: "none",
                    cursor: "pointer",
                    background: "transparent",
                    borderBottom:
                      tabIdx === i
                        ? "2px solid #eaab00"
                        : "2px solid transparent",
                    color: tabIdx === i ? "#eaab00" : "rgba(255,255,255,0.35)",
                    fontFamily: F,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    transition: "all 0.3s",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: "32px 20px 80px",
            }}
          >
            {tabIdx === 0 && <ScheduleTab t={t} city={city} />}
            {tabIdx === 1 && <GroupsTab t={t} data={data} city={city} />}
            {tabIdx === 2 && <StandingsTab t={t} data={data} city={city} />}
            {tabIdx === 3 && <BracketTab t={t} data={data} city={city} />}
          </div>
        </>
      )}

      {page === "admin" && (
        <div
          style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 80px" }}
        >
          {authed ? (
            <AdminPanel t={t} data={data} save={save} city={city} />
          ) : (
            <LoginScreen t={t} onLogin={() => setAuthed(true)} />
          )}
        </div>
      )}

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p
          style={{
            fontFamily: F,
            fontSize: 11,
            color: "rgba(255,255,255,0.15)",
          }}
        >
          {t[`footer_${city}`]}
        </p>
      </div>
    </div>
  );
}

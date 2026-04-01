import { useState, useEffect, useCallback } from "react";

const ADMIN_TOKEN = "maestros2026";

const PLAYERS = {
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

const GC = { A: "#10b981", B: "#3b82f6", C: "#ef4444" };
const GM = [{ p1: 0, p2: 1 }, { p1: 0, p2: 2 }, { p1: 1, p2: 2 }];

const GROUP_MATCHES_EXCEL = {
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
    { p1: "MARCO ZANETTI", p2: "JOSE JUAN GARCIA" },
    { p1: "MARCO ZANETTI", p2: "HUBERNEY CATAÑO" },
    { p1: "JOSE JUAN GARCIA", p2: "HUBERNEY CATAÑO" },
  ],
};

const KO_IDS = ["QF1", "QF2", "SF1", "SF2", "FINAL"];

function emptyScore() { return { car: "", ent: "", ms: "" }; }
function emptyMatch() { return { p1: emptyScore(), p2: emptyScore() }; }

function initData() {
  const d = { groups: {}, knockout: {} };
  ["A", "B", "C"].forEach(g => {
    d.groups[g] = [emptyMatch(), emptyMatch(), emptyMatch()];
  });
  KO_IDS.forEach(id => { d.knockout[id] = { p1name: "", p2name: "", ...emptyMatch() }; });
  return d;
}

const F = "'DM Sans', sans-serif";
const FD = "'Playfair Display', serif";
const FM = "'DM Mono', monospace";

const I18N = {
  en: {
    badge: "3-CUSHION BILLIARDS", title1: "MASTERS", title2: "TOURNAMENT",
    venue: "Master Club Billiards · Medellín, Colombia", date: "April 1, 2026",
    statPlayers: "PLAYERS", statGroups: "GROUPS", statCountries: "COUNTRIES",
    tabs: ["schedule", "groups", "standings", "bracket"],
    techTitle: "Technical Description",
    cfgFormat: "FORMAT", cfgFormatVal: "9 players → 3 groups of 3 → Round Robin",
    cfgGroups: "GROUP STAGE", cfgGroupsVal: "35 points",
    cfgSemis: "SEMIFINALS", cfgSemisVal: "40 points",
    cfgFinal: "FINAL", cfgFinalVal: "40 points",
    cfgTables: "TABLES", cfgTablesVal: "3 simultaneous tables",
    cfgQualify: "QUALIFY", cfgQualifyVal: "1st & 2nd per group + best 3rd places",
    day1: "Group Stage", day1sub: "35 points per match",
    day2: "Knockout Stage", day2sub: "Semis 40 pts · Final 40 pts",
    opening: "Official Opening", openingSub: "Event presentation · Countries & players · Rules overview",
    round: "Round", pause: "GENERAL BREAK", pauseSub: "Player rest · Commentary · Audience engagement",
    ranking: "OVERALL STANDINGS", rankingSub: "Position calculation · Official announcement",
    rankDetail: "1st & 2nd → Direct to semis · 3rd to 6th → Quarterfinals",
    crosses: "QUARTERFINALS", crossesSub: "2 tables simultaneously",
    semisTitle: "SEMIFINALS", semisSub: "Single table — Masterclass format",
    finalTitle: "GRAND FINAL", finalSub: "Special presentation",
    table: "Table", groupTitle: "Group", roundRobin: "ROUND ROBIN · 35 PTS",
    matchesLabel: "MATCHES", groupsSectionTitle: "Groups", groupsSub: "3 groups of 3 · Round Robin",
    standingsTitle: "Overall Standings",
    standingsSub: "Tiebreakers: Points → General Avg → Individual Avg → Best Run → Fewest Innings",
    thPlayer: "PLAYER", thGrp: "GRP", thMp: "MP", thW: "W", thL: "L", thPts: "PTS", thAvg: "AVG", thBr: "BR",
    pos12: "Pos 1–2", pos12d: "Direct to Semifinals",
    pos36: "Pos 3–6", pos36d: "Play Quarterfinals",
    pos79: "Pos 7–9", pos79d: "Eliminated",
    qf: "Quarterfinals", sf: "Semifinals", gf: "Grand Final",
    qf1: "Quarterfinal 1", qf2: "Quarterfinal 2", sf1: "Semifinal 1", sf2: "Semifinal 2", fin: "GRAND FINAL",
    p3rd: "3rd Overall", p6th: "6th Overall", p4th: "4th Overall", p5th: "5th Overall",
    p1st: "1st Overall", p2nd: "2nd Overall", qfW: "QF Winner",
    sf1W: "SF1 Winner", sf2W: "SF2 Winner",
    champion: "CHAMPION", tbd: "To be determined",
    footer: "Masters Tournament 2026 · 3-Cushion Billiards · Master Club Billiards · Medellín, Colombia",
    korea: "KOREA", colombia: "COLOMBIA", italy: "ITALY",
    groupA: "Group A", groupB: "Group B", groupC: "Group C",
    car: "Points", ent: "Innings", ms: "Best Run", avg: "Avg", result: "Result",
    winner: "WINNER", loser: "LOSER", draw: "DRAW", pending: "—",
    match: "Match", save: "Save", saved: "Saved ✓", adminTitle: "Admin Panel",
    loginTitle: "Sports Director Login", tokenLabel: "Access Token", enter: "Enter",
    wrongToken: "Invalid token", logout: "Logout", groupStage: "Group Stage", knockoutStage: "Knockout",
    p1name: "Player 1", p2name: "Player 2",
  },
  es: {
    badge: "BILLAR 3 BANDAS", title1: "TORNEO DE", title2: "MAESTROS",
    venue: "Master Club Billiards · Medellín, Colombia", date: "1 de Abril, 2026",
    statPlayers: "JUGADORES", statGroups: "GRUPOS", statCountries: "PAÍSES",
    tabs: ["programa", "grupos", "clasificación", "llaves"],
    techTitle: "Descripción Técnica",
    cfgFormat: "FORMATO", cfgFormatVal: "9 jugadores → 3 grupos de 3 → Round Robin",
    cfgGroups: "FASE DE GRUPOS", cfgGroupsVal: "35 puntos",
    cfgSemis: "SEMIFINALES", cfgSemisVal: "40 puntos",
    cfgFinal: "FINAL", cfgFinalVal: "40 puntos",
    cfgTables: "MESAS", cfgTablesVal: "3 mesas simultáneas",
    cfgQualify: "CLASIFICAN", cfgQualifyVal: "1° y 2° de cada grupo + mejores 3°s",
    day1: "Fase de Grupos", day1sub: "35 puntos por partida",
    day2: "Eliminación Directa", day2sub: "Semis 40 pts · Final 40 pts",
    opening: "Apertura Oficial", openingSub: "Presentación del evento · Países y jugadores · Explicación de reglas",
    round: "Ronda", pause: "PAUSA GENERAL", pauseSub: "Descanso jugadores · Comentarios · Público activo",
    ranking: "CLASIFICACIÓN GENERAL", rankingSub: "Cálculo de posiciones · Anuncio oficial",
    rankDetail: "1° y 2° → Pase directo a semifinal · 3° al 6° → Cruces",
    crosses: "CRUCES", crossesSub: "2 mesas simultáneamente",
    semisTitle: "SEMIFINALES", semisSub: "Una sola mesa — Formato magistral",
    finalTitle: "GRAN FINAL", finalSub: "Presentación especial",
    table: "Mesa", groupTitle: "Grupo", roundRobin: "ROUND ROBIN · 35 PTS",
    matchesLabel: "PARTIDAS", groupsSectionTitle: "Grupos", groupsSub: "3 grupos de 3 · Round Robin",
    standingsTitle: "Clasificación General",
    standingsSub: "Desempate: Puntos → Promedio Gral → Promedio Indiv → Mayor Serie → Menor Entradas",
    thPlayer: "JUGADOR", thGrp: "GRP", thMp: "PJ", thW: "PG", thL: "PP", thPts: "PTS", thAvg: "PROM", thBr: "MS",
    pos12: "Pos 1–2", pos12d: "Directo a Semifinales",
    pos36: "Pos 3–6", pos36d: "Juegan Cuartos",
    pos79: "Pos 7–9", pos79d: "Eliminados",
    qf: "Cuartos de Final", sf: "Semifinales", gf: "Gran Final",
    qf1: "Cuartos 1", qf2: "Cuartos 2", sf1: "Semifinal 1", sf2: "Semifinal 2", fin: "GRAN FINAL",
    p3rd: "3° Clasificación", p6th: "6° Clasificación", p4th: "4° Clasificación", p5th: "5° Clasificación",
    p1st: "1° General", p2nd: "2° General", qfW: "Ganador CF",
    sf1W: "Ganador SF1", sf2W: "Ganador SF2",
    champion: "CAMPEÓN", tbd: "Por definir",
    footer: "Torneo de Maestros 2026 · Billar 3 Bandas · Master Club Billiards · Medellín, Colombia",
    korea: "COREA", colombia: "COLOMBIA", italy: "ITALIA",
    groupA: "Grupo A", groupB: "Grupo B", groupC: "Grupo C",
    car: "Carambolas", ent: "Entradas", ms: "Mayor Serie", avg: "Prom", result: "Resultado",
    winner: "GANADOR", loser: "PERDEDOR", draw: "EMPATE", pending: "—",
    match: "Partida", save: "Guardar", saved: "Guardado ✓", adminTitle: "Panel de Director",
    loginTitle: "Acceso Director Deportivo", tokenLabel: "Token de Acceso", enter: "Ingresar",
    wrongToken: "Token inválido", logout: "Salir", groupStage: "Fase de Grupos", knockoutStage: "Eliminación",
    p1name: "Jugador 1", p2name: "Jugador 2",
  },
  ko: {
    badge: "3쿠션 당구", title1: "마스터즈", title2: "토너먼트",
    venue: "마스터 클럽 당구장 · 메데진, 콜롬비아", date: "2026년 4월 1일",
    statPlayers: "선수", statGroups: "조", statCountries: "국가",
    tabs: ["일정", "조편성", "순위", "대진표"],
    techTitle: "기술 설명",
    cfgFormat: "형식", cfgFormatVal: "9명 → 3조 × 3명 → 라운드 로빈",
    cfgGroups: "조별 리그", cfgGroupsVal: "35점",
    cfgSemis: "준결승", cfgSemisVal: "40점",
    cfgFinal: "결승", cfgFinalVal: "40점",
    cfgTables: "테이블", cfgTablesVal: "3대 동시 진행",
    cfgQualify: "본선 진출", cfgQualifyVal: "각 조 1·2위 + 최우수 3위",
    day1: "조별 리그", day1sub: "경기당 35점",
    day2: "토너먼트", day2sub: "준결승 40점 · 결승 40점",
    opening: "공식 개회", openingSub: "행사 소개 · 국가 및 선수 소개 · 규칙 설명",
    round: "라운드", pause: "휴식 시간", pauseSub: "선수 휴식 · 해설 · 관중 참여",
    ranking: "종합 순위", rankingSub: "순위 계산 · 공식 발표",
    rankDetail: "1·2위 → 준결승 직행 · 3~6위 → 8강전",
    crosses: "8강전", crossesSub: "2대 동시 진행",
    semisTitle: "준결승", semisSub: "단일 테이블 — 마스터 클래스",
    finalTitle: "결승전", finalSub: "특별 프레젠테이션",
    table: "테이블", groupTitle: "조", roundRobin: "라운드 로빈 · 35점",
    matchesLabel: "경기", groupsSectionTitle: "조편성", groupsSub: "3조 × 3명 · 라운드 로빈",
    standingsTitle: "종합 순위",
    standingsSub: "동점: 승점 → 종합 평균 → 개인 평균 → 최고 연속 → 최소 이닝",
    thPlayer: "선수", thGrp: "조", thMp: "경기", thW: "승", thL: "패", thPts: "승점", thAvg: "평균", thBr: "최고",
    pos12: "1–2위", pos12d: "준결승 직행",
    pos36: "3–6위", pos36d: "8강전",
    pos79: "7–9위", pos79d: "탈락",
    qf: "8강전", sf: "준결승", gf: "결승전",
    qf1: "8강 1", qf2: "8강 2", sf1: "준결승 1", sf2: "준결승 2", fin: "결승전",
    p3rd: "종합 3위", p6th: "종합 6위", p4th: "종합 4위", p5th: "종합 5위",
    p1st: "종합 1위", p2nd: "종합 2위", qfW: "8강 승자",
    sf1W: "준결승1 승자", sf2W: "준결승2 승자",
    champion: "챔피언", tbd: "미정",
    footer: "마스터즈 토너먼트 2026 · 3쿠션 당구 · 메데진, 콜롬비아",
    korea: "한국", colombia: "콜롬비아", italy: "이탈리아",
    groupA: "A조", groupB: "B조", groupC: "C조",
    car: "득점", ent: "이닝", ms: "최고런", avg: "평균", result: "결과",
    winner: "승리", loser: "패배", draw: "무승부", pending: "—",
    match: "경기", save: "저장", saved: "저장됨 ✓", adminTitle: "관리자 패널",
    loginTitle: "스포츠 디렉터 로그인", tokenLabel: "액세스 토큰", enter: "입장",
    wrongToken: "잘못된 토큰", logout: "로그아웃", groupStage: "조별 리그", knockoutStage: "토너먼트",
    p1name: "선수 1", p2name: "선수 2",
  },
};

const LANGS = [{ code: "en", flag: "🇺🇸", label: "EN" }, { code: "es", flag: "🇨🇴", label: "ES" }, { code: "ko", flag: "🇰🇷", label: "KO" }];

function useData() {
  const [data, setData] = useState(initData());
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    try {
      const r = await window.storage.get("torneo-data", true);
      if (r && r.value) setData(JSON.parse(r.value));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => { load(); const iv = setInterval(load, 5000); return () => clearInterval(iv); }, [load]);

  const save = useCallback(async (newData) => {
    setData(newData);
    try { await window.storage.set("torneo-data", JSON.stringify(newData), true); } catch {}
  }, []);

  return { data, save, loaded };
}

function calcStandings(data) {
  const stats = {};
  Object.entries(PLAYERS).forEach(([g, ps]) => {
    ps.forEach(p => { stats[p.name] = { name: p.name, flag: p.flag, ck: p.ck, group: g, color: GC[g], mp: 0, w: 0, l: 0, pts: 0, totalCar: 0, totalEnt: 0, bestRun: 0, bestAvg: 0 }; });
  });

  Object.entries(GROUP_MATCHES_EXCEL).forEach(([g, matches]) => {
    matches.forEach((m, mi) => {
      const md = data.groups[g]?.[mi];
      if (!md) return;
      const c1 = Number(md.p1.car) || 0, e1 = Number(md.p1.ent) || 0, ms1 = Number(md.p1.ms) || 0;
      const c2 = Number(md.p2.car) || 0, e2 = Number(md.p2.ent) || 0, ms2 = Number(md.p2.ms) || 0;
      if (c1 === 0 && c2 === 0 && e1 === 0 && e2 === 0) return;
      const s1 = stats[m.p1], s2 = stats[m.p2];
      if (!s1 || !s2) return;
      s1.mp++; s2.mp++;
      s1.totalCar += c1; s1.totalEnt += e1; s1.bestRun = Math.max(s1.bestRun, ms1);
      s2.totalCar += c2; s2.totalEnt += e2; s2.bestRun = Math.max(s2.bestRun, ms2);
      const avg1 = e1 > 0 ? c1 / e1 : 0, avg2 = e2 > 0 ? c2 / e2 : 0;
      s1.bestAvg = Math.max(s1.bestAvg, avg1); s2.bestAvg = Math.max(s2.bestAvg, avg2);
      if (c1 > c2) { s1.w++; s1.pts += 2; s2.l++; }
      else if (c2 > c1) { s2.w++; s2.pts += 2; s1.l++; }
      else { s1.pts += 1; s2.pts += 1; }
    });
  });

  return Object.values(stats).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const avgA = a.totalEnt > 0 ? a.totalCar / a.totalEnt : 0;
    const avgB = b.totalEnt > 0 ? b.totalCar / b.totalEnt : 0;
    if (avgB !== avgA) return avgB - avgA;
    if (b.bestAvg !== a.bestAvg) return b.bestAvg - a.bestAvg;
    if (b.bestRun !== a.bestRun) return b.bestRun - a.bestRun;
    return a.totalEnt - b.totalEnt;
  });
}

function LangSwitcher({ lang, setLang }) {
  return (
    <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10, display: "flex", gap: 4, padding: 3, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
      {LANGS.map(l => (
        <button key={l.code} onClick={() => setLang(l.code)} style={{ padding: "6px 10px", border: "none", borderRadius: 8, cursor: "pointer", background: lang === l.code ? "rgba(234,171,0,0.2)" : "transparent", color: lang === l.code ? "#eaab00" : "rgba(255,255,255,0.4)", fontFamily: F, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s" }}>
          <span style={{ fontSize: 14 }}>{l.flag}</span>{l.label}
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
        <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 800, color: "white", margin: 0 }}>{title}</h3>
      </div>
      {subtitle && <p style={{ fontFamily: F, fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "6px 0 0 28px" }}>{subtitle}</p>}
    </div>
  );
}

function MatchResult({ m, t }) {
  const c1 = Number(m.p1.car) || 0, c2 = Number(m.p2.car) || 0;
  const e1 = Number(m.p1.ent) || 0, e2 = Number(m.p2.ent) || 0;
  if (c1 === 0 && c2 === 0 && e1 === 0 && e2 === 0) return null;
  const avg1 = e1 > 0 ? (c1 / e1).toFixed(3) : "—", avg2 = e2 > 0 ? (c2 / e2).toFixed(3) : "—";
  const r1 = c1 > c2 ? t.winner : c1 < c2 ? t.loser : t.draw;
  const r2 = c2 > c1 ? t.winner : c2 < c1 ? t.loser : t.draw;
  const rc1 = c1 > c2 ? "#10b981" : c1 < c2 ? "#ef4444" : "#eaab00";
  const rc2 = c2 > c1 ? "#10b981" : c2 < c1 ? "#ef4444" : "#eaab00";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
      {[[c1, e1, avg1, Number(m.p1.ms) || 0, r1, rc1], [c2, e2, avg2, Number(m.p2.ms) || 0, r2, rc2]].map(([car, ent, avg, ms, res, rc], i) => (
        <div key={i} style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: F, marginBottom: 4 }}>
            <span>{t.car}: <b style={{ color: "rgba(255,255,255,0.7)" }}>{car}</b></span>
            <span>{t.ent}: <b style={{ color: "rgba(255,255,255,0.7)" }}>{ent}</b></span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: F }}>
            <span>{t.avg}: <b style={{ color: "rgba(255,255,255,0.7)" }}>{avg}</b></span>
            <span>{t.ms}: <b style={{ color: "rgba(255,255,255,0.7)" }}>{ms}</b></span>
          </div>
          <div style={{ marginTop: 6, fontFamily: F, fontSize: 10, fontWeight: 800, color: rc, letterSpacing: "0.1em" }}>{res}</div>
        </div>
      ))}
    </div>
  );
}

function GroupsTab({ t, data }) {
  return (
    <div>
      <SectionTitle icon="🎯" title={t.groupsSectionTitle} subtitle={t.groupsSub} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginTop: 20 }}>
        {Object.entries(PLAYERS).map(([key, players]) => {
          const c = GC[key]; const gLabel = t[`group${key}`];
          return (
            <div key={key} style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${c}25`, background: `linear-gradient(160deg, ${c}0a, ${c}03)` }}>
              <div style={{ padding: "20px 24px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${c}15` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c}20`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontSize: 18, fontWeight: 900, color: c }}>{key}</div>
                <div>
                  <div style={{ fontFamily: FD, fontSize: 18, fontWeight: 800, color: "white" }}>{gLabel}</div>
                  <div style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{t.roundRobin}</div>
                </div>
              </div>
              <div style={{ padding: "16px 24px" }}>
                {players.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < 2 ? `1px solid ${c}0c` : "none" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontSize: 11, fontWeight: 800, color: c }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{p.name}</div>
                      <div style={{ fontFamily: F, fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{p.flag} {t[p.ck]}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0 24px 20px" }}>
                <div style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.14em", marginBottom: 10 }}>{t.matchesLabel}</div>
                {GROUP_MATCHES_EXCEL[key].map((m, i) => (
                  <div key={i} style={{ marginBottom: i < 2 ? 10 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", borderRadius: 10, background: `${c}08` }}>
                      <div style={{ flex: 1, fontFamily: F, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{m.p1}</div>
                      <div style={{ width: 36, height: 22, borderRadius: 6, background: `${c}20`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontSize: 9, fontWeight: 800, color: c }}>VS</div>
                      <div style={{ flex: 1, fontFamily: F, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", textAlign: "right" }}>{m.p2}</div>
                    </div>
                    {data.groups[key]?.[i] && <MatchResult m={data.groups[key][i]} t={t} />}
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

function StandingsTab({ t, data }) {
  const standings = calcStandings(data);
  const headers = ["#", t.thPlayer, t.thGrp, t.thMp, t.thW, t.thL, t.thPts, t.thAvg, t.thBr];
  return (
    <div>
      <SectionTitle icon="📊" title={t.standingsTitle} subtitle={t.standingsSub} />
      <div style={{ marginTop: 20, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {headers.map((h, i) => (
                  <th key={i} style={{ padding: "14px 10px", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textAlign: i < 2 ? "left" : "center", background: "rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {standings.map((p, i) => {
                const isSemi = i < 2, isQF = i >= 2 && i < 6;
                let bg = "rgba(255,255,255,0.015)";
                if (isSemi) bg = "rgba(234,171,0,0.08)";
                else if (isQF) bg = "rgba(255,255,255,0.035)";
                const avg = p.totalEnt > 0 ? (p.totalCar / p.totalEnt).toFixed(3) : "—";
                return (
                  <tr key={i} style={{ background: bg, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "14px 10px", fontSize: 15, fontWeight: 800, color: isSemi ? "#eaab00" : isQF ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)" }}>{i + 1}</td>
                    <td style={{ padding: "14px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 16 }}>{p.flag}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{p.name}</div>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{t[p.ck]}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 6px", textAlign: "center" }}><span style={{ padding: "4px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700, background: `${p.color}18`, color: p.color }}>{p.group}</span></td>
                    {[p.mp, p.w, p.l, p.pts, avg, p.bestRun].map((v, j) => (
                      <td key={j} style={{ padding: "14px 6px", textAlign: "center", fontSize: 13, fontWeight: j === 3 ? 800 : 600, color: j === 3 ? (isSemi ? "#eaab00" : "rgba(255,255,255,0.7)") : "rgba(255,255,255,0.35)", fontFamily: FM }}>{v}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        {[[t.pos12, t.pos12d, "#eaab00", "rgba(234,171,0,0.08)"], [t.pos36, t.pos36d, "rgba(255,255,255,0.6)", "rgba(255,255,255,0.04)"], [t.pos79, t.pos79d, "rgba(255,255,255,0.25)", "rgba(255,255,255,0.02)"]].map(([l, d, c, bg], i) => (
          <div key={i} style={{ flex: 1, minWidth: 150, padding: "10px 14px", borderRadius: 10, background: bg, border: `1px solid ${c}20` }}>
            <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: c }}>{l}: </span>
            <span style={{ fontFamily: F, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BracketTab({ t, data }) {
  const koLabels = { QF1: { title: t.qf1, p1: t.p3rd, p2: t.p6th }, QF2: { title: t.qf2, p1: t.p4th, p2: t.p5th }, SF1: { title: t.sf1, p1: t.p1st, p2: t.qfW }, SF2: { title: t.sf2, p1: t.p2nd, p2: t.qfW }, FINAL: { title: t.fin, p1: t.sf1W, p2: t.sf2W } };
  const rounds = [
    { title: t.qf, ids: ["QF1", "QF2"], color: "#a855f7", pts: 35 },
    { title: t.sf, ids: ["SF1", "SF2"], color: "#3b82f6", pts: 40 },
    { title: t.gf, ids: ["FINAL"], color: "#eaab00", pts: 40 },
  ];
  const champion = (() => {
    const fd = data.knockout?.FINAL;
    if (!fd) return null;
    const c1 = Number(fd.p1?.car) || 0, c2 = Number(fd.p2?.car) || 0;
    if (c1 === 0 && c2 === 0) return null;
    return c1 > c2 ? (fd.p1name || koLabels.FINAL.p1) : c2 > c1 ? (fd.p2name || koLabels.FINAL.p2) : null;
  })();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      {rounds.map((round, ri) => {
        const isFinal = ri === 2;
        return (
          <div key={ri}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: round.color, boxShadow: `0 0 12px ${round.color}60` }} />
              <h3 style={{ fontFamily: FD, fontSize: 20, fontWeight: 800, color: "white", margin: 0 }}>{round.title}</h3>
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: round.color, letterSpacing: "0.1em", padding: "3px 10px", borderRadius: 100, background: `${round.color}15` }}>{round.pts} PTS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {round.ids.map(id => {
                const kd = data.knockout?.[id] || {};
                const label = koLabels[id];
                const p1n = kd.p1name || label.p1, p2n = kd.p2name || label.p2;
                const hasData = (Number(kd.p1?.car) || 0) > 0 || (Number(kd.p2?.car) || 0) > 0;
                return (
                  <div key={id} style={{ borderRadius: 14, overflow: "hidden", border: isFinal ? "1px solid rgba(234,171,0,0.25)" : "1px solid rgba(255,255,255,0.06)", background: isFinal ? "linear-gradient(135deg, rgba(234,171,0,0.08), rgba(232,119,34,0.04))" : "rgba(255,255,255,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "stretch" }}>
                      <div style={{ flex: 1, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{p1n}</span>
                      </div>
                      <div style={{ width: 50, display: "flex", alignItems: "center", justifyContent: "center", background: `${round.color}12` }}>
                        <span style={{ fontFamily: F, fontSize: 10, fontWeight: 800, color: round.color, letterSpacing: "0.15em" }}>VS</span>
                      </div>
                      <div style={{ flex: 1, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{p2n}</span>
                      </div>
                    </div>
                    {hasData && <div style={{ padding: "0 16px 12px" }}><MatchResult m={kd} t={t} /></div>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div style={{ textAlign: "center", padding: "32px 20px", borderRadius: 16, background: "linear-gradient(135deg, rgba(234,171,0,0.08), rgba(232,119,34,0.04))", border: "1px solid rgba(234,171,0,0.15)" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
        <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", marginBottom: 8 }}>{t.champion}</div>
        <div style={{ fontFamily: FD, fontSize: 24, fontWeight: 900, background: "linear-gradient(135deg, #eaab00, #e87722)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{champion || t.tbd}</div>
      </div>
    </div>
  );
}

function ScheduleTab({ t }) {
  const config = [[t.cfgFormat, t.cfgFormatVal], [t.cfgGroups, t.cfgGroupsVal], [t.cfgSemis, t.cfgSemisVal], [t.cfgFinal, t.cfgFinalVal], [t.cfgTables, t.cfgTablesVal], [t.cfgQualify, t.cfgQualifyVal]];

  const timeline = [
    { time: "2:00 PM", end: "2:15 PM", type: "event", color: "#10b981", icon: "🟢", title: t.opening, sub: t.openingSub },
    { time: "2:15 PM", end: "3:30 PM", type: "round", color: "#3b82f6", icon: "🔵", title: `${t.round} 1 — ${t.day1}`, matches: [
      [`${t.table} 1`, `${t.groupTitle} A · M1`, "JUNGHAN HEO", "ALEXANDER MUÑOZ", "A"],
      [`${t.table} 2`, `${t.groupTitle} B · M1`, "MYUNWOO CHO", "ARLEY MONTOYA", "B"],
      [`${t.table} 3`, `${t.groupTitle} C · M1`, "MARCO ZANETTI", "JOSE JUAN GARCIA", "C"],
    ]},
    { time: "3:30 PM", end: "4:45 PM", type: "round", color: "#3b82f6", icon: "🔵", title: `${t.round} 2`, matches: [
      [`${t.table} 1`, `${t.groupTitle} A · M2`, "ALEJANDRO PIZA", "ALEXANDER MUÑOZ", "A"],
      [`${t.table} 2`, `${t.groupTitle} B · M2`, "ALEXANDER SALAZAR", "ARLEY MONTOYA", "B"],
      [`${t.table} 3`, `${t.groupTitle} C · M2`, "MARCO ZANETTI", "HUBERNEY CATAÑO", "C"],
    ]},
    { time: "4:45 PM", end: "5:00 PM", type: "break", color: "#78716c", icon: "☕", title: t.pause, sub: t.pauseSub },
    { time: "5:00 PM", end: "6:15 PM", type: "round", color: "#3b82f6", icon: "🔵", title: `${t.round} 3`, matches: [
      [`${t.table} 1`, `${t.groupTitle} A · M3`, "JUNGHAN HEO", "ALEJANDRO PIZA", "A"],
      [`${t.table} 2`, `${t.groupTitle} B · M3`, "MYUNWOO CHO", "ALEXANDER SALAZAR", "B"],
      [`${t.table} 3`, `${t.groupTitle} C · M3`, "JOSE JUAN GARCIA", "HUBERNEY CATAÑO", "C"],
    ]},
    { time: "6:15 PM", end: "6:30 PM", type: "event", color: "#eaab00", icon: "📊", title: t.ranking, sub: `${t.rankingSub}\n${t.rankDetail}` },
    { time: "6:30 PM", end: "7:45 PM", type: "round", color: "#ef4444", icon: "🔴", title: t.crosses, sub: t.crossesSub, matches: [
      [`${t.table} 1`, t.qf1, t.p3rd, t.p6th, "QF"],
      [`${t.table} 2`, t.qf2, t.p4th, t.p5th, "QF"],
    ]},
    { time: "8:00 PM", end: "9:15 PM", type: "round", color: "#a855f7", icon: "🟣", title: t.semisTitle, sub: t.semisSub, matches: [
      [`${t.table} 1`, t.sf1, t.p1st, t.qfW, "SF"],
      [`${t.table} 1`, t.sf2, t.p2nd, t.qfW, "SF"],
    ]},
    { time: "9:30 PM", end: "10:45 PM", type: "round", color: "#eaab00", icon: "🏁", title: t.finalTitle, sub: t.finalSub, matches: [
      [`${t.table} 1`, t.fin, t.sf1W, t.sf2W, "F"],
    ]},
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div>
        <SectionTitle icon="⚙" title={t.techTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginTop: 16 }}>
          {config.map(([l, v], i) => (
            <div key={i} style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginBottom: 6 }}>{l}</div>
              <div style={{ fontFamily: F, fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle icon="📋" title={t.tabs[0] === "programa" ? "Programa del Evento" : t.tabs[0] === "일정" ? "이벤트 일정" : "Event Schedule"} subtitle={t.date} />
        <div style={{ marginTop: 20, position: "relative", paddingLeft: 28 }}>
          <div style={{ position: "absolute", left: 11, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1 }} />

          {timeline.map((block, bi) => (
            <div key={bi} style={{ position: "relative", marginBottom: bi < timeline.length - 1 ? 20 : 0 }}>
              <div style={{ position: "absolute", left: -22, top: 6, width: 14, height: 14, borderRadius: "50%", background: `${block.color}30`, border: `2px solid ${block.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: block.color }} />
              </div>

              <div style={{ padding: "16px 20px", borderRadius: 14, background: block.type === "break" ? "rgba(120,113,108,0.08)" : `${block.color}08`, border: `1px solid ${block.color}18` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: block.matches || block.sub ? 10 : 0 }}>
                  <span style={{ fontSize: 16 }}>{block.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: block.color }}>{block.title}</div>
                  </div>
                  <div style={{ fontFamily: FM, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>{block.time} – {block.end}</div>
                </div>

                {block.sub && (
                  <div style={{ fontFamily: F, fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginLeft: 24 }}>
                    {block.sub.split("\n").map((line, li) => <div key={li}>{line}</div>)}
                  </div>
                )}

                {block.matches && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginLeft: 24 }}>
                    {block.matches.map(([mesa, phase, p1, p2, g], mi) => {
                      const mc = GC[g] || block.color;
                      return (
                        <div key={mi} style={{ display: "grid", gridTemplateColumns: "70px 1fr", alignItems: "center", gap: 12, padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)" }}>
                          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.2)" }}>{mesa}</div>
                          <div>
                            <div style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>
                              <span style={{ color: mc, marginRight: 6, fontSize: 9 }}>●</span>
                              {p1} <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 6px", fontSize: 10 }}>vs</span> {p2}
                            </div>
                            <div style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>{phase}</div>
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

function AdminScoreInput({ label, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <label style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{label}</label>
      <input type="number" min="0" value={value} onChange={e => onChange(e.target.value)} style={{ width: 70, padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", fontFamily: FM, fontSize: 14, fontWeight: 600, textAlign: "center", outline: "none" }} />
    </div>
  );
}

function AdminPanel({ t, data, save }) {
  const [d, setD] = useState(JSON.parse(JSON.stringify(data)));
  const [saved, setSaved] = useState(false);
  const [adminTab, setAdminTab] = useState("groups");

  useEffect(() => { setD(JSON.parse(JSON.stringify(data))); }, [data]);

  const updateGroup = (g, mi, side, field, val) => {
    const nd = JSON.parse(JSON.stringify(d));
    nd.groups[g][mi][side][field] = val;
    setD(nd); setSaved(false);
  };
  const updateKO = (id, field, val) => {
    const nd = JSON.parse(JSON.stringify(d));
    if (field === "p1name" || field === "p2name") nd.knockout[id][field] = val;
    else { const [side, f] = field.split("."); nd.knockout[id][side][f] = val; }
    setD(nd); setSaved(false);
  };
  const doSave = async () => { await save(d); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[["groups", t.groupStage], ["knockout", t.knockoutStage]].map(([k, l]) => (
          <button key={k} onClick={() => setAdminTab(k)} style={{ padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", background: adminTab === k ? "rgba(234,171,0,0.2)" : "rgba(255,255,255,0.05)", color: adminTab === k ? "#eaab00" : "rgba(255,255,255,0.4)", fontFamily: F, fontSize: 12, fontWeight: 700, transition: "all 0.2s" }}>{l}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={doSave} style={{ padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer", background: saved ? "rgba(16,185,129,0.2)" : "linear-gradient(135deg, #eaab00, #e87722)", color: saved ? "#10b981" : "#0a0f1a", fontFamily: F, fontSize: 13, fontWeight: 800, transition: "all 0.3s" }}>
          {saved ? t.saved : t.save}
        </button>
      </div>

      {adminTab === "groups" && Object.entries(GROUP_MATCHES_EXCEL).map(([g, matches]) => (
        <div key={g} style={{ marginBottom: 32 }}>
          <h3 style={{ fontFamily: FD, fontSize: 20, fontWeight: 800, color: GC[g], margin: "0 0 16px" }}>{t[`group${g}`]}</h3>
          {matches.map((m, mi) => (
            <div key={mi} style={{ padding: 20, borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 12 }}>
              <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>{t.match} {mi + 1}</div>
              {["p1", "p2"].map(side => {
                const pName = side === "p1" ? m.p1 : m.p2;
                const sc = d.groups[g]?.[mi]?.[side] || emptyScore();
                return (
                  <div key={side} style={{ marginBottom: side === "p1" ? 12 : 0 }}>
                    <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 8 }}>{pName}</div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <AdminScoreInput label={t.car} value={sc.car} onChange={v => updateGroup(g, mi, side, "car", v)} />
                      <AdminScoreInput label={t.ent} value={sc.ent} onChange={v => updateGroup(g, mi, side, "ent", v)} />
                      <AdminScoreInput label={t.ms} value={sc.ms} onChange={v => updateGroup(g, mi, side, "ms", v)} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}

      {adminTab === "knockout" && KO_IDS.map(id => {
        const labels = { QF1: t.qf1, QF2: t.qf2, SF1: t.sf1, SF2: t.sf2, FINAL: t.fin };
        const kd = d.knockout[id] || {};
        return (
          <div key={id} style={{ padding: 20, borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 12 }}>
            <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#eaab00", marginBottom: 16 }}>{labels[id]}</div>
            {["p1", "p2"].map(side => (
              <div key={side} style={{ marginBottom: side === "p1" ? 16 : 0 }}>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{side === "p1" ? t.p1name : t.p2name}</label>
                  <input type="text" value={kd[`${side}name`] || ""} onChange={e => updateKO(id, `${side}name`, e.target.value)} placeholder="..." style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", fontFamily: F, fontSize: 13, fontWeight: 600, outline: "none", marginTop: 4 }} />
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <AdminScoreInput label={t.car} value={kd[side]?.car || ""} onChange={v => updateKO(id, `${side}.car`, v)} />
                  <AdminScoreInput label={t.ent} value={kd[side]?.ent || ""} onChange={v => updateKO(id, `${side}.ent`, v)} />
                  <AdminScoreInput label={t.ms} value={kd[side]?.ms || ""} onChange={v => updateKO(id, `${side}.ms`, v)} />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function LoginScreen({ t, onLogin }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const tryLogin = () => { if (token === ADMIN_TOKEN) onLogin(); else setError(true); };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ padding: 40, borderRadius: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", maxWidth: 360, width: "100%" }}>
        <div style={{ fontSize: 32, textAlign: "center", marginBottom: 16 }}>🔐</div>
        <h2 style={{ fontFamily: FD, fontSize: 22, fontWeight: 800, color: "white", textAlign: "center", margin: "0 0 24px" }}>{t.loginTitle}</h2>
        <label style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em" }}>{t.tokenLabel}</label>
        <input type="password" value={token} onChange={e => { setToken(e.target.value); setError(false); }} onKeyDown={e => e.key === "Enter" && tryLogin()} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: error ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", fontFamily: FM, fontSize: 15, outline: "none", marginTop: 8, boxSizing: "border-box" }} />
        {error && <p style={{ fontFamily: F, fontSize: 12, color: "#ef4444", margin: "8px 0 0" }}>{t.wrongToken}</p>}
        <button onClick={tryLogin} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #eaab00, #e87722)", color: "#0a0f1a", fontFamily: F, fontSize: 14, fontWeight: 800, marginTop: 16 }}>{t.enter}</button>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("es");
  const [tabIdx, setTabIdx] = useState(0);
  const [page, setPage] = useState("public");
  const [authed, setAuthed] = useState(false);
  const { data, save, loaded } = useData();
  const t = I18N[lang];

  if (!loaded) return <div style={{ minHeight: "100vh", background: "#0a0f1a", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", fontFamily: F }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1a", color: "white" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <div style={{ position: "relative", overflow: "hidden", padding: page === "admin" ? "40px 20px 30px" : "80px 20px 60px", background: "linear-gradient(135deg, #0a0f1a 0%, #0f1729 40%, #1a1a2e 70%, #0a0f1a 100%)" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", top: "-50%", left: "-20%", width: 600, height: 600, background: "radial-gradient(circle, rgba(234,171,0,0.08), transparent 70%)", borderRadius: "50%" }} />
        <LangSwitcher lang={lang} setLang={setLang} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          {page === "admin" ? (
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", marginBottom: 16, fontSize: 11, fontWeight: 700, color: "#ef4444", fontFamily: F, letterSpacing: "0.1em" }}>🔒 {t.adminTitle}</div>
              <h1 style={{ fontFamily: FD, fontWeight: 900, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "white", margin: "0 0 12px" }}>{t.title1} <span style={{ background: "linear-gradient(135deg, #eaab00, #e87722)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.title2}</span></h1>
              <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                <button onClick={() => setPage("public")} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontFamily: F, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>← {t.tabs[0]}</button>
                {authed && <button onClick={() => setAuthed(false)} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontFamily: F, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{t.logout}</button>}
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 20px", borderRadius: 100, background: "rgba(234,171,0,0.1)", border: "1px solid rgba(234,171,0,0.25)", marginBottom: 24, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#eaab00", fontFamily: F }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" /></svg>
                {t.badge}
              </div>
              <h1 style={{ fontFamily: FD, fontWeight: 900, fontSize: "clamp(2.2rem, 6vw, 4.5rem)", lineHeight: 1.05, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
                {t.title1}<br /><span style={{ background: "linear-gradient(135deg, #eaab00, #e87722, #eaab00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.title2}</span>
              </h1>
              <p style={{ fontFamily: F, fontSize: "clamp(0.85rem, 2vw, 1.05rem)", color: "rgba(255,255,255,0.45)", margin: "0 0 12px" }}>{t.venue}</p>
              <p style={{ fontFamily: FM, fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "0 0 36px", letterSpacing: "0.08em" }}>{t.date}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", marginBottom: 20 }}>
                {[{ n: "9", l: t.statPlayers }, { n: "3", l: t.statGroups }, { n: "3", l: t.statCountries }].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: FD, fontSize: 40, fontWeight: 900, color: "#eaab00", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", fontWeight: 600, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setPage("admin")} style={{ padding: "6px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.2)", fontFamily: F, fontSize: 10, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>🔒 Admin</button>
            </>
          )}
        </div>
      </div>

      {page === "public" && (
        <>
          <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(10,15,26,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", padding: "0 20px" }}>
              {t.tabs.map((tab, i) => (
                <button key={tab} onClick={() => setTabIdx(i)} style={{ flex: 1, padding: "14px 8px", border: "none", cursor: "pointer", background: "transparent", borderBottom: tabIdx === i ? "2px solid #eaab00" : "2px solid transparent", color: tabIdx === i ? "#eaab00" : "rgba(255,255,255,0.35)", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", transition: "all 0.3s" }}>{tab}</button>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 80px" }}>
            {tabIdx === 0 && <ScheduleTab t={t} />}
            {tabIdx === 1 && <GroupsTab t={t} data={data} />}
            {tabIdx === 2 && <StandingsTab t={t} data={data} />}
            {tabIdx === 3 && <BracketTab t={t} data={data} />}
          </div>
        </>
      )}

      {page === "admin" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 80px" }}>
          {authed ? <AdminPanel t={t} data={data} save={save} /> : <LoginScreen t={t} onLogin={() => setAuthed(true)} />}
        </div>
      )}

      <div style={{ textAlign: "center", padding: "20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p style={{ fontFamily: F, fontSize: 11, color: "rgba(255,255,255,0.15)" }}>{t.footer}</p>
      </div>
    </div>
  );
}

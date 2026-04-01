import { useState } from "react";

const I18N = {
  en: {
    badge: "3-CUSHION BILLIARDS",
    title1: "MASTERS", title2: "TOURNAMENT",
    venue: "Master Club Billiards · Medellín, Colombia",
    date: "April 1, 2026",
    statPlayers: "PLAYERS", statGroups: "GROUPS", statCountries: "COUNTRIES",
    tabs: ["schedule", "groups", "standings", "bracket"],
    techTitle: "Technical Description",
    cfgFormat: "FORMAT", cfgFormatVal: "9 players → 3 groups of 3 → Round Robin",
    cfgGroups: "GROUP STAGE", cfgGroupsVal: "35 points",
    cfgSemis: "SEMIFINALS", cfgSemisVal: "40 points",
    cfgFinal: "FINAL", cfgFinalVal: "40 points",
    cfgTables: "TABLES", cfgTablesVal: "3 simultaneous tables",
    cfgQualify: "QUALIFY", cfgQualifyVal: "1st & 2nd per group + best 3rd places",
    day1: "Day 1 — Group Stage", day1sub: "35 points per match",
    day2: "Day 2 — Knockout Stage", day2sub: "Semis at 40 pts · Final at 40 pts",
    table: "Table",
    groupTitle: "Group", roundRobin: "ROUND ROBIN · 35 PTS",
    matchesLabel: "MATCHES",
    groupsSectionTitle: "Groups", groupsSub: "3 groups of 3 players · Round Robin format",
    standingsTitle: "Overall Standings",
    standingsSub: "Tiebreakers: Points → General Avg → Individual Avg → Best Run → Fewest Innings",
    thPlayer: "PLAYER", thGrp: "GRP", thMp: "MP", thW: "W", thL: "L", thPts: "PTS", thAvg: "AVG",
    pos12: "Pos 1–2", pos12d: "Direct to Semifinals",
    pos36: "Pos 3–6", pos36d: "Play Quarterfinals",
    pos79: "Pos 7–9", pos79d: "Eliminated",
    qf: "Quarterfinals", sf: "Semifinals", gf: "Grand Final",
    qf1Phase: "Quarterfinal 1", qf2Phase: "Quarterfinal 2",
    sf1Phase: "Semifinal 1", sf2Phase: "Semifinal 2", finalPhase: "GRAND FINAL",
    p3rd: "3rd Overall", p6th: "6th Overall", p4th: "4th Overall", p5th: "5th Overall",
    p1st: "1st Overall", p2nd: "2nd Overall", qfWinner: "QF Winner",
    sf1Winner: "SF1 Winner", sf2Winner: "SF2 Winner",
    champion: "CHAMPION", tbd: "To be determined",
    footer: "Masters Tournament 2026 · 3-Cushion Billiards · Master Club Billiards · Medellín, Colombia",
    korea: "KOREA", colombia: "COLOMBIA", italy: "ITALY",
    groupA: "Group A", groupB: "Group B", groupC: "Group C",
  },
  es: {
    badge: "BILLAR 3 BANDAS",
    title1: "TORNEO DE", title2: "MAESTROS",
    venue: "Master Club Billiards · Medellín, Colombia",
    date: "1 de Abril, 2026",
    statPlayers: "JUGADORES", statGroups: "GRUPOS", statCountries: "PAÍSES",
    tabs: ["programa", "grupos", "clasificación", "llaves"],
    techTitle: "Descripción Técnica",
    cfgFormat: "FORMATO", cfgFormatVal: "9 jugadores → 3 grupos de 3 → Round Robin",
    cfgGroups: "FASE DE GRUPOS", cfgGroupsVal: "35 puntos",
    cfgSemis: "SEMIFINALES", cfgSemisVal: "40 puntos",
    cfgFinal: "FINAL", cfgFinalVal: "40 puntos",
    cfgTables: "MESAS", cfgTablesVal: "3 mesas simultáneas",
    cfgQualify: "CLASIFICAN", cfgQualifyVal: "1° y 2° de cada grupo + mejores 3°s",
    day1: "Día 1 — Fase de Grupos", day1sub: "35 puntos por partida",
    day2: "Día 2 — Eliminación Directa", day2sub: "Semis a 40 pts · Final a 40 pts",
    table: "Mesa",
    groupTitle: "Grupo", roundRobin: "ROUND ROBIN · 35 PTS",
    matchesLabel: "PARTIDAS",
    groupsSectionTitle: "Grupos", groupsSub: "3 grupos de 3 jugadores · Formato Round Robin",
    standingsTitle: "Clasificación General",
    standingsSub: "Desempate: Puntos → Promedio Gral → Promedio Indiv → Mayor Serie → Menor Entradas",
    thPlayer: "JUGADOR", thGrp: "GRP", thMp: "PJ", thW: "PG", thL: "PP", thPts: "PTS", thAvg: "PROM",
    pos12: "Pos 1–2", pos12d: "Directo a Semifinales",
    pos36: "Pos 3–6", pos36d: "Juegan Cuartos",
    pos79: "Pos 7–9", pos79d: "Eliminados",
    qf: "Cuartos de Final", sf: "Semifinales", gf: "Gran Final",
    qf1Phase: "Cuartos 1", qf2Phase: "Cuartos 2",
    sf1Phase: "Semifinal 1", sf2Phase: "Semifinal 2", finalPhase: "GRAN FINAL",
    p3rd: "3° Clasificación", p6th: "6° Clasificación", p4th: "4° Clasificación", p5th: "5° Clasificación",
    p1st: "1° General", p2nd: "2° General", qfWinner: "Ganador CF",
    sf1Winner: "Ganador SF1", sf2Winner: "Ganador SF2",
    champion: "CAMPEÓN", tbd: "Por definir",
    footer: "Torneo de Maestros 2026 · Billar 3 Bandas · Master Club Billiards · Medellín, Colombia",
    korea: "COREA", colombia: "COLOMBIA", italy: "ITALIA",
    groupA: "Grupo A", groupB: "Grupo B", groupC: "Grupo C",
  },
  ko: {
    badge: "3쿠션 당구",
    title1: "마스터즈", title2: "토너먼트",
    venue: "마스터 클럽 당구장 · 메데진, 콜롬비아",
    date: "2026년 4월 1일",
    statPlayers: "선수", statGroups: "조", statCountries: "국가",
    tabs: ["일정", "조편성", "순위", "대진표"],
    techTitle: "기술 설명",
    cfgFormat: "형식", cfgFormatVal: "9명 → 3조 × 3명 → 라운드 로빈",
    cfgGroups: "조별 리그", cfgGroupsVal: "35점",
    cfgSemis: "준결승", cfgSemisVal: "40점",
    cfgFinal: "결승", cfgFinalVal: "40점",
    cfgTables: "테이블", cfgTablesVal: "3대 동시 진행",
    cfgQualify: "본선 진출", cfgQualifyVal: "각 조 1·2위 + 최우수 3위",
    day1: "1일차 — 조별 리그", day1sub: "경기당 35점",
    day2: "2일차 — 토너먼트", day2sub: "준결승 40점 · 결승 40점",
    table: "테이블",
    groupTitle: "조", roundRobin: "라운드 로빈 · 35점",
    matchesLabel: "경기",
    groupsSectionTitle: "조편성", groupsSub: "3조 × 3명 · 라운드 로빈 형식",
    standingsTitle: "종합 순위",
    standingsSub: "동점 처리: 승점 → 종합 평균 → 개인 평균 → 최고 연속 → 최소 이닝",
    thPlayer: "선수", thGrp: "조", thMp: "경기", thW: "승", thL: "패", thPts: "승점", thAvg: "평균",
    pos12: "1–2위", pos12d: "준결승 직행",
    pos36: "3–6위", pos36d: "8강전 진출",
    pos79: "7–9위", pos79d: "탈락",
    qf: "8강전", sf: "준결승", gf: "결승전",
    qf1Phase: "8강 1", qf2Phase: "8강 2",
    sf1Phase: "준결승 1", sf2Phase: "준결승 2", finalPhase: "결승전",
    p3rd: "종합 3위", p6th: "종합 6위", p4th: "종합 4위", p5th: "종합 5위",
    p1st: "종합 1위", p2nd: "종합 2위", qfWinner: "8강 승자",
    sf1Winner: "준결승1 승자", sf2Winner: "준결승2 승자",
    champion: "챔피언", tbd: "미정",
    footer: "마스터즈 토너먼트 2026 · 3쿠션 당구 · 마스터 클럽 당구장 · 메데진, 콜롬비아",
    korea: "한국", colombia: "콜롬비아", italy: "이탈리아",
    groupA: "A조", groupB: "B조", groupC: "C조",
  },
};

const LANGS = [
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "es", flag: "🇨🇴", label: "ES" },
  { code: "ko", flag: "🇰🇷", label: "KO" },
];

const PLAYERS = {
  A: [
    { name: "JUNGHAN HEO", countryKey: "korea", flag: "🇰🇷" },
    { name: "ALEJANDRO PIZA", countryKey: "colombia", flag: "🇨🇴" },
    { name: "ALEXANDER MUÑOZ", countryKey: "colombia", flag: "🇨🇴" },
  ],
  B: [
    { name: "MYUNWOO CHO", countryKey: "korea", flag: "🇰🇷" },
    { name: "ALEXANDER SALAZAR", countryKey: "colombia", flag: "🇨🇴" },
    { name: "ARLEY MONTOYA", countryKey: "colombia", flag: "🇨🇴" },
  ],
  C: [
    { name: "MARCO ZANETTI", countryKey: "italy", flag: "🇮🇹" },
    { name: "JOSE JUAN GARCIA", countryKey: "colombia", flag: "🇨🇴" },
    { name: "HUBERNEY CATAÑO", countryKey: "colombia", flag: "🇨🇴" },
  ],
};

const GROUP_COLORS = { A: "#10b981", B: "#3b82f6", C: "#ef4444" };
const MATCHES = [{ p1: 0, p2: 1 }, { p1: 0, p2: 2 }, { p1: 1, p2: 2 }];

const F = "'DM Sans', sans-serif";
const FD = "'Playfair Display', serif";
const FM = "'DM Mono', monospace";

function DiamondIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
    </svg>
  );
}

function LangSwitcher({ lang, setLang }) {
  return (
    <div style={{
      position: "absolute", top: 20, right: 20, zIndex: 10,
      display: "flex", gap: 4, padding: 3, borderRadius: 10,
      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
    }}>
      {LANGS.map((l) => (
        <button key={l.code} onClick={() => setLang(l.code)} style={{
          padding: "6px 10px", border: "none", borderRadius: 8, cursor: "pointer",
          background: lang === l.code ? "rgba(234,171,0,0.2)" : "transparent",
          color: lang === l.code ? "#eaab00" : "rgba(255,255,255,0.4)",
          fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
          transition: "all 0.2s",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <span style={{ fontSize: 14 }}>{l.flag}</span>
          {l.label}
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
      {subtitle && (
        <p style={{ fontFamily: F, fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "6px 0 0 28px" }}>{subtitle}</p>
      )}
    </div>
  );
}

function HeroSection({ t, lang, setLang }) {
  return (
    <div style={{
      position: "relative", overflow: "hidden", padding: "80px 20px 60px",
      background: "linear-gradient(135deg, #0a0f1a 0%, #0f1729 40%, #1a1a2e 70%, #0a0f1a 100%)",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div style={{ position: "absolute", top: "-50%", left: "-20%", width: 600, height: 600, background: "radial-gradient(circle, rgba(234,171,0,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: "-40%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
      <LangSwitcher lang={lang} setLang={setLang} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 20px", borderRadius: 100,
          background: "rgba(234,171,0,0.1)", border: "1px solid rgba(234,171,0,0.25)",
          marginBottom: 24, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#eaab00", fontFamily: F,
        }}>
          <DiamondIcon size={14} />
          {t.badge}
        </div>
        <h1 style={{ fontFamily: FD, fontWeight: 900, fontSize: "clamp(2.2rem, 6vw, 4.5rem)", lineHeight: 1.05, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
          {t.title1}<br />
          <span style={{ background: "linear-gradient(135deg, #eaab00, #e87722, #eaab00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.title2}</span>
        </h1>
        <p style={{ fontFamily: F, fontSize: "clamp(0.85rem, 2vw, 1.05rem)", color: "rgba(255,255,255,0.45)", margin: "0 0 12px", lineHeight: 1.5, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          {t.venue}
        </p>
        <p style={{ fontFamily: FM, fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "0 0 36px", letterSpacing: "0.08em" }}>
          {t.date}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {[{ n: "9", l: t.statPlayers }, { n: "3", l: t.statGroups }, { n: "3", l: t.statCountries }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FD, fontSize: 40, fontWeight: 900, color: "#eaab00", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", fontWeight: 600, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScheduleTab({ t }) {
  const config = [
    { label: t.cfgFormat, value: t.cfgFormatVal },
    { label: t.cfgGroups, value: t.cfgGroupsVal },
    { label: t.cfgSemis, value: t.cfgSemisVal },
    { label: t.cfgFinal, value: t.cfgFinalVal },
    { label: t.cfgTables, value: t.cfgTablesVal },
    { label: t.cfgQualify, value: t.cfgQualifyVal },
  ];
  const schedule = [
    { time: "09:00", phase: `${t.groupTitle} A · M1`, mesa: `${t.table} 1`, p1: "JUNGHAN HEO", p2: "ALEJANDRO PIZA", group: "A" },
    { time: "09:00", phase: `${t.groupTitle} B · M1`, mesa: `${t.table} 2`, p1: "MYUNWOO CHO", p2: "ALEXANDER SALAZAR", group: "B" },
    { time: "09:00", phase: `${t.groupTitle} C · M1`, mesa: `${t.table} 3`, p1: "MARCO ZANETTI", p2: "JOSE JUAN GARCIA", group: "C" },
    { time: "11:00", phase: `${t.groupTitle} A · M2`, mesa: `${t.table} 1`, p1: "JUNGHAN HEO", p2: "ALEXANDER MUÑOZ", group: "A" },
    { time: "11:00", phase: `${t.groupTitle} B · M2`, mesa: `${t.table} 2`, p1: "MYUNWOO CHO", p2: "ARLEY MONTOYA", group: "B" },
    { time: "11:00", phase: `${t.groupTitle} C · M2`, mesa: `${t.table} 3`, p1: "MARCO ZANETTI", p2: "HUBERNEY CATAÑO", group: "C" },
    { time: "14:00", phase: `${t.groupTitle} A · M3`, mesa: `${t.table} 1`, p1: "ALEJANDRO PIZA", p2: "ALEXANDER MUÑOZ", group: "A" },
    { time: "14:00", phase: `${t.groupTitle} B · M3`, mesa: `${t.table} 2`, p1: "ALEXANDER SALAZAR", p2: "ARLEY MONTOYA", group: "B" },
    { time: "14:00", phase: `${t.groupTitle} C · M3`, mesa: `${t.table} 3`, p1: "JOSE JUAN GARCIA", p2: "HUBERNEY CATAÑO", group: "C" },
  ];
  const knockout = [
    { time: "09:00", phase: t.qf1Phase, mesa: `${t.table} 1`, p1: t.p3rd, p2: t.p6th, type: "QF" },
    { time: "09:00", phase: t.qf2Phase, mesa: `${t.table} 2`, p1: t.p4th, p2: t.p5th, type: "QF" },
    { time: "11:00", phase: t.sf1Phase, mesa: `${t.table} 1`, p1: t.p1st, p2: t.qfWinner, type: "SF" },
    { time: "11:00", phase: t.sf2Phase, mesa: `${t.table} 2`, p1: t.p2nd, p2: t.qfWinner, type: "SF" },
    { time: "14:00", phase: t.finalPhase, mesa: `${t.table} 1`, p1: t.sf1Winner, p2: t.sf2Winner, type: "F" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div>
        <SectionTitle icon="⚙" title={t.techTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginTop: 16 }}>
          {config.map((c, i) => (
            <div key={i} style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontFamily: F, fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle icon="📋" title={t.day1} subtitle={t.day1sub} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
          {schedule.map((s, i) => {
            const c = GROUP_COLORS[s.group];
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", alignItems: "center", gap: 16, padding: "12px 20px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontFamily: FM, fontSize: 13, fontWeight: 600, color: c }}>{s.time}</div>
                <div>
                  <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>
                    <span style={{ color: c, marginRight: 8, fontSize: 11 }}>●</span>{s.p1}
                    <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 10px", fontSize: 11 }}>vs</span>{s.p2}
                  </div>
                  <div style={{ fontFamily: F, fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{s.phase}</div>
                </div>
                <div style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.2)", fontWeight: 600 }}>{s.mesa}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <SectionTitle icon="🏆" title={t.day2} subtitle={t.day2sub} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
          {knockout.map((s, i) => {
            const cm = { QF: "#a855f7", SF: "#3b82f6", F: "#eaab00" };
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", alignItems: "center", gap: 16, padding: "14px 20px", borderRadius: 12, background: s.type === "F" ? "linear-gradient(135deg, rgba(234,171,0,0.1), rgba(232,119,34,0.08))" : "rgba(255,255,255,0.02)", border: `1px solid ${s.type === "F" ? "rgba(234,171,0,0.2)" : "rgba(255,255,255,0.05)"}` }}>
                <div style={{ fontFamily: FM, fontSize: 13, fontWeight: 600, color: cm[s.type] }}>{s.time}</div>
                <div>
                  <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: s.type === "F" ? "#eaab00" : "rgba(255,255,255,0.85)" }}>{s.phase}</div>
                  <div style={{ fontFamily: F, fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{s.p1} vs {s.p2}</div>
                </div>
                <div style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.25)", fontWeight: 600 }}>{s.mesa}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GroupsTab({ t }) {
  return (
    <div>
      <SectionTitle icon="🎯" title={t.groupsSectionTitle} subtitle={t.groupsSub} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginTop: 20 }}>
        {Object.entries(PLAYERS).map(([key, players]) => {
          const c = GROUP_COLORS[key];
          const gLabel = t[`group${key}`] || `${t.groupTitle} ${key}`;
          return (
            <div key={key} style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${c}25`, background: `linear-gradient(160deg, ${c}0a 0%, ${c}03 100%)` }}>
              <div style={{ padding: "20px 24px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${c}15` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c}20`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontSize: 18, fontWeight: 900, color: c }}>{key}</div>
                <div>
                  <div style={{ fontFamily: FD, fontSize: 18, fontWeight: 800, color: "white" }}>{gLabel}</div>
                  <div style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{t.roundRobin}</div>
                </div>
              </div>
              <div style={{ padding: "16px 24px" }}>
                {players.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < players.length - 1 ? `1px solid ${c}0c` : "none" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${c}18`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontSize: 11, fontWeight: 800, color: c }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{p.name}</div>
                      <div style={{ fontFamily: F, fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{p.flag} {t[p.countryKey]}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "0 24px 20px" }}>
                <div style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.14em", marginBottom: 10 }}>{t.matchesLabel}</div>
                {MATCHES.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 14px", borderRadius: 10, background: `${c}08`, marginBottom: i < 2 ? 6 : 0 }}>
                    <div style={{ flex: 1, fontFamily: F, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{players[m.p1].name}</div>
                    <div style={{ width: 36, height: 22, borderRadius: 6, background: `${c}20`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontSize: 9, fontWeight: 800, color: c, letterSpacing: "0.1em" }}>VS</div>
                    <div style={{ flex: 1, fontFamily: F, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", textAlign: "right" }}>{players[m.p2].name}</div>
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

function StandingsTab({ t }) {
  const allPlayers = Object.entries(PLAYERS).flatMap(([key, ps]) => ps.map((p) => ({ ...p, group: key, color: GROUP_COLORS[key] })));
  const headers = ["#", t.thPlayer, t.thGrp, t.thMp, t.thW, t.thL, t.thPts, t.thAvg];

  return (
    <div>
      <SectionTitle icon="📊" title={t.standingsTitle} subtitle={t.standingsSub} />
      <div style={{ marginTop: 20, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {headers.map((h, i) => (
                  <th key={i} style={{ padding: "14px", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textAlign: i < 2 ? "left" : "center", whiteSpace: "nowrap", background: "rgba(255,255,255,0.04)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPlayers.map((p, i) => {
                const isSemi = i < 2;
                const isQF = i >= 2 && i < 6;
                let rowBg = "rgba(255,255,255,0.015)";
                if (isSemi) rowBg = "rgba(234,171,0,0.08)";
                else if (isQF) rowBg = "rgba(255,255,255,0.035)";
                return (
                  <tr key={i} style={{ background: rowBg, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "14px", fontSize: 15, fontWeight: 800, width: 40, color: isSemi ? "#eaab00" : isQF ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)" }}>{i + 1}</td>
                    <td style={{ padding: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 18 }}>{p.flag}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{p.name}</div>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{t[p.countryKey]}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px", textAlign: "center" }}>
                      <span style={{ padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, background: `${p.color}18`, color: p.color }}>{p.group}</span>
                    </td>
                    {["2", "—", "—", "—", "—"].map((v, j) => (
                      <td key={j} style={{ padding: "14px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.35)", fontFamily: FM }}>{v}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        {[
          { label: t.pos12, desc: t.pos12d, color: "#eaab00", bg: "rgba(234,171,0,0.08)" },
          { label: t.pos36, desc: t.pos36d, color: "rgba(255,255,255,0.6)", bg: "rgba(255,255,255,0.04)" },
          { label: t.pos79, desc: t.pos79d, color: "rgba(255,255,255,0.25)", bg: "rgba(255,255,255,0.02)" },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, minWidth: 160, padding: "10px 14px", borderRadius: 10, background: item.bg, border: `1px solid ${item.color}20` }}>
            <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: item.color }}>{item.label}: </span>
            <span style={{ fontFamily: F, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BracketTab({ t }) {
  const rounds = [
    { title: t.qf, matches: [{ p1: t.p3rd, p2: t.p6th, pts: 35 }, { p1: t.p4th, p2: t.p5th, pts: 35 }], color: "#a855f7" },
    { title: t.sf, matches: [{ p1: t.p1st, p2: t.qfWinner, pts: 40 }, { p1: t.p2nd, p2: t.qfWinner, pts: 40 }], color: "#3b82f6" },
    { title: t.gf, matches: [{ p1: t.sf1Winner, p2: t.sf2Winner, pts: 40 }], color: "#eaab00" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      {rounds.map((round, ri) => {
        const isFinal = ri === 2;
        return (
          <div key={ri}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: round.color, boxShadow: `0 0 12px ${round.color}60` }} />
              <h3 style={{ fontFamily: FD, fontSize: 20, fontWeight: 800, color: "white", margin: 0 }}>{round.title}</h3>
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: round.color, letterSpacing: "0.1em", padding: "3px 10px", borderRadius: 100, background: `${round.color}15` }}>{round.matches[0].pts} PTS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {round.matches.map((m, mi) => (
                <div key={mi} style={{ borderRadius: 14, overflow: "hidden", border: isFinal ? "1px solid rgba(234,171,0,0.25)" : "1px solid rgba(255,255,255,0.06)", background: isFinal ? "linear-gradient(135deg, rgba(234,171,0,0.08), rgba(232,119,34,0.04))" : "rgba(255,255,255,0.02)" }}>
                  <div style={{ display: "flex", alignItems: "stretch" }}>
                    <div style={{ flex: 1, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{m.p1}</span>
                    </div>
                    <div style={{ width: 50, display: "flex", alignItems: "center", justifyContent: "center", background: `${round.color}12` }}>
                      <span style={{ fontFamily: F, fontSize: 10, fontWeight: 800, color: round.color, letterSpacing: "0.15em" }}>VS</span>
                    </div>
                    <div style={{ flex: 1, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{m.p2}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div style={{ textAlign: "center", padding: "32px 20px", borderRadius: 16, background: "linear-gradient(135deg, rgba(234,171,0,0.08), rgba(232,119,34,0.04))", border: "1px solid rgba(234,171,0,0.15)" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
        <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", marginBottom: 8 }}>{t.champion}</div>
        <div style={{ fontFamily: FD, fontSize: 24, fontWeight: 900, background: "linear-gradient(135deg, #eaab00, #e87722)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.tbd}</div>
      </div>
    </div>
  );
}

export default function TorneoMaestros() {
  const [lang, setLang] = useState("en");
  const [tabIdx, setTabIdx] = useState(0);
  const t = I18N[lang];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1a", color: "white" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <HeroSection t={t} lang={lang} setLang={setLang} />
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(10,15,26,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", padding: "0 20px" }}>
          {t.tabs.map((tab, i) => (
            <button key={tab} onClick={() => setTabIdx(i)} style={{
              flex: 1, padding: "14px 8px", border: "none", cursor: "pointer", background: "transparent",
              borderBottom: tabIdx === i ? "2px solid #eaab00" : "2px solid transparent",
              color: tabIdx === i ? "#eaab00" : "rgba(255,255,255,0.35)",
              fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", transition: "all 0.3s ease",
            }}>{tab}</button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 80px" }}>
        {tabIdx === 0 && <ScheduleTab t={t} />}
        {tabIdx === 1 && <GroupsTab t={t} />}
        {tabIdx === 2 && <StandingsTab t={t} />}
        {tabIdx === 3 && <BracketTab t={t} />}
      </div>
      <div style={{ textAlign: "center", padding: "20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p style={{ fontFamily: F, fontSize: 11, color: "rgba(255,255,255,0.15)" }}>{t.footer}</p>
      </div>
    </div>
  );
}

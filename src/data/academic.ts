// Data contoh. Ganti dengan pemanggilan `api` (src/api) saat endpoint backend siap.
export type Course = {
  code: string; name: string; sks: number; lecturer: string; room: string;
  day: 1 | 2 | 3 | 4 | 5; start: string; end: string;
};
export type AttendanceStatus = 'Hadir' | 'Izin' | 'Sakit' | 'Alpa';

export const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'] as const;
export const MEETINGS_TOTAL = 16;
export const PASS_RATE = 75;

export const courses: Course[] = [
  { code: 'IF301', name: 'Basis Data', sks: 3, lecturer: 'Dr. Rina Kusuma', room: 'Ruang B-204', day: 1, start: '08:00', end: '10:30' },
  { code: 'IF302', name: 'Pemrograman Web', sks: 3, lecturer: 'Ir. Hendra Wijaya', room: 'Lab Komputer 2', day: 1, start: '13:00', end: '15:30' },
  { code: 'IF303', name: 'Jaringan Komputer', sks: 3, lecturer: 'Dr. Maya Sari', room: 'Ruang B-301', day: 2, start: '10:00', end: '12:30' },
  { code: 'IF304', name: 'Kecerdasan Buatan', sks: 3, lecturer: 'Prof. Budi Santoso', room: 'Ruang C-102', day: 3, start: '08:00', end: '10:30' },
  { code: 'IF305', name: 'Interaksi Manusia dan Komputer', sks: 2, lecturer: 'Dewi Lestari, M.Kom.', room: 'Ruang C-205', day: 4, start: '13:00', end: '14:40' },
  { code: 'UM301', name: 'Kewirausahaan Digital', sks: 2, lecturer: 'Andi Pratama, M.M.', room: 'Ruang A-101', day: 5, start: '09:00', end: '10:40' },
];

type Score = { tugas: number; kuis: number; uts: number; uas: number };
export const scores: Record<string, Score> = {
  IF301: { tugas: 88, kuis: 90, uts: 82, uas: 86 },
  IF302: { tugas: 92, kuis: 95, uts: 88, uas: 90 },
  IF303: { tugas: 78, kuis: 70, uts: 72, uas: 75 },
  IF304: { tugas: 85, kuis: 80, uts: 78, uas: 82 },
  IF305: { tugas: 90, kuis: 85, uts: 84, uas: 88 },
  UM301: { tugas: 82, kuis: 88, uts: 80, uas: 85 },
};

export const finalScore = (s: Score) => s.tugas * 0.2 + s.kuis * 0.1 + s.uts * 0.3 + s.uas * 0.4;

const GRADES: [number, string, number][] = [
  [85, 'A', 4], [80, 'A-', 3.7], [75, 'B+', 3.3], [70, 'B', 3], [65, 'B-', 2.7],
  [60, 'C+', 2.3], [55, 'C', 2], [40, 'D', 1], [0, 'E', 0],
];
export const toGrade = (n: number) => {
  const [, letter, point] = GRADES.find(([min]) => n >= min)!;
  return { letter, point };
};

export const totalSks = courses.reduce((a, c) => a + c.sks, 0);
export const ips = courses.reduce((a, c) => a + toGrade(finalScore(scores[c.code])).point * c.sks, 0) / totalSks;
export const ipk = 3.58;
export const ipsHistory = [
  { sem: 'Smt 1', ips: 3.42 }, { sem: 'Smt 2', ips: 3.55 }, { sem: 'Smt 3', ips: 3.61 },
  { sem: 'Smt 4', ips: 3.58 }, { sem: 'Smt 5', ips: 3.72 },
];

export const attendance: Record<string, { held: number; hadir: number; izin: number; sakit: number; alpa: number }> = {
  IF301: { held: 12, hadir: 12, izin: 0, sakit: 0, alpa: 0 },
  IF302: { held: 12, hadir: 11, izin: 1, sakit: 0, alpa: 0 },
  IF303: { held: 12, hadir: 9, izin: 0, sakit: 1, alpa: 2 },
  IF304: { held: 12, hadir: 10, izin: 1, sakit: 0, alpa: 1 },
  IF305: { held: 12, hadir: 12, izin: 0, sakit: 0, alpa: 0 },
  UM301: { held: 12, hadir: 8, izin: 2, sakit: 1, alpa: 1 },
};
export const rate = (a: { held: number; hadir: number }) => Math.round((a.hadir / a.held) * 100);
const all = Object.values(attendance);
export const attendanceRate = Math.round((all.reduce((s, a) => s + a.hadir, 0) / all.reduce((s, a) => s + a.held, 0)) * 100);

export const attendanceLog: { date: string; code: string; meeting: number; status: AttendanceStatus }[] = [
  { date: '2026-11-12', code: 'IF305', meeting: 12, status: 'Hadir' },
  { date: '2026-11-11', code: 'IF304', meeting: 12, status: 'Hadir' },
  { date: '2026-11-10', code: 'IF303', meeting: 12, status: 'Alpa' },
  { date: '2026-11-09', code: 'IF302', meeting: 12, status: 'Hadir' },
  { date: '2026-11-09', code: 'IF301', meeting: 12, status: 'Hadir' },
  { date: '2026-11-06', code: 'UM301', meeting: 12, status: 'Hadir' },
  { date: '2026-11-05', code: 'IF305', meeting: 11, status: 'Hadir' },
  { date: '2026-11-04', code: 'IF304', meeting: 11, status: 'Izin' },
  { date: '2026-11-03', code: 'IF303', meeting: 11, status: 'Hadir' },
  { date: '2026-11-02', code: 'IF302', meeting: 11, status: 'Hadir' },
];

export const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
export const courseByCode = (code: string) => courses.find((c) => c.code === code)!;

export function nextClass(now: Date) {
  const nowMin = now.getHours() * 60 + now.getMinutes();
  for (let o = 0; o < 7; o++) {
    const d = (now.getDay() + o) % 7;
    const list = courses
      .filter((c) => c.day === d && (o > 0 || toMin(c.end) > nowMin))
      .sort((a, b) => toMin(a.start) - toMin(b.start));
    if (list.length) return { course: list[0], label: o === 0 ? 'Hari ini' : o === 1 ? 'Besok' : DAYS[d - 1] };
  }
  return null;
}

import { useState } from 'react';
import { PageHeader, Panel, Stats } from '@src/components/features/AcademicParts';
import { PASS_RATE, attendance, attendanceLog, attendanceRate, courseByCode, courses, rate, type AttendanceStatus } from '@src/data/academic';

const statusTone: Record<AttendanceStatus, string> = {
  Hadir: 'bg-accent text-accent-foreground',
  Izin: 'bg-muted text-muted-foreground',
  Sakit: 'bg-muted text-muted-foreground',
  Alpa: 'bg-destructive/10 text-destructive',
};

export default function AbsencePage() {
  const [filter, setFilter] = useState('all');
  const [code, setCode] = useState('');
  const [done, setDone] = useState(false);
  const all = Object.values(attendance);
  const sum = (k: 'hadir' | 'izin' | 'sakit' | 'alpa') => all.reduce((s, a) => s + a[k], 0);
  const log = attendanceLog.filter((l) => filter === 'all' || l.code === filter);

  return (
    <div className="space-y-6">
      <PageHeader title="Presensi" desc="Kehadiran minimal 75% untuk mengikuti ujian akhir." />

      <Stats items={[
        { label: 'Kehadiran', value: `${attendanceRate}%` },
        { label: 'Hadir', value: String(sum('hadir')) },
        { label: 'Izin dan sakit', value: String(sum('izin') + sum('sakit')) },
        { label: 'Alpa', value: String(sum('alpa')) },
      ]} />

      <Panel title="Isi presensi">
        {done ? (
          <p className="text-sm text-primary">Presensi Pemrograman Web pertemuan 13 tercatat.</p>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (code.trim()) setDone(true); }}
            className="flex flex-wrap items-center gap-3"
          >
            <p className="mr-auto text-sm text-muted-foreground">Pemrograman Web, pertemuan 13. Masukkan kode dari dosen.</p>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Kode presensi"
              className="h-9 w-44 rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <button type="submit" className="h-9 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Kirim kode
            </button>
          </form>
        )}
      </Panel>

      <Panel title="Kehadiran per mata kuliah">
        <ul className="space-y-5">
          {courses.map((c) => {
            const a = attendance[c.code];
            const r = rate(a);
            const risk = r < PASS_RATE;
            return (
              <li key={c.code}>
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <p className="font-medium">{c.name}</p>
                  <p className={`text-sm tabular-nums ${risk ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {risk ? 'Di bawah batas, ' : ''}{r}% ({a.hadir} dari {a.held} pertemuan)
                  </p>
                </div>
                <div className="relative h-1.5 rounded-full bg-muted">
                  <div className={`h-full rounded-full ${risk ? 'bg-destructive' : 'bg-primary'}`} style={{ width: `${r}%` }} />
                  <div className="absolute -top-1 h-3.5 w-px bg-foreground/40" style={{ left: `${PASS_RATE}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>

      <Panel
        title="Riwayat"
        action={
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter mata kuliah"
            className="h-8 rounded-lg border bg-background px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="all">Semua mata kuliah</option>
            {courses.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        }
      >
        <ul className="divide-y">
          {log.map((l) => (
            <li key={`${l.date}-${l.code}`} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <div>
                <p className="font-medium">{courseByCode(l.code).name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(l.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}, pertemuan {l.meeting}
                </p>
              </div>
              <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${statusTone[l.status]}`}>{l.status}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

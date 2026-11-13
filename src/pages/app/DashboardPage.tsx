import { useState } from 'react';
import { Link } from 'react-router';
import { Clock, MapPin, User } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useAuth } from '@src/contexts/AuthContext';
import { Panel, Stats } from '@src/components/features/AcademicParts';
import { attendanceRate, courses, ipk, ipsHistory, nextClass, toMin, totalSks } from '@src/data/academic';

export default function DashboardPage() {
  const { user } = useAuth();
  const [now] = useState(() => new Date());
  const name = (user?.email.split('@')[0] ?? 'Mahasiswa').replace(/^./, (c) => c.toUpperCase());
  const next = nextClass(now);
  const today = courses.filter((c) => c.day === now.getDay()).sort((a, b) => toMin(a.start) - toMin(b.start));
  const date = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Halo, {name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{date}</p>
      </div>

      <section className="rounded-2xl bg-primary p-6 text-primary-foreground md:p-8">
        {next ? (
          <>
            <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm">Kelas berikutnya: {next.label}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{next.course.name}</h2>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/85">
              <span className="inline-flex items-center gap-2"><Clock className="size-4" />{next.course.start} sampai {next.course.end}</span>
              <span className="inline-flex items-center gap-2"><MapPin className="size-4" />{next.course.room}</span>
              <span className="inline-flex items-center gap-2"><User className="size-4" />{next.course.lecturer}</span>
            </div>
            <Link to="/schedule" className="mt-6 inline-flex h-9 items-center rounded-lg bg-white px-4 text-sm font-medium text-primary hover:bg-white/90">
              Lihat jadwal
            </Link>
          </>
        ) : (
          <p className="text-lg">Tidak ada kelas pekan ini.</p>
        )}
      </section>

      <Stats items={[
        { label: 'IPK', value: ipk.toFixed(2) },
        { label: 'SKS semester ini', value: String(totalSks) },
        { label: 'Kehadiran', value: `${attendanceRate}%`, hint: 'Batas minimal 75%' },
        { label: 'Mata kuliah', value: String(courses.length) },
      ]} />

      <div className="grid gap-6 lg:grid-cols-5">
        <Panel title="Perkembangan IPS" className="lg:col-span-3">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={ipsHistory} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="sem" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis domain={[3, 4]} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="ips" name="IPS" stroke="var(--primary)" strokeWidth={2} fill="var(--primary)" fillOpacity={0.08} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Jadwal hari ini" className="lg:col-span-2">
          {today.length ? (
            <ul className="divide-y">
              {today.map((c) => (
                <li key={c.code} className="py-3 first:pt-0 last:pb-0">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.start} sampai {c.end}, {c.room}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Tidak ada kelas hari ini.</p>
          )}
        </Panel>
      </div>
    </div>
  );
}

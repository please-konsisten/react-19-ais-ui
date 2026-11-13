import { LetterBadge, PageHeader, Stats } from '@src/components/features/AcademicParts';
import { courses, finalScore, ipk, ips, scores, toGrade, totalSks } from '@src/data/academic';

export default function ScorePage() {
  return (
    <div>
      <PageHeader title="Nilai" desc="Semester Ganjil 2026/2027" />
      <Stats items={[
        { label: 'IPS sementara', value: ips.toFixed(2) },
        { label: 'IPK', value: ipk.toFixed(2) },
        { label: 'SKS semester ini', value: String(totalSks) },
        { label: 'Mata kuliah', value: String(courses.length) },
      ]} />

      <div className="mt-6 overflow-x-auto rounded-2xl border bg-card">
        <table className="w-full min-w-176 text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Mata kuliah</th>
              <th className="px-3 py-3 text-center font-medium">SKS</th>
              <th className="px-3 py-3 text-right font-medium">Tugas</th>
              <th className="px-3 py-3 text-right font-medium">Kuis</th>
              <th className="px-3 py-3 text-right font-medium">UTS</th>
              <th className="px-3 py-3 text-right font-medium">UAS</th>
              <th className="px-3 py-3 text-right font-medium">Akhir</th>
              <th className="px-5 py-3 text-right font-medium">Nilai</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {courses.map((c) => {
              const s = scores[c.code];
              const final = finalScore(s);
              return (
                <tr key={c.code} className="border-b last:border-0 hover:bg-accent/40">
                  <td className="px-5 py-4">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.code}</p>
                  </td>
                  <td className="px-3 py-4 text-center">{c.sks}</td>
                  <td className="px-3 py-4 text-right">{s.tugas}</td>
                  <td className="px-3 py-4 text-right">{s.kuis}</td>
                  <td className="px-3 py-4 text-right">{s.uts}</td>
                  <td className="px-3 py-4 text-right">{s.uas}</td>
                  <td className="px-3 py-4 text-right font-medium">{final.toFixed(1)}</td>
                  <td className="px-5 py-4 text-right"><LetterBadge letter={toGrade(final).letter} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Bobot: tugas 20%, kuis 10%, UTS 30%, UAS 40%.</p>
    </div>
  );
}

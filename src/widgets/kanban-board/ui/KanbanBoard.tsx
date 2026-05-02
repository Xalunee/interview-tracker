import { STAGES_ORDERED } from '@/entities/company';
import { getKanbanData } from '../model/getKanbanData';
import { KanbanColumn } from './KanbanColumn';

type Props = {
  userId: string;
};

export async function KanbanBoard({ userId }: Props) {
  const data = await getKanbanData(userId);

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        overflowX: 'auto',
        height: '100%',
        paddingBottom: 16,
      }}
    >
      {STAGES_ORDERED.map((stage) => (
        <KanbanColumn
          key={stage.value}
          status={stage.value}
          label={stage.label}
          bgVar={stage.bgVar}
          textVar={stage.textVar}
          companies={data[stage.value]}
        />
      ))}
    </div>
  );
}

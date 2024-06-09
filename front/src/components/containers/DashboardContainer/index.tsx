import Header from '@/components/headers';
import Task from '@/components/tasks';
import { tasks } from '@/mocks/task';
import * as S from './styles';
export default function DashboardContainer() {
  return (
    <>
      <Header />
      <S.Main className="container-main">
        <Task tasks={tasks} />
      </S.Main>
    </>
  );
}

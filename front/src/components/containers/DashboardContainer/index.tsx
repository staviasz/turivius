import TaskForm from '@/components/forms/TaskForm';
import Header from '@/components/headers';
import PopUp from '@/components/popUp';
import Task from '@/components/tasks';
import { tasks } from '@/mocks/task';
import * as S from './styles';
export default function DashboardContainer() {
  const teste = false;
  return (
    <>
      {teste && (
        <PopUp>
          <TaskForm />
        </PopUp>
      )}
      <Header />
      <S.Main className="container-main">
        <Task tasks={tasks} />
      </S.Main>
    </>
  );
}

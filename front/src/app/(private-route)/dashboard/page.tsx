import DashboardContainer from '@/components/containers/DashboardContainer';
import { TaskProvider } from '@/providers/taskProvider';

export default async function DashboardPage() {
  // const response = await makeGetTask();
  // const { body } = response;
  // console.log(body);

  return (
    <TaskProvider>
      <DashboardContainer />
    </TaskProvider>
  );
}

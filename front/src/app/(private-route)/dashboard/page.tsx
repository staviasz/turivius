import DashboardContainer from '@/components/containers/DashboardContainer';
import { TaskProvider } from '@/providers/taskProvider';

export default async function DashboardPage() {
  return (
    <TaskProvider>
      <DashboardContainer />
    </TaskProvider>
  );
}

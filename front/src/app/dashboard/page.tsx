import DashboardContainer from '@/components/containers/DashboardContainer';
import { tasks } from '@/mocks/task';
import { TaskProvider } from '@/providers/taskProvider';

export default function DashboardPage() {
  return (
    <TaskProvider>
      <DashboardContainer tasks={tasks} />
    </TaskProvider>
  );
}

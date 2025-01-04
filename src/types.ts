export interface ITask {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    isCompleted: boolean;
}
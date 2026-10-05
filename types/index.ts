export interface Task {
    id: string;
    name: string;
    completed: boolean;
    status: 'pending' | 'in-progress' | 'completed';
    editMode?: boolean; // Optional property to track edit mode
}


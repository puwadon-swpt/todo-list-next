export type Task = {
    id: string
    title: string
    description: string
    priority: 'high' | 'normal'
    is_done: boolean
  }
  
  export const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Buy Presents',
      description: 'Go and get Christmas presents for Lana and Sandra Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      priority: 'high',
      is_done: false,
    },
    {
      id: '2',
      title: 'Go To The Store',
      description: 'Eggs, bacon, milk, frozen yogurt, sweets',
      priority: 'high',
      is_done: false,
    },
    {
      id: '3',
      title: 'Go For A Walk',
      description: 'Walk a minimum of 3km today',
      priority: 'normal',
      is_done: false,
    },
    {
      id: '4',
      title: 'Call James',
      description: 'Call James for a meeting update',
      priority: 'normal',
      is_done: true,
    },
  ]
  
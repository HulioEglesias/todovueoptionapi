export const STATUS = {
  NEW: "new",
  DONE: "done",
  CANCEL: "cancel",
};
export const getDefaultList = () => {
  return [
    {
      id: 1,
      label: "Важная задача в списке 1",
      status: "new",
      created_at: "2023-10-31T18:51:05.593Z",
    },
    {
      id: 2,
      label: "Важная задача в списке 2",
      status: "done",
      created_at: "2023-10-31T18:51:05.593Z",
    },
    {
      id: 3,
      label: "Важная задача в списке 3",
      status: "cancel",
      created_at: "2023-10-31T18:51:05.593Z",
    },
  ];
};

export const saveUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const removeCurrentUser = () => {
  localStorage.removeItem("currentUser");
};

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find((user) => user.email === email);
};

export const checkUserExists = (email) => {
  return findUserByEmail(email) !== undefined;
};

export const saveTasks = (userId, tasks) => {
  localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
};

export const getTasks = (userId) => {
  const tasks = localStorage.getItem(`tasks_${userId}`);
  return tasks ? JSON.parse(tasks) : [];
};

export const addTask = (userId, task) => {
  const tasks = getTasks(userId);
  const newTask = {
    ...task,
    id: Date.now(),
    userId,
    createdAt: new Date().toISOString(),
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(userId, tasks);
  return newTask;
};

export const updateTask = (userId, taskId, updatedTask) => {
  const tasks = getTasks(userId);
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, ...updatedTask } : task
  );
  saveTasks(userId, updatedTasks);
  return updatedTasks;
};

export const deleteTask = (userId, taskId) => {
  const tasks = getTasks(userId);
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  saveTasks(userId, updatedTasks);
  return updatedTasks;
};

export const toggleTaskStatus = (userId, taskId) => {
  const tasks = getTasks(userId);
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks(userId, updatedTasks);
  return updatedTasks;
};

export const filterTasks = (tasks, filterStatus, searchTerm) => {
  let filtered = tasks;

  if (filterStatus !== "all") {
    filtered = filtered.filter((task) => {
      if (filterStatus === "completed") return task.completed;
      if (filterStatus === "pending") return !task.completed;
      return true;
    });
  }

  if (searchTerm) {
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filtered;
};

export const clearAllData = () => {
  localStorage.clear();
};

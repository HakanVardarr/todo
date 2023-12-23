class TodoService {
  apiUrl = "https://todo-api-hakan.fly.dev/todos";

  getJWT() {
    const JWT = localStorage.getItem("JWT");
    return JWT !== null ? JSON.parse(JWT) : null;
  }

  async getTodos() {
    const JWT = this.getJWT();

    if (JWT !== null) {
      const headers = new Headers();
      headers.append("Authorization", `Bearer: ${JWT}`);

      try {
        const response = await fetch(this.apiUrl, {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.map((todo: string, index: number) => ({
          id: index,
          todo: todo,
        }));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    return [];
  }

  async addTodoToServer(newTodo: string) {
    const JWT = this.getJWT();

    if (JWT !== null) {
      const headers = new Headers();
      headers.append("Authorization", `Bearer: ${JWT}`);
      headers.append("Content-Type", "application/json");

      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            content: newTodo,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    }
  }

  async deleteTodo(todoId: number) {
    const JWT = this.getJWT();

    if (JWT !== null) {
      const apiUrl = `${this.apiUrl}/${todoId}`;
      const headers = new Headers();
      headers.append("Authorization", `Bearer: ${JWT}`);
      headers.append("Content-Type", "application/json");

      try {
        const response = await fetch(apiUrl, {
          method: "DELETE",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export default TodoService;

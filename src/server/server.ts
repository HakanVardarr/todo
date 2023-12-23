class TodoService {
  getJWT() {
    const JWT = localStorage.getItem("JWT");
    return JWT !== null ? JSON.parse(JWT) : null;
  }

  async getTodos() {
    const apiUrl = "http://localhost:8080/todos";
    const JWT = this.getJWT();

    if (JWT !== null) {
      const headers = new Headers();
      headers.append("Authorization", `Bearer: ${JWT}`);

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          return null;
        }

        const data = await response.json();
        return data.map((todo: string, index: number) => ({
          id: index,
          todo: todo,
        }));
      } catch (error) {}
    }

    return null;
  }

  async addTodoToServer(newTodo: string) {
    const apiUrl = "http://localhost:8080/todos";
    const JWT = this.getJWT();

    if (JWT !== null) {
      const headers = new Headers();
      headers.append("Authorization", `Bearer: ${JWT}`);
      headers.append("Content-Type", "application/json");

      try {
        const response = await fetch(apiUrl, {
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
      const apiUrl = `http://localhost:8080/todos/${todoId}`;
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
  async login(username: string, password: string) {
    const apiUrl = "http://localhost:8080/login";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Headers", "Authorization");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        return null;
      }

      return response.headers.get("authorization");
    } catch (error) {
      return null;
    }
  }
  async register(username: string, password: string) {
    const apiUrl = "http://localhost:8080/register";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Headers", "Authorization");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        return null;
      }

      return response.headers.get("authorization");
    } catch (error) {
      return null;
    }
  }
}

export default TodoService;

type ConnectionConfig = {
  host: string;
  user: string;
  password: string;
};

export const testConnection = async (config: ConnectionConfig) => {
  try {
    const response = await fetch(`${config.host}/api/v1/query/tuples`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${config.user}:${config.password}`)}`,
      },
      body: JSON.stringify({
        sql: "SELECT 1",
      }),
    });

    if (!response.ok) {
      console.log(await response.text());
    }

    return response.ok;
  } catch (error) {
    return false;
  }
};

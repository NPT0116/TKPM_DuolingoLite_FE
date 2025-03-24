import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = async (authToken: string) => {
  if (connection) return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5142/notificationHub", {
      accessTokenFactory: () => authToken,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  try {
    await connection.start();
    console.log("✅ SignalR connected.");
  } catch (err) {
    console.error("❌ SignalR connection failed:", err);
  }

  return connection;
};

export const getSignalRConnection = () => connection;
